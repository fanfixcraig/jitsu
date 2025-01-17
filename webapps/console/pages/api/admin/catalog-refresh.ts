import { createRoute } from "../../../lib/api";
import { db } from "../../../lib/server/db";
import { assertDefined, assertTrue, getLog, rpc } from "juava";
import { z } from "zod";

const log = getLog("catalog-refresh");
const yaml = require("js-yaml");
const branch = `master`;
const repo = `airbytehq/airbyte`;
const basePath = `airbyte-integrations/connectors`;

function shuffle<T>(arr: T[]) {
  let currentIndex = arr.length;
  let temporaryValue: T;
  let randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

export default createRoute()
  .GET({ auth: true, query: z.object({ limit: z.string().optional() }) })
  .handler(async ({ user, req, query }) => {
    const userProfile = await db.prisma().userProfile.findFirst({ where: { id: user.internalId } });

    assertDefined(userProfile, "User profile not found");
    assertTrue(userProfile.admin, "Not enough permissions");

    const sources: string[] = (await rpc(`https://api.github.com/repos/${repo}/contents/${basePath}?ref=${branch}`))
      .filter(({ name }) => name.startsWith("source-"))
      .map(({ name }) => name);

    shuffle(sources);

    log.atInfo().log(`Found ${sources.length} sources`);
    const max = query.limit ? Math.min(parseInt(query.limit), sources.length) : sources.length;
    const statuses = {};
    for (let i = 0; i < max; i++) {
      const src = sources[i];
      const metadataUrl = `https://raw.githubusercontent.com/${repo}/master/${basePath}/${src}/metadata.yaml`;
      const res = await fetch(metadataUrl);
      let packageId: string | undefined = undefined;
      let metadata: any = {};
      let icon: string | undefined = undefined;
      if (res.ok) {
        metadata = yaml.load(await res.text());

        packageId = metadata.data?.dockerRepository || `airbyte/${src}`;
      } else {
        log.atWarn().log(`Source ${src} doesn't have metadata.yaml`);
        packageId = `airbyte/${src}`;
      }

      if (metadata?.data?.icon) {
        const iconUrl = `https://raw.githubusercontent.com/${repo}/master/${basePath}/${src}/icon.svg`;
        const iconRes = await fetch(iconUrl);
        if (iconRes.ok) {
          icon = await iconRes.text();
        } else {
          log.atWarn().log(`Source ${src} icon file ${metadata.data?.icon} doesn't exist at ${iconUrl}`);
        }
      }

      const currentId = (
        await db.prisma().connectorPackage.findFirst({ where: { packageId: packageId, packageType: "airbyte" } })
      )?.id;
      const data = {
        packageId: packageId as string,
        packageType: "airbyte",
        meta: metadata?.data || {},
        logoSvg: icon,
      };
      if (currentId) {
        statuses[`${packageId}`] = "updated";
        log.atInfo().log(`Updating ${packageId} info. Has icon: ${!!icon}, has metadata: ${!!metadata}`);
        await db.prisma().connectorPackage.update({ where: { id: currentId }, data });
      } else {
        statuses[`${packageId}`] = "created";
        log.atInfo().log(`Created ${packageId} info. Has icon: ${!!icon}, has metadata: ${!!metadata}`);
        await db.prisma().connectorPackage.create({ data: data });
      }
    }
    return {
      total: sources.length,
      processed: query.limit || sources.length,
      statuses,
    };
  })
  .toNextApiHandler();
