import http from 'http';

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    console.error('\n==== BROWSER ERROR CAPTURED ====\n');
    console.error(body);
    console.error('\n================================\n');
    res.writeHead(200);
    res.end('ok');
  });
});

server.listen(9999, () => {
  console.log('Error catcher server listening on port 9999');
});
