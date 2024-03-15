'use strict';

exports.handler = (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const response = {
        statusCode,
        headers,
        body: "Hello, Lambda works!!!"
    }

    callback(null, response);
};
