const http=require('http');
const fs=require('fs');
const port=3000;
const hostname='127.0.0.1';

const server=http.createServer((req,res)=>{
   const routefile=(statuscode,filename)=>{
     fs.readFile(filename,(err,data)=>{
            res.writeHead(statuscode,{'Content-Type':'text/html'})
            res.write(data);
            res.end();

        });
   }
    if(req.url=='/'){
        routefile(200,'./view/home.html');
    }
    else if(req.url=='/about'){
        routefile(200,'./view/about.html');
    }
    else if(req.url=='/contact'){
        routefile(200,'./view/contact.html');
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'})
        res.end('<h1>404 not found</h1>');
    }
});

server.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}`);
});