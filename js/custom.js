// ..........................................Mouse follow ..........................

var me = document.getElementById("me");
var lisiri = document.getElementById("lisiri");

// PROJECTS
var labels = document.getElementsByClassName("labels");
var label;
var box = document.getElementById("box");

document.addEventListener("mousemove", getMouse);
lisiri.addEventListener("mouseover", appear);
lisiri.addEventListener("mouseout", vanish);
var aboutOpened = false;

var isHoveringBox;
var mepos = {x:0, y:0};
setInterval(followMouse, 50);
var mouse = {x:0, y:0}; //mouse.x, mouse.y

var dir = "right";

$( document ).ready(() => {
    // appendProjects();
});

//APPEND PROJECTS
function appendProjects() {
	var string = '';

	for (i = 0; i < projectsArray.length; i++) {
		var project = projectsArray[i];
		// check if the project is a multiple of 2 - needed to print the rows' divs
		if (i % 2 == 0) {
			string += (
				'<div class="row" style="margin-left:0; margin-right:0">' +

  			'<div class="col-6 nopad">' +
  	      '<div class="box-cont" id="box" onmouseover="labelAppear('+ i + ')" onmouseout="labelVanish()">' +
  	        '<div class="box-vivo" >' +
  	          '<div class="box-vivo-overlay ' + project.cssClass + '">' +
  	            '<div class="labels">' +
  	              '<div class="label">' + project.title + '</div><br>' +
  	              '<div style="margin-top: -15px;">' +
  	                '<div class="underlabel">' + project.subtitle + '</div>' +
  	              '</div>' +
  	            '</div>' +
  	          '</div>' +
						'</div>' +
					'</div>' +
				 '</div>' )

	 	} else {
			string += (
				'<div class="col-6 nopad">' +
					'<div class="box-cont" id="box" onmouseover="labelAppear('+ i + ')" onmouseout="labelVanish()">' +
						'<div class="box-vivo" >' +
							'<div class="box-vivo-overlay ' + project.cssClass + '">' +
								'<div class="labels">' +
									'<div class="label">' + project.title + '</div><br>' +
									'<div style="margin-top: -15px;">' +
										'<div class="underlabel">' + project.subtitle + '</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'

				+ '</div>')

		}
		if (i === projectsArray.length - 1) {
			$('#projects').append(string);
		}
	}


}

function getMouse(e){
	mouse.x = e.pageX;
	mouse.y = e.pageY;

  // console.log(e.pageY);
	if (label) {
		if (window.pageYOffset > 0)
			label.style.marginTop = '-' + (window.pageYOffset) + 'px'
		else
			label.style.marginTop = 0;
	}

  // Checking directional change
  if(mouse.x > mepos.x){
    dir = "right";
  } else {
    dir = "left";
  }
}

function appear() {
  me.style.height = '170px';
  me.style.width = '170px';
  me.style.opacity = 1;
}

function labelAppear(index) {
	isHoveringBox = true;
	label = labels[index];
}

function followMouse(){
	//1. find distance X , distance Y
	var distX = mouse.x - mepos.x;
	var distY = mouse.y - mepos.y;
	//Easing motion
   //Progressive reduction of distance
	mepos.x += distX/2;
	mepos.y += distY/1;

	if (aboutOpened) {
		me.style.left = mepos.x-90 + "px";
		me.style.top = mepos.y-230 + "px";
	} else {
		me.style.left = mepos.x + "px";
		me.style.top = mepos.y + "px";
	}
  if (isHoveringBox) {
    label.style.left = mepos.x + "px";
    label.style.top = mepos.y + "px";
  }

  //Apply css class
  if (dir == "right"){
    me.setAttribute("class", "right");
  } else {
    me.setAttribute("class", "left");
  }
}

function vanish() {
  me.style.height = 0;
  me.style.width = 0;
  me.style.opacity = 0;
}
function labelVanish() {
  isHoveringBox = false;
}

// ..........................................pagina About .......................

var heroText = document.querySelector('#heroText');
var smallText = document.querySelector('#smallText');
var projects = document.querySelector('#projects');
var mainContainer = document.querySelector('.main');
var photoAbout = document.querySelector('.mePhoto');
var heroAbout = document.querySelector('.heroText.about');
var smallAbout = document.querySelector('.smallText.about');

function openAbout() {
	// USCITA HOME
	vanish()
	setTimeout(function() {
		var heroVanish = anime({
		  targets: '#heroText',
		  translateY: 30,
			opacity: 0,
			duration: 600,
			easing: 'easeInOutQuart',
		});
		// var spanVanish = anime({
		// 	targets: '#heroText .span',
		// 	opacity: 0,
		// 	duration: 400,
		// 	easing: 'easeInOutCubic',
		// 	delay: function(el, i, l) {
		// 		return i * 150;
		// 	}
		// });
		var smallTextVanish = anime({
		  targets: '#smallText',
		  translateY: 30,
			duration: 600,
			easing: 'easeInOutQuart',
			opacity: 0,
			delay: 60
		});
		var waitSmallText = smallTextVanish.finished.then(function() {
			mainContainer.style.minHeight = '100vh';
			mainContainer.style.paddingBottom = '83px';
			smallText.style.display = 'none';
			heroText.style.display = 'none';

			aboutOpened = true;
			// projects.style.display = 'none';
			heroAbout.style.display = 'block';
			smallAbout.style.display = 'block';
			photoAbout.style.width = '410px';
			photoAbout.style.opacity = 1;
			// ENTRATA ABOUT
			var aboutHeroEnter = anime({
				targets: '.heroText.about',
				translateY: 40,
				duration: 600,
				opacity: 1,
				easing: 'easeInOutQuart',
			});
			var aboutSmallEnter = anime({
				targets: '.smallText.about',
				translateY: 40,
				duration: 600,
				opacity: 1,
				easing: 'easeInOutQuart',
				delay: 60
			});
		});
		// var projectsVanish = anime({
		//   targets: '#projects',
		//   translateY: 40,
		// 	duration: 400,
		// 	opacity: 0,
		// 	easing: 'easeInOutQuart',
		// 	delay: 200
		// });

	}, 200)
}

function closeAbout() {
	// aboutOpened = false;
	// USCITA ABOUT
	photoAbout.style.width = 0;
	photoAbout.style.opacity = 0;
	var aboutHeroVanish = anime({
		targets: '.heroText.about',
		translateY: 0,
		duration: 500,
		opacity: 0,
		easing: 'easeInOutQuart',
	});
	var aboutSmallVanish = anime({
		targets: '.smallText.about',
		translateY: 0,
		duration: 500,
		easing: 'easeInOutQuart',
		opacity: 0,
		delay: 60
	});

	var waitAboutSmall = aboutSmallVanish.finished.then(function() {
		smallAbout.style.display = 'none';
		heroAbout.style.display = 'none';
		smallText.style.display = 'block';
		heroText.style.display = 'block';
		// projects.style.display = 'block';
		mainContainer.style.minHeight = '100vh';
		mainContainer.style.paddingBottom = '16vh';

		// ENTRATA HOME
		// var projectsEnter = anime({
		// 	targets: '#projects',
		// 	translateY: 0,
		// 	duration: 400,
		// 	opacity: 1,
		// 	easing: 'easeInOutQuart',
		// 	delay: 200
		// });
		// var waitProjects = projectsEnter.finished.then(function(){
		// 	projects.style.transform = 'unset';
		// })
		var heroTextEnter = anime({
			targets: '#heroText',
			translateY: 0,
			opacity: 1,
			duration: 600,
			easing: 'easeInOutQuart',
		});
		// var spanEnter = anime({
		// 	targets: '#heroText .span',
		// 	opacity: 1,
		// 	duration: 400,
		// 	easing: 'easeInOutCubic',
		// 	delay: function(el, i, l) {
		// 		return i * 150;
		// 	}
		// });
		var smallTextEnter = anime({
			targets: '#smallText',
			translateY: 0,
			duration: 600,
			opacity: 1,
			easing: 'easeInOutQuart',
			delay: 80
		});
	});
}

// ..........................................smooth scroll .......................

var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 600,
	speedAsDuration: true
});

// ..........................................Blotter.js ..........................

// var lisiri = new Blotter.Text("Lisiri", {
//   family : "Work Sans",
//   size : 33,
//   fill : "#1F25FA",
//   weight: 500,
//   leading: 0.8,
//   needsUpdate: true
// });
// var design = new Blotter.Text("design", {
//   family : "Work Sans",
//   size : 33,
//   fill : "#1F25FA",
//   weight: 500,
//   leading: 1,
//   needsUpdate: true
// });
// var code = new Blotter.Text("code", {
//   family : "Work Sans",
//   size : 33,
//   fill : "#1F25FA",
//   weight: 500,
//   leading: 0.8,
//   needsUpdate: true
// });
//
// var material = new Blotter.LiquidDistortMaterial();
// material.uniforms.uVolatility.value = 0.05
// material.uniforms.uSpeed.value = 0.3
//
// var blotter = new Blotter(material, {
//   texts : [lisiri, design, code]
// });
// var containerLisiri = document.getElementById("distorted");
// var containerDesign = document.getElementById("distorted1");
// var containerCode = document.getElementById("distorted2");
// var scopeLisiri = blotter.forText(lisiri);
// var scopeDesign = blotter.forText(design);
// var scopeCode = blotter.forText(code);
//
// scopeLisiri.appendTo(containerLisiri);
// scopeDesign.appendTo(containerDesign);
// scopeCode.appendTo(containerCode);
