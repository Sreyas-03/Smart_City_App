const root = require("./root"),
  authoriseWithPassword = require("./auth/authoriseWithPassword"),
  localSignUpValidator = require("./validators/localSignUp"),
  loginWall = require("./auth/loginWall"),
  getUser = require("./getUser"),
  logout = require("./auth/logout"),
  getMyWidgets = require("./getMyWidgets"),
  getDefaultWidgets = require("./getDefaultWidgets"),
  createMyWidget = require("./createMyWidget"),
  getNodes = require("./getNodes"),
  getDataForWidget = require("./getDataForWidget"),
  deleteWidget = require("./deleteWidget"),
  toggleBlockedSensorType = require("./toggleBlockedSensorType"),
  getBlockedSensorTypes = require("./getBlockedSensorTypes"),
  adminWall = require("./auth/adminWall"),
  getReports = require("./getReports"),
  createReport = require("./createReport"),
  reportAction = require("./reportAction"),
  getNodesForMap = require("./getNodesForMap"),
  getThresholds = require("./getThresholds"),
  localSignUp = require("./auth/localSignUp");

module.exports = {
  localAuth: {
    authorise: authoriseWithPassword,
    signUp: [...localSignUpValidator, localSignUp]
  },

  user: {
    get: [loginWall, getUser],
    logout: [loginWall, logout]
  },

  widgets: {
    getMyWidgets: [loginWall, getMyWidgets],
    getDataForWidget: getDataForWidget,
    getDefaultWidgets: getDefaultWidgets,
    createMyWidget: [loginWall, createMyWidget],
    deleteWidget: [loginWall, deleteWidget]
  },

  nodes: {
    get: getNodes,
    getForMap: getNodesForMap,
    toggleBlockedSensorType: [loginWall, adminWall, toggleBlockedSensorType],
    getBlockedSensorTypes: [loginWall, adminWall, getBlockedSensorTypes]
  },

  reports: {
    get: [loginWall, adminWall, getReports],
    create: [loginWall, createReport],
    action: [loginWall, adminWall, reportAction]
  },

  thresholds: {
    get: getThresholds
  },

  root
};
