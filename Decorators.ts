import { ob } from "./Board";

export function comment(target: any, name: string, descriptor: any) {
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        var result = originalMethod.apply(this, args);
        var alerts = document.getElementById("alerts") as HTMLElement;

        if (ob.startDecorate) {
            if (result) {
                alerts.innerHTML = "Możesz tu ustawić statek"
            }
            else {
                alerts.innerHTML = "Niesety, musisz znaleźć inne miejsce"
            }
        }

        return result;
    }
}


export function comment2(target: any, name: string, descriptor: any) {
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        var result = originalMethod.apply(this, args);
        var punkts = document.getElementById("punkts") as HTMLElement;

        if (punkts !== null) { punkts.innerHTML = "Ty: " + result.score1 + ", Komputer: " + result.score2 }

        var alerts = document.getElementById("alerts") as HTMLElement;
        alerts.innerHTML = ' ';

        return result;
    }
}
