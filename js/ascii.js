;(function() {
	'use strict';
	var fontSize =  $("fontSize"),
		sizeRadio = $A(fontSize.getElementsByTagName('input')),
 		startbutton = $("startButton"),
		stopButton = $("stopButton"),
		turboSpeed = $("turboSpeed"),
		displayarea = $("displayarea");
	window.onload = function() {
		var ascii = new AsciiAnimation(ANIMATIONS);
		ascii.init();
	}
	function AsciiAnimation(asciiArray) {
		this.asciiArray = asciiArray;
		this.asciiIndex = asciiArray[$F('selectButton')];
		this.speed = 200;
		this.currentIndex = -1;
		this.nextFrame = null;
		this.allFrames = null;
	}
	AsciiAnimation.prototype = {
		constructor: AsciiAnimation,
		fontArray: $w('7pt 12pt 24pt'),
		init: function() {
			stopButton.disabled = true;
			this.bindHandler(this);
		},
		bindHandler: function(self) {
			Event.observe(fontSize, 'click', self.changeFontSize.bindAsEventListener(self));
			Event.observe(startbutton, 'click', self.startAnimation.bindAsEventListener(self));
			Event.observe(stopButton, 'click', self.stopAnimation.bindAsEventListener(self));
			turboSpeed.observe('click', function() { self.speed = $F('turboSpeed') === 'on'? 50:200;});
		},
		changeFontSize: function() {
			var self = this;
			sizeRadio.each(function(item, index) {
				if(item.checked) { displayarea.style.fontSize = self.fontArray[index];}
			})
		},
		chooseAnimation: function() {
			this.asciiIndex = this.asciiArray[$F('selectButton')];
			this.allFrames = this.asciiIndex.split("=====\n");
		},
		startAnimation: function() {
			this.chooseAnimation();
			if (this.allFrames != '') {
				this.actionAnimation(this, 0);
				stopButton.disabled = false;
				startButton.disabled = true;
				selectButton.disabled = true;
			}
		},
		stopAnimation: function() {
			clearTimeout(this.nextFrame);
			displayarea.value = this.asciiIndex;
			startButton.disabled = false;
			stopButton.disabled = true;
			selectButton.disabled = false;
		},
		actionAnimation: function(self, index) {
			self.currentIndex = index < self.allFrames.length - 1?(index + 1):0;
			displayarea.value = self.allFrames[index];
			self.nextFrame = setTimeout(self.actionAnimation, self.speed, self, self.currentIndex);
		}
	}
})()