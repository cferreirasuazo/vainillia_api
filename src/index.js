const http = require("http")
const PORT = 3000;
const {bodyParser} = require("./bodyParser");
const handler = require("./handlers/handlers");
const { write } = require("fs");

function logger(req){
        const {url, method}  = req;
        console.log(`URL: ${url}- Method: ${method}` )
}

const server = http.createServer((req,res)=>{
        const {url , method} = req
        //pattern for single books
        var singleBookPattern = /^\/libro\/\d+$/;

        //pattern to access book pages
        var singleBookPagePattern = /^\/libro\/\d+\/page\/\d+$/;
        logger(req)
        switch(method){
                case "GET":
                        try{
                                if(url === "/"){
                                        handler.rootHandler(res)
                                }else if (singleBookPattern.test(url)){
                                        var id = url.match(/(\d+)/);
                                        handler.singleBookHandler(id[0],res)
       
                                }else if (singleBookPagePattern.test(url)){
                                        var values = url.split("/")
                                        res.writeHead(200, {"Contenty-Type": 'application/json'})
                                        handler.singleBookPageHandler(values,res)
                                }else{
                                        res.writeHead(200, {"Contenty-Type": 'application/json'})
                                        handler.notFoundHandler(res) 
                                }
                        }catch(err){    
                                res.writeHead(200, {"Contenty-Type": 'application/json'})
                                handler.notFoundHandler(res)
                        }
                        break
                default:
                        console.log("NO EXIST")
                        break
        }
}) 

server.listen(PORT);
console.log("SERVER on port "  + PORT)
