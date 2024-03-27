const apiDomain = "https://api.hereisroy.online:8443/";

const getPublicData = new Promise((resolve, reject)=>{
    const publicDataURL = apiDomain+"getpublicdata";
    $.ajax({
        url: publicDataURL,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            resolve(data);
        },
        error: function(xhr, status, error) {
            reject(error);
        }
    });
});

function getOverview(){
    let overview = new Promise((resolve, reject)=>{
        const overviewURL = apiDomain+"member/getoverview";
        $.ajax({
            url: overviewURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data:{
                memberId : session.member_id
            },
            success: function(data) {                  
                resolve(data);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    })

    return overview;
};

function getInvData(invYear){
    let invData = new Promise((resolve, reject)=>{
        const overviewURL = apiDomain+"member/getinvestmentsbyyear";
        $.ajax({
            url: overviewURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data:{
                year : invYear
            },
            success: function(data) {                  
                resolve(data);

            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    })

    return invData;
};