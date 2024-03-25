'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
//const uuid = require('uuid'); //requre all fields***

module.exports.createRequest = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(Buffer.from(event.body, 'base64').toString());
    console.log("EVENT:::", data);

    const tableName = event.pathParameters.model
    const id = event.pathParameters.id;
    let table;
    switch (tableName) { //If you have other tables you would add them here as other case statements to reference that table.
        case "requests":
            table = requestTable;
            break;
        default:
            throw new Error(`Unsupported resource: "${modelName}"`);
    }

    const params = {
        TableName: table,
        Key: {
            'id': id,
        }
    }

}