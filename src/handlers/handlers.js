
const pug = require("pug");
const books = require("../database/books");
const pages = require("../database/pages");

//route for templates
var templatesDir = __dirname.replace("handlers","pages")


//function to handler not found error
exports.notFoundHandler= function(res){
    var url = `${templatesDir}/notFound.pug`;
    const compiledFunction = pug.compileFile(url);
    res.end(compiledFunction())
}


//function to handler root request
exports.rootHandler = function(res){
    
    console.log(templatesDir);
    var url = `${templatesDir}/index.pug`;
    const compiledFunction = pug.compileFile(url);
    res.writeHead(200, {"Contenty-Type": 'text/html'})
    res.end(compiledFunction({
        data:[...books.default]
    }))
}


//function to handler book request
exports.singleBookHandler = function(id,res){
    try{
        if (id < books.default.length){
            res.writeHead(200, {"Contenty-Type": 'text/html'})
            var url = `${templatesDir}/book.pug`;
            const compiledFunction = pug.compileFile(url);
            res.end(compiledFunction({
                book:books.default[id],
                pages: pages.default
            }))

        }else{
            notFoundHandler(res)
        }
    }catch(err){
        res.writeHead(200, {"Contenty-Type": 'text/html'})
        res.write({"message":"ERRROR"})
    }
        res.end()
   
}


//Function to handler page requests
exports.singleBookPageHandler = function(values,res){
    var bookId = values[2];
    var pageNumber = values[4];

    res.writeHead(200, {"Contenty-Type": 'text/html'})
    
    if(books.default[bookId]){
        if(pages.default[pageNumber]){
            var url = `${templatesDir}/book_page.pug`;
            const compiledFunction = pug.compileFile(url);
            res.end(compiledFunction({
                book:books.default[bookId],
                page:pages.default[pageNumber],
                pages: pages.default
            }))
        }else{
            notFoundHandler(res)
        }
    }else{
            notFoundHandler(res)
    }

    
}