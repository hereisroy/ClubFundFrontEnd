function showPopUp(popUpType){
    $('body').css('overflow','hidden');
    if(popUpType=='login-popup'){
        $('#login-popup-wrapper').addClass('on');
        setTimeout(()=>{
            $('#login-popup').addClass('on');
        }, 100);
    }    
}

function hidePopUp(popUpType){
    let promise = new Promise((resolve, reject)=>{
        $('body').css('overflow','auto');
        if(popUpType=='login-popup-wrapper'){
            $('#login-popup-wrapper').removeAttr('class');
            resolve();
        } else if(popUpType=='login-popup'){
            $('#login-popup').removeAttr('class');
            setTimeout(()=>{
                resolve();
            }, getCSSDuration('--login-popup-transtion-duration'));
        }
    });

    return promise;
}

$("#email, #pwd").keyup(function(event) {
    if($("#email").val().length==0) return;
    if($("#pwd").val().length==0) return;
    if($('.exclaimation').css('opacity')=='1') hideExclaimation();
    if (event.keyCode === 13) {
        $("#login-button").click();
    }
});

function showExclaimation(){
    $(".exclaimation").animate({opacity: 1}, 500);
}

function hideExclaimation(){
    $(".exclaimation").animate({opacity: 0}, 500);
}