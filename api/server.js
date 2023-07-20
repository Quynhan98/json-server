// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// const jsonServer = require("json-server");
// const auth = require("json-server-auth");
// const cors = require("cors");

// const app = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// app.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//     "/books/*": "/$1",
//   })
// );

// // /!\ Bind the router db to the app
// app.db = router.db;

// app.use(middlewares);

// // Set default middlewares (logger, static, cors and no-cache)
// app.use(middlewares);

// // Add custom routes before JSON Server router
// app.get("/echo", (req, res) => {
//   res.jsonp(req.query);
// });

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// app.use(jsonServer.bodyParser);
// app.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// // You must apply the auth middleware before the router
// app.use(cors());
// app.use(auth);
// app.use(router);
// app.listen(3000);
