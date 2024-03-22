let memberNameMap = [];
let idealMemberId;

function getPrettyDate(dateStr) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date(dateStr);
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${month} ${dayOfMonth}, ${year}`;
}

function initializeGblVars(overviewData, publicData){
    memberNameMap[publicData.ideal_member.id] = 'Ideal';
    idealMemberId = publicData.ideal_member.id;
    memberNameMap[overviewData.current_member.member_id] = overviewData.current_member.name;
    overviewData.others_member_details.forEach((e, i) => {
        memberNameMap[e.member_id] = e.name;
    });
}

function getMemberName(memberId){
    return memberNameMap[memberId];
}

function getCSSDuration(varName){
    let root = document.querySelector(':root');
    let rootStyle = getComputedStyle(root);
    let d = rootStyle.getPropertyValue(varName);
    d = parseFloat(d.substring(0, d.length-1)) * 1000;
    d = parseInt(d);
    return d;
}

function hideInvz(){
    let invCards = $('.investment-card');
    let n = invCards.length;
    invAnimationDuration = 600;
    let duration;
    let invAnimation = new Promise((resolve, reject)=>{
        invCards.each((i, e)=>{
            $(e).animate({opacity:0}, invAnimationDuration);
        })
        setTimeout(()=>{
                $('#investment-wrapper').html('');
                resolve();
            }, invAnimationDuration);
    })

    return invAnimation;
}

function showInvz(){
    let invCards = $('.investment-card');
    let n = invCards.length;
    invAnimationDuration = 600;
    let duration;
    invCards.each((i, e)=>{
        duration = invAnimationDuration*(i+1);
        $(e).animate({opacity:1}, duration);
    })
}