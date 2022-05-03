const express = require('express')
const cors = require('cors')
const mongoconnection = require('./src/configs/dbconfig')
const defaultAdmin = require('./src/utils/defaultScripts')
var bodyParser = require('body-parser');
let logger = require('./src/utils/logger').logger
let app = express();
const route = require('./src/routes/routes');
Promise.all([
    mongoconnection.createConnection(),
]).then(() => {
    defaultAdmin()
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', route)
    app.use(cors())
    app.all('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    // This should be the last route else any after it won't work
    app.use("*", (req, res) => {
        res.status(404).json({
            success: "false",
            message: "Page not found",
            error: {
                statusCode: 404,
                message: "You reached a route that is not defined on this server",
            },
        });
    });

    let server = app.listen(8081, () => {
        let host = server.address().address;
        let port = server.address().port;
        logger.info(`server is listening on host ${host} port ${port}`)
    })
});
