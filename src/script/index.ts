interface IConfig {
    name: string;
    age: number;
}

function getConfig(): IConfig {
    return {
        name: 'test',
        age: 18
    };
}

function main() {
    let H1 = document.querySelector('h1')!;
    H1.innerHTML = 'Luana!';
}

window.onload = main;