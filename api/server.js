// See https://github.com/typicode/json-server#module
// const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");
const server = jsonServerAuth.create();
const router = jsonServerAuth.router("db.json");
const middlewares = jsonServerAuth.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServerAuth.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
