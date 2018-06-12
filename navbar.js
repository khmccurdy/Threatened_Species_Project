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

var iconSize = 50;
var trDuration = 200;

// Select navbar svg element
var $svg = d3.select("#navbar").select("svg");

var navWidth = parseInt($svg.style("width"));
var navHeight = parseInt($svg.style("height"));

var $topButtons = $svg.select("#top-buttons");
var $subButtons = $svg.select("#sub-buttons");

// Load top buttons
loadMainButtons();

function loadMainButtons(){
    var totalIcons = Object.keys(menuStructure).length;
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
        // main button element
        var $button = $topButtons.append("g")
            .attr("id", `${option}-button`)
            .attr("transform", `translate(${xPos} 0)`)
            .attr("fill", "grey");

        // Dummy variables to store default transform and color options
        $button.attr("default-transform", $button.attr("transform"))
            .attr("base-color", $button.attr("fill"))
            .attr("hover-color", "black")

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
            // if (typeof menuStructure[option]=="object"){
            //     $topButtons.transition().duration(trDuration)
            //         .attr("transform", `translate(0 ${yTop})`);
            // }
        })

        // Mouseover (scale up slightly, change color)
        $button.on("mouseover", function(){
            let $me = d3.select(this)
            $me.transition()
                .duration(trDuration)
                .attr("transform", $me.attr("default-transform")+" scale(1.2)")
                .attr("fill", $me.attr("hover-color"))
        })
        // Mouseout (scale back down, revert color)
        $button.on("mouseout", function(){
            let $me = d3.select(this)
            $me.transition()
                .duration(trDuration)
                .attr("transform", $me.attr("default-transform"))
                .attr("fill", $me.attr("base-color"))
        })
        // increment i for next icon's x
        i++;
    }
}