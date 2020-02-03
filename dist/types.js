"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feature;
(function (feature) {
    feature[feature["neg"] = -1] = "neg";
    feature[feature["zero"] = 0] = "zero";
    feature[feature["pos"] = 1] = "pos";
})(feature = exports.feature || (exports.feature = {}));
function is_diacritic(symbol) {
    return symbol.type === "diacritic";
}
exports.is_diacritic = is_diacritic;
function is_letter(symbol) {
    return symbol.type === "letter";
}
exports.is_letter = is_letter;