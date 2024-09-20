const Guest = async (req, res, next)=>{
    log(req)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};

let log = (req) => {
    let { params, query, headers, url, method, body, socket } = req
    console.log("===================================== Request Start ============================================")
    console.log(` URL : ${url}`)
    console.log(` Method : ${method}`)
    console.log(` IP : ${socket.remoteAddress}`)
    console.log(` Headers :`, headers)
    console.log(` Body : `, body)
    console.log(` Params : `, params)
    console.log(` Query : `, query)
    console.log("===================================== Request End ============================================")
}

module.exports = Guest;