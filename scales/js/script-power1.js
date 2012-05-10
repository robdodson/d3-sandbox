var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var exponent = 2;

var margin = {top: 40, right: 40, bottom: 40, left:40},
    width = 960,
    height = 500;

var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width - margin.left - margin.right]);

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([height - margin.top - margin.bottom, 0], 0.2);

var p = d3.scale.pow().exponent(exponent)

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickPadding(8);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart')
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.selectAll('.chart')
    .data(data)
  .enter().append('circle')
    .attr('class', 'point')
    .attr('cx', function(d) { return x(p(d)) + .5; }) // Add .5 to the x and y so it's forced to round to the next whole integer for crips edges
    .attr('cy', 300.5)
    .attr('r', 20);

svg.selectAll('text')
    .data(data)
  .enter().append('text')
    .attr('class', 'label')
    .attr('x', function(d) { return x(p(d)) + .5; })
    .attr('y', 300.5)
    .attr('dy', 4)
    .attr('text-anchor', 'middle') // text-align: right
    .text(String);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + y.rangeExtent()[1] + ')')
    .call(xAxis);
