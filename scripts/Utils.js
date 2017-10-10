/*global
  requestAnimationFrame
*/

(function () {
  'use strict';

  var
    Utils = {};



  /**
   * [[Description]]
   * @param {object} inputEl [[Description]]
   */
  Utils.focusAtEnd = function (inputEl) {
    inputEl.focus();
    var value     = inputEl.value;
    inputEl.value = '';
    inputEl.value = value;
  };



  /**
   * [[Description]]
   * @param {object}   el             [[Description]]
   * @param {[[Type]]} [velocity=0.1] [[Description]]
   */
  Utils.scrollToEnd = function (el, velocity) {
    velocity = velocity || 0.1;

    var
      scrollPosition = el.scrollLeft,
      animateScroll;

    animateScroll = function () {
      var
        scrollFrom  = scrollPosition,
        scrollTo    = el.scrollWidth - el.offsetWidth;

      if ((scrollTo - scrollFrom) > 2) {
        requestAnimationFrame(animateScroll);
      }

      scrollPosition  = scrollFrom + ((scrollTo - scrollFrom) * velocity);
      el.scrollLeft   = scrollPosition;
    };

    animateScroll();
  };



  /**
   * [[Description]]
   * @param   {object}  el [[Description]]
   * @returns {boolean} [[Description]]
   */
  Utils.applyHorizontalScrolling = function (el) {
    var mouseWheelEvt = function (event) {
      if (event.deltaY) {
        switch (event.deltaMode) {
        case 0x00: // DOM_DELTA_PIXEL
          el.scrollLeft += event.deltaY;
          break;

        case 0x01: // DOM_DELTA_LINE
          el.scrollLeft += event.deltaY * 30;
          break;

        default:
        }
      }

      return false;
    };

    el.addEventListener("wheel", mouseWheelEvt);
  };



  window.Utils = Utils;
}());
