"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var ShipGenerate_1 = require("./ShipGenerate");
exports.gamefieldsize = 12;
exports.shipColor = "rgb(8, 56, 84)";
exports.plansza = [];
exports.plansza2 = [];
document.addEventListener("DOMContentLoaded", function (event) {
    exports.board1 = document.getElementById("gamefield1");
    exports.board2 = document.getElementById("gamefield2");
    exports.board2.oncontextmenu = function (e) {
        e.preventDefault();
    };
    var nameplayer1 = document.getElementById("player1");
    var nameplayer2 = document.getElementById("player2");
    exports.panel = document.getElementById("shipsPanel");
    exports.clock = document.getElementById("clock");
    exports.startPanel = document.getElementById("startPanel");
    var boardPC = new Board_1.Board("computer");
    if (nameplayer1)
        nameplayer1.innerHTML = "KOMPUTER";
    boardPC.init(exports.plansza);
    /***********STATKI*************/
    var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    var canDrawing;
    //RYSOWANIE STATKÓW
    ships.forEach(function (number) {
        //LOSOWANIE STATKÓW PC
        var ship = new ShipGenerate_1.ShipGenerate("computer", 0, 0, 0, 0);
        ship.randomNumbers(number);
        canDrawing = ship.check(exports.plansza, "pc");
        if (canDrawing) {
            ship.generate();
        }
        else {
            while (!canDrawing) {
                ship.randomNumbers(number);
                canDrawing = ship.check(exports.plansza, "pcAgain");
            }
            ship.generate();
        }
        //RYSOWANIE W PANELU BOCZNYM STATKÓW GRACZA
        var shipUser = new ShipGenerate_1.ShipGenerate("User", 0, 0, 0, 0);
        shipUser.usersShipsDraving(number);
    });
    boardPC.drawing(exports.board1, exports.plansza);
    exports.boardUser = new Board_1.Board("User");
    if (nameplayer2)
        nameplayer2.innerHTML = "USER";
    exports.boardUser.init(exports.plansza2);
    exports.boardUser.drawing(exports.board2, exports.plansza2);
});
