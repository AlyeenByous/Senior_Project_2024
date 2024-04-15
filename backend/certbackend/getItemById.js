'use strict';

    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    const requestTable = process.env.REQUEST_TABLE;
    //this is where we try to get the urlParameters
   // const queryString = document.location.search;
   // const dotColin = new URLSearchParams(window.location.search);
  
    
    exports.getItemById = async (event, context, callback)  => {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        let statusCode = 200;
    
        console.log("EVENT:::", JSON.stringify(event));
    
        const tableName = requestTable;  // event.pathParameters.model
        
        //const dotColin = new URLSearchParams(document.location.search);
       
        //pur url Paramters into variable
        //let rId = "i8229d";//dotColin.get('id'); 
        //const i88d = dotColin.get('id');

        const i8d = "i8d";//"i8299d"; //rId;//need to figure out how to get url params into here
    //Getting the item defined in const i8d
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