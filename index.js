
var knexfile   = require("./knexfile")
var knex       = require("knex")(knexfile.development)
var express    = require("express")
var bodyParser = require('body-parser')
var app        = express()

app.use(bodyParser.json({
  limit: 1024 * 1024
}));
app.use(bodyParser.raw({
  type: ['image/*'],
  limit: 10240 * 1024
}));

// permitir CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Methods', //
             'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', '*');
  // keep chain
  next();
});

app.get("/list",function(req,res){
  knex("imagem").select("idimagem","nomeimagem","dtcriacaoimagem")//
  .then(function(ret){
    res.send(ret)
  }).catch(function(err){
    res.status(500).send(err)
    console.log(err)
  })
})

app.get("/:idimagem",function(req,res){
  knex("imagem").select().where({
    idimagem:req.params.idimagem
  }).then(function(ret){
    var img = ret[0]
    res.setHeader("Content-Type", img.mimeimagem)
    res.send(img.dataimagem)
  }).catch(function(err){
    res.status(500).send(err)
    console.log(err)
  })
})

app.post("/save",function(req,res){
  knex("imagem").insert({
    nomeimagem:req.header("Content-Type"),
    mimeimagem:req.query.nomeimagem,
    dataimagem:req.body
  },"idimagem").then(function(ret){
    res.send({idimagem:ret[0]})
  }).catch(function(err){
    res.status(500).send(err)
    console.log(err)
  })
})

app["delete"]("/:idimagem",function(req,res){
  knex("imagem").del().where({
    idimagem:req.params.idimagem
  }).then(function(ret){
    res.send("OK")
  }).catch(function(err){
    res.status(500).send(err)
    console.log(err)
  })
})

console.log("na porta 3000")
app.listen(3000)


