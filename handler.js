'use strict';

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
        }
    },
    error: (error) => {
        return {
            'statusCode': error.code || 500,
            'headers': responseHeaders,
            'body': JSON.stringify(error)
        }
    }
};

module.exports = {
    
    get_list: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;

        get_list()
            .then(result => {
                callback(null, responses.success(result));
            })
            .catch(error => {
                callback(null, responses.error(error));
            });
    },

    get_detail: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;

        get_detail()
            .then(result => {
                callback(null, responses.success(result));
            })
            .catch(error => {
                callback(null, responses.error(error));
            });
    },

    create: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;

        create()
            .then(() => {
                callback(null, responses.success({}, 201));
            })
            .catch(error => {
                callback(null, responses.error(error));
            });

    },

    update: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;

        update()
            .then(() => {
                callback(null, responses.success());
            })
            .catch(error => {
                callback(null, responses.error(error));
            });
    },

    del: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;

        del()
            .then(() => {
                callback(null, responses.success());
            })
            .catch(error => {
                callback(null, responses.error(error));
            });
    }
}