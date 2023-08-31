"use strict";
// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     app = http.createServer();
// app.on("request", (req, res) => {
//     res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//     });
//     let responseMessage = "<h1>This will show on the screen.</h1>";
//     res.end(responseMessage);
// });
// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

const routeResponseMap = { //defining maooing routes with responses
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>404. Sorry the page you are looking for is not here.</h1>"
};
const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer((req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        if (routeResponseMap[req.url]) { //check whether a request route is deined in the map
            res.end(routeResponseMap[req.url]); //respond with default HTML 
        } else {
            res.end("<h1>Welcome!</h1>"); //respond with HTML to every request
        }
    });
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);