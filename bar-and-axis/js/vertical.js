var data = [1, 1, 2, 3, 5, 8]

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

var x = d3.scale.ordinal()
    .domain(d3.range(data.length)) 
    .rangeRoundBands([0, width - margin.left - margin.right], 0.2);

var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, height - margin.top - margin.bottom]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickPadding(8)
    .tickSize(0)

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickPadding(8)

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart')
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.selectAll('.chart')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d, i) { return x(i); })
    .attr('y', function(d) { return height - margin.top - margin.bottom - y(d); })
    .attr('height', y)
    .attr('width', x.rangeBand());

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis)
  .selectAll('text')
    .text(function(d) { return String.fromCharCode(d + 65); });

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

