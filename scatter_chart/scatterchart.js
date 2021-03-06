function scatterchart() {
    //Create scale functions
    var xScale = d3.scale.log().domain([1, d3.max(dataset, function (d) {
            return d.piece_count;
        })]).range([padding, w - padding]);
    var yScale = d3.scale.log().domain([1, d3.max(dataset, function (d) {
            return d.real_price;
        })]).range([h - padding, padding]);
    //Create axes
    var formatAsCurrency = d3.format("$g.2,");
    var formatAsNumber = d3.format(",f");

    function logFormatCurrency(d) {
        var x = Math.log(d) / Math.log(10) + 1e-6;
        return Math.abs(x - Math.floor(x)) < 0.7 ? formatAsCurrency(d) : "";
    }

    function logFormatNumber(d) {
        var x = Math.log(d) / Math.log(10) + 1e-6;
        return Math.abs(x - Math.floor(x)) < 0.7 ? formatAsNumber(d) : "";
    }

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(logFormatNumber);

    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(logFormatCurrency);

    //Create SVG element
    var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

    svg.selectAll("circle").data(dataset).enter().append("circle").attr("cx", function (d) {
            return xScale(d.piece_count);
        }).attr("cy", function (d) {
            return yScale(d.real_price);
        }).attr("r", 4).style("fill", function (d) {
            return color(d.theme_cat);
        }).on("mouseover", function (d) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(d.set_num + ": " + d.set_name + "<br/>PPP: " + formatAsCurrency(d.real_ppp)).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
        }).on("mouseout", function (d) {
            tooltip.transition().duration(500).style("opacity", 0);
        });
    // Draw Axis
    svg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", function (d) {
            return "rotate(-65)"
        });
    svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxis);

};
