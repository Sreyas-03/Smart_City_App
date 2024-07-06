const controllers = require("./controllers");

module.exports = (app) => {
  app.get("/", controllers.root);

  /*
		Authentication Routes
	*/

  app.post("/auth/local", controllers.localAuth.authorise);
  app.post("/auth/local/signup", controllers.localAuth.signUp);

  /*
		User routes
	*/

  app.get("/user", controllers.user.get);
  app.post("/user/logout", controllers.user.logout);

  /*
		Widget routes
	*/

  app.get("/widgets/my", controllers.widgets.getMyWidgets);
  app.post("/widgets/my", controllers.widgets.createMyWidget);
  app.post("/widgets/delete", controllers.widgets.deleteWidget);

  app.get("/widgets", controllers.widgets.getDefaultWidgets);
  app.get("/widgets/data", controllers.widgets.getDataForWidget);

  /*
		Node Routes
	*/

  app.get("/nodes", controllers.nodes.get);
  app.get("/nodes/map", controllers.nodes.getForMap);
  app.post(
    "/nodes/toggleBlockedSensorType",
    controllers.nodes.toggleBlockedSensorType
  );
  app.get("/nodes/blockedSensorTypes", controllers.nodes.getBlockedSensorTypes);

  /*
    Report Routes
  */

  app.get("/reports", controllers.reports.get);
  app.post("/reports", controllers.reports.create);
  app.post("/reports/action", controllers.reports.action);

  /*
    Threshold Routes
  */
  app.get("/thresholds", controllers.thresholds.get);
};
