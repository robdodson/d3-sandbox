$( function() {

    var t = 1297110663, // start time (seconds since epoch)
        v = 70, // start value (subscribers)
        data = d3.range( 33 ).map( next ), // starting dataset
        w = 20,
        h = 80;

    function next() {
        return {
            time:  ++t,
            value: v = Math.floor( Math.max( 10, Math.min( 90, v + 10 * (Math.random() - .5) ) ) )
        };
    }

    var x = d3.scale.linear()
        .domain( [0, 1] )
        .range( [0, w] );

    var y = d3.scale.linear()
        .domain( [0, 100] )
        .rangeRound( [0, h] );

    var chart = d3.select( 'body' ).append( 'svg' )
        .attr( 'class', 'chart' )
        .attr( 'width', w * data.length )
        .attr( 'height', h );

    // Bars
    chart.selectAll( 'rect' )
        .data( data )
        .enter().append( 'rect' )
        .attr( 'x', function( d, i ) { return x( i ) - .5; })// The .5 offset is to avoid antialiasing; the 1-pixel white stroke (from css) is centered on the given location, so a half-pixel offset will fill the pixel exactly.
        .attr( 'y', function( d ) { return h - y( d.value ); })
        .attr( 'width', w )
        .attr( 'height', function( d ) { return y( d.value ); });

    // Bottom Rule
    chart.append( 'line' )
        .attr( 'x1', 0 )
        .attr( 'x2', w * data.length )
        .attr( 'y1', h - .5 )
        .attr( 'y2', h - .5 )
        .style( 'stroke', '#000' );

    // Cycle the data
    setInterval( function() {
        data.shift();
        data.push( next() );
        redraw();
    }, 1500 );

    function redraw() {
        var rect = chart.selectAll( 'rect' )
            .data( data, function( d ) { return d.time; } );

        // Enter...
        rect.enter().insert( 'rect', 'line' )
            .attr( 'x', function( d, i ) { return x( i + 1 ) - .5; } )
            .attr( 'y', function( d ) { return h - y( d.value ); } )
            .attr( 'width', w )
            .attr( 'height', function( d ) { return y( d.value ); } )
          .transition()
            .duration(1000)
            .attr( 'x', function( d, i ) { return x( i ) - .5; } )

        // Update...
        rect.transition()
            .duration(1000)
            .attr('x', function( d, i ) { return x( i ) - .5; } );

        // Exit...
        rect.exit().transition()
            .duration(1000)
            .attr('x', function( d, i ) { return x( i - 1 ) - .5; } )
            .remove();
    }

} );
