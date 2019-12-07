import getInput from './util/input';

function isPassword(password: number, strictDouble: boolean = false): boolean {
    // Check if ascending
    let count: {[key: number]: number} = {};
    let last: number = Infinity;
    let iter: number = password;
    while (iter > 0) {
        const curr: number = iter % 10;
        iter = Math.floor(iter / 10);
        if (curr > last) return false;
        last = curr;

        // Increment counts
        if (count[curr] === undefined) count[curr] = 0;
        count[curr]++;
    }

    let hasDouble: boolean = false;
    Object.values(count).forEach((num: number) => hasDouble = hasDouble || (num === 2 || (num >= 2 && !strictDouble)));
    return hasDouble;
}

function question7(range: number[]): number {
    let counter: number = 0;
    for (let i = range[0]; i <= range[1]; ++i) {
        if (isPassword(i)) counter++;
    }
    return counter;
}

function question8(range: number[]): number {
    let counter: number = 0;
    for (let i = range[0]; i <= range[1]; ++i) {
        if (isPassword(i, true)) counter++;
    }
    return counter;
}

getInput(4, (data: string) => {
    const range: number[] = data.split("-").map((str: string) => +str);
    const answer7: number = question7(range);
    const answer8: number = question8(range);

    console.log("Q7: ", answer7);
    console.log("Q8: ", answer8);
});
