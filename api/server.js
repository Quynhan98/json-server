const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const fs = require("fs");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
app.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

// You must apply the auth middleware before the router
app.use(cors());
app.use(auth);

// Add middleware to allow writing files to the JSON server
app.use((req, res, next) => {
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

app.use(router);
app.listen(3000);
