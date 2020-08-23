function bodyParser(req){
    return new Promise((resolve,reject)=>{
        var totalData = ""
        req.on('data', chunk=>{
            totalData += chunk
        })
        .on('end', ()=>{
            req.body = JSON.parser(totalData)
            resolve()
        })
        .on('error',err =>{
            console.log(err)
            reject()
        })
    })
}


module.exports = {bodyParser};