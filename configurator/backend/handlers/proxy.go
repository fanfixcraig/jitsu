package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/jitsucom/jitsu/configurator/jitsu"
	"github.com/jitsucom/jitsu/configurator/middleware"
	"github.com/jitsucom/jitsu/server/logging"
	smdlwr "github.com/jitsucom/jitsu/server/middleware"
	"net/http"
	"time"
)

type ProxyHandler struct {
	jitsuService *jitsu.Service
	decorators   map[string]jitsu.APIDecorator
}

func NewProxyHandler(jitsuService *jitsu.Service, decorators map[string]jitsu.APIDecorator) *ProxyHandler {
	return &ProxyHandler{
		jitsuService: jitsuService,
		decorators:   decorators,
	}
}

//Handler proxies requests to Jitsu Server with validation
func (ph *ProxyHandler) Handler(c *gin.Context) {
	begin := time.Now()

	projectID := c.Query("project_id")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, smdlwr.ErrResponse(ErrProjectIDRequired.Error(), nil))
		return
	}

	userProjectID := c.GetString(middleware.ProjectIDKey)
	if userProjectID == "" {
		logging.SystemError(ErrProjectIDNotFoundInContext)
		c.JSON(http.StatusUnauthorized, smdlwr.ErrResponse("Project authorization error", ErrProjectIDNotFoundInContext))
		return
	}

	if userProjectID != projectID {
		c.JSON(http.StatusUnauthorized, smdlwr.ErrResponse("User does not have access to project "+projectID, nil))
		return
	}

	req, err := ph.getJitsuRequest(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, smdlwr.ErrResponse("Failed to create proxy request to Jitsu server", err))
		return
	}

	code, payload, err := ph.jitsuService.ProxySend(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, smdlwr.ErrResponse("Failed to proxy request to Jitsu server", err))
		return
	}

	c.Header("Content-Type", jsonContentType)
	c.Writer.WriteHeader(code)

	_, err = c.Writer.Write(payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, smdlwr.ErrResponse("Failed to write proxy response", err))
	}

	logging.Debugf("%s response in [%.2f] seconds", c.Request.URL.Path, time.Now().Sub(begin).Seconds())
}

func (ph *ProxyHandler) getJitsuRequest(c *gin.Context) (*jitsu.Request, error) {
	decorator, ok := ph.decorators[c.Request.URL.Path]
	if ok {
		return decorator(c)
	}

	return jitsu.BuildRequest(c), nil
}
