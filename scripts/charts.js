const loadGCharts = new Promise((resolve, reject) => {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
        resolve();
    });
});

function drawChartForIdealContribution(publicData){
    var table = new google.visualization.DataTable();
    table.addColumn('date', 'Investment Date');
    table.addColumn('number', 'Ideal');
    let idealData = publicData.ideal_member;
    let invList = idealData.investment_wise_nc; 
    let invCount = invList.length;
    let hMin = new Date(invList[0].investment_date);
    let hMax = new Date(publicData.latest_nav_date);
    let vMax = parseFloat(publicData.max_nc);
    let pointAnimationDuration = 3000;
    let animationDurationPerPoint = pointAnimationDuration/invCount;
    var options = {
        pointSize: 5,
        animation:{
            startup: true,
            duration: animationDurationPerPoint/2,
            easing: 'in'
        },
        hAxis: { 
            viewWindow: {
                min: hMin,
                max: hMax
              }  
        },
        vAxis: {
            viewWindow: {
              min: 0,
              max: vMax
            }
        }, 
        legend: 'none',
        series: {
            0: { color: '#037ffc' }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('ideal-vs-member-chart'));
    chart.draw(table, options);
    function addPoint(i){
        if(i===invCount){
            table.addRow([new Date(publicData.latest_nav_date), parseFloat(idealData.nc)]);
            chart.draw(table, options);
        } else {
            table.addRow([new Date(invList[i].investment_date), parseFloat(invList[i].net_contribution)]);
            chart.draw(table, options);
            setTimeout(()=>{
                addPoint(i+1);
            }, animationDurationPerPoint);
        }
    }
    addPoint(0);
    $(window).on("resize", ()=>{ chart.draw(table, options); }); 
    return chart;
}

function prepareChartForBoth(publicData){ 
    let chartPromise = new Promise((resolve, reject)=>{
        let hMin = new Date(publicData.ideal_member.investment_wise_nc[0].investment_date);
        let hMax = new Date(publicData.latest_nav_date);
        let vMax = parseFloat(publicData.max_nc);

        var table = new google.visualization.DataTable();
        table.addColumn('date', 'Investment Date');
        table.addColumn('number', 'Ideal');

        var options = {
            hAxis: { 
                viewWindow: {
                    min: hMin,
                    max: hMax
                }  
            },
            vAxis: {
                viewWindow: {
                min: 0,
                max: vMax
                }
            }, 
            legend: 'none',
        };

        var chart = new google.visualization.LineChart(document.getElementById('ideal-vs-member-chart'));
        chart.draw(table, options);
        let event = google.visualization.events.addListener(chart, 'ready', ()=>{
                resolve(chart);
                google.visualization.events.removeListener(event);
        });
        chart.draw(table, options); // intentional double drawing for UI reasons
    })

    return chartPromise;
}

function drawChartForBoth(chart, memberData, publicData){
    let memberNCList = memberData.investment_wise_nc;
    let idealData = publicData.ideal_member;
    let idealNCList = idealData.investment_wise_nc; 
    let invCount = idealNCList.length;
    let hMin = new Date(idealNCList[0].investment_date);
    let hMax = new Date(publicData.latest_nav_date);
    let vMax = parseFloat(publicData.max_nc);
    let pointAnimationDuration = 3000;
    let animationDurationPerPoint = pointAnimationDuration/invCount;
    let memberNCColor = '#5beb34';
    if(idealData.nc>memberData.nc) memberNCColor = 'tomato';

    var table = new google.visualization.DataTable();
    table.addColumn('date', 'Investment Date');
    table.addColumn('number', 'Ideal');
    table.addColumn('number', memberData.name); 

    var options = {
        pointSize: 5,
        animation:{
            startup: true,
            duration: animationDurationPerPoint/2,
            easing: 'linear'
        },
        hAxis: { 
            viewWindow: {
                min: hMin,
                max: hMax
            }  
        },
        vAxis: {
            viewWindow: {
            min: 0,
            max: vMax
            }
        }, 
        legend: 'none',
        series: {
            0: { color: '#037ffc' },
            1: { color: memberNCColor }
        }
    };

    chart.draw(table, options);
    function addPoint(i){
        if(i==invCount){
            table.addRow([new Date(publicData.latest_nav_date), parseFloat(idealData.nc), parseFloat(memberData.nc)]);
            chart.draw(table, options);
            return;
        } else {
            table.addRow([new Date(idealNCList[i].investment_date), parseFloat(idealNCList[i].net_contribution), parseFloat(memberNCList[i].net_contribution)]);
            chart.draw(table, options);
            setTimeout(()=>{
                addPoint(i+1);
            }, animationDurationPerPoint);
        }
    }
    addPoint(0);
    $(window).on("resize", ()=>{ chart.draw(table, options); }); 
}

function drawChartForBothAfterLogin(chart, memberData, publicData){
    let memberNCList = memberData.investment_wise_nc;
    let idealData = publicData.ideal_member;
    let idealNCList = idealData.investment_wise_nc; 
    let invCount = idealNCList.length;
    let hMin = new Date(idealNCList[0].investment_date);
    let hMax = new Date(publicData.latest_nav_date);
    let vMax = parseFloat(publicData.max_nc);
    let pointAnimationDuration = 3000;
    let animationDurationPerPoint = pointAnimationDuration/invCount;
    let memberNCColor = '#5beb34';
    if(idealData.nc>memberData.nc) memberNCColor = 'tomato';

    var table = new google.visualization.DataTable();
    table.addColumn('date', 'Investment Date');
    table.addColumn('number', 'Ideal');
    table.addColumn('number', memberData.name); 
    for(var i=0;i<invCount;i++) table.addRow([new Date(idealNCList[i].investment_date), parseFloat(idealNCList[i].net_contribution), null]);
    table.addRow([hMax, parseFloat(idealData.nc), null]);
    console.log(table);

    var options = {
        pointSize: 5,
        hAxis: { 
            viewWindow: {
                min: hMin,
                max: hMax
            }  
        },
        vAxis: {
            viewWindow: {
            min: 0,
            max: vMax
            }
        }, 
        legend: 'none',
        series: {
            0: {
                color: '#037ffc' 
            },
            1: { 
                color: memberNCColor,
                animation:{
                    startup: true,
                    duration: animationDurationPerPoint/2,
                    easing: 'linear'
                },
             }
        }
    };

    chart.draw(table, options);
    function addPoint(i){
        if(i==invCount){
            table.setCell(i, 2, parseFloat(memberData.nc));
            chart.draw(table, options);
            return;
        } else {
            table.setCell(i, 2, parseFloat(memberNCList[i].net_contribution));
            chart.draw(table, options);
            setTimeout(()=>{
                addPoint(i+1);
            }, animationDurationPerPoint);
        }
    }
    addPoint(0);
    $(window).on("resize", ()=>{ chart.draw(table, options); }); 
}