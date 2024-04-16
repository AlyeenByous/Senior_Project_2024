'use strict';

    const AWS = require('aws-sdk');
    //
    
    const { DocumentClient } = require('aws-sdk/clients/dynamodb');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const requestTable = process.env.REQUEST_TABLE;

    //this is where we try to get the urlParameters
   // const queryString = document.location.search;
    //const dotColin = new URLSearchParams(window.location.search);
//    const myurl= document.location.pathname;//.pathname.split('/'));
//    const array = myurl.pathname.split('/');
//    const ham = array[2];

    
    exports.getItemById = async (event, context, callback)  => {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        let statusCode = 200;
        
        //let iid =event.pathParameters
       // let xid = iid.split('/');
       // let xx = x[2];
        console.log("EVENT:::", JSON.stringify(event));
     
    
    
       // event.pathParameters.model
        // when i type this into a browser console:
        // (array=window.location.pathname.split('/');
        // ham=array[2];
        // console.log(ham);
        //it retrieves the last part of the url, need clarification how to do it in js
       
     //need to figure out how to get url {id} into here
//let i8d = "i8292d"; // xid[1];//"i8292d";
         let uuid =event.pathParameters.id;
         console.log(uuid);

    //Getting the item defined in i8d
    const params = {
        TableName: requestTable,
        Key: {
            id : uuid

        }
      
      };
      
   
        
    

//     console.log("Getting individual Item from table:::", tableName);

      //await dynamoDb.query(params, (error, data) => {
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
// };



    
    };