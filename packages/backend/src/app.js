import http from "http";

import express from "express";

import socket from "./sockets";

const app = express();

// ? Include the API routes
app.use("/api", require("./routes/api"));

const server = new http.Server(app);
socket(server);

// const port = 8000;
// app.listen(port, () => {
//   console.log(`Api listening on port ${port}!`);
// });

const mode = process.env.NODE_ENV;
server.listen(port + 1, () => {
  console.log(`Socker listening on port ${port + 1}!`);
  console.log(`Api and socker whitelisted for ${host}`);
});
