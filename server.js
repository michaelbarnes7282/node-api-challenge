const express = require('express');
const cors = require('cors');
const server = express();

const projectRouter = require("./data/helpers/projectRouter.js");
const actionRouter = require("./data/helpers/actionRouter.js");

server.use(express.json());
server.use(cors());

server.use("/projects", logger, projectRouter);
server.use("/actions", logger, actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hey I'm working!</h2>`);
});

function logger(req, res, next) {
    const today = new Date().toLocaleDateString('en-US');
    console.log(`${today} ${req.method} ${req.url}`);

    next();
}

module.exports = server;