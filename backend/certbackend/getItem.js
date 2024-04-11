'use strict';

    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    const requestTable = process.env.REQUEST_TABLE;
    
    exports.getItem = async (event, context, callback)  => {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        let statusCode = 200;
    
        console.log("EVENT:::", JSON.stringify(event));
    
        const tableName = requestTable  // event.pathParameters.model

    const i8d = "i8d";
   // table = requestTable;
    // let table;
    // switch (tableName) { //If you have other tables you would add them here as other case statements to reference that table.
    //     case "error":
    //         throw new Error("Unsupported resource:");
    //     default:           
    //         table = requestTable;
    //         break;
    // }

    // const params = {
    //     TableName: tableName, 
    //    //Key: {id:{'S' : i8d}}
    //    FilterExpression: "id = :id",
    //    ExpressionAttributeValues: {":id": {"S": i8d}} //{":id": "i8d"},
    //     // ConsistentRead: true
        

    // }
    const params = {
        TableName: tableName,
        FilterExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
       ExpressionAttributeValues: {
        ":id": i8d},
        ProjectionExpression: "id, employeeName, nameOfCert, rocReq, personalDev, reasonForCert, estCompletionTime, certExpiry, certCost, nameOfPrevCert,  prevCertDate, empSignDate, leadSignDate, execSignDate "
             

        }
    
        
    

    console.log("Getting individual Item from table:::", tableName);


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


    
    // await dynamoDb.query(params, (err, data)=> { 
    //     if (err) {
    //       console.log("Error",  JSON.stringify(err, null, 2));
    //     }else{
    //       const response = {
    //         statusCode,
    //         headers,
    //         body: JSON.stringify(data.Items)
    //     }}
    //     callback(null, response);
//     // }).promise();
// }
