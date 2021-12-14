const swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'API',
        version: '2.0',
        description: 'API v2 Documentation'
    }
}

exports.ApiDocumentation = class ApiDocumentation {
    constructor(app) {
        this.app = app
    }

    run(filePath, urlPath) {
        var file = filePath.replace('./', '')

        const swaggerUi = require('swagger-ui-express')

        const jsonUpdatedExtension = '.updated.json'

        const document = require('../docs/' + file + jsonUpdatedExtension)

        this.app.use(urlPath, swaggerUi.serve, (req, res) => {
            res.send(swaggerUi.generateHTML(document))
        })

        console.log('File Path : ' + file + ' - Url Path : ' + urlPath);
    }
}