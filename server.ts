import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS
server.use(middlewares);

// Middleware to add `X-Total-Count` header
server.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

server.use(router);

// Start the server
server.listen(3001, () => {
    console.log("JSON Server is running on port 3001");
});
