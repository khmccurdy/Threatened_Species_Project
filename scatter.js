function cleanNum(numString){
    return numString.replace(",","").replace("..","0")
}

d3.csv("data_cleanup/deforestation_cleanup.csv", (error, response)=>{
    if (error) console.warn(error);

    console.log(response);
    var totalSpecies = response.map(d=>+cleanNum(d.total));

    var protectedLand90 = response.map(d=>+cleanNum(d.protectedLand90));
    var protectedLand14 = response.map(d=>+cleanNum(d.protectedLand14));

    var deforestation90s = response.map(d=>+cleanNum(d.deforestation90s));
    var deforestation00s = response.map(d=>+cleanNum(d.deforestation00s));

    var trace1 = {
        x: protectedLand14,
        y: totalSpecies,
        mode:'markers'
    }

    var trace2 = {
        x: protectedLand90,
        y: totalSpecies,
        mode:'markers'
    }

    var trace3 = {
        x: deforestation90s,
        y: deforestation00s,
        marker:{
            color: totalSpecies,
            colorscale: [['0','#eeb'],['1','#300']]
        },
        mode:'markers'
    }

    var trace4 = {
        x: protectedLand90,
        y: protectedLand14,
        marker:{
            color: totalSpecies,
            colorscale: [['0','#eeb'],['1','#300']]
        },
        
        mode:'markers'
    }
    var data = [trace3];

    var layout = {};

    Plotly.newPlot('scatterplot',data,layout)
    // Plotly.animate('scatterplot',{data:[trace1]})
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

    var data3d = [trace5, trace6];
    var layout3d = {};

    Plotly.newPlot('3d',data3d,layout3d);
    // Plotly.animate('3d',{data:[trace6]},);
})