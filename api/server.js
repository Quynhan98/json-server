// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Add middleware to allow writing files to the JSON server
server.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const filename = "db.json";
        const fileContent = fs.readFileSync(filename);
        const jsonContent = JSON.parse(fileContent);
        if (req.method === "POST") {
          jsonContent.push(data);
        } else if (req.method === "PUT") {
          const index = jsonContent.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            jsonContent[index] = data;
          }
        }
        fs.writeFileSync(filename, JSON.stringify(jsonContent));
        res.status(200).jsonp(data);
      } catch (error) {
        console.error(error);
        res.status(400).jsonp({ error: "Invalid JSON data" });
      }
    });
  } else {
    next();
  }
});

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
