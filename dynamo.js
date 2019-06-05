'use strict';

// aws-sdk를 불러옵니다.
const AWS = require('aws-sdk');

// dynamodb 초기화합니다.
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    // 리턴할 값을 선언합니다.
    let response

    // queryStringParameters즉 GET값들이 들어오는지 들어온다면 id가 있는지 체크합니다.
    if (!event.queryStringParameters || !event.queryStringParameters.id) {
        response = {
            statusCode: 400,
            body: JSON.stringify("id가 없습니다.")
        };
        return response;
    } else {
        let params = {
            Item: {
                id: event.queryStringParameters.id,
                data: event.queryStringParameters
            },
            TableName: "dynamo_apigateway_query"
        };

        await dynamodb.put(params).promise().catch(e => {
            response = {
                statusCode: 500,
                body: JSON.stringify("에러가 발생하였습니다." + e)
            };
            return response;
        })

        response = {
            statusCode: 200,
            body: JSON.stringify("데이터가 성공적으로 저장되었습니다.")
        };

        return response;
    }
};
