const http =  require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if(url==='/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>');
    res.write('New Server</title></head><body>');
    res.write('<h1>Hello world from New Server</h1>');
    res.write('</body></html>');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
