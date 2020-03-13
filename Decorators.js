"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
function comment(target, name, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalMethod.apply(this, args);
        var alerts = document.getElementById("alerts");
        if (Board_1.ob.startDecorate) {
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
exports.comment = comment;
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
exports.comment2 = comment2;
