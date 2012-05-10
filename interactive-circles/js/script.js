$( function() {

    var data = [];
    for ( var i = 0; i < 1000; i++ ) {
        data.push( { 'x': Math.random(), 'y': Math.random() } )
    }

    var h = document.documentElement.clientHeight;

    var chart = d3.select( 'body' ).append( 'svg' )
        .attr( 'class', 'chart' )
        .attr( 'width', document.documentElement.clientWidth )
        .attr( 'height', document.documentElement.clientHeight );

    var x = d3.scale.linear()
            .domain( [0, 1] )
            .range( [document.documentElement.clientWidth / 2 - 400, document.documentElement.clientWidth / 2 + 400] ),
        y = d3.scale.linear()
            .domain( [0, 1] )
            .range( [0, h] ),
        r = d3.scale.linear()
            .domain( [0, 1] )
            .range( [5, 10] ),
        c = d3.scale.linear()
            .domain( [0, 1] )
            .range( ['hsl(250, 50%, 50%)', 'hsl(350, 100%, 50%)'] )
            .interpolate( d3.interpolateHsl )
        y2 = d3.scale.linear()
            .domain( [0, 1] )
            .range( [h / 2 - 20, h / 2 + 20] )
        del = d3.scale.linear()
            .domain( [0, 1] )
            .range( [0, 1] );

    chart.selectAll( 'circle' )
        .data( data )
      .enter().insert( 'circle' )
        .attr( 'cx', function( d ) { return x( d.x ); } )
        .attr( 'cy', function( d ) { return y( d.y ); } )
        .attr( 'stroke-width', 'none' )
        .attr( 'fill', function() { return c( Math.random() ) } )
        .attr( 'fill-opacity', .5 )
        .attr( 'visibility', 'hidden' )
        .attr( 'r', function() { return r( Math.random() ) } )
      .on('mouseover', function() {
            d3.select(this).transition()
                .attr('cy', function() { return y2(Math.random()) })
                .delay(0)
                .duration(2000)
                .ease('elastic', 10, .3)
        })
      .transition()
        .attr( "cx", function() { return x( Math.random() ) } )
        .attr( "cy", function() { return y2( Math.random() ) } )
        .attr( 'visibility', 'visible' )
        .delay( function( d, i ) { return i * del( Math.random() ) } )
        .duration( 1000 )
        .ease( 'elastic', 10, .45 )
} );
