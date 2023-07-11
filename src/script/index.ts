const humans_parent: HTMLElement | null = document.getElementById("humans");
const BLOOD_TYPES: Record<string, string[]> = {
    "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A−": ["A−", "A+", "AB−", "AB+"],
    "A+": ["A+", "AB+"],
    "B−": ["B−", "B+", "AB−", "AB+"],
    "B+": ["B+", "AB+"],
    "AB−": ["AB−", "AB+"],
    "AB+": ["AB+"]
};
const reset_button: HTMLElement | null = document.getElementById("reset");
const selector: HTMLElement | null = document.getElementById("blood_selector");
const blood_vias: NodeListOf<Element> = document.querySelectorAll("#humans .human .blood_via");
const blood_bag: Element | null = document.querySelector("#blood_content > div.main_bag > div");
const center_via: Element | null = document.querySelector(".center_via > .blood_via");
const blood_types: NodeListOf<Element> = document.querySelectorAll(".blood_type");
let lastCalled: { target: { classList: { remove: (className: string) => void } } } | null;

function callIfChildren(this: any, e: Event) {
    if (lastCalled) change();
    if (e.target !== this) setRecipents(e);
}

function addListeners() {
    if (!selector) return;
    selector.addEventListener("click", callIfChildren);
    if (!reset_button) return;
    reset_button.addEventListener("click", reset);
}

function reset() {
    change();
    if (!blood_bag) return;
    (blood_bag as HTMLElement).style.height = "100px";
    if (!center_via) return;
    (center_via as HTMLElement).style.height = "0px";
}



function change() {
    if (lastCalled) {
        lastCalled.target.classList.remove("highlight");
    }

    for (let i = 0; i < blood_vias.length; i++) {
        (blood_vias[i] as HTMLAreaElement).style.width = "0px";
        blood_types[i].classList.remove("highlightText");
    }
}

function timeout(ms: number | string): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Number(ms)));
}

async function setRecipents(e: Event) {
    const target = e.target as HTMLElement;
    target.classList.add("highlight");

    lastCalled = { target };

    const donor = target.innerText;
    for (let item of BLOOD_TYPES[donor]) {
        const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
        const height = 50 + 50 * Math.floor(recipent_index / 2);
        const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
        if (blood_bag) {
            (blood_bag as HTMLAnchorElement).style.height = `${blood_height}px`;
        }
        if (center_via) {
            (center_via as HTMLAnchorElement).style.height = `${height}px`;
        }

        await timeout(100);
        if (blood_vias[recipent_index]) {
            (blood_vias[recipent_index] as HTMLElement).style.width = "100%";
        }
        if (blood_types[recipent_index]) {
            blood_types[recipent_index].classList.add("highlightText");
        }
    }
}

window.onload = addListeners;
