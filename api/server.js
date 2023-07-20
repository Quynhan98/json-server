const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const rules = jsonServer.rewriter({
  "/books/*": "/$1",
});

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use(cors());
app.use(rules);
app.use(auth);
app.use("/books", router);
app.listen(3000);
