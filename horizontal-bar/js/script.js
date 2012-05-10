var data = [
    { 'year': '1990', 'wizards': 5},
    { 'year': '1991', 'wizards': 17},
    { 'year': '1992', 'wizards': 22},
    { 'year': '1993', 'wizards': 12},
    { 'year': '1994', 'wizards': 30},
    { 'year': '1995', 'wizards': 9}
];

var svgWidth = 800,
    svgHeight = 600,
    topMargin = 10,
    bottomMargin = 20,
    leftMargin = 60,
    rightMargin = 60;

var numTicks = 5;

var x = d3.scale.linear()
    .domain([0, d3.max( data, function( d ) { return d.wizards; })])
    .range([0, svgWidth - (leftMargin + rightMargin)]);

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeBands([topMargin, svgHeight - bottomMargin], .5);

var chartTop = topMargin + y.rangeBand() / 2,
    chartBottom = svgHeight - y.rangeBand() / 2 - bottomMargin,
    chartLeft = leftMargin,
    chartRight = svgWidth - rightMargin;

// Vis
var vis = d3.selectAll('body')
  .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
  .append('g')
    .attr('id', 'barchart');

// Bars
var bars = vis.selectAll('g.bar')
    .data(data)
  .enter()
    .append('g')
    .attr('class', 'bar')
    .attr('transform', function(d, i) {
        return 'translate(0, ' + y(i) + ')'; // step through the ordinal domain, which is just a range going from 0 to data.length
    });

bars.append('rect')
    .attr('x', leftMargin)
    .attr('width', function(d) {
        return (x(d.wizards));
    })
    .attr('height', y.rangeBand());


// Labels
var labels = vis.selectAll('g.bar')
    .append('text')
    .attr('class', 'label')
    .attr('x', 0)
    .attr('text-anchor', 'right')
    .text(function(d) {
        return d.year;
    });

var bbox = labels.node().getBBox();
vis.selectAll('.label')
    .attr('transform', function(d) {
       return 'translate(0, ' + (y.rangeBand() / 2 + bbox.height / 4) +' )';
    });

labels = vis.selectAll('g.bar')
    .append('text')
    .attr('x', function(d) {
        return leftMargin + x(d.wizards);
    })
    .attr('dx', 5)
    .attr('y', (y.rangeBand() / 2 + bbox.height / 4))
    .attr('text-anchor', 'left')
    .text(function(d) {
        return d.wizards + '%';
    });


// Rules
var rules = vis.selectAll('g.rule')
    .data(x.ticks(numTicks))
  .enter()
    .append('g')
    .attr('transform', function(d) {
        return 'translate(' + (chartLeft + x(d)) + ')';
    });

rules.append('text')
    .attr('class', 'tick-label')
    .attr('text-anchor', 'middle')
    .attr('y', chartBottom)
    .text(function (d) {
        return d;
    });

bbox = vis.selectAll('.tick-label').node().getBBox();
vis.selectAll('.tick-label')
    .attr('transform', 'translate(0,' + bbox.height + ')');

rules.append('line')
    .attr('class', 'tick')
    .attr('y1', chartBottom)
    .attr('y2', chartBottom + 4);


// Axis
vis.append('line')
    .attr('class', 'axis')
    .attr('x1', chartLeft)
    .attr('x2', chartLeft)
    .attr('y1', chartTop)
    .attr('y2', chartBottom);

vis.append('line')
    .attr('class', 'axis')
    .attr('x1', chartLeft)
    .attr('x2', chartRight)
    .attr('y1', chartBottom)
    .attr('y2', chartBottom);



