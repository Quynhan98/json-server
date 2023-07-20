const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const filePath = path.join("/tmp", "db.json");
fs.writeFileSync(filePath, JSON.stringify(data));

// /!\ Bind the router db to the app
app.db = router.db;

// You must apply the auth middleware before the router
app.use(cors());
app.use(auth);
app.use(router);
app.listen(3000);
