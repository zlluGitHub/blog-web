import { log } from "util";

function dateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};
function time() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};
function date() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};
function getUrl() {
    const imgArr = [], max = 25;
    for (let index = 0; index < max; index++) {
        imgArr.push('head' + index + '.jpg');
    };
    const random = parseInt(Math.random() * max, 10);
    return "images/headimg/" + imgArr[random];
};
//判断用户输入的电子邮箱格式是否正确
function checkEmail(myemail) {
    const myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {
        return true;
    } else {
        return false;
    }
};
//判断浏览器类型
function checkIe() {
    const theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        const ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        return ieVersion;
    }

    // this.$Modal.info({
    //     title: title,
    //     content: content
    // });
};

//返回顶部
function goBack() {
    //清除定时器
    clearInterval(timer);
    //设置定时器
    let timer = setInterval(function () {
        //获取滚动条到顶部的距离
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        if (osTop == 0) {
            clearInterval(timer);
        };
    }, 30);
};

//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function getuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//解析字符串 留言板 文章评论
function analysisString(newData) {
    newData = newData.split('","');
    let itemData = {
        depth: newData[0] ? newData[0].substring(
            newData[0].indexOf('":"') + 3,
            newData[0].length
        ) : '',
        name: newData[1] ? newData[1].substring(
            newData[1].indexOf('":"') + 3,
            newData[1].length
        ) : '',
        content: newData[2] ? newData[2].substring(
            newData[2].indexOf('":"') + 3,
            newData[2].length
        ) : '',
        bid: newData[3] ? newData[3].substring(
            newData[3].indexOf('":"') + 3,
            newData[3].length
        ) : '',
        time: newData[4] ? newData[4].substring(
            newData[4].indexOf('":"') + 3,
            newData[4].length - 1
        ) : '',
        url: newData[5] ? newData[5].substring(
            newData[5].indexOf('":"') + 3,
            newData[5].length - 1
        ) : ''
    };
    newData = itemData;
    return newData;
}
//表情
let icon =  [
    {
        name: 'icon_evil.gif'
    },
    {
        name: 'icon_halo.gif'
    },
    {
        name: 'icon_yawn.gif'
    },
    {
        name: 'icon_scare.gif'
    },
    {
        name: 'icon_shutup.gif'
    },
    {
        name: 'icon_redface.gif'
    },
    {
        name: 'icon_mrgreen.gif'
    },
    {
        name: 'icon_twisted.gif'
    },
    {
        name: 'icon_haha.gif'
    },
    {
        name: 'icon_sad.gif'
    },
    {
        name: 'icon_cry.gif'
    },
    {
        name: 'icon_beat.gif'
    },
    {
        name: 'icon_love.gif'
    },
    {
        name: 'icon_fighting.gif'
    },
    {
        name: 'icon_decline.gif'
    },
    {
        name: 'icon_question.gif'
    },
    {
        name: 'icon_arrow.gif'
    },
    {
        name: 'icon_silence.gif'
    },
    {
        name: 'icon_vomit.gif'
    },
    {
        name: 'icon_spitting_blood.gif'
    },
    {
        name: 'icon_despise.gif'
    },
    {
        name: 'icon_smile.gif'
    },
    {
        name: 'icon_ignore.gif'
    },
    {
        name: 'icon_grievance.gif'
    },
    {
        name: 'icon_surprised.gif'
    },
    {
        name: 'icon_sleepy.gif'
    },
    {
        name: 'icon_dog.gif'
    },
    {
        name: 'icon_confused.gif'
    },
    {
        name: 'icon_shy.gif'
    },
    {
        name: 'icon_cold_sweat.gif'
    },
    {
        name: 'icon_shed_tears.gif'
    },
    {
        name: 'icon_neutral.gif'
    },
    {
        name: 'icon_fight.gif'
    },
    {
        name: 'icon_crazys.gif'
    },
    {
        name: 'icon_ok.gif'
    },
    {
        name: 'icon_sofa.gif'
    },
    {
        name: 'icon_rolleyes.gif'
    },
    {
        name: 'icon_grievances.gif'
    },
    {
        name: 'icon_se.gif'
    },
    {
        name: 'icon_thief_laugh.gif'
    },
    {
        name: 'icon_sweat.gif'
    },
    {
        name: 'icon_exclaim.gif'
    },
    {
        name: 'icon_mad.gif'
    },
    {
        name: 'icon_tired.gif'
    },
    {
        name: 'icon_yean.gif'
    },
    {
        name: 'icon_wink.gif'
    },
    {
        name: 'icon_nono.gif'
    },
    {
        name: 'icon_smiles.gif'
    },
    {
        name: 'icon_awkward.gif'
    },
    {
        name: 'icon_cry_laugh.gif'
    },
    {
        name: 'icon_crazy.gif'
    },
    {
        name: 'icon_seduction.gif'
    },
    {
        name: 'icon_pool.gif'
    },
    {
        name: 'icon_awkward2.gif'
    },
    {
        name: 'icon_hum.gif'
    },
    {
        name: 'icon_humm.gif'
    },
    {
        name: 'icon_razz.gif'
    },
    {
        name: 'icon_cool.gif'
    },
    {
        name: 'icon_byebye.gif'
    },
    {
        name: 'icon_delicious.gif'
    },
    {
        name: 'icon_huai_quan.gif'
    },
    {
        name: 'icon_idea.gif'
    },
    {
        name: 'icon_palycool.gif'
    },
    {
        name: 'icon_handshake.gif'
    },
    {
        name: 'icon_lol.gif'
    },
    {
        name: 'icon_eek.gif'
    },
    {
        name: 'icon_lovely.gif'
    },
    {
        name: 'icon_biggrin.gif'
    },
    {
        name: 'icon_good.gif'
    },
]

export {
    dateTime,
    time,
    date,
    getUrl,
    checkEmail,
    checkIe,
    goBack,
    getuid,
    analysisString,
    icon
};