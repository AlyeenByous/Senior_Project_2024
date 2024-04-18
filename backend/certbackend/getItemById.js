'use strict';

    const AWS = require('aws-sdk');
    const { DocumentClient } = require('aws-sdk/clients/dynamodb');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const requestTable = process.env.REQUEST_TABLE;

    
    exports.getItemById = async (event, context, callback)  => {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        let statusCode = 200;
        console.log("EVENT:::", JSON.stringify(event));
     
    //Getting url pathParameters for {id}
         let uuid =event.pathParameters.id;
         console.log(uuid);

    //Getting the item defined in uuid
    const params = {
        TableName: requestTable,
        Key: {
            id : uuid

        }
      
      };
      
  
    console.log("Getting individual Item from table:::", requestTable);
//returns only the defined object with the desired {id}
    await dynamoDb.get(params, (error, data) => {
        if (error) {
            console.log('Scan failed. Error JSON:', JSON.stringify(error, null, 2));
            callback(error);
            return;
        }
           const response = {
            
            statusCode,
            headers,
            body: JSON.stringify(data.Item)
        };
        callback(null, response);
    }).promise();
    
 };