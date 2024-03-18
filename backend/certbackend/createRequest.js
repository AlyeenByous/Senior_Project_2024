'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

exports.createRequest = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);

    //create new timestamp value
    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth()+1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = y + '/' + MM + '/' + dd;

    const params = {
        TableName: process.env.REQUEST_TABLE,
        Item: {
            id: uuid.v1(),
            createdDate: dt,
            createdTimestamp: ts,
            employeeName: data.employeeName,
            nameOfCert: data.nameOfCert,
            rocReq: data.rocReq, // double check datatype for rocReq
            personalDev: data.personalDev, // double check datatype for personalDev
            reasonForCert: data.reasonForCert,
            estCompletionTime: data.estCompletionTime,
            certExpiry: data.certExpiry,
            certCost: data.certCost, 
            nameOfPrevCert: data.nameOfPrevCert, 
            prevCertDate: data.prevCertDate, 
            empSignDate: data.empSignDate, 
            leadSignDate: data.leadSignDate, 
            execSignDate: data.execSignDate

            
        }
    }

    console.log("Creating Request");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode,
                    headers,
                    body: JSON.stringify({message: 'Created Request Successfully!'})
                });
            }).catch(err => {
                console.log(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({message: 'Unable to Create Request'})
                });
            });
    } catch (err) {
        return { error: err }
    }
};


function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}