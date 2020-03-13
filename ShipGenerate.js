"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var main_1 = require("./main");
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
                main_1.plansza[this.row + j][this.column] = 1;
            }
        }
        else {
            for (var j = 0; j < this.mast; j++) {
                main_1.plansza[this.row][this.column + j] = 1;
            }
        }
    };
    ShipGenerate.prototype.usersShipsDraving = function (mast) {
        this.mast = mast;
        var shipContainer = document.createElement('div');
        shipContainer.className = "shipContainer " + "mast-" + mast;
        for (var i = 0; i < mast; i++) {
            var section = document.createElement('div');
            if (Board_1.ob.checkedShip == mast) {
                section.className = "sectionUserCheck";
            }
            else {
                section.className = "sectionUser";
            }
            shipContainer.appendChild(section);
        }
        if (this.mast == 4) {
            exports.checkedSection = shipContainer;
        }
        main_1.panel.appendChild(shipContainer);
        shipContainer.addEventListener("click", checkUserShip);
        shipContainer.addEventListener("mouseover", hoverUserShip);
        function checkUserShip() {
            var ships = document.getElementsByClassName("shipContainer");
            for (var i = 0; i < ships.length; i++) {
                for (var j = 0; j < ships[i].children.length; j++) {
                    ships[i].children[j].setAttribute("class", "sectionUser");
                }
            }
            exports.checkedSection = this;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].setAttribute("class", "sectionUserCheck");
            }
            var mast = this.className.split("-")[1];
            Board_1.ob.checkedShip = parseInt(mast);
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
exports.ShipGenerate = ShipGenerate;
