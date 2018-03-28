var boxing = (function() {
	var scriptQueue = [],
		numResources = 0,
		numResourcesLoaded = 0,
		executeRunning = false;
		
	var settings = {
		rows: 3,
		cols: 2,
		baseDamage: 10,
		controls: {
			CLICK: "selectJewel",
			TOUCH: "selectJewel"
		}
	};

	function executeScriptQueue() {
		var next = scriptQueue[0],
			first, script;
			
		if (next && next.loaded) {
			executeRunning = true;
			
			scriptQueue.shift();
			first = document.getElementsByTagName('script')[0];
			script = document.createElement('script');
			script.onload = function() {
				if (next.callback) {
					next.callback();
				}
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		}
		else {
			executeRunning = false;
		}
	}
	
	function load(src, callback) {
		var image, queueEntry;
		numResources++;
		
		queueEntry = {
			src: src,
			callback: callback,
			loaded: false
		}
		scriptQueue.push(queueEntry);
		
		image = new Image();
		image.onload = image.onerror = function() {
			numResourcesLoaded++;
			queueEntry.loaded = true;
			if (!executeRunning) {
				executeScriptQueue();
			}
		};
		image.src = src;
	}
	
	function getLoadProgress() {
		return numResourcesLoaded / numResources;
	}
	
	function setup() {
		console.log("Success!");
		boxing.showScreen("splash-screen");
	}
	
	function showScreen(screenID) {
		var dom = boxing.dom,
			$ = dom.$,
			activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenID)[0];
		
		if (activeScreen) {
			dom.removeClass(activeScreen, "active");
		}
		dom.addClass(screen, "active");
		boxing.screens[screenID].run();
	}
	
	return {
		load: load,
		setup: setup,
		showScreen: showScreen,
		settings: settings,
		getLoadProgress: getLoadProgress,
		screens: {}
		
	};	
})();