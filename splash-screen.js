boxing.screens["splash-screen"] = (function() {
	var firstRun = true;
	
	function checkProgress() {
		var $ = boxing.dom.$,
			p = boxing.getLoadProgress() * 100;
			
		$(".progress .indicator")[0].style.width = p + "%";
		
		if (p == 100) {
			setup();
		}
		else {
			setTimeout(checkProgress, 30);
		}
	}
	
	function setup() {
		boxing.dom.bind("#splash-screen", "click", function() {
			boxing.showScreen("main-menu");
		});
	}
	
	function run() {
		if (firstRun) {
			checkProgress();
			firstRun = false;
		}
	}
	
	return {
		run: run
	};
	
})();