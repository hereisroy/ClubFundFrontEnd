function showDivs(){
    $('#ideal-vs-member-contribution, #others-contribution, #net-fund-details, #portfolio, #investment-container, #footer')
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

function logout(){
    localStorage.removeItem('token')
    location.reload();
}

function fetchNFillInvData(){
    let selectedYear = $('#inv-year-select').val();
    Promise.all([getInvData(selectedYear), hideInvz()]).then((results)=>{
        let invData = results[0];
        fillInvData(invData.investments);
    })
}

function toggleInvOtherDetails(e){

    let otherDetailsWrapper = $(e).find('.inv-other-details-wrapper');
    if(otherDetailsWrapper.height()>0){
        otherDetailsWrapper.find('.inv-others-details>div').each((i, e)=>{
            let elem = $(e);
            let animationDuration = Math.random()*500;
            elem.animate({opacity: 0}, animationDuration);
        })
        otherDetailsWrapper.css('max-height', '0px');
        setTimeout(()=>{
                
            }, 500);
    } else {
        let height = otherDetailsWrapper.find('.inv-others-details').outerHeight();
        otherDetailsWrapper.css('max-height', height);
        let delay = getCSSDuration('--inv-transtion-duration');
        otherDetailsWrapper.find('.inv-others-details>div').each((i, e)=>{
            let elem = $(e);
            let animationDuration = Math.random()*500;
            setTimeout(()=>{
                elem.animate({opacity: 1}, animationDuration);
            }, delay/2);
        })
    }
}

function setFooterHeight(){
    const heightFactor = 359/2000;
    let footer = $('#footer');
    footer.height(footer.width()*heightFactor);
}
setFooterHeight();
$(window).on('resize', ()=>{
    setFooterHeight();
})