// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/scripts/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getElem(selector) {
  return document.querySelector(selector);
}

var VAR = {
  WINDOWS: getElem('.weather_container').children,
  TABS: getElem('.weather_tabs').children,
  FORM: getElem('.weather_form'),
  INPUT: getElem('.weather_input'),
  CITY: document.querySelectorAll('.weather_city-name'),
  TEMP: document.querySelectorAll('.weather_temp'),
  ICON: getElem('.weather_cloudly-icon'),
  FEELS_LIKE: document.querySelectorAll('.weather_feels-like'),
  WEATHER: getElem('.weather_weather'),
  SUNRISE: getElem('.weather_sunrise'),
  SUNSET: getElem('.weather_sunset'),
  ADD_CITY_BUTTON: getElem('.weather_like-button'),
  ADDED_CITIES_LIST: getElem('.weather_cities-list'),
  ADDED_CITIES_TEMPLATE: getElem('#weather_cities-template')
};
var _default = VAR;
exports.default = _default;
},{}],"src/scripts/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!localStorage.getItem('favoriteCities')) {
  localStorage.setItem("favoriteCities", JSON.stringify({
    'checked': 'Izhevsk',
    'cities': []
  }));
}

var storage = {
  getFavoriteCities: function getFavoriteCities() {
    return JSON.parse(localStorage.getItem("favoriteCities"));
  },
  getCheckedCity: function getCheckedCity() {
    return storage.getFavoriteCities().checked;
  },
  setCheckedCity: function setCheckedCity(cityName) {
    var favoriteCities = storage.getFavoriteCities();
    favoriteCities.checked = cityName;
    storage.saveToLocalStorage(favoriteCities);
  },
  saveFavoriteCities: function saveFavoriteCities() {
    var favoriteCities = storage.getFavoriteCities();
    if (favoriteCities.cities.includes(_view.default.CITY[0].textContent)) return;
    favoriteCities.cities.push(_view.default.CITY[0].textContent);
    storage.saveToLocalStorage(favoriteCities);
  },
  saveToLocalStorage: function saveToLocalStorage(favoriteCities) {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  },
  deleteFromLocalStorage: function deleteFromLocalStorage() {
    var _this = this;

    var favoriteCities = storage.getFavoriteCities();
    favoriteCities.cities = favoriteCities.cities.filter(function (elem) {
      return elem !== _this.previousElementSibling.innerHTML;
    });
    storage.saveToLocalStorage(favoriteCities);
  }
};
var _default = storage;
exports.default = _default;
},{"./view.js":"src/scripts/view.js"}],"src/scripts/main.js":[function(require,module,exports) {
"use strict";

var _view = _interopRequireDefault(require("./view.js"));

var _storage = _interopRequireDefault(require("./storage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//implementation the functions
function getWeather(_x) {
  return _getWeather.apply(this, arguments);
}

function _getWeather() {
  _getWeather = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cityName) {
    var serverUrl, url, response, data, temp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
            url = "".concat(serverUrl, "?q=").concat(cityName, "&appid=").concat(apiKey, "&units=metric");
            _context.prev = 2;
            _context.next = 5;
            return fetch(url);

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            data = _context.sent;
            temp = Math.round(data.main.temp);

            _view.default.CITY.forEach(function (elem) {
              return elem.textContent = data.name;
            });

            _view.default.TEMP.forEach(function (elem) {
              return elem.textContent = temp + '°';
            });

            _view.default.ICON.src = "https://openweathermap.org/img/wn/".concat(data.weather[0].icon, "@4x.png");

            _view.default.FEELS_LIKE.forEach(function (elem) {
              return elem.textContent = Math.round(data.main.feels_like) + '°';
            });

            _view.default.WEATHER.textContent = data.weather[0].main;
            _view.default.SUNRISE.textContent = getTime(data.sys.sunrise);
            _view.default.SUNSET.textContent = getTime(data.sys.sunset);
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](2);
            alert(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 19]]);
  }));
  return _getWeather.apply(this, arguments);
}

function addFavoriteCity() {
  var _this = this;

  var city = _view.default.ADDED_CITIES_TEMPLATE.content.cloneNode(true);

  var cityName = city.querySelector('.added-city');
  var removeBtn = city.querySelector('.remove');
  var cityNotAdded = !_view.default.ADDED_CITIES_LIST.textContent.includes(_view.default.CITY[0].textContent);

  if (cityNotAdded) {
    cityName.textContent = _view.default.CITY[0].textContent;
    cityName.addEventListener('click', function () {
      getWeather(cityName.textContent);
    });
    removeBtn.addEventListener('click', function () {
      _this.closest('.cities-list_button').remove();
    });
    removeBtn.addEventListener('click', _storage.default.deleteFromLocalStorage);

    _view.default.ADDED_CITIES_LIST.append(city);
  }
}

function getTime(ms) {
  var hours = new Date(ms * 1000).getHours();
  var minutes = new Date(ms * 1000).getMinutes();
  hours = hours <= 9 ? '0' + hours : hours;
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  return "".concat(hours, ":").concat(minutes);
}

var apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

var checkedCity = _storage.default.getFavoriteCities().checked;

var favoriteCities = _storage.default.getFavoriteCities().cities;

var _iterator = _createForOfIteratorHelper(favoriteCities),
    _step;

try {
  var _loop = function _loop() {
    var city = _step.value;

    var favoriteCity = _view.default.ADDED_CITIES_TEMPLATE.content.cloneNode(true);

    var item = favoriteCity.querySelectorAll('.cities-list_button');
    var addedCity = favoriteCity.querySelector('.added-city');
    var removeBtn = favoriteCity.querySelector('.remove');
    addedCity.textContent = city;
    addedCity.addEventListener('click', function () {
      getWeather(addedCity.textContent);

      _storage.default.setCheckedCity(addedCity.textContent);
    });
    removeBtn.addEventListener('click', function (event) {
      console.log(event.target);
    });
    removeBtn.addEventListener('click', _storage.default.deleteFromLocalStorage);

    _view.default.ADDED_CITIES_LIST.append(favoriteCity);
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  } // set default city

} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

getWeather(checkedCity); // add event listeners for send requests

_view.default.FORM.addEventListener('submit', function () {
  var cityName = _view.default.INPUT.value.trim();

  new Promise(function () {
    return getWeather(cityName);
  });

  _storage.default.setCheckedCity(cityName);
});

_view.default.ADD_CITY_BUTTON.addEventListener('click', addFavoriteCity);

_view.default.ADD_CITY_BUTTON.addEventListener('click', _storage.default.saveFavoriteCities);
},{"./view.js":"src/scripts/view.js","./storage.js":"src/scripts/storage.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50134" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/scripts/main.js"], null)
//# sourceMappingURL=/main.a5838760.js.map