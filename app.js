var express = require('express')
var fs = require('fs')

const { Helper } = require('./helper')
const swaggerUi = require('swagger-ui-express')
var pathToSwaggerUi = require('swagger-ui-dist').absolutePath()

const documentationPath = './documentation'

const helper = new Helper()

const filesPath = [
    { title: 'Rakamin API', path: documentationPath }
]

const config = helper.convertToJson('./config.json')

helper.appendFileSwagger('v1.0', filesPath)

var app = express()
var https = require('https')
const { ApiDocumentation } = require('./model/ApiDocumentation')

const apiDocumentation = new ApiDocumentation(app)

apiDocumentation.run(documentationPath, '/documentation')

app.get('/', function(req, res) {
    res.redirect('documentation')
})

console.log('Dir : ' + __dirname)

var port = 0000;

app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// https.createServer(options, app).listen(port)