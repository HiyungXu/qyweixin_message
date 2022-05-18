const gettoken = async (mycorpid,mysecret) => {
    const mytoken = await axios({
        method: 'get',
        url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
        params: {
            corpid: mycorpid,
            corpsecret: mysecret
        };
    });
    return mytoken.access_token;    
}

const qyweixin = (token, infos) => {
    const titleEmail = infos?.[0]['账号'];
    const titleLeftDays = infos?.[0]['天数'];
    const titleCheckInMessage = infos?.[0]['签到情况'];
    const titleSpace = 4;

    const title = (
        '账号: ' + `${titleEmail}`.padEnd(titleEmail.length + titleSpace) +
        '天数: ' + `${titleLeftDays}`.padEnd(titleLeftDays.toString().length + titleSpace) +
        '签到情况: ' + `${titleCheckInMessage}`
    ).slice(0, 100);

    const data = {
        token,
        title,
        content: JSON.stringify(infos),
        agentid: myagentid
        template: 'json'
    };
    console.log(data);

    return axios({
        method: 'post',
        url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send',
        data
    });
};
