const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let { url } = req;
    console.log(url);
    switch (url) {
        case "/": {
            fs.readdir(__dirname, (err, files) => {
                if (err) throw err;
                res.setHeader("content-type", "text/html");
                files.forEach(x => {
                    if (x == 'src' || x == 'data' || x == 'public') {
                        res.write(`<li><a href=/${x}>${x}</a></li>`)
                    } else {
                        res.write(`<li>${x}</li>`)
                    }
                })
                res.end();
            })
            break;
        }
        case "/src": {
            fs.readdir("src", (err, files) => {
                if (err) throw err;
                res.setHeader("content-type", "text/html");
                files.forEach(x => {
                    res.write(`<li>${x}</li>`)
                })
                res.end();
            })
            break;
        }
        case "/public": {
            fs.readdir("public", (err, files) => {
                if (err) throw err;
                res.setHeader("content-type", "text/html");
                files.forEach(x => {
                    if (x == 'others') {
                        res.write(`<a href='/public/others'><li>${x}</li></a>`)
                    } else {
                        res.write(`<li>${x}</li>`)
                    }
                })
                res.end();
            })
            break;
        }
        case "/public/others": {
            fs.readdir('./public/others', (err, files) => {
                if (err) throw err;
                res.setHeader("content-Type", "text/html");
                files.forEach(x => {
                    res.write(`<li>${x}</li>`)
                })
                res.end();
            })
            break;
        }
    }
})
server.listen(8080, () => {
    console.log("server listening on port " + 8080);
});