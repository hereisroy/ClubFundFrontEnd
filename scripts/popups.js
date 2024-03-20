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