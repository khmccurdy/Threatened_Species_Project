// Hierarchy of menu items
var menuStructure = {
    animals: ["mammals","fish","birds","plants"],
    years: [2000,1012,111,3],
    status: ["extinct","critical","endangered"],
    other: ["scatter plot","year graph"],
};
// Scale for specific menu icons
var iconScale = {
    animals: .5,
    years: .1,
}

var iconLink = {
    years: 'clock',
}

// [normal color, hover color, use stroke]
var colors = {
    animals: ['green','yellow',false],
    years: ['grey','black',true]
}


var iconSize = 50;
var trDuration = 200;

// Select navbar svg element
var $svg = d3.select("#navbar").select("svg");

var navWidth = parseInt($svg.style("width"));
var navHeight = parseInt($svg.style("height"));

var $topButtons = $svg.select("#top-buttons");
var $subButtons = $svg.select("#sub-buttons");

var totalIcons = Object.keys(menuStructure).length;

// Load top buttons
loadMainButtons();

function loadMainButtons(){
    // i used to calculate x positions
    var i = 0;
    // Define y position
    let yMid = navHeight/2;
    let yTop = navHeight/3;
    let yLow = 2*navHeight/3;

    $topButtons.attr("transform", `translate(0 ${yMid})`)
    // Loop through top-level menu items
    for (var option in menuStructure){
        // calculate x position so that icons are evenly spaced
        // @Volatile - menu Object may be unordered
        let xPos = navWidth/(totalIcons+1)*(i+1);
        let baseColor = colors[option]?colors[option][0]:"grey";
        let hoverColor = colors[option]?colors[option][1]:"black";
        let hasStroke = colors[option]?colors[option][2]:false;
        // main button element
        var $button = $topButtons.append("g")
            .attr("id", `${option}-button`)
            .attr("transform", `translate(${xPos} 0)`)
            .attr("fill", baseColor)
            .attr("stroke", hasStroke?baseColor:"")

        // Dummy variables to store default transform and color options
        $button.attr("default-transform", $button.attr("transform"))
            .attr("base-color", baseColor)
            .attr("hover-color", hoverColor)
            .attr("use-stroke", hasStroke?1:0)

        // Set scale, deafault 0.5
        let scale = iconScale[option];
        if (!scale) scale=0.5;

        // Add actual icon graphic
        var iconPath = iconLink[option]?`icons/${iconLink[option]}.svg#main`:`SVG_logo.svg#main`;
        $button.append("use")
            // .attr("href", `SVG_logo.svg#main`) // @Placeholder
            .attr("href", iconPath)
            // .attr("href", `icons/${option}.svg`)
            .attr("transform", `translate(${-iconSize/2} ${-iconSize/2}) scale(${scale})`)

        $button.on("click", function() {
            // d3.selectAll(".graph-div").style("visibility","hidden")
            // d3.select(graphIDs[option]).style("visibility","visible")

            // if (typeof menuStructure[option]=="object"){
            //     $topButtons.transition().duration(trDuration)
            //         .attr("transform", `translate(0 ${yTop})`);
            // } else {

        })

        // Mouseover (scale up slightly, change color)
        $button.on("mouseover", function(){
            let $me = d3.select(this)
            $me.transition()
                .duration(trDuration)
                .attr("transform", $me.attr("default-transform")+" scale(1.2)")
                .attr("fill",   $me.attr("hover-color"))
                .attr("stroke", $me.attr("use-stroke")==1?$me.attr("hover-color"):"")
        })
        // Mouseout (scale back down, revert color)
        $button.on("mouseout", function(){
            let $me = d3.select(this)
            $me.transition()
                .duration(trDuration)
                .attr("transform", $me.attr("default-transform"))
                .attr("fill",   $me.attr("base-color"))
                .attr("stroke", $me.attr("use-stroke")==1?$me.attr("base-color"):"")
        })
        // increment i for next icon's x
        i++;
    }
}

d3.select(window).on("resize", ()=>{
    navWidth = parseInt($svg.style("width"));
    $topButtons.selectAll("g").data(d3.range(totalIcons).map(i=>navWidth/(totalIcons+1)*(i+1)))
        .attr("transform", d=>`translate(${d} 0)`)
        .attr("default-transform", d=>`translate(${d} 0)`)
})