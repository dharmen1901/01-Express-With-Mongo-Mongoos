const fs = require('fs');
const RequestLogger = (req, res, next) => {
    let logMessage = `${new Date().toString()} - ${req.method} : ${req.url} \n`; 
    fs.appendFile('Request.txt', logMessage , (err) => {
        if (err) 
          return next(err);
    });
    next();
}
module.exports = RequestLogger;
