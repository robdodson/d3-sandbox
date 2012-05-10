var data = d3.time.days(new Date(2012, 0, 1), new Date(2012, 0, 11));
var format = d3.time.format('%b %d')

var margin = {top: 40, right: 40, bottom: 40, left:40},
    width = 960,
    height = 500;

var x = d3.time.scale()
    .domain([data[0], data[data.length - 1]])
    .range([0, width - margin.left - margin.right]);

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([height - margin.top - margin.bottom, 0], 0.2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(format)
    .tickPadding(8);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart')
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.selectAll('.chart')
    .data([new Date(2012, 0, 2), new Date(2012, 0, 8)])
  .enter().append('circle')
    .attr('class', 'point')
    .attr('cx', function(d) { return x(d) + .5; }) // Add .5 to the x and y so it's forced to round to the next whole integer for crips edges
    .attr('cy', 300.5)
    .attr('r', 30);

svg.selectAll('text')
    .data([new Date(2012, 0, 2), new Date(2012, 0, 8)])
  .enter().append('text')
    .attr('class', 'label')
    .attr('x', function(d) { return x(d) + .5; })
    .attr('y', 300.5)
    .attr('dy', 4)
    .attr('text-anchor', 'middle') // text-align: right
    .text(format);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + y.rangeExtent()[1] + ')')
    .call(xAxis);
