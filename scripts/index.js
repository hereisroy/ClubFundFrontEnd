function showDivs(){
    $('#ideal-vs-member-contribution, #others-contribution, #net-fund-details, #portfolio')
    .fadeIn('slow');
}

function login(){
    let email = $('#email').val();
    let pwd = $('#pwd').val();
    if(email.length==0 || pwd.length==0) alert('blank!');
    getToken(email, pwd).then((token)=>{
        localStorage.setItem("token", token);
        session = parseJwt(token);
        Promise.all([getPublicData, getOverview(), chart, hidePopUp('login-popup')])
        .then((results)=>{
            let publicData = results[0];
            let overviewData = results[1];
            let drawnChart = results[2];
            drawChartForBothAfterLogin(results[2], overviewData.current_member, publicData);
            fillAllPrivateData(overviewData, publicData);
            showDivs();
            hidePopUp('login-popup-wrapper');
        })
    })
}