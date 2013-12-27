function insertPie(selector, w, h, allocation) {
    var el = window.document.querySelector(selector),
    rToEdge = Math.min(w, h) / 2,
    shadow = 10,
    r = rToEdge - shadow,
    gradients = [
        ["#70c046", "#ace98c"],
        ["#b847af", "#f369e8"],
        ["#2293bb", "#6ac9ea"],
        ["#ebab17", "#f4cf66"],
        ["#5d4ef9", "#8c81ff"],
        ["#dc570e", "#ff7e00"],
        ["#a57005", "#daa73e"],
        ["#e19e7d", "#ffc8ad"],
        ["#ef45a8", "#ff7bc7"],
        ["#b8124a", "#f7296c"],
        ["#065190", "#1a72bd"],
        ["#296c30", "#52a95b"]],
        slices = d3.layout.pie()(allocation),
        arc = d3.svg.arc()
        .startAngle(function(d) { return d.startAngle; })
        .endAngle(function(d) { return d.endAngle; })
        .innerRadius(0)
        .outerRadius(r);

        var vis = d3.select(el)
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
        var defs = vis.append("svg:defs");
        //Define our color gradients
        for (var i=0,l=gradients.length;i<l;i++) {
            var gradientColors = gradients[i];
            var gradient = defs.append("svg:radialGradient")
            .attr("id", "grad-"+i)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", r);
            gradient.append("svg:stop")
            .attr("offset", 0)
            .attr("stop-color", gradientColors[1]);
            gradient.append("svg:stop")
            .attr("offset", .3)
            .attr("stop-color", gradientColors[1]);
            gradient.append("svg:stop")
            .attr("offset", 1)
            .attr("stop-color", gradientColors[0]);
        }
        //Define our drop shadow
        var shadow = defs.append("svg:radialGradient")
        .attr("id", 'pie-shadow')
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", rToEdge);
        var nStops = 5, beginGradient = 1 - r / (rToEdge * 4);
        for (var i = 0; i < nStops; i++) {
            var stopLocation = beginGradient + (1 - beginGradient) * (i + 1) / nStops;
            shadow.append("svg:stop")
            .attr("offset", stopLocation)
            .attr("stop-color", "#000")
            .attr("stop-opacity", i && 10 * (stopLocation - 1) * (stopLocation - 1));
        }

        //Create our shadow
        vis.append("svg:circle")
        .attr("r", rToEdge)
        .style("fill", "url(#pie-shadow)");

        //Build Pie
        vis.selectAll("path").data(slices)
        .enter().append("svg:path")
        .attr("d", arc)
        .style("fill", function(d, i) { return "url(#grad-"+i+")"; });
        return el;
};

insertPie("#Viewport", 200, 200, ".4,.3,.2,.1");
