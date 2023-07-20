const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const rules = jsonServer.rewriter();

// /!\ Bind the router db to the app
app.db = router.db;

app.use(middlewares);
app.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});
// You must apply the auth middleware before the router
app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(3000);
