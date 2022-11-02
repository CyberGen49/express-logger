
const clc = require('cli-color');
const express = require('express');
const dayjs = require('dayjs');

/**
 * @callback getIPFunction
 * @param {express.Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req The request object
 */
/**
 * @typedef loggerOptions
 * @type {object}
 * @property {getIPFunction} [getIP] A (synchronous) function that returns the client's IP from the request object
 */
const loggerOptions = {
    getIP: () => {}
};
/**
 * Logs incoming requests upon request finish
 * @param {loggerOptions} [opts] Logger options
 * @returns {express.RequestHandler} An Express request handler
 */
const logger = (opts = loggerOptions) => {
    /** @type {express.RequestHandler} */
    const handler = (req, res, next) => {
        res.on('finish', () => {
            const ip = opts.getIP(req) || req.socket.remoteAddress;
            let codeC = 'yellow';
            switch (res.statusCode.toString().substring(0, 1)) {
                case '2': codeC = 'green'; break;
                case '3': codeC = 'cyan'; break;
                case '4': codeC = 'redBright'; break;
                case '5': codeC = 'red'; break;
            }
            console.log(clc.white(dayjs().format(`YYYY-MM-DD HH:mm:ss`)), clc.cyanBright(ip), clc.yellowBright(req.method), clc[codeC](res.statusCode), clc.greenBright(req.url));
        });
        return next();
    };
    return handler;
};

module.exports = logger;