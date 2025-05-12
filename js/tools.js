function getStyle(obj, attr) {
    if (window.getComputedStyle) {
      return getComputedStyle(obj, null)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  }

function move(obj, attr, target, speed, callback) {
    //avoid open multiple timer
    if (obj.timer != null || undefined) {
      clearInterval(obj.timer);
    }

    // change move direction if possible
    // var current = parseInt(getStyle(obj, attr));
    var current = parseInt(obj[attr]);
    if(current > target) {
        speed = -speed;
      }

    // set timers to move to the target with a speed, not move there directly
    obj.timer = setInterval(function () {
      // get element style
      // const cssObj = window.getComputedStyle(obj, null);
      // var oldValue = parseInt(cssObj.getPropertyValue(attr));
      // var oldValue = parseInt(getStyle(obj, attr));
      var oldValue = parseInt(obj[attr]);

      var newValue = oldValue + speed;

      // stop at the edge of either side
      if (
        (speed < 0 && newValue < target) ||
        (speed > 0 && newValue > target)
      ) {
        newValue = target;
      }

      obj[attr] = newValue;
      // obj.style[attr] = newValue + "px";

      // delete timer when meets target, then call callback fun
      if (newValue == target) {
        clearInterval(obj.timer);
        callback && callback();
      }
    }, 30);
  }

  function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
  }

  function hasClass(obj,cn) {
    // only has cn is enough, doesn't have to start and end with it
    var reg = new RegExp("\\b" + cn +"\\b");
    return reg.test(obj.className);
  }

  function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn +"\\b");
    obj.className = obj.className.replace(reg, "");
  }

  function addClass(obj, cn) {
    obj.className += " " + cn;
  }