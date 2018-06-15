// Hierarchy of menu items

var menu = {
    animals: {
        // children:["mammals","fish","birds","plants"],
        iconScale: .083,
        iconLink: "globe",
        // [normal color, hover color, use stroke]
        colors: ['#292','#070',false], 
        graphID: "#map",
        label: "By Country",
    },
    years: {
        // children:[2000,1012,111,3],
        iconScale: .1,
        iconLink: 'clock',
        colors: ['grey','black',true],
        graphID: "#chart-container",
        label: "Year-By-Year",
    },
    protected: {
        iconScale: 0.5,
        iconLink: "epa",
        graphID: "#scatterplot",
        label: "Protected Land"
    },
    summary: {
        graphID: "", // the scatterplot
        label: "Summary",
    },
}
// @Incomplete: structure object for animal groups?
var iconSize = 50;
var trDuration = 200;
var hoverScale = 1.08;

// Select navbar svg element
var $svg = d3.select("#navbar").select("svg");

var navWidth = parseInt($svg.style("width"));
var navHeight = parseInt($svg.style("height"));

var $topButtons = $svg.select("#top-buttons");
var $subButtons = $svg.select("#sub-buttons");

var totalIcons = Object.keys(menu).length;

// Load top buttons
loadMainButtons();

function loadMainButtons(){
    // i used to calculate x positions
    var xIndex = 0;
    // Define y position
    let yMid = navHeight * 0.4;
    // let yMid = navHeight/2;
    // let yTop = navHeight/3;
    // let yLow = 2*navHeight/3;

    $topButtons.attr("transform", `translate(0 ${yMid})`)
    // Loop through top-level menu items
    for (var option in menu){
        let mo = menu[option];
        // calculate x position so that icons are evenly spaced
        // @Volatile - menu Object may be unordered
        let xPos = navWidth/(totalIcons+1)*(xIndex+1);
        let spacing = navWidth/(totalIcons+1)

        let colors = mo.colors;
        // set base and hover colors
        let baseColor = colors?colors[0]:"grey";
        let hoverColor = colors?colors[1]:"black";
        let hasStroke = colors?colors[2]:false;
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
        let scale = mo.iconScale;
        if (!scale) scale=0.5;

        // Add icon graphic from external svg file
        var iconPath = mo.iconLink?`icons/${mo.iconLink}.svg#main`:`SVG_logo.svg#main`;
        $button.append("use")
            .attr("href", iconPath)
            .attr("transform", `translate(${-iconSize/2} ${-iconSize/2}) scale(${scale})`)
        // Add text label below icon
        $button.append("text")
            .text(mo.label)
            .attr("y", iconSize*0.8)
            .attr("stroke-width", 0)
            .attr("text-anchor", "middle")
            .classed("menu-icon-text", true)
        // Allows text wrapping on small screens, but more troublesome:
        // $button.append("foreignObject")
        //     .attr("width", spacing)
        //     .attr("height", 80)
        //     .attr("x", -spacing/2)
        //     .attr("y", iconSize*0.6)
        //     .classed("menu-icon-text", true)
        //     .html(`<p style="margin:0px">${mo.label}</p>`)

        $button.on("click", function() {
            d3.selectAll(".graph-div").style("display","none")
            d3.select(mo.graphID).style("display","block")

            // if (mo.children){
            //     $topButtons.transition().duration(trDuration)
            //         .attr("transform", `translate(0 ${yTop})`);
            // } else {

        })

        // Mouseover (scale up slightly, change color)
        $button.on("mouseover", function(){
            let $me = d3.select(this)
            $me.transition()
                .duration(trDuration)
                .attr("transform", $me.attr("default-transform")+` scale(${hoverScale})`)
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
        xIndex++;
    }
}

d3.select(window).on("resize", ()=>{
    navWidth = parseInt($svg.style("width"));
    $topButtons.selectAll("g").data(d3.range(totalIcons).map(i=>navWidth/(totalIcons+1)*(i+1)))
        .attr("transform", d=>`translate(${d} 0)`)
        .attr("default-transform", d=>`translate(${d} 0)`)
})