const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use(middlewares);
app.use(cors());
app.use(auth);
app.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
