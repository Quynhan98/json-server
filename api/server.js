const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
app.db = router.db;

app.use(middlewares);

// You must apply the auth middleware before the router
app.use(cors());
app.use(auth);
app.use(router);
app.listen(3000);
