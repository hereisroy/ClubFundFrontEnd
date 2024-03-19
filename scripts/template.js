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
        html += `<td class=${color}>${v.cvp}</td>`;
        color = parseFloat(v.cvi)<parseFloat(idealData.cvi)? 'red' : 'green';
        html += `<td class=${color}>${v.cvi}</td>`;
        color = parseFloat(v.nc)<parseFloat(idealData.nc)? 'red' : 'green';
        html += `<td class=${color}>${v.nc}</td>`;
        color = parseFloat(v.rpi)>parseFloat(idealData.rpi)? 'red' : 'green';
        html += `<td class=${color}>${v.rpi}</td>`;
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

function fillAllPrivateData(overviewData, publicData){
    fillMemberData(overviewData.current_member, publicData.ideal_member);
    fillOtherMembersData(overviewData.others_member_details, publicData.ideal_member);
    fillNetFundData(overviewData.net_fund_details);
    fillPortfolioData(overviewData.mutual_fund_details);
}