import { gamefieldsize, shipColor, plansza, plansza2, panel, startPanel, boardUser, board2, board1, clock } from "./main";
import { ShipGenerate, checkedSection } from "./ShipGenerate";
import { comment2 } from "./Decorators";

export var ob: any = {
    checkedShip: 4,
    startDecorate: false
};

var addShipLimit: boolean = false;
var addShipClick: boolean = true;
var planszaUser: Array<Array<number>>;
var planszaPC: Array<Array<number>>;
var moveUser: number = 0;
var scorePC: number = 0;
var scoreUser: number = 0;

var shotingRow: number;
var shotingColumn: number;

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
]

var road = [
    "1-1", "2-2", "3-3", "4-4", "5-5", "6-6", "7-7", "8-8", "9-9", "10-10",
    "1-5", "2-6", "3-7", "4-8", "5-9", "6-10",
    "1-9", "2-10",
    "5-1", "6-2", "7-3", "8-4", "9-5", "10-6",
    "9-1", "10-2"
]

var currentShotRow = -1;
var currentShotColumn = -1;
var actualDirection = "";

var grow = 0;
var shotingAround: boolean = false;
var counter1 = 0;
var counter2 = 0;


export class Board {
    who: string;

    constructor(player: string) {
        this.who = player;
    }


    init(planszaPar: Array<Array<number>>): void {
        for (var i: number = 0; i < gamefieldsize; i++) {
            var planszaMin: Array<number> = [];
            planszaPar.push(planszaMin);
            for (var j: number = 0; j < gamefieldsize; j++) {
                planszaPar[i][j] = 0;
            }
        }
        planszaUser = plansza2;
        planszaPC = plansza;
    }

    @comment2
    score(score1: number, score2: number): object {
        var scores = {
            score1: score1,
            score2: score2,
        }

        return scores;
    }

    drawing(board: HTMLElement, plansza: Array<Array<number>>): void {
        board.innerHTML = " ";
        if (board) {
            for (var i: number = 1; i < gamefieldsize - 1; i++) {
                for (var j: number = 1; j < gamefieldsize - 1; j++) {

                    var section = document.createElement('div');
                    section.className = "section";

                    if (plansza[i][j] == 0) {
                        if (this.who == "User") { section.id = i + "-" + j; }
                        else { section.id = "PC-" + i + "-" + j; }
                    }
                    else {
                        section.style.backgroundColor = shipColor;
                        if (this.who == "User") { section.id = i + "-" + j; }
                        else { section.id = "PC-" + i + "-" + j; }
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

        var direction: number = (-1);

        function addingShips(this: any, event: any) {
            var id = this.id;
            var row = parseInt(id.split("-")[0]);
            var column = parseInt(id.split("-")[1]);

            //zmiana kierunku
            if (event.which == 3) {
                direction == (-1) ? direction = 0 : direction = (-1);
                //czyszczenie
                addingShipsHoverOut()
                //rysowanie dynamiczne
                addingShipsHover(row, column)
            }


            //DODANIE STATKU
            else {

                var shipU = new ShipGenerate("users", row, column, direction, ob.checkedShip);
                var test: boolean = shipU.check(plansza2, "click");

                if (test && ob.checkedShip !== 0 && event.which == 1) {
                    for (var i = 0; i < ob.checkedShip; i++) {
                        if (direction == (-1)) {
                            plansza2[row][column + i] = 1
                        }

                        if (direction == (0)) {
                            plansza2[row + i][column] = 1
                        }
                    }
                    //usuwanie dodanego juz statku
                    panel.removeChild(checkedSection)


                    //ZACZĘCIE ROZGRYWKI!!!!!!!
                    if (panel.children.length == 1) {
                        panel.innerHTML = " ";
                        var div = document.getElementById("pc") as HTMLElement;
                        div.style.display = "block"
                        //włączanie ekranu powitalnego
                        startPanel.style.display = "flex";
                        var timer = document.getElementById("timer") as HTMLElement;
                        var second: number = 5;

                        var timing = setInterval(function () {
                            second--;
                            timer.innerHTML = "ROZGRYWKA ZACZNIE SIĘ ZA: " + second + " SEKUND";
                            if (second == 0) {
                                clearInterval(timing);
                                startPanel.style.display = "none";
                            }
                        }, 1000)

                        shoting()

                    }



                }
                else {
                    //JEŚLI KLIKNĘ W OGRANICZONY STATEK (3 MASZTOWIEC NA POLU 11-11)
                    if (addShipLimit && ob.checkedShip !== 0 && event.which == 1 && addShipClick) {
                        var properyty1: number = 0
                        var properyty2: number = 0

                        for (let ii = 11 - ob.checkedShip; ii < 11; ii++) {
                            shipU.direction == (-1) ? (properyty1 = row, properyty2 = ii) : (properyty1 = ii, properyty2 = column);

                            if (plansza2[properyty1][properyty2] != undefined) {

                                if (plansza2[properyty1][properyty2] == 0) {
                                    plansza2[properyty1][properyty2] = 1;
                                }

                            }

                        }

                        //console.log(plansza2, "----- PLANSZA2")
                        //usuwanie dodanego juz statku
                        panel.removeChild(checkedSection)
                        if (panel.children.length == 1) { panel.innerHTML = " " }
                    }

                }

                ob.checkedShip = 0;
                boardUser.drawing(board2, plansza2);
            }


        }


        function addingShipsHover(this: any, row: number, column: number) {
            var shipHover = new ShipGenerate("usersHover", row, column, direction, ob.checkedShip);
            ob.startDecorate = true;
            var test: boolean = shipHover.check(plansza2, "hover");

            var properyty1: number = 0;
            var properyty2: number = 0;
            var properyty3: number = 0;
            var properyty4: number = 0;

            var limit: number = 5;


            direction == (-1) ? limit = column : limit = row;


            if (limit <= 11 - ob.checkedShip) {
                addShipLimit = false;

                for (let i = 0; i < ob.checkedShip; i++) {
                    direction == (-1) ? (properyty1 = 0, properyty2 = i) : (properyty1 = i, properyty2 = 0);

                    if (plansza2[row + properyty1][column + properyty2] != undefined) {

                        if (test) {
                            if (plansza2[row + properyty1][column + properyty2] == 0) {
                                let div = document.getElementById((row + properyty1) + "-" + (column + properyty2)) as HTMLElement;
                                div.style.backgroundColor = "#0E9E8D";
                                addShipClick = true;
                            }
                        }

                        else {

                            if (plansza2[row + properyty1][column + properyty2] == 0) {
                                let div = document.getElementById((row + properyty1) + "-" + (column + properyty2)) as HTMLElement;
                                if (div) { div.style.backgroundColor = "#E84017"; addShipClick = false; }
                            }

                        }
                    }

                }
            }
            else {
                addShipLimit = true;

                for (let i = 11 - ob.checkedShip; i < 11; i++) {
                    direction == (-1) ? (properyty1 = row, properyty2 = i) : (properyty1 = i, properyty2 = column);
                    direction == (-1) ? (properyty3 = 1, properyty4 = 0) : (properyty3 = 0, properyty4 = 1);


                    if (plansza2[properyty1][properyty2] != undefined) {

                        if (plansza2[properyty1][properyty2] == 0 && plansza2[properyty1 + properyty3][properyty2 + properyty4] == 0 && plansza2[properyty1 - properyty3][properyty2 - properyty4] == 0) {
                            let div = document.getElementById((properyty1) + "-" + (properyty2)) as HTMLElement;
                            div.style.backgroundColor = "#0E9E8D";
                            addShipClick = true;
                        }
                        else if (plansza2[properyty1][properyty2] == 0) {
                            let div = document.getElementById((properyty1) + "-" + (properyty2)) as HTMLElement;
                            div.style.backgroundColor = "#E84017";
                            addShipClick = false;
                        }

                    }

                }
            }



        }


        function addingShipsHoverOut() {

            var sections = document.getElementsByClassName("section") as any;
            for (i = 0; i < sections.length; i++) {

                if (sections[i].style.backgroundColor != shipColor) {
                    sections[i].style.backgroundColor = "white";
                }
            }

        }

        function shoting() {
            console.log("Plansza 1", planszaUser)
            console.log("Plansza 2", planszaPC)

            var blocksUser = board2.children;
            var blocksPC = board1.children;

            for (let i = 0; i < blocksPC.length; i++) {
                blocksPC[i].addEventListener("click", shotClick);
            }

            var alerts = document.getElementById("alerts") as HTMLElement;
            alerts.innerHTML = ' ';

        }

        function shotClick() {
            if (scorePC > 19 || scoreUser > 19) {
                if (scorePC > scoreUser) { document.body.innerHTML = "KONIEC GRY PRZEGRAŁEŚ"; }
                else if (scorePC < scoreUser) {
                    alert("KONIEC GRY WYGRAŁEŚ");
                    setTimeout(function () {
                        window.location.reload(false);
                    }, 500)

                }
                else { document.body.innerHTML = "REMISIK"; }
            }

            if (moveUser % 2 == 0) {
                var str = this.id.split("-")
                var row: number = str[1];
                var column: number = str[2];

                if (this.innerHTML == "X" || this.innerHTML == "•") {
                    console.log("ZAJĘTE")
                }
                else {
                    if (planszaPC[row][column] == 0) {
                        this.innerHTML = "•"
                    }
                    else {
                        this.innerHTML = "X"
                        scoreUser++;
                        boardUser.score(scoreUser, scorePC);
                    }

                    clock.style.display = "flex";
                    var directionsShot = ["right", "left", "bottom", "top"]
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
                            var shotingRow: number = parseInt(number[0]);
                            var shotingColumn: number = parseInt(number[1]);
                            var div = document.getElementById(shotingRow + "-" + shotingColumn);
                            //usuwanie z tablicy - brak powtórzeń
                            empty.splice(index, 1);
                        }



                        if (div) {
                            if (planszaUser[shotingRow][shotingColumn] == 0) {
                                div.innerHTML = "•"
                                shotingAround = false;
                                counter1++;
                                if (counter1 > 3) {
                                    counter1 = 0;
                                }
                                counter2 = 0;
                            }
                            else {
                                div.innerHTML = "X"
                                shotingAround = true;
                                currentShotRow = shotingRow;
                                currentShotColumn = shotingColumn;
                                actualDirection = directionsShot[counter1]
                                scorePC++;
                                boardUser.score(scoreUser, scorePC);
                            }
                        }


                        moveUser++;
                        grow++;
                        console.log(empty)

                        clock.style.display = "none";
                    }, 500)

                }





            }
            else {
                //console.log("Nie twój ruch")
            }
            moveUser++;

        }

    }


}