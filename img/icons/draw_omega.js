globalThis.drawOmega=function(ctx,outerCircleColor,innerCircleColor){ctx.globalCompositeOperation="source-over",ctx.fillStyle=outerCircleColor,ctx.beginPath(),ctx.arc(.5,.5,.5,0,2*Math.PI,!0),ctx.closePath(),ctx.fill(),null!=innerCircleColor?ctx.fillStyle=innerCircleColor:ctx.globalCompositeOperation="destination-out",ctx.beginPath(),ctx.arc(.5,.5,.25,0,2*Math.PI,!0),ctx.closePath(),ctx.fill()};