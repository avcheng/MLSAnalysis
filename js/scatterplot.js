var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 750 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var svg_gk = d3.select("#scatterplot-gk")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// append the svg object to the body of the page
var svg_df = d3.select("#scatterplot-df")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var svg_mf = d3.select("#scatterplot-mf")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var svg_fw = d3.select("#scatterplot-fw")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

plt_scatter(svg,"data/groupings_all_2019_edited.csv", [-20000,30000],[-4000, 8500])
plt_scatter(svg_gk,"data/groupings_gk_2019.csv", [-600,600],[-300, 300])
plt_scatter(svg_df,"data/groupings_df_2019.csv", [-15000,30000],[-4000, 5500])
plt_scatter(svg_mf,"data/groupings_mf_2019.csv", [-15000,30000],[-4000, 8500])
plt_scatter(svg_fw,"data/groupings_fw_2019.csv", [-15000,30000],[-5000, 6000])


function plt_scatter(svg, csvdata, xdomain, ydomain) {\\\\\\\
    d3.csv(csvdata, function(error, data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain(xdomain)
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain(ydomain)
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var color = d3.scaleOrdinal()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .range([ "#440154ff", "#21908dff", "#fde725ff", "#FF5733", "#909497",
                "#34495E", "#6C3483", "#FAE5D3", "#FFC300", "#909497"])

        // console.log(data[0])

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.x); } )
            .attr("cy", function (d) { return y(d.y); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.cluster) } )

            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('100')
                    .attr("r", 5);
                div.transition()
                    .duration(100)
                    .style("opacity", 1);
                div.html(d.Player + " ("  +  d.cluster + ")")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('200')
                    .attr("r", 5);
                div.transition()
                    .duration('200')
                    .style("opacity", 0);
            });

    })
}
