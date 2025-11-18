const http=require('http');
http.createServer((req,res)=>{
    res.writeHead(202,{'Content-Type':'text/html'});
    res.write("<h1>Oi Kira</h1>");
    res.end();
}).listen(3000);