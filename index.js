const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

const port = 8080;

const server = http.createServer((req, res) => {
  const filepath = url.parse(req.url, true).pathname;
  const filename =
    filepath !== '/' && filepath !== '/favicon.ico'
      ? `.${filepath}.html`
      : 'index.html';

  console.log(filename);
  fs.readFile(filename, (err, data) => {
    if (err) {
      fs.readFile('404.html', (err, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        if (err) throw err;
        res.write(data);
        return res.end();
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});

server.listen(port);
