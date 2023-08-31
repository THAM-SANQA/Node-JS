const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");
// const routeMap = {
//     "/": "views/index.html"
// };
// http
//     .createServer((req, res) => {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });
//         if (routeMap[req.url]) {
//             fs.readFile(routeMap[req.url], (error, data) => {
//                 res.write(data);
//                 res.end();
//             });
//         } else {
//             res.end("<h1>Sorry, not found.</h1>");
//         }
//     })
//     .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

const getViewUrl = url => {
    return `views${url}.html`;
};

http.createServer((req, res) => {
    let viewUrl = getViewUrl(req.url); //get the file path string
    fs.readFile(viewUrl, (error, data) => { // read the contents of the mapped file
        if (error) { //handle errors with a 404 response code
            res.writeHead(httpStatus.NOT_FOUND);
            res.write("<h1>FILE NOT FOUND</h1>");
        } else { //respond with the file contents
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });
            res.write(data);
        }
        res.end();
    });
})
    .listen(port);
console.log(`The server has started and is listening on port number: ${port}`);