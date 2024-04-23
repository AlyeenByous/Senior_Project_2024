'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const requestTable = process.env.REQUEST_TABLE;

exports.listItems = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", JSON.stringify(event));

    const tableName = requestTable  // event.pathParameters.model
    
    let table;
    switch (tableName) {
        case "error":
           // throw new Error(`Unsupported resource:"`); // "${modelName}"`);
           break;
        default:
            table = requestTable;
            
            
    }

    const params = {
        TableName: table
    }

    console.log("Getting Items from table:::", table);

    //bringing all item in our table into view
    await dynamoDb.scan(params, (error, data) => {
        if (error) {
            console.log('Scan failed. Error JSON:', JSON.stringify(error, null, 2));
            callback(error);
            return;
        }
        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Items)
        }
        callback(null, response);
    }).promise();
};
