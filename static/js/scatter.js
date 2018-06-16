function cleanNum(numString){
    return numString.replace(",","").replace("..","0")
}
function log(n){
    return Math.log(n+1);
}

d3.csv("static/data/deforestation_cleanup.csv", (error, response)=>{
    if (error) console.warn(error);

    console.log(response);
    var totalSpecies = response.map(d=>+cleanNum(d.total));

    var mammals = response.map(d=>+cleanNum(d.mammals));
    var birds = response.map(d=>+cleanNum(d.birds));
    var fish = response.map(d=>+cleanNum(d.fish));
    var plants = response.map(d=>+cleanNum(d.plants));

    var protectedLand90 = response.map(d=>+cleanNum(d.protectedLand90));
    var protectedLand14 = response.map(d=>+cleanNum(d.protectedLand14));

    var protectedMarine14 = response.map(d=>+cleanNum(d.protectedMarine14));

    var deforestation90s = response.map(d=>+cleanNum(d.deforestation90s));
    var deforestation00s = response.map(d=>+cleanNum(d.deforestation00s));

    var countries = response.map(d=>d.country)

    var trace1 = {
        x: protectedLand14,
        y: totalSpecies,
        xlabel: "Protected Land (2014)",
        ylabel: "Total Threatened Species (2016)",
        mode:'markers'
    }

    var trace2 = {
        x: protectedLand90,
        y: totalSpecies,
        xlabel: "Protected Land (1990)",
        ylabel: "Total Threatened Species (2016)",
        mode:'markers'
    }

    var trace3 = {
        x: deforestation90s,
        y: deforestation00s,
        xlabel: "Deforestation ('90-'00)",
        ylabel: "Deforestation ('00-'15)",
        marker:{
            color: totalSpecies,
            colorscale: [['0','#eeb'],['1','#300']]
        },
        mode:'markers'
    }

    var trace4 = {
        x: protectedLand90,
        y: protectedLand14,
        xlabel: "Protected Land (1990)",
        ylabel: "Protected Land (2014)",
        marker:{
            color: totalSpecies,
            colorscale: [['0','#eeb'],['1','#300']]
        },
        
        mode:'markers'
    }
    var data = [trace2];
    // var dataByOrder = [
    //     {x:protectedLand14,y:mammals.map(log),mode:"markers"},
    //     {x:protectedLand14,y:birds.map(log),mode:"markers"},
    //     {x:protectedLand14,y:plants.map(log),mode:"markers"},
    //     {x:protectedLand14,y:fish.map(log),mode:"markers"},
    // ]
    var dataByOrder = [
        {y:mammals,name:"Mammals",marker:{color:'red'}},
        {y:birds,name:"Birds",marker:{color:'orange'}},
        {y:fish,name:"Fish",marker:{color:'blue'}},
        {y:plants,name:"Plants",marker:{color:'green'}},
    ]
    for (var i in dataByOrder){
        dataByOrder[i].x=protectedLand14;
        dataByOrder[i].text=countries;
        dataByOrder[i].mode="markers";
    }

    var layout = {
        width: window.innerWidth,
        xaxis: {title: data[0].xlabel},
        yaxis: {title: data[0].ylabel, type:'log'},
    };

    Plotly.newPlot('scatterplot',dataByOrder,layout)
    // Plotly.animate('scatterplot',{data:[trace1]},{transition:{duration:500}})
    console.log(protectedLand14);

    var trace5 = {
        x: protectedLand90,
        y: deforestation90s,
        z: totalSpecies,
        marker:{
            size: 5,
            opacity: 0.5,
        },
        type: 'scatter3d',
        mode: 'markers',
    }
    var trace6 = {
        x: protectedLand14,
        y: deforestation00s,
        z: totalSpecies,
        type: 'scatter3d',
        marker: trace5.marker,
        mode: 'markers',
    }
    var trace7 = {
        x: protectedLand14,
        y: protectedMarine14,
        z: totalSpecies,
        type: 'scatter3d',
        marker: trace5.marker,
        mode: 'markers',
    }

    // var data3d = [trace5, trace6];
    var data3d =[trace7]
    var layout3d = {};

    Plotly.newPlot('3d',data3d,layout3d);
    // Plotly.animate('3d',{data:[trace6]},);
})