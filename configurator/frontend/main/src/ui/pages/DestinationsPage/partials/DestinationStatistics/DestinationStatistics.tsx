// @Libs
import { useParams } from "react-router-dom"
// @Store
import { destinationsStore } from "stores/destinations"
// @Components
import { StatusPage } from "lib/components/StatusPage/StatusPage"
import { EntityNotFound } from "ui/components/EntityNotFound/EntityNotFound"
// @Types
import { CommonDestinationPageProps } from "../../DestinationsPage"
import { destinationPageRoutes } from "../../DestinationsPage.routes"
import { projectRoute } from "lib/components/ProjectLink/ProjectLink"

type StatisticsPageParams = {
  id: string
}

export const DestinationStatistics: React.FC<CommonDestinationPageProps> = () => {
  const params = useParams<StatisticsPageParams>()
  const destination = destinationsStore.list.find(d => d._id === params.id)

  return destination ? (
    // <StatusPage destinationId={destination._uid} />
    <StatusPage
      entityId={destination._id}
      entityType="destination"
      entitiesListRoute={projectRoute(destinationPageRoutes.root)}
      editEntityRoute={projectRoute(destinationPageRoutes.editExact, { id: destination._id })}
    />
  ) : (
    <EntityNotFound
      entityDisplayType="Destination"
      entityId={params.id}
      entitiesListRoute={projectRoute(destinationPageRoutes.root)}
    />
  )
}
