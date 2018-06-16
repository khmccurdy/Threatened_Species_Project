function cleanNum(numString){
    return numString.replace(",","").replace("..","0")
}
// function log(n){
//     return Math.log(n+1);
// }
var xAxisSelect = [0,0]

d3.csv("static/data/deforestation_cleanup.csv", (error, response)=>{
    if (error) console.warn(error);

    console.log(response);
    var totalSpecies = response.map(d=>+cleanNum(d.total));

    var mammals = response.map(d=>+cleanNum(d.mammals));
    var birds = response.map(d=>+cleanNum(d.birds));
    var fish = response.map(d=>+cleanNum(d.fish));
    var plants = response.map(d=>+cleanNum(d.plants));
    var total = response.map(d=>+cleanNum(d.total));

    var protectedLand90 = response.map(d=>+cleanNum(d.protectedLand90));
    var protectedLand14 = response.map(d=>+cleanNum(d.protectedLand14));

    var protectedMarine90 = response.map(d=>+cleanNum(d.protectedMarine90));
    var protectedMarine14 = response.map(d=>+cleanNum(d.protectedMarine14));

    var deforestation90s = response.map(d=>+cleanNum(d.deforestation90s));
    var deforestation00s = response.map(d=>+cleanNum(d.deforestation00s));

    var countries = response.map(d=>d.country)

    // var trace1 = {
    //     x: protectedLand14,
    //     y: totalSpecies,
    //     xlabel: "Protected Land (2014)",
    //     ylabel: "Total Threatened Species (2016)",
    //     mode:'markers'
    // }

    // var trace2 = {
    //     x: protectedLand90,
    //     y: totalSpecies,
    //     xlabel: "Protected Land (1990)",
    //     ylabel: "Total Threatened Species (2016)",
    //     mode:'markers'
    // }

    // var trace3 = {
    //     x: deforestation90s,
    //     y: deforestation00s,
    //     xlabel: "Deforestation ('90-'00)",
    //     ylabel: "Deforestation ('00-'15)",
    //     marker:{
    //         color: totalSpecies,
    //         colorscale: [['0','#eeb'],['1','#300']]
    //     },
    //     mode:'markers'
    // }

    // var trace4 = {
    //     x: protectedLand90,
    //     y: protectedLand14,
    //     xlabel: "Protected Land (1990)",
    //     ylabel: "Protected Land (2014)",
    //     marker:{
    //         color: totalSpecies,
    //         colorscale: [['0','#eeb'],['1','#300']]
    //     },
        
    //     mode:'markers'
    // }
    // var data = [trace2];
    // var dataByOrder = [
    //     {x:protectedLand14,y:mammals.map(log),mode:"markers"},
    //     {x:protectedLand14,y:birds.map(log),mode:"markers"},
    //     {x:protectedLand14,y:plants.map(log),mode:"markers"},
    //     {x:protectedLand14,y:fish.map(log),mode:"markers"},
    // ]
    var dataByOrder = [
        {y:mammals,name:"Mammals",marker:{color:colorPalette.red}},
        {y:birds,name:"Birds",marker:{color:colorPalette.orange}},
        {y:fish,name:"Fish",marker:{color:colorPalette.blue}},
        {y:plants,name:"Plants",marker:{color:colorPalette.green}},
        {y:total,name:"Total",marker:{color:'rgba(0,0,0,.4)'}},
    ]
    for (var i in dataByOrder){
        dataByOrder[i].x=protectedLand14;
        dataByOrder[i].text=countries;
        dataByOrder[i].mode="markers";
    }

    var layout = {
        width: window.innerWidth*0.98,
        height: 500,
        title: "Conservation Efforts vs. Threatened Species by Country",
        // xaxis: {title: "Protected Land (%)"},
        xaxis: {autorange: true},
        yaxis: {title: "Threatened Species (2016)", type:'log'},
    };

    Plotly.newPlot('scatterplot',dataByOrder,layout)
    // Plotly.animate('scatterplot',{data:[trace1]},{transition:{duration:500}})

    const textNormal = "rgba(0,0,0,.5)";
    const textHover = "black"
    d3.select('#scatterplot svg').selectAll(".xLabelBtn")
        .data([
            ["Protected Land (%)",0],
            ["Protected Ocean (%)",0],
            ["Annual Deforestation (%)",0],
            ["2014",1],
            ["1990",1],
        ])
        .enter()
        .append("text")
        .classed("xLabelBtn",true)
        .attr("x",d=>d[1]?"50%":"45%")
        .attr("y",(d,i)=>layout.height-50+i%3*15)
        .attr("text-anchor",d=>d[1]?"start":"end")
        .text(d=>d[0])
        .style("pointer-events","all")
        .attr("selected",0)
        .attr('fill',textNormal)
        .on("mouseover",function(){
            d3.select(this).transition().duration(200).attr('fill',textHover);
        })
        .on("mouseout",function(){
            if (d3.select(this).attr("selected")==0){
                d3.select(this).transition().duration(200).attr('fill',textNormal)
            }
        })
        .on("click", function(d,i){
            // d3.selectAll('#scatterplot .xLabelBtn').attr("selected",0)
            var oldSelector = xAxisSelect[0]*2+xAxisSelect[1];
            xAxisSelect[d[1]]=i%3;
            updateXButtons();
            // d3.select(this).attr("selected",1)
            // console.log(xAxisSelect);
            var newX;
            var selector = xAxisSelect[0]*2+xAxisSelect[1];
            if (selector==oldSelector){
                return;
            }
            // console.log(selector);
            // console.log(xAxisSelect)
            switch (selector) {
                case 0: // 0,0
                newX=protectedLand90;
                break;
                case 1: // 0,1
                newX=protectedLand14;
                break;
                case 2: // 1,0
                newX=protectedMarine90;
                break;
                case 3: // 1,1
                newX=protectedMarine14;
                break;
                case 4: // 2,0
                newX=deforestation90s;
                break;
                case 5: // 2,1
                newX=deforestation00s;
                break;
                default:
                newX=protectedLand90;
                console.warn("something went wrong w/ x axis selector!")
                break;
            }
            let newRange = d3.extent(newX)
            Plotly.animate('scatterplot',{
                data:Array(5).fill({x:newX}),
                layout:{xaxis: {range: [newRange[0]-2,newRange[1]+2]}}
            })
            console.log(newX);
        })
        updateXButtons();

        function updateXButtons(){
            d3.selectAll('#scatterplot .xLabelBtn')
            .attr("selected",(d,i)=>{
                if (i<3){
                    return xAxisSelect[0]==i?1:0;
                } else {
                    return xAxisSelect[1]==i-3?1:0;
                }
            })
            .attr("fill",(d,i)=>{
                if (i<3){
                    return xAxisSelect[0]==i?textHover:textNormal;
                } else {
                    return xAxisSelect[1]==i-3?textHover:textNormal;
                }
            })
        }
        // .attr()
    // Plotly.animate('scatterplot',{data:[{x:protectedLand90}],layout})

    // console.log(protectedLand14);

    // var trace5 = {
    //     x: protectedLand90,
    //     y: deforestation90s,
    //     z: totalSpecies,
    //     marker:{
    //         size: 5,
    //         opacity: 0.5,
    //     },
    //     type: 'scatter3d',
    //     mode: 'markers',
    // }
    // var trace6 = {
    //     x: protectedLand14,
    //     y: deforestation00s,
    //     z: totalSpecies,
    //     type: 'scatter3d',
    //     marker: trace5.marker,
    //     mode: 'markers',
    // }
    // var trace7 = {
    //     x: protectedLand14,
    //     y: protectedMarine14,
    //     z: totalSpecies,
    //     type: 'scatter3d',
    //     marker: trace5.marker,
    //     mode: 'markers',
    // }

    // // var data3d = [trace5, trace6];
    // var data3d =[trace7]
    // var layout3d = {};

    // Plotly.newPlot('3d',data3d,layout3d);
    // Plotly.animate('3d',{data:[trace6]},);
})