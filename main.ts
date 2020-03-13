import { Board } from "./Board";
import { ShipGenerate } from "./ShipGenerate";

export let gamefieldsize: number = 12;
export var shipColor: string = "rgb(8, 56, 84)";
export var plansza: Array<Array<number>> = [];
export var plansza2: Array<Array<number>> = [];

export var board1: HTMLElement;
export var board2: HTMLElement;

export var panel: HTMLElement;
export var clock: HTMLElement;
export var startPanel: HTMLElement;
export var boardUser: any;


document.addEventListener("DOMContentLoaded", function (event) {

    board1 = document.getElementById("gamefield1") as HTMLElement;
    board2 = document.getElementById("gamefield2") as HTMLElement;

    board2.oncontextmenu = function (e) {
        e.preventDefault();
    }

    var nameplayer1: HTMLElement | null = document.getElementById("player1");
    var nameplayer2: HTMLElement | null = document.getElementById("player2");

    panel = document.getElementById("shipsPanel") as HTMLElement;
    clock = document.getElementById("clock") as HTMLElement;
    startPanel = document.getElementById("startPanel") as HTMLElement;


    const boardPC = new Board("computer");
    if (nameplayer1) nameplayer1.innerHTML = "KOMPUTER"
    boardPC.init(plansza);


    /***********STATKI*************/

    var ships: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    var canDrawing: boolean;

    //RYSOWANIE STATKÓW
    ships.forEach(number => {
        //LOSOWANIE STATKÓW PC
        var ship = new ShipGenerate("computer", 0, 0, 0, 0);
        ship.randomNumbers(number);
        canDrawing = ship.check(plansza, "pc");

        if (canDrawing) { ship.generate() }
        else {
            while (!canDrawing) {
                ship.randomNumbers(number);
                canDrawing = ship.check(plansza, "pcAgain");
            }
            ship.generate()
        }

        //RYSOWANIE W PANELU BOCZNYM STATKÓW GRACZA
        var shipUser = new ShipGenerate("User", 0, 0, 0, 0);
        shipUser.usersShipsDraving(number);

    });


    boardPC.drawing(board1, plansza);

    boardUser = new Board("User");
    if (nameplayer2) nameplayer2.innerHTML = "USER"
    boardUser.init(plansza2);
    boardUser.drawing(board2, plansza2);
    
});

