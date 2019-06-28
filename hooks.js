'use strict';

// require modules
const https = require('https'),
    util = require('util');

const responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

const responses = {
    success: (data = {}, code = 200) => {
        return {
            'statusCode': code,
            'headers': responseHeaders,
            'body': JSON.stringify(data)
        };
    },
    error: (error) => {
        return {
            'statusCode': error.code || 500,
            'headers': responseHeaders,
            'body': JSON.stringify(error)
        };
    }
};

exports.handler = (event, context, callback) => {
    const param_data = event.queryStringParameters.param_name;

    if (param_data) {
        const body = JSON.stringify(param_data);

        const postData = {
            "channel": "#random",
            "username": "awesome_bot",
            "text": body,
            "icon_emoji": ":robot_face:"
        };

        const options = {
            method: 'POST',
            hostname: 'hooks.slack.com',
            port: 433,
            path: '<hooks slack url>'
        };

        const req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                context.done(null);
            });
        });

        req.on('error', function (error) {
            console.log('problem with request: ' + error.message);
        });

        req.write(util.format("%j", postData));
        req.end();

        callback(null, responses.success());
    } else {
        callback(null, responses.error('Invalid data format', 422));
    }
};
