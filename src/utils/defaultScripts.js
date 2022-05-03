const { insertTable,queryTable } = require('../utils/DBQuerys');
let logger = require('./logger').logger

const userData = {
    username:"admin",
    email:"admin@master.com",
    password:"$2a$10$mS4Lovbb6GyonGSQF5VjI.nekhKb58nb69ALuMoczvxDiBgjftEs2",
    phonenumber:"9876543210"
}

const defaultAdmin=()=>{
    queryTable('usersDetail', { username: userData.username }).then((result) => {
        if (result === undefined || result.length === 0) {
            Promise.resolve(insertTable('usersDetail', userData)).then(() => {
                logger.error('admin created')
            }).catch(err => { logger.error(err) })
        } else {
            logger.error('admin user already exists')
        }
    }).catch(err => { logger.error(err) })
}

module.exports=defaultAdmin