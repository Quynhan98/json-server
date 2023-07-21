const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

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
app.use(jsonServer.bodyParser);

// Add middleware to log requests and responses
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "logs.txt")),
  })
);

app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const data = req.body;
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
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).jsonp({ error: "Internal Server Error" });
});

app.use(router);
app.listen(3000);
