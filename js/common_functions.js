
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();



var waitBeforeRepeatEvent = (function () {
  var time_func = {};

  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
	var d = new Date();
	var t = d.getTime();
	var new_t = d.getTime() + ms;
    if ( ( time_func[uniqueId] && time_func[uniqueId] < t ) || !time_func[uniqueId]) {
		time_func[uniqueId] = new_t;
		callback();
    }
    
  };
})();

