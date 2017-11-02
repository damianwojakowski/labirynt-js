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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(1);
game_1.startGame();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function startGame() {
    var generator = {
        generateBoard: function () {
            return [
                ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW'],
                ['WW', '00', '00', 'WW', '00', '00', '!!'],
                ['WW', '00', '00', 'WW', '00', 'WW', 'WW'],
                ['WW', '00', 'WW', 'WW', '00', 'WW', 'WW'],
                ['WW', '00', 'WW', '00', '00', '00', 'WW'],
                ['WW', '00', 'WW', '00', 'WW', '00', 'WW'],
                ['WW', '00', '00', '00', '00', '00', 'WW'],
                ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW']
            ];
        }
    };
    console.log('game loaded');
    var SETTINGS = {
        GRID_SIZE: 30,
        GAME_ID: 'game',
        SIZE: 600
    };
    var ELEMENTS = {
        WALL: 'WW',
        FREE_SPACE: '00',
        END_POINT: '!!'
    };
    var COLOURS = {};
    var board = generator.generateBoard();
    var PLAYER_POSITION = { X: 2, Y: 2 };
    var CONTEXT_2D = initializeBoardAndReturnContext2d();
    function getContext2d() {
        return CONTEXT_2D;
    }
    play();
    function initializeBoardAndReturnContext2d() {
        var canvas = document.getElementById(SETTINGS.GAME_ID);
        canvas.width = SETTINGS.SIZE;
        canvas.height = SETTINGS.SIZE;
        canvas.style.width = SETTINGS.SIZE;
        canvas.style.height = SETTINGS.SIZE;
        return canvas.getContext("2d");
    }
    function play() {
        var context2d = getContext2d();
        drawBoard(context2d);
        drawPlayer(context2d);
    }
    function drawBoard(context2d) {
        drawElements(context2d);
    }
    function drawElements(context2d) {
        board.forEach(function (elements, indexY) {
            elements.forEach(function (element, indexX) {
                context2d.beginPath();
                context2d.arc((indexX + 1) * SETTINGS.GRID_SIZE, (indexY + 1) * SETTINGS.GRID_SIZE, SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
                if (element === ELEMENTS.WALL) {
                    context2d.fillStyle = 'black';
                }
                else if (element === ELEMENTS.END_POINT) {
                    context2d.fillStyle = 'blue';
                }
                else {
                    context2d.fillStyle = 'white';
                }
                context2d.fill();
            });
        });
    }
    var KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };
    function drawPlayer(context2d) {
        context2d.beginPath();
        context2d.arc((PLAYER_POSITION.X + 1) * SETTINGS.GRID_SIZE, (PLAYER_POSITION.Y + 1) * SETTINGS.GRID_SIZE, SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
        context2d.fillStyle = 'pink';
        context2d.fill();
    }
    document.addEventListener('keydown', movePlayer);
    function movePlayer(event) {
        if (event.keyCode === KEY_CODES.ARROW_UP) {
            tryToMoveUp();
        }
        else if (event.keyCode === KEY_CODES.ARROW_DOWN) {
            tryToMoveDown();
        }
        else if (event.keyCode === KEY_CODES.ARROW_LEFT) {
            tryToMoveLeft();
        }
        else if (event.keyCode === KEY_CODES.ARROW_RIGHT) {
            tryToMoveRight();
        }
        play();
        if (didWin()) {
            setTimeout(showWinPage, 0);
        }
    }
    function didWin() {
        return board[PLAYER_POSITION.Y][PLAYER_POSITION.X] === ELEMENTS.END_POINT;
    }
    function showWinPage() {
        alert("YOU FOUND THE EXIT!");
    }
    function tryToMoveUp() {
        if (canMoveTo(PLAYER_POSITION.Y - 1, PLAYER_POSITION.X)) {
            PLAYER_POSITION.Y--;
        }
    }
    function tryToMoveDown() {
        if (canMoveTo(PLAYER_POSITION.Y + 1, PLAYER_POSITION.X)) {
            PLAYER_POSITION.Y++;
        }
    }
    function tryToMoveLeft() {
        if (canMoveTo(PLAYER_POSITION.Y, PLAYER_POSITION.X - 1)) {
            PLAYER_POSITION.X--;
        }
    }
    function tryToMoveRight() {
        if (canMoveTo(PLAYER_POSITION.Y, PLAYER_POSITION.X + 1)) {
            PLAYER_POSITION.X++;
        }
    }
    function canMoveTo(newPositionY, newPositionX) {
        return board[newPositionY][newPositionX] === ELEMENTS.FREE_SPACE ||
            board[newPositionY][newPositionX] === ELEMENTS.END_POINT;
    }
}
exports.startGame = startGame;


/***/ })
/******/ ]);