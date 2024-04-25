'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
//const id = require('uuid'); //require all fields***

module.exports.createRequest = async (event, context, callback) => {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    let statusCode = 200;

    console.log("EVENT:::", event.body);
    const data = JSON.parse(event.body);
    console.log("EVENT:::", data);
    const employeeName = data.employeeName;
    console.log(employeeName);
    //create new timestamp value
    let d = new Date();
    let dxd = timeFormat(d.getHours());
    let h = addZero(dxd);
    let m = addZero(d.getMinutes());
    let ts = h + ':' + m;
    //create new date value
    let MM = addZero(d.getMonth()+1);
    let dd = addZero(d.getDate());
    let y = d.getFullYear();
    let dt = dd + '/' + MM + '/' + y;
    //random id addition
    let ixxd =Math.random()*1000;
    let ixd = Math.trunc(ixxd);
    const params = {
        TableName: process.env.REQUEST_TABLE,
        Item: {
            id: 'i'+ixd+'d',
            createdDate: dt,//requires no input from users
            createdTimestamp: ts, //requires no input from users
            employeeName: data.employeeName,
            nameOfCert: data.nameOfCert,
            rocReq: data.rocReq, // double check datatype for rocReq corresponding radioButton
            personalDev: data.personalDev, // double check datatype for corresponding radioButton(probably use boolean)
            reasonForCert: data.reasonForCert,
            estCompletionTime: data.estCompletionTime,
            estCompletionDate: data.estCompletionDate,
            certExpiry: data.certExpiry,
            certCost: data.certCost, 
            nameOfPrevCert: data.nameOfPrevCert, 
            prevCertDate: data.prevCertDate, 
            empSignDate: data.empSignDate, 
            leadSignDate: data.leadSignDate, 
            execSignDate: data.execSignDate,
            approvalStatus: 0

            
        }
    }

    console.log("Creating Request");

    try{
        await dynamoDb.put(params).promise()
            .then(res => {
                callback(null, {
                    statusCode: 201,
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

function timeFormat(j){
    j=j-5;
    if (j<0){j=j+24;}
    return (j%24);
}
function addZero(i) {
    if (i<10) {
        i = '0' + i;
    }
    return i;
}