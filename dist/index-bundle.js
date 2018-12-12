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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/build/controllers/index.controller.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/build/controllers/index.controller.js":
/*!****************************************************!*\
  !*** ./dist/build/controllers/index.controller.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst date = new Date();\r\ndate.setTime(new Date().getTime() - (1000 * 60 * 60 * 24));\r\nlet condensedGames = [];\r\nwindow.onload = () => {\r\n    displayDate(date.toLocaleDateString());\r\n    document.getElementById('prev').onclick = () => {\r\n        date.setTime(date.getTime() - (1000 * 60 * 60 * 24));\r\n        displayDate(date.toLocaleDateString());\r\n        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));\r\n        displayGames(gamesOfDay);\r\n    };\r\n    document.getElementById('next').onclick = () => {\r\n        date.setTime(date.getTime() + (1000 * 60 * 60 * 24));\r\n        displayDate(date.toLocaleDateString());\r\n        let gamesOfDay = condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)));\r\n        displayGames(gamesOfDay);\r\n    };\r\n    getAllVideos()\r\n        .then(json => json.items.filter(i => i.snippet.title.includes('Condensed Game')))\r\n        .then(filtered => condensedGames = filtered)\r\n        .then(() => displayGames(condensedGames.filter(g => g.snippet.title.includes(getFormatedDate(date)))));\r\n};\r\nfunction displayGames(gameList) {\r\n    var gamesList = document.getElementById('games');\r\n    gamesList.innerHTML = '';\r\n    gameList.forEach(g => {\r\n        var li = document.createElement('li');\r\n        var img = document.createElement('img');\r\n        img.src = g.snippet.thumbnails.high.url;\r\n        img.style.width = '160px';\r\n        img.style.height = '90px';\r\n        img.style.marginRight = '5px';\r\n        var a = document.createElement('a');\r\n        a.innerHTML = g.snippet.title;\r\n        a.href = `https://www.youtube.com/watch?v=${g.id.videoId}`;\r\n        a.style.fontSize = '24px';\r\n        li.appendChild(img);\r\n        li.appendChild(a);\r\n        gamesList.appendChild(li);\r\n    });\r\n}\r\nfunction displayDate(date) {\r\n    document.getElementById('date').innerHTML = date;\r\n}\r\nfunction getFormatedDate(date) {\r\n    var month = (date.getMonth() + 1).toString();\r\n    if (month.length === 1) {\r\n        month = '0' + month;\r\n    }\r\n    var day = date.getDate().toString();\r\n    if (day.length === 1) {\r\n        day = '0' + day;\r\n    }\r\n    var year = date.getUTCFullYear() - 2000;\r\n    return `${month}/${day}/${year}`;\r\n}\r\n\n\n//# sourceURL=webpack:///./dist/build/controllers/index.controller.js?");

/***/ })

/******/ });