var data = [1, 1, 2, 3, 5, 8]

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

var y = d3.scale.ordinal()
    .domain(d3.range(data.length)) // if you pass in a start and end date will it interpolate? I think you'd have to use a time scale...
    .rangeRoundBands([height - margin.top - margin.bottom, 0], 0.2);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickPadding(8);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'bar chart')
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);