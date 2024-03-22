function fillIdealData(idealData){
    let tableBody = $('#ideal-vs-member-contribution>table>tbody');
    tableBody.find('tr:nth-child(1)>td:nth-child(1)').text(idealData.cvp);
    tableBody.find('tr:nth-child(2)>td:nth-child(1)').text(idealData.cvi);
    tableBody.find('tr:nth-child(3)>td:nth-child(1)').text(idealData.nc);
    tableBody.find('tr:nth-child(4)>td:nth-child(1)').text(idealData.rpi);
}

function fillMemberData(memberData, idealData){
    $('#ideal-vs-member-contribution th:nth-child(3)').text(memberData.name);
    let tableBody = $('#ideal-vs-member-contribution>table>tbody');
    let color = 'green';
    if(memberData.nc<idealData.nc) color = 'red';
    tableBody.removeAttr('class').addClass(color);
    tableBody.find('tr:nth-child(1)>td:nth-child(3)').text(memberData.cvp);
    tableBody.find('tr:nth-child(2)>td:nth-child(3)').text(memberData.cvi);
    tableBody.find('tr:nth-child(3)>td:nth-child(3)').text(memberData.nc);
    tableBody.find('tr:nth-child(4)>td:nth-child(3)').text(memberData.rpi);
}

function fillOtherMembersData(otherMemData, idealData){
    let tbody = $('#others-contribution-table>tbody');
    let html;
    let color;
    otherMemData.forEach((v, i)=>{
        html = `<tr memId=${v.member_id} email=${v.email} is-admin=${v.isAdmin}>`;
        html += `<td>${v.name}</td>`;
        color = parseFloat(v.cvp)<parseFloat(idealData.cvp)? 'red' : 'green';
        html += `<td clas=${color}>${v.cvp}</td>`;
        color = parseFloat(v.cvi)<parseFloat(idealData.cvi)? 'red' : 'green';
        html += `<td clas=${color}>${v.cvi}</td>`;
        color = parseFloat(v.nc)<parseFloat(idealData.nc)? 'red' : 'green';
        html += `<td clas=${color}>${v.nc}</td>`;
        color = parseFloat(v.rpi)>parseFloat(idealData.rpi)? 'red' : 'green';
        html += `<td clas=${color}>${v.rpi}</td>`;
        html += '</td></tr>';
        tbody.append(html);
    }) 
}

function fillNetFundData(netFundData){
    let color = 'green';
    if($('#ideal-vs-member-contribution tbody').hasClass('green')) color = 'red';
    $('#net-fund-details-card').removeAttr('class').addClass(color);
    $('#net-fund-invested-value').text(netFundData.invested);
    $('#net-fund-current-value').text(netFundData.current_value);
   // let retrunVal = parseFloat(netFundData.current_value) - parseFloat(netFundData.invested);
    let retrunVal = Math.round((netFundData.current_value - netFundData.invested) * 100) / 100;
    $('#net-fund-return-value').text(retrunVal);
    $('#net-fund-return-percentage').text(netFundData.total_returns);
    $('#net-fund-xirr-value').text(netFundData.xirr);
}

function fillPortfolioData(mFundData){
    let container = $('#mfund-card-container') ;
    let html, latestNav, returnVal;
    mFundData.forEach((v, i)=>{
        latestNav = 'NO';
        if(v.has_latest_nav_value) latestNav = 'YES';
        html=`<div class="mfund-card" fund-id=${v.fund_id} api-url=${v.api_url} latest-nav=${latestNav}>`;
        html+=`<span class="mfund-name">${v.fund_name}</span>`;
        html+=`<span class="mfund-invested">Invested <br>&#8377;<span class="mfund-invested-value">${v.invested}</span></span>`;
        html+=`<span class="mfund-current">Current <br>&#8377;<span class="mfund-current-value">${v.current_value}</span></span>`;
        html+='<span class="mfund-return">Returns <br>&#8377;';
        returnVal = Math.round((v.current_value - v.invested) * 100) / 100;
        html+=`<span class="mfund-return-value">${returnVal}</span>`;
        html+=`(<span class="mfund-return-percentage">${v.total_returns}</span>%)</span>`;
        html+='<span class="mfund-xirr">XIRR <br>';
        html+=`<span class="mfund-xirr-value">${v.xirr}</span>%</span>`;
        html+='</div>';
        container.append(html);
    })
}

function fillInvYears(invYears){
    let invYearsElem = $('#inv-year-select')
    invYears.forEach(v => {
        invYearsElem.append(`<option value="${v}">${v}</option>`);
    });
}

function fillInvData(invData){
    let memberId = session.member_id;
    let html;

    invData.forEach((e, i)=>{
        html=`<div class="investment-card" style="opacity:0;" onclick="toggleInvOtherDetails(this)" inv-id="${e.investment_id}">`;
        html+='<div class="inv-header">';
        html+=`<span class="inv-no">Inv#${e.investment_no}</span>`;
        let date = getPrettyDate(e.date);
        html+=`<span class="inv-date">${date}</span>`;
        html+='</div><div class="inv-details"><div class="fund-wrapper"><span>Fund</span>';
        let fundName = $(`.mfund-card[fund-id=${e.fund_id}]`).find('.mfund-name').text();
        html+=`<span>${fundName}</span>`;
        html+='</div><div class="ammount-invested-wrapper"><span>Ammount Invested</span>';
        html+=`<span>${e.ammount}</span>`;
        html+='</div><div class="current-value-wrapper"><span>Current Value</span>';
        html+=`<span>${e.current_value}</span>`;
        html+='</div><div class="returns-wrapper"><span>Returns</span>';
        html+=`<span>${e.returns}</span>`;
        html+='</div><div class="member-contribution-wrapper"><span>Ideal Contribution</span>';
        let idealContribution = null;
        let memberContribution = 0;
        e.contributions.forEach((c, k)=>{
            if(c.member_id==idealMemberId) idealContribution = c.ammount;
            else if((c.member_id==memberId)) memberContribution = c.ammount;
        })
        html+=`<span>${idealContribution}</span>`;
        html+='</div></div><div class="inv-other-details-wrapper"><div class="inv-others-details">';
        html+=`<div><span>${getMemberName(memberId)}</span><span>${memberContribution}</span></div>`;
        e.contributions.forEach((c, k)=>{
            if(c.member_id==idealMemberId || c.member_id==memberId || c.ammount==0) return;
            html+=`<div><span>${getMemberName(c.member_id)}</span><span>${c.ammount}</span></div>`;
        })
        html+='</div></div></div>';
        
        $('#investment-wrapper').append(html);
        
    });

    showInvz();

}

function fillAllPrivateData(overviewData, publicData){
    initializeGblVars(overviewData, publicData);
    fillMemberData(overviewData.current_member, publicData.ideal_member);
    fillOtherMembersData(overviewData.others_member_details, publicData.ideal_member);
    fillNetFundData(overviewData.net_fund_details);
    fillPortfolioData(overviewData.mutual_fund_details);
    fillInvYears(overviewData.investment_years);
    fillInvData(overviewData.investments);
}