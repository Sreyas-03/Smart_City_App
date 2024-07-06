const dotenv = require("dotenv");
dotenv.config();

const app = require("express")(),
  initialSetup = require("./initialSetup"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  session = require("cookie-session"),
  Sentry = require("@sentry/node"),
  Tracing = require("@sentry/tracing"),
  cookieParser = require("cookie-parser"),
  passport = require("passport"),
  passportInit = require("./helpers/auth/passportInit"),
  routes = require("./routes");

let sessionOptions = {
    secret: "9j7XKY0EzWUbSHRY2brg8$vG%2",
    saveUninitialized: false,
    resave: false,
    // store: MongoStore.create(mongoStoreOptions),
    cookie: {
      secure: false
    }
  },
  corsOptions = {
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

if (process.env.NODE_ENV === "production") {
  // Sentry init
  Sentry.init({
    dsn: "https://something.ingest.sentry.io",
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app })
    ],
    tracesSampleRate: 1.0
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  // Session options
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
  sessionOptions.cookie.domain = ".my-domain.in";

  // CORS options, ideally have the full domain name here ig
  const whitelist = ["https://my-domain.in"];

  corsOptions.origin = (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  };
}

app.use(cors(corsOptions));
app.use(cookieParser(sessionOptions.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);

// Log a brief of each request + response
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    console.log(
      `${res.statusCode} ${res.statusMessage}; ${
        res.get("Content-Length") || 0
      }b sent`
    );
  });

  return next();
});

routes(app);

// initialSetup();

if (process.env.NODE_ENV === "production")
  app.use(Sentry.Handlers.errorHandler());

app.use((error, req, res, next) => {
  console.error(error);

  // If error has status code specified
  let code = 500;
  if (error.code && !isNaN(error.code)) code = error.code;

  let message = error.message;

  if (!message && error.errors) message = error.errors[0];
  message = message || "An error occurred";

  // If error only has a message or has no details
  res.status(code).json({ error: message });
});

const port = process.env.port || 8000;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at ${host}${port}`);
});

/*
const Threshold = require("./models/threshold");
Threshold.createThreshold({"type": "Flowrate",
  "maxValue": "10",
  "minValue": "0",
  "l1": "3.0",
  "l2": "6.5"})*/

/*const blockedSensorType = require("./models/blockedSensorType");
blockedSensorType.createBlockedSensor({ type: "Temperature" });*/
