var data = [1, 1, 2, 3, 5, 8]

var margin = {top: 40, right: 40, bottom: 40, left:40},
    width = 960,
    height = 500;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width - margin.left - margin.right]);

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([height - margin.top - margin.bottom, 0], 0.2);

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
    .data([1])
  .enter().append('circle')
    .attr('class', 'point')
    .attr('cx', function(d) { return x(d) + .5; }) // Add .5 to the x and y so it's forced to round to the next whole integer for crips edges
    .attr('cy', 300.5)
    .attr('r', 30);

svg.selectAll('text')
    .data([1])
  .enter().append('text')
    .attr('class', 'label')
    .attr('x', function(d) { return x(d) + .5; })
    .attr('y', 300.5)
    .attr('dy', 4)
    .attr('text-anchor', 'middle') // text-align: right
    .text(String);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + y.rangeExtent()[1] + ')')
    .call(xAxis);

// $( function() {

//     var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];

//     var chart = d3.select( 'body' ).append( 'svg' )
//         .attr( 'class', 'chart' )
//         .attr( 'width', 500 )
//         .attr( 'height', 500 )
//         .append( 'g' );

//     var y = d3.scale
//         .quantize()
//         .domain([0, 100])
//         .range([0, 5, 10, 20]);

//     console.log(y(24));
//     console.log(y(25));
//     console.log(y(26));
//     console.log(y(74));

// } );
