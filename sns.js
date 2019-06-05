'use strict';

// aws-sdk를 불러옵니다.
const AWS = require('aws-sdk');

/* 이전과 다른부분이 있다면 context와 callback이라는 변수가 추가되었습니다. 
   callback은 현재 함수가 끝났다는것을 알려줍니다. */
exports.handler = (event, context, callback) => {

    /* 위에 입력했던 json값이 event 즉 input으로 들어옵니다.
       params에 Message와 PhonNumber 변수를 선언합니다. */
    const params = {
        Message: event.text,
        PhoneNumber: event.number
    };

    /* SNS SDK를 가져옵니다.
     SNS서비스에서 메세지를 보내는것은 한정된 리전에서만 사용할 수 있기때문에
     region을 도쿄리전으로 설정해주어야합니다. 이를 위해 인자값으로
     region에 도쿄리전의 식별자인 'ap-northeast-1'을 입력합니다. */
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31', region: 'ap-northeast-1' }).publish(params).promise();

    // SDK를 실행합니다.
    publishTextPromise
        .then(function (data) {
            // 메세지가 있다면 첫번째에 null, 두번째에 메세지를 리턴합니다.
            callback(null, "MessageID is " + data.MessageId);
        })
        .catch(
            function (err) {
                // 에러가 있다면 err를 리턴합니다.
                callback(err);
            });
};
