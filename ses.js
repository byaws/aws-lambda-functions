'use strict';

// aws-sdk를 불러옵니다.
const AWS = require('aws-sdk');

// 이메일 서비스를 이용하기 위해 SDK의 지역을 버지니아로 설정합니다.
AWS.config.update({ region: 'us-east-1' });

/* Event는 우리가 위에서 입력한 JSON 데이터를 가지고있습니다.
   함수가 끝날때 오류가 없다면 callback(null) 오류가 있다면 callback("에러 메세지")를 리턴합니다.
   일반적으로 return과 같은 역활을 합니다. */
exports.handler = function (event, context, callback) {

    // Date 객체를 생성합니다. 인자를 주지 않으면 오늘 데이터를 가져옵니다.
    var today = new Date();

    // Date객체를 문자열로 바꾸어줍니다.
    var todayISOString = today.toISOString();

    /* 연도, 월, 날짜를 생성자로주어 new Date(year,month,day)를 통해 Date 객체를 만들 수 있습니다.
       오늘 날짜에서 -1을 주어 어제 데이터를 가져온 후 문자열로 바꾸어줍니다.*/

    var yesterdayISOString = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString();

    // 아래 문자열은 2019-06-05T10:33:27.218Z와 같이 날짜정보와 시간정보 그리고 타임존정보도 같이 가져오게됩니다.
    console.log("firstDayOfMonth:" + todayISOString);
    console.log("firstDayOfNextMonth:" + yesterdayISOString);

    console.log("================= slice string =====================");

    // 뒤쪽의 필요없는 텍스트를 자르고 YYYY-MM-DD 포맷으로 텍스트를 가져옵니다.
    todayISOString = todayISOString.slice(0, 10);
    yesterdayISOString = yesterdayISOString.slice(0, 10);

    console.log("firstDayOfMonth:" + todayISOString);
    console.log("firstDayOfNextMonth:" + yesterdayISOString);

    /* 시작일을 어제로 그리고 끝나는날을 오늘로 설정합니다.
       End로 설정된 날은 포함되어지지 않습니다. 
       가격정보 기준은 Daily로 설정합니다. */
    var costParams = {
        TimePeriod: {
            Start: yesterdayISOString,
            End: todayISOString
        },
        Granularity: 'DAILY', Metrics: ['UnblendedCost']
    };

    // AWS Cost Explorer를 통해 가격정보를 가져옵니다.
    new AWS.CostExplorer().getCostAndUsage(costParams, function (err, costResult) {
        if (err) callback(err);

        /* 가격정보를 yesterdayBilling 변수로 선언합니다.  
           ResultsByTime은 가격정보를 배열로 가지고있기떄문에 가장 최근데이터인 index 0번 데이터를 가져옵니다. */
        var yesterdayBilling = costResult.ResultsByTime[0].Total.UnblendedCost.Amount;
        console.log(JSON.stringify(costResult));
        console.log("billing amount" + yesterdayBilling);

        var params = {
            Destination: {
                ToAddresses: [event.sender]
            },
            Message: {
                Body: {
                    Text: {
                        Data: "AWS Price: " + yesterdayBilling + "$"
                    }
                },
                Subject: {
                    Data: yesterdayISOString + " AWS Billing"
                }
            },
            Source: event.reciever
        };

        new AWS.SES().sendEmail(params, function (err, result) {
            if (err) callback(err);
            else (callback(null))
        });
    });
};
