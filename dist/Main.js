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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Board.ts":
/*!******************!*\
  !*** ./Board.ts ***!
  \******************/
/*! exports provided: ob, Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return ob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./main.ts");
/* harmony import */ var _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipGenerate */ "./ShipGenerate.ts");
/* harmony import */ var _Decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Decorators */ "./Decorators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ob = {
    checkedShip: 4,
    startDecorate: false
};
var addShipLimit = false;
var addShipClick = true;
var planszaUser;
var planszaPC;
var moveUser = 0;
var scorePC = 0;
var scoreUser = 0;
var shotingRow;
var shotingColumn;
var empty = [
    "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9", "1-10",
    "2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "2-9", "2-10",
    "3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8", "3-9", "3-10",
    "4-1", "4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8", "4-9", "4-10",
    "5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7", "5-8", "5-9", "5-10",
    "6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7", "6-8", "6-9", "6-10",
    "7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7", "7-8", "7-9", "7-10",
    "8-1", "8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-8", "8-9", "8-10",
    "9-1", "9-2", "9-3", "9-4", "9-5", "9-6", "9-7", "9-8", "9-9", "9-10",
    "10-1", "10-2", "10-3", "10-4", "10-5", "10-6", "10-7", "10-8", "10-9", "10-10"
];
var road = [
    "1-1", "2-2", "3-3", "4-4", "5-5", "6-6", "7-7", "8-8", "9-9", "10-10",
    "1-5", "2-6", "3-7", "4-8", "5-9", "6-10",
    "1-9", "2-10",
    "5-1", "6-2", "7-3", "8-4", "9-5", "10-6",
    "9-1", "10-2"
];
var currentShotRow = -1;
var currentShotColumn = -1;
var actualDirection = "";
var grow = 0;
var shotingAround = false;
var counter1 = 0;
var counter2 = 0;
var Board = /** @class */ (function () {
    function Board(player) {
        this.who = player;
    }
    Board.prototype.init = function (planszaPar) {
        for (var i = 0; i < _main__WEBPACK_IMPORTED_MODULE_0__["gamefieldsize"]; i++) {
            var planszaMin = [];
            planszaPar.push(planszaMin);
            for (var j = 0; j < _main__WEBPACK_IMPORTED_MODULE_0__["gamefieldsize"]; j++) {
                planszaPar[i][j] = 0;
            }
        }
        planszaUser = _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"];
        planszaPC = _main__WEBPACK_IMPORTED_MODULE_0__["plansza"];
    };
    Board.prototype.score = function (score1, score2) {
        var scores = {
            score1: score1,
            score2: score2,
        };
        return scores;
    };
    Board.prototype.drawing = function (board, plansza) {
        board.innerHTML = " ";
        if (board) {
            for (var i = 1; i < _main__WEBPACK_IMPORTED_MODULE_0__["gamefieldsize"] - 1; i++) {
                for (var j = 1; j < _main__WEBPACK_IMPORTED_MODULE_0__["gamefieldsize"] - 1; j++) {
                    var section = document.createElement('div');
                    section.className = "section";
                    if (plansza[i][j] == 0) {
                        if (this.who == "User") {
                            section.id = i + "-" + j;
                        }
                        else {
                            section.id = "PC-" + i + "-" + j;
                        }
                    }
                    else {
                        section.style.backgroundColor = _main__WEBPACK_IMPORTED_MODULE_0__["shipColor"];
                        if (this.who == "User") {
                            section.id = i + "-" + j;
                        }
                        else {
                            section.id = "PC-" + i + "-" + j;
                        }
                    }
                    if (this.who == "User") {
                        section.addEventListener("mousedown", addingShips);
                        section.addEventListener("mouseover", function () {
                            var id = this.id;
                            var rowH = parseInt(id.split("-")[0]);
                            var columnH = parseInt(id.split("-")[1]);
                            //DYNAMICZNE RYSOWANIE STATKU
                            addingShipsHover(rowH, columnH);
                        }, false);
                        section.addEventListener("mouseout", addingShipsHoverOut);
                    }
                    board.appendChild(section);
                }
            }
        }
        var direction = (-1);
        function addingShips(event) {
            var id = this.id;
            var row = parseInt(id.split("-")[0]);
            var column = parseInt(id.split("-")[1]);
            //zmiana kierunku
            if (event.which == 3) {
                direction == (-1) ? direction = 0 : direction = (-1);
                //czyszczenie
                addingShipsHoverOut();
                //rysowanie dynamiczne
                addingShipsHover(row, column);
            }
            //DODANIE STATKU
            else {
                var shipU = new _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["ShipGenerate"]("users", row, column, direction, ob.checkedShip);
                var test = shipU.check(_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"], "click");
                if (test && ob.checkedShip !== 0 && event.which == 1) {
                    for (var i = 0; i < ob.checkedShip; i++) {
                        if (direction == (-1)) {
                            _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][row][column + i] = 1;
                        }
                        if (direction == (0)) {
                            _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][row + i][column] = 1;
                        }
                    }
                    //usuwanie dodanego juz statku
                    _main__WEBPACK_IMPORTED_MODULE_0__["panel"].removeChild(_ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["checkedSection"]);
                    //ZACZĘCIE ROZGRYWKI!!!!!!!
                    if (_main__WEBPACK_IMPORTED_MODULE_0__["panel"].children.length == 1) {
                        _main__WEBPACK_IMPORTED_MODULE_0__["panel"].innerHTML = " ";
                        var div = document.getElementById("pc");
                        div.style.display = "block";
                        //włączanie ekranu powitalnego
                        _main__WEBPACK_IMPORTED_MODULE_0__["startPanel"].style.display = "flex";
                        var timer = document.getElementById("timer");
                        var second = 5;
                        var timing = setInterval(function () {
                            second--;
                            timer.innerHTML = "ROZGRYWKA ZACZNIE SIĘ ZA: " + second + " SEKUND";
                            if (second == 0) {
                                clearInterval(timing);
                                _main__WEBPACK_IMPORTED_MODULE_0__["startPanel"].style.display = "none";
                            }
                        }, 1000);
                        shoting();
                    }
                }
                else {
                    //JEŚLI KLIKNĘ W OGRANICZONY STATEK (3 MASZTOWIEC NA POLU 11-11)
                    if (addShipLimit && ob.checkedShip !== 0 && event.which == 1 && addShipClick) {
                        var properyty1 = 0;
                        var properyty2 = 0;
                        for (var ii = 11 - ob.checkedShip; ii < 11; ii++) {
                            shipU.direction == (-1) ? (properyty1 = row, properyty2 = ii) : (properyty1 = ii, properyty2 = column);
                            if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] != undefined) {
                                if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] == 0) {
                                    _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] = 1;
                                }
                            }
                        }
                        //console.log(plansza2, "----- PLANSZA2")
                        //usuwanie dodanego juz statku
                        _main__WEBPACK_IMPORTED_MODULE_0__["panel"].removeChild(_ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["checkedSection"]);
                        if (_main__WEBPACK_IMPORTED_MODULE_0__["panel"].children.length == 1) {
                            _main__WEBPACK_IMPORTED_MODULE_0__["panel"].innerHTML = " ";
                        }
                    }
                }
                ob.checkedShip = 0;
                _main__WEBPACK_IMPORTED_MODULE_0__["boardUser"].drawing(_main__WEBPACK_IMPORTED_MODULE_0__["board2"], _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"]);
            }
        }
        function addingShipsHover(row, column) {
            var shipHover = new _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["ShipGenerate"]("usersHover", row, column, direction, ob.checkedShip);
            ob.startDecorate = true;
            var test = shipHover.check(_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"], "hover");
            var properyty1 = 0;
            var properyty2 = 0;
            var properyty3 = 0;
            var properyty4 = 0;
            var limit = 5;
            direction == (-1) ? limit = column : limit = row;
            if (limit <= 11 - ob.checkedShip) {
                addShipLimit = false;
                for (var i_1 = 0; i_1 < ob.checkedShip; i_1++) {
                    direction == (-1) ? (properyty1 = 0, properyty2 = i_1) : (properyty1 = i_1, properyty2 = 0);
                    if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][row + properyty1][column + properyty2] != undefined) {
                        if (test) {
                            if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][row + properyty1][column + properyty2] == 0) {
                                var div = document.getElementById((row + properyty1) + "-" + (column + properyty2));
                                div.style.backgroundColor = "#0E9E8D";
                                addShipClick = true;
                            }
                        }
                        else {
                            if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][row + properyty1][column + properyty2] == 0) {
                                var div = document.getElementById((row + properyty1) + "-" + (column + properyty2));
                                if (div) {
                                    div.style.backgroundColor = "#E84017";
                                    addShipClick = false;
                                }
                            }
                        }
                    }
                }
            }
            else {
                addShipLimit = true;
                for (var i_2 = 11 - ob.checkedShip; i_2 < 11; i_2++) {
                    direction == (-1) ? (properyty1 = row, properyty2 = i_2) : (properyty1 = i_2, properyty2 = column);
                    direction == (-1) ? (properyty3 = 1, properyty4 = 0) : (properyty3 = 0, properyty4 = 1);
                    if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] != undefined) {
                        if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] == 0 && _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1 + properyty3][properyty2 + properyty4] == 0 && _main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1 - properyty3][properyty2 - properyty4] == 0) {
                            var div = document.getElementById((properyty1) + "-" + (properyty2));
                            div.style.backgroundColor = "#0E9E8D";
                            addShipClick = true;
                        }
                        else if (_main__WEBPACK_IMPORTED_MODULE_0__["plansza2"][properyty1][properyty2] == 0) {
                            var div = document.getElementById((properyty1) + "-" + (properyty2));
                            div.style.backgroundColor = "#E84017";
                            addShipClick = false;
                        }
                    }
                }
            }
        }
        function addingShipsHoverOut() {
            var sections = document.getElementsByClassName("section");
            for (i = 0; i < sections.length; i++) {
                if (sections[i].style.backgroundColor != _main__WEBPACK_IMPORTED_MODULE_0__["shipColor"]) {
                    sections[i].style.backgroundColor = "white";
                }
            }
        }
        function shoting() {
            console.log("Plansza 1", planszaUser);
            console.log("Plansza 2", planszaPC);
            var blocksUser = _main__WEBPACK_IMPORTED_MODULE_0__["board2"].children;
            var blocksPC = _main__WEBPACK_IMPORTED_MODULE_0__["board1"].children;
            for (var i_3 = 0; i_3 < blocksPC.length; i_3++) {
                blocksPC[i_3].addEventListener("click", shotClick);
            }
            var alerts = document.getElementById("alerts");
            alerts.innerHTML = ' ';
        }
        function shotClick() {
            if (scorePC > 19 || scoreUser > 19) {
                if (scorePC > scoreUser) {
                    document.body.innerHTML = "KONIEC GRY PRZEGRAŁEŚ";
                }
                else if (scorePC < scoreUser) {
                    alert("KONIEC GRY WYGRAŁEŚ");
                    setTimeout(function () {
                        window.location.reload(false);
                    }, 500);
                }
                else {
                    document.body.innerHTML = "REMISIK";
                }
            }
            if (moveUser % 2 == 0) {
                var str = this.id.split("-");
                var row = str[1];
                var column = str[2];
                if (this.innerHTML == "X" || this.innerHTML == "•") {
                    console.log("ZAJĘTE");
                }
                else {
                    if (planszaPC[row][column] == 0) {
                        this.innerHTML = "•";
                    }
                    else {
                        this.innerHTML = "X";
                        scoreUser++;
                        _main__WEBPACK_IMPORTED_MODULE_0__["boardUser"].score(scoreUser, scorePC);
                    }
                    _main__WEBPACK_IMPORTED_MODULE_0__["clock"].style.display = "flex";
                    var directionsShot = ["right", "left", "bottom", "top"];
                    setTimeout(function () {
                        //Topienie 4-ki
                        if (grow <= road.length - 1) {
                            var data = road[grow].split("-");
                            shotingRow = parseInt(data[0]);
                            shotingColumn = parseInt(data[1]);
                            for (var k = 0; k < empty.length; k++) {
                                if (empty[k] == shotingRow + '-' + shotingColumn) {
                                    var div = document.getElementById(shotingRow + "-" + shotingColumn);
                                }
                            }
                            //CZYSZCZENIE Z OGÓLNEJ TABLICY
                            for (var k = 0; k < empty.length; k++) {
                                if (empty[k] == road[grow]) {
                                    empty.splice(k, 1);
                                }
                            }
                        }
                        else {
                            //LOSOWANIE PC
                            var size = empty.length - 1;
                            var index = Math.floor(Math.random() * size);
                            var number = empty[index].split("-");
                            var shotingRow = parseInt(number[0]);
                            var shotingColumn = parseInt(number[1]);
                            var div = document.getElementById(shotingRow + "-" + shotingColumn);
                            //usuwanie z tablicy - brak powtórzeń
                            empty.splice(index, 1);
                        }
                        if (div) {
                            if (planszaUser[shotingRow][shotingColumn] == 0) {
                                div.innerHTML = "•";
                                shotingAround = false;
                                counter1++;
                                if (counter1 > 3) {
                                    counter1 = 0;
                                }
                                counter2 = 0;
                            }
                            else {
                                div.innerHTML = "X";
                                shotingAround = true;
                                currentShotRow = shotingRow;
                                currentShotColumn = shotingColumn;
                                actualDirection = directionsShot[counter1];
                                scorePC++;
                                _main__WEBPACK_IMPORTED_MODULE_0__["boardUser"].score(scoreUser, scorePC);
                            }
                        }
                        moveUser++;
                        grow++;
                        console.log(empty);
                        _main__WEBPACK_IMPORTED_MODULE_0__["clock"].style.display = "none";
                    }, 500);
                }
            }
            else {
                //console.log("Nie twój ruch")
            }
            moveUser++;
        }
    };
    __decorate([
        _Decorators__WEBPACK_IMPORTED_MODULE_2__["comment2"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Object)
    ], Board.prototype, "score", null);
    return Board;
}());



/***/ }),

/***/ "./Decorators.ts":
/*!***********************!*\
  !*** ./Decorators.ts ***!
  \***********************/
/*! exports provided: comment, comment2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment", function() { return comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment2", function() { return comment2; });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./Board.ts");

function comment(target, name, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalMethod.apply(this, args);
        var alerts = document.getElementById("alerts");
        if (_Board__WEBPACK_IMPORTED_MODULE_0__["ob"].startDecorate) {
            if (result) {
                alerts.innerHTML = "Możesz tu ustawić statek";
            }
            else {
                alerts.innerHTML = "Niesety, musisz znaleźć inne miejsce";
            }
        }
        return result;
    };
}
function comment2(target, name, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalMethod.apply(this, args);
        var punkts = document.getElementById("punkts");
        if (punkts !== null) {
            punkts.innerHTML = "Ty: " + result.score1 + ", Komputer: " + result.score2;
        }
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = ' ';
        return result;
    };
}


/***/ }),

/***/ "./ShipGenerate.ts":
/*!*************************!*\
  !*** ./ShipGenerate.ts ***!
  \*************************/
/*! exports provided: checkedSection, ShipGenerate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkedSection", function() { return checkedSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShipGenerate", function() { return ShipGenerate; });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./Board.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./main.ts");


var checkedSection;
var ShipGenerate = /** @class */ (function () {
    function ShipGenerate(player, row, column, direction, mast) {
        this.who = player;
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.mast = mast;
    }
    ShipGenerate.prototype.randomNumbers = function (mast) {
        var min = 1;
        var max = 10 - mast + 1;
        this.mast = mast;
        this.direction = Math.floor(Math.random() * 2 - 1);
        if (this.direction == 0) {
            this.row = Math.floor(Math.random() * max) + 1;
            this.column = Math.floor(Math.random() * 10) + 1;
        }
        else {
            this.column = Math.floor(Math.random() * (max - min) + min);
            this.row = Math.floor(Math.random() * 10 + min);
        }
    };
    //@comment
    ShipGenerate.prototype.check = function (plansza, action) {
        var drawing = true;
        if (this.mast == 1) {
            if (plansza[this.row][this.column] == 0 && plansza[this.row + 1][this.column] == 0 && plansza[this.row - 1][this.column] == 0 && plansza[this.row][this.column + 1] == 0 && plansza[this.row][this.column - 1] == 0 && plansza[this.row + 1][this.column + 1] == 0 && plansza[this.row + 1][this.column - 1] == 0 && plansza[this.row - 1][this.column + 1] == 0 && plansza[this.row - 1][this.column - 1] == 0) {
                drawing = true;
            }
            else {
                drawing = false;
            }
        }
        //KIERUNEK PION
        else if (this.direction == 0) {
            //SPRAWDZANIE CZY MOŻNA RYSOWAĆ
            for (var i = 0; i < this.mast; i++) {
                if (action == "hover" || action == "click") {
                    if (this.row <= 11 - this.mast) {
                        if (plansza[this.row + i][this.column] == 0 && plansza[this.row + i + 1][this.column] == 0 && plansza[this.row + i - 1][this.column] == 0 && plansza[this.row + i][this.column + 1] == 0 && plansza[this.row + i][this.column - 1] == 0 && plansza[this.row + i + 1][this.column + 1] == 0 && plansza[this.row + i - 1][this.column - 1] == 0 && plansza[this.row + i + 1][this.column - 1] == 0 && plansza[this.row + i - 1][this.column + 1] == 0) {
                            drawing = true;
                        }
                        else {
                            drawing = false;
                            break;
                        }
                    }
                    else {
                        drawing = false;
                        break;
                    }
                }
                else {
                    if (plansza[this.row + i][this.column] == 0 && plansza[this.row + i + 1][this.column] == 0 && plansza[this.row + i - 1][this.column] == 0 && plansza[this.row + i][this.column + 1] == 0 && plansza[this.row + i][this.column - 1] == 0 && plansza[this.row + i + 1][this.column + 1] == 0 && plansza[this.row + i - 1][this.column - 1] == 0 && plansza[this.row + i + 1][this.column - 1] == 0 && plansza[this.row + i - 1][this.column + 1] == 0) {
                        drawing = true;
                    }
                    else {
                        drawing = false;
                        break;
                    }
                }
            }
        }
        //KIERUNEK POZIOM
        else if (this.direction == (-1)) {
            //SPRAWDZANIE CZY MOŻNA RYSOWAĆ
            for (var i = 0; i < this.mast; i++) {
                if (plansza[this.row][this.column + i] == 0 && plansza[this.row][this.column + i + 1] == 0 && plansza[this.row][this.column + i - 1] == 0 && plansza[this.row + 1][this.column + i] == 0 && plansza[this.row - 1][this.column + 1] == 0 && plansza[this.row + 1][this.column + i + 1] == 0 && plansza[this.row - 1][this.column + i - 1] == 0 && plansza[this.row + 1][this.column + i - 1] == 0 && plansza[this.row - 1][this.column + i + 1] == 0) {
                    drawing = true;
                }
                else {
                    drawing = false;
                    break;
                }
            }
        }
        else {
            console.log("Err");
        }
        return drawing;
    };
    ShipGenerate.prototype.generate = function () {
        if (this.direction == 0) {
            for (var j = 0; j < this.mast; j++) {
                _main__WEBPACK_IMPORTED_MODULE_1__["plansza"][this.row + j][this.column] = 1;
            }
        }
        else {
            for (var j = 0; j < this.mast; j++) {
                _main__WEBPACK_IMPORTED_MODULE_1__["plansza"][this.row][this.column + j] = 1;
            }
        }
    };
    ShipGenerate.prototype.usersShipsDraving = function (mast) {
        this.mast = mast;
        var shipContainer = document.createElement('div');
        shipContainer.className = "shipContainer " + "mast-" + mast;
        for (var i = 0; i < mast; i++) {
            var section = document.createElement('div');
            if (_Board__WEBPACK_IMPORTED_MODULE_0__["ob"].checkedShip == mast) {
                section.className = "sectionUserCheck";
            }
            else {
                section.className = "sectionUser";
            }
            shipContainer.appendChild(section);
        }
        if (this.mast == 4) {
            checkedSection = shipContainer;
        }
        _main__WEBPACK_IMPORTED_MODULE_1__["panel"].appendChild(shipContainer);
        shipContainer.addEventListener("click", checkUserShip);
        shipContainer.addEventListener("mouseover", hoverUserShip);
        function checkUserShip() {
            var ships = document.getElementsByClassName("shipContainer");
            for (var i = 0; i < ships.length; i++) {
                for (var j = 0; j < ships[i].children.length; j++) {
                    ships[i].children[j].setAttribute("class", "sectionUser");
                }
            }
            checkedSection = this;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setAttribute("class", "sectionUserCheck");
            }
            var mast = this.className.split("-")[1];
            _Board__WEBPACK_IMPORTED_MODULE_0__["ob"].checkedShip = parseInt(mast);
        }
        function hoverUserShip() {
            var ships = document.getElementsByClassName("shipContainer");
            for (var i = 0; i < ships.length; i++) {
                for (var j = 0; j < ships[i].children.length; j++) {
                    if (ships[i].children[j].className !== "sectionUserCheck") {
                        ships[i].children[j].setAttribute("class", "sectionUser");
                    }
                }
            }
            var tab = this.children;
            for (var i = 0; i < tab.length; i++) {
                if (tab[i].className !== "sectionUserCheck") {
                    tab[i].setAttribute("class", "sectionUserHover");
                }
            }
        }
    };
    return ShipGenerate;
}());



/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! exports provided: gamefieldsize, shipColor, plansza, plansza2, board1, board2, panel, clock, startPanel, boardUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gamefieldsize", function() { return gamefieldsize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shipColor", function() { return shipColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plansza", function() { return plansza; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plansza2", function() { return plansza2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "board1", function() { return board1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "board2", function() { return board2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "panel", function() { return panel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clock", function() { return clock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startPanel", function() { return startPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boardUser", function() { return boardUser; });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./Board.ts");
/* harmony import */ var _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipGenerate */ "./ShipGenerate.ts");


var gamefieldsize = 12;
var shipColor = "rgb(8, 56, 84)";
var plansza = [];
var plansza2 = [];
var board1;
var board2;
var panel;
var clock;
var startPanel;
var boardUser;
document.addEventListener("DOMContentLoaded", function (event) {
    board1 = document.getElementById("gamefield1");
    board2 = document.getElementById("gamefield2");
    board2.oncontextmenu = function (e) {
        e.preventDefault();
    };
    var nameplayer1 = document.getElementById("player1");
    var nameplayer2 = document.getElementById("player2");
    panel = document.getElementById("shipsPanel");
    clock = document.getElementById("clock");
    startPanel = document.getElementById("startPanel");
    var boardPC = new _Board__WEBPACK_IMPORTED_MODULE_0__["Board"]("computer");
    if (nameplayer1)
        nameplayer1.innerHTML = "KOMPUTER";
    boardPC.init(plansza);
    /***********STATKI*************/
    var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var canDrawing;
    //RYSOWANIE STATKÓW
    ships.forEach(function (number) {
        //LOSOWANIE STATKÓW PC
        var ship = new _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["ShipGenerate"]("computer", 0, 0, 0, 0);
        ship.randomNumbers(number);
        canDrawing = ship.check(plansza, "pc");
        if (canDrawing) {
            ship.generate();
        }
        else {
            while (!canDrawing) {
                ship.randomNumbers(number);
                canDrawing = ship.check(plansza, "pcAgain");
            }
            ship.generate();
        }
        //RYSOWANIE W PANELU BOCZNYM STATKÓW GRACZA
        var shipUser = new _ShipGenerate__WEBPACK_IMPORTED_MODULE_1__["ShipGenerate"]("User", 0, 0, 0, 0);
        shipUser.usersShipsDraving(number);
    });
    boardPC.drawing(board1, plansza);
    boardUser = new _Board__WEBPACK_IMPORTED_MODULE_0__["Board"]("User");
    if (nameplayer2)
        nameplayer2.innerHTML = "USER";
    boardUser.init(plansza2);
    boardUser.drawing(board2, plansza2);
});


/***/ })

/******/ });
//# sourceMappingURL=Main.js.map