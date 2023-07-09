"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const humans_parent = document.getElementById("humans");
const BLOOD_TYPES = {
    "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A−": ["A−", "A+", "AB−", "AB+"],
    "A+": ["A+", "AB+"],
    "B−": ["B−", "B+", "AB−", "AB+"],
    "B+": ["B+", "AB+"],
    "AB−": ["AB−", "AB+"],
    "AB+": ["AB+"]
};
const reset_button = document.getElementById("reset");
const selector = document.getElementById("blood_selector");
const blood_vias = document.querySelectorAll("#humans .human .blood_via");
const blood_bag = document.querySelector("#blood_content > div.main_bag > div");
const center_via = document.querySelector(".center_via > .blood_via");
const blood_types = document.querySelectorAll(".blood_type");
let lastCalled;
addListeners();
function callIfChildren(e) {
    if (lastCalled)
        change();
    if (e.target !== this)
        setRecipents(e);
}
function addListeners() {
    if (!selector)
        return;
    selector.addEventListener("click", callIfChildren);
    if (!reset_button)
        return;
    reset_button.addEventListener("click", reset);
}
function reset() {
    change();
    if (!blood_bag)
        return;
    blood_bag.style.height = "100px";
    if (!center_via)
        return;
    center_via.style.height = "0px";
}
function change() {
    if (lastCalled) {
        lastCalled.target.classList.remove("highlight");
    }
    for (let i = 0; i < blood_vias.length; i++) {
        blood_vias[i].style.width = "0px";
        blood_types[i].classList.remove("highlightText");
    }
}
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, Number(ms)));
}
function setRecipents(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = e.target;
        target.classList.add("highlight");
        lastCalled = { target };
        const donor = target.innerText;
        for (let item of BLOOD_TYPES[donor]) {
            const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
            const height = 50 + 50 * Math.floor(recipent_index / 2);
            const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
            if (blood_bag) {
                blood_bag.style.height = `${blood_height}px`;
            }
            if (center_via) {
                center_via.style.height = `${height}px`;
            }
            yield timeout(100);
            if (blood_vias[recipent_index]) {
                blood_vias[recipent_index].style.width = "100%";
            }
            if (blood_types[recipent_index]) {
                blood_types[recipent_index].classList.add("highlightText");
            }
        }
    });
}
window.onload = addListeners;
