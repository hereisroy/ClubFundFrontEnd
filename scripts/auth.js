const clubfundAPIIssuer = 'clubfund.rivals.com';
let session;
function getToken(username, pwd){
    let token = new Promise((resolve, reject)=>{
        const tokenURL = apiDomain+"gettoken";
        $.ajax({
            url: tokenURL,
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify({
                email : username,
                password : pwd
            }),
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    })

    return token;
}

function hasValidToken(){
    if(localStorage.getItem('token')==undefined) return false;
    try{
        var payload = parseJwt(localStorage.getItem('token'));
        let currTS = Date.now()/1000;
        if(payload.exp<currTS) return false;
        if(payload.iss!=clubfundAPIIssuer) return false;
    } catch(error){
        console.log(error);
        return false;
    }
    session = payload;
    return true;
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}