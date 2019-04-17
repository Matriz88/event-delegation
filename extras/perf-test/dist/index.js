/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);

var delegate = __webpack_require__(4);

(function () {
  var prepareDom = function prepareDom() {
    var counter = 0;
    var max = 1000;

    var recursAppend = function recursAppend(el) {
      if (counter === max) return false;
      var newEl = document.createElement(counter === max - 1 ? 'span' : 'p');
      el.appendChild(newEl);
      counter++;
      recursAppend(newEl);
    };

    var section = document.querySelector('section');
    recursAppend(section);
  };

  prepareDom();
  var spanElement = document.querySelector('span');
  var t0;
  var t1; // delegate test
  //
  // delegate(document.querySelector('body'), 'section', 'click', (e) => {
  //   t1 = performance.now();
  //   console.log(t1 - t0);
  // }, false);
  // jQuery test
  //
  // $('body').
  //   on('click', 'section', (e) => {
  //     t1 = performance.now();
  //     console.log(t1 - t0);
  //   });
  // vanilla-delegation test
  //
  // document.querySelector('body').
  //   addDelegateListener('click', 'section', (e) => {
  //     t1 = performance.now();
  //     console.log(t1 - t0);
  //   });
  // run 100 clicks

  var i = 100;

  while (i--) {
    t0 = performance.now();
    spanElement.click();
  }
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _createHandler = __webpack_require__(2);

(function () {
  /**
   * in case string alteration needed in the future
   * @param {Array} text
   * @returns {string}
   */
  var _createKey = function _createKey(text) {
    return text.join('');
  };

  var isValidString = function isValidString(eventType) {
    return typeof eventType === 'string' && eventType !== '';
  };
  /**
   * _addDelegateListenerInternal
   * @param {string} eventType
   * @param {string} selector
   * @param {function} handler
   * @param {boolean} useCapture
   * @returns {undefined}
   */


  var _addDelegateListenerInternal = function _addDelegateListenerInternal(eventType, selector, handler, useCapture) {
    var handlerHash = _createKey([handler.name, selector, useCapture]);

    if (this.delegatedListenersList && handlerHash in this.delegatedListenersList) {
      console.warn('Cannot bind event. A listener with same arguments is already registered. ' + 'If you need to register multiple listeners with same arguments consider to pass an anonymous function as handler, ' + 'but be aware that you won\'t be able to remove the listener in the future.');
      return;
    }

    var internalHandler = _createHandler(this, selector, handler);

    this.addEventListener(eventType, internalHandler, useCapture);
    if (!this.delegatedListenersList) this.delegatedListenersList = [];
    if (handler.name === '') return;
    this.delegatedListenersList[handlerHash] = {
      eventType: eventType,
      internalHandler: internalHandler
    };
  };
  /**
   * addDelegateListener
   * @param {string} eventType
   * @param {string} selector
   * @param {function} handler
   * @param {boolean} useCapture
   * @returns {undefined}
   */


  var addDelegateListener = function addDelegateListener(eventType, selector, handler) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!isValidString(eventType) || !isValidString(selector) || typeof handler !== 'function') {
      console.warn('Cannot bind event. Wrong arguments types');
      return;
    }

    if (this instanceof NodeList) {
      var length = this.length;

      for (var i = 0; i < length; ++i) {
        _addDelegateListenerInternal.call(this[i], eventType, selector, handler, useCapture);
      }

      return;
    }

    if (this instanceof Element) {
      _addDelegateListenerInternal.call(this, eventType, selector, handler, useCapture);

      return;
    }

    console.warn('Cannot bind event on non-Element objects');
  };
  /**
   *
   * @param {string} eventType
   * @param {string} selector
   * @param {function} handler
   * @param {boolean} useCapture
   */


  var removeDelegateListener = function removeDelegateListener(eventType, selector, handler) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!isValidString(eventType) || !isValidString(selector) || typeof handler !== 'function' || handler.name === '') {
      console.warn('Cannot remove event. Wrong arguments types');
      return;
    }

    var key = _createKey([handler.name, selector, useCapture]);

    if (this.delegatedListenersList && key in this.delegatedListenersList) {
      this.removeEventListener(this.delegatedListenersList[key].eventType, this.delegatedListenersList[key].internalHandler, false);
      delete this.delegatedListenersList[key];
    }
  };

  window.Element.prototype.addDelegateListener = addDelegateListener;
  window.Element.prototype.removeDelegateListener = removeDelegateListener;
  window.NodeList.prototype.addDelegateListener = addDelegateListener;
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _getMatchedElement = __webpack_require__(3);
/**
 * create internal handler
 * @param attachedElement
 * @param selector
 * @param handler
 */


var createInternalHandler = function createInternalHandler(attachedElement, selector, handler) {
  return function (selector, handler) {
    var matchedElement = _getMatchedElement(this, event.target, selector);

    if (matchedElement) {
      // save Element to which the event was originally attached (jQuery-like)
      event.delegateTarget = this;
      handler.call(matchedElement, event);
    }
  }.bind(attachedElement, selector, handler);
};

module.exports = createInternalHandler;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * apply polyfill
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * matcher
 * @param attachedElement
 * @param element
 * @param selector
 * @returns {boolean|Element}
 */


var getMatchedElement = function getMatchedElement(attachedElement, element, selector) {
  // node.ELEMENT_NODE;
  var ELEMENT_NODE = 1;

  for (var el = element; el && el.nodeType === ELEMENT_NODE && el !== attachedElement; el = el.parentElement) {
    if (el.matches(selector)) return el;
  }

  return attachedElement.matches(selector) ? attachedElement : false;
};

module.exports = getMatchedElement;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(5);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ })
/******/ ]);