"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var main_1 = require("./main");
var ShipGenerate_1 = require("./ShipGenerate");
var Decorators_1 = require("./Decorators");
exports.ob = {
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
        for (var i = 0; i < main_1.gamefieldsize; i++) {
            var planszaMin = [];
            planszaPar.push(planszaMin);
            for (var j = 0; j < main_1.gamefieldsize; j++) {
                planszaPar[i][j] = 0;
            }
        }
        planszaUser = main_1.plansza2;
        planszaPC = main_1.plansza;
    };
    Board.prototype.score = function (score1, score2) {
        var scores = {
            score1: score1,
            score2: score2
        };
        return scores;
    };
    Board.prototype.drawing = function (board, plansza) {
        board.innerHTML = " ";
        if (board) {
            for (var i = 1; i < main_1.gamefieldsize - 1; i++) {
                for (var j = 1; j < main_1.gamefieldsize - 1; j++) {
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
                        section.style.backgroundColor = main_1.shipColor;
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
                var shipU = new ShipGenerate_1.ShipGenerate("users", row, column, direction, exports.ob.checkedShip);
                var test = shipU.check(main_1.plansza2, "click");
                if (test && exports.ob.checkedShip !== 0 && event.which == 1) {
                    for (var i = 0; i < exports.ob.checkedShip; i++) {
                        if (direction == (-1)) {
                            main_1.plansza2[row][column + i] = 1;
                        }
                        if (direction == (0)) {
                            main_1.plansza2[row + i][column] = 1;
                        }
                    }
                    //usuwanie dodanego juz statku
                    main_1.panel.removeChild(ShipGenerate_1.checkedSection);
                    //ZACZĘCIE ROZGRYWKI!!!!!!!
                    if (main_1.panel.children.length == 1) {
                        main_1.panel.innerHTML = " ";
                        var div = document.getElementById("pc");
                        div.style.display = "block";
                        //włączanie ekranu powitalnego
                        main_1.startPanel.style.display = "flex";
                        var timer = document.getElementById("timer");
                        var second = 5;
                        var timing = setInterval(function () {
                            second--;
                            timer.innerHTML = "ROZGRYWKA ZACZNIE SIĘ ZA: " + second + " SEKUND";
                            if (second == 0) {
                                clearInterval(timing);
                                main_1.startPanel.style.display = "none";
                            }
                        }, 1000);
                        shoting();
                    }
                }
                else {
                    //JEŚLI KLIKNĘ W OGRANICZONY STATEK (3 MASZTOWIEC NA POLU 11-11)
                    if (addShipLimit && exports.ob.checkedShip !== 0 && event.which == 1 && addShipClick) {
                        var properyty1 = 0;
                        var properyty2 = 0;
                        for (var ii = 11 - exports.ob.checkedShip; ii < 11; ii++) {
                            shipU.direction == (-1) ? (properyty1 = row, properyty2 = ii) : (properyty1 = ii, properyty2 = column);
                            if (main_1.plansza2[properyty1][properyty2] != undefined) {
                                if (main_1.plansza2[properyty1][properyty2] == 0) {
                                    main_1.plansza2[properyty1][properyty2] = 1;
                                }
                            }
                        }
                        //console.log(plansza2, "----- PLANSZA2")
                        //usuwanie dodanego juz statku
                        main_1.panel.removeChild(ShipGenerate_1.checkedSection);
                        if (main_1.panel.children.length == 1) {
                            main_1.panel.innerHTML = " ";
                        }
                    }
                }
                exports.ob.checkedShip = 0;
                main_1.boardUser.drawing(main_1.board2, main_1.plansza2);
            }
        }
        function addingShipsHover(row, column) {
            var shipHover = new ShipGenerate_1.ShipGenerate("usersHover", row, column, direction, exports.ob.checkedShip);
            exports.ob.startDecorate = true;
            var test = shipHover.check(main_1.plansza2, "hover");
            var properyty1 = 0;
            var properyty2 = 0;
            var properyty3 = 0;
            var properyty4 = 0;
            var limit = 5;
            direction == (-1) ? limit = column : limit = row;
            if (limit <= 11 - exports.ob.checkedShip) {
                addShipLimit = false;
                for (var i_1 = 0; i_1 < exports.ob.checkedShip; i_1++) {
                    direction == (-1) ? (properyty1 = 0, properyty2 = i_1) : (properyty1 = i_1, properyty2 = 0);
                    if (main_1.plansza2[row + properyty1][column + properyty2] != undefined) {
                        if (test) {
                            if (main_1.plansza2[row + properyty1][column + properyty2] == 0) {
                                var div = document.getElementById((row + properyty1) + "-" + (column + properyty2));
                                div.style.backgroundColor = "#0E9E8D";
                                addShipClick = true;
                            }
                        }
                        else {
                            if (main_1.plansza2[row + properyty1][column + properyty2] == 0) {
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
                for (var i_2 = 11 - exports.ob.checkedShip; i_2 < 11; i_2++) {
                    direction == (-1) ? (properyty1 = row, properyty2 = i_2) : (properyty1 = i_2, properyty2 = column);
                    direction == (-1) ? (properyty3 = 1, properyty4 = 0) : (properyty3 = 0, properyty4 = 1);
                    if (main_1.plansza2[properyty1][properyty2] != undefined) {
                        if (main_1.plansza2[properyty1][properyty2] == 0 && main_1.plansza2[properyty1 + properyty3][properyty2 + properyty4] == 0 && main_1.plansza2[properyty1 - properyty3][properyty2 - properyty4] == 0) {
                            var div = document.getElementById((properyty1) + "-" + (properyty2));
                            div.style.backgroundColor = "#0E9E8D";
                            addShipClick = true;
                        }
                        else if (main_1.plansza2[properyty1][properyty2] == 0) {
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
                if (sections[i].style.backgroundColor != main_1.shipColor) {
                    sections[i].style.backgroundColor = "white";
                }
            }
        }
        function shoting() {
            console.log("Plansza 1", planszaUser);
            console.log("Plansza 2", planszaPC);
            var blocksUser = main_1.board2.children;
            var blocksPC = main_1.board1.children;
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
                        main_1.boardUser.score(scoreUser, scorePC);
                    }
                    main_1.clock.style.display = "flex";
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
                                main_1.boardUser.score(scoreUser, scorePC);
                            }
                        }
                        moveUser++;
                        grow++;
                        console.log(empty);
                        main_1.clock.style.display = "none";
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
        Decorators_1.comment2
    ], Board.prototype, "score");
    return Board;
}());
exports.Board = Board;
