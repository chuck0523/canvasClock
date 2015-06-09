$(document).ready(function(){
	/*
	* In this js file, two plugins are combined
	* 1. moment.js
	* 2. jCanvas.js
	* to make COOL CLOCK :)
	*/

	//to see what's going on.
	var log = function(x){console.log(x)};

	//there's 1.0s delay until rendering. so I use this
	$("#fakeLoader").fakeLoader({
	    timeToHide:2000,
	    zIndex:'999',
	    spinner:'spinner2',
	    bgColor:'#5aa'
	  });

	var resizeCanvas = function() {
		var winW = $(window).width(),
			winH = $(window).height();
			log(winW +'/'+ winH);
		$('canvas').width(winW).css('margin','0 auto');
	}
	
	
	var canvas = $('canvas').css({
		'background-color'  : '#5aa',
		'font-family' 		: 'sans-serif'
	});
	
	//content of setInterval function is too fat.
	//Excuse: 
	//I tried to fix this, Like below,
	// setInterval('clock()',1000);
	//But it doesn't work..
	//console said 'can't find 'work()'. What?!
	setInterval(
		function clock() {
			//shoudn't I declare these variable in this function?
			//cause these are initialized everytime this function is called..
			var ccNow 	= moment(),
			//Note: I originally and mistakenly coded like below
			// w = $('canvas').width;
			//But this doesn't work... 
				w 		= canvas.width() / 2,
				h 		= canvas.height() / 2,
				radius  = w * 0.6;
			canvas.clearCanvas();
			//outer border of clock
			canvas.drawArc({
				strokeStyle : '#eee',
				strokeWidth	:13,
				x 			: w,
				y 			: h,
				radius 		: radius
			});

			for(var i = 0; i < 12; i++) {
				var rad    = i * Math.PI / 6,
					x 	   = w + radius*0.85 * Math.sin(rad),
					y      = h - radius*0.85 * Math.cos(rad),
					text   = "" + (i == 0 ? '12' : i);
				canvas.drawText({
					fillStyle 	: '#eee',
					strokeStyle : '#eee',
					strokeWidth : 2,
					x 			: x,
					y 			: y,
					fontSize 	: 50,
					text 		: text
				});
			}
			var now = moment();
			var sec = now.get('s'),
				min = now.get('m'),
				hr	= now.get('h');
			hr = hr >= 12 ? hr -12 : hr;
			//log(hr +'/'+ min +'/'+ sec);
			//I'm not confident to do this..

			//minute hand
			var minRadian = Math.PI / 30 * min;
			canvas.drawLine({
				strokeStyle	: '#eee',
				strokeWidth	: 8, 
				rounded		: true,
				x1 			: w,
				y1			: h,
				x2			: (w + Math.sin(minRadian)*radius*0.7),
				y2			: (h - Math.cos(minRadian)*radius*0.7)
			});
			//log((w + Math.sin(minRadian)) +'/'+ (h + Math.cos(minRadian)));
			//hour hand
			var hrRadian = Math.PI / 6 * hr + Math.PI / 6 / 60 * min;
			canvas.drawLine({
				strokeStyle	: '#eee',
				strokeWidth	: 10, 
				rounded		: true,
				x1 			: w,
				y1			: h,
				x2			: (w + Math.sin(hrRadian)*radius*0.5),
				y2			: (h - Math.cos(hrRadian)*radius*0.5)
			});
			//log((Math.sin(hrRadian)) + '/' + (Math.cos(hrRadian)));
			log(moment().format('hh-mm-ss'));
			//second hand... I mean time :)
			var secRadian = Math.PI / 30 * sec;
			canvas.drawLine({
				strokeStyle	: '#eee',
				strokeWidth	: 2, 
				rounded		: true,
				x1 			: w,
				y1			: h,
				x2			: (w + Math.sin(secRadian)*radius*0.85),
				y2			: (h - Math.cos(secRadian)*radius*0.85)
			});
		},1000);
	//init();
	resizeCanvas();
	$(window).resize(function(){
		resizeCanvas();
	});
});