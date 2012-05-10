$( function() {

    var data = [4, 8, 15, 16, 23, 42];
    var chart = d3.select( 'body' ).append( 'div' )
        .attr( 'class', 'chart' );
    var xScaleFn = d3.scale.linear()
        .domain( [0, d3.max( data )] )
        .range( ['0px', '420px'] );

    chart.selectAll( 'div' )
        .data( data )
        .enter().append( 'div' )
        .style( 'width', xScaleFn )
        .text( String );

} );
