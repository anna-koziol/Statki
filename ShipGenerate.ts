import { ob } from "./Board";
import { panel, plansza } from "./main";
import { comment } from "./Decorators";

export var checkedSection: HTMLElement;

export class ShipGenerate {
    who: string;
    row: number;
    column: number;
    direction: number;
    mast: number;

    constructor(player: string, row: number, column: number, direction: number, mast: number) {
        this.who = player;
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.mast = mast;
    }

    randomNumbers(mast: number): void {
        var min: number = 1;
        var max: number = 10 - mast + 1;

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


    }

    //@comment
    check(plansza: Array<Array<number>>, action: string): boolean {
        var drawing: boolean = true;

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

            for (var i: number = 0; i < this.mast; i++) {
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
            for (var i: number = 0; i < this.mast; i++) {

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
            console.log("Err")
        }

        return drawing;
    }

    generate(): void {
        if (this.direction == 0) {
            for (var j: number = 0; j < this.mast; j++) {
                plansza[this.row + j][this.column] = 1;
            }
        }
        else {
            for (var j: number = 0; j < this.mast; j++) {
                plansza[this.row][this.column + j] = 1;
            }
        }

    }

    usersShipsDraving(mast: number): void {
        this.mast = mast;
        var shipContainer = document.createElement('div');
        shipContainer.className = "shipContainer " + "mast-" + mast;

        for (let i = 0; i < mast; i++) {
            var section = document.createElement('div');
            if (ob.checkedShip == mast) {
                section.className = "sectionUserCheck";
            }
            else { section.className = "sectionUser"; }
            shipContainer.appendChild(section);
        }

        if (this.mast == 4) { checkedSection = shipContainer }

        panel.appendChild(shipContainer)

        shipContainer.addEventListener("click", checkUserShip);
        shipContainer.addEventListener("mouseover", hoverUserShip);

        function checkUserShip(this: any) {
            var ships: any = document.getElementsByClassName("shipContainer");

            for (let i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].children.length; j++) {
                    ships[i].children[j].setAttribute("class", "sectionUser");
                }
            }

            checkedSection = this;
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].setAttribute("class", "sectionUserCheck");
            }

            var mast = this.className.split("-")[1];
            ob.checkedShip = parseInt(mast);
        }


        function hoverUserShip(this: any) {
            var ships: any = document.getElementsByClassName("shipContainer");

            for (let i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].children.length; j++) {
                    if (ships[i].children[j].className !== "sectionUserCheck") {
                        ships[i].children[j].setAttribute("class", "sectionUser");
                    }
                }
            }

            var tab = this.children;
            for (let i = 0; i < tab.length; i++) {
                if (tab[i].className !== "sectionUserCheck") {
                    tab[i].setAttribute("class", "sectionUserHover");
                }
            }

        }


    }


}
