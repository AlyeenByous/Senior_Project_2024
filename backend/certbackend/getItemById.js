'use strict';

    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    const requestTable = process.env.REQUEST_TABLE;

  
    
    exports.getItemById = async (event, context, callback)  => {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        let statusCode = 200;
    
        console.log("EVENT:::", JSON.stringify(event));
    
        const tableName = requestTable;  // event.pathParameters.model

    const i8d = "i8299d";//need to figure out how to get url params into here
    const params = {
        TableName: requestTable,
        KeyConditionExpression: "#id = :pkey",
        ExpressionAttributeValues: {
          ":pkey": i8d
        },
        ExpressionAttributeNames: {
          "#id": "id"
        },
        ScanIndexForward: true
      };
      
    //  const result = await dynamoDb.query(params).promise();




//     const params = {
//         TableName: tableName,
//         IndexName: "id",
//         KeyConditionExpression: "#id = :id",
//         ExpressionAttributeNames:{
//             "#id": "id"
//         },
//        ExpressionAttributeValues: {
//         ":id":i8d},
//         //ProjectionExpression: "id, employeeName, nameOfCert, rocReq, personalDev, reasonForCert, estCompletionTime, certExpiry, certCost, nameOfPrevCert, prevCertDate, empSignDate, leadSignDate, execSignDate "
//         };
   
        
    

//     console.log("Getting individual Item from table:::", tableName);


    await dynamoDb.query(params, (error, data) => {
        if (error) {
            console.log('Scan failed. Error JSON:', JSON.stringify(error, null, 2));
            callback(error);
            return;
        }
        const response = {
            statusCode,
            headers,
            body: JSON.stringify(data.Items)
        };
        callback(null, response);
    }).promise();
// };



    
    };