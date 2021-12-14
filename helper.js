var fs = require('fs')
const mkdirp = require('mkdirp')

exports.Helper = class Helper {
    appendFileSwagger(version = 'v2.0', jsonFilePaths) {
        const config = this.convertToJson('./config.json')
        var infoApi = {
            title: '',
            version: version,
            description: 'API ' + version + ' documentation'
        }

        const host = config.host

        console.log("Host : " + host)
        for (const jsonFilePath of jsonFilePaths) {
            infoApi.title = jsonFilePath.title + ' documentation'

            const newData = this.convertToJson(jsonFilePath.path + '.json')
            newData.info = infoApi
            newData.host = host

            try {
                fs.mkdirSync(__dirname + '/docs')
            } catch (err) {}

            fs.writeFileSync(__dirname + '/docs/' + jsonFilePath.path + '.updated.json', JSON.stringify(newData))
        }
    }

    convertToJson(filePath) {
        const file = fs.readFileSync(filePath, 'utf8')

        return JSON.parse(file)
    }
}