import getInput from './util/input';

function question9(numList: number[], input: number): number {
    const list: number[] = numList.slice();
    let output: number = -1;

    for (let i = 0; i < list.length; i++) {
        const opcode: number = list[i] % 100;
        const mode: number = Math.floor(list[i] / 100);
        const modeA: number = mode % 10;
        const modeB: number = Math.floor(mode / 10) % 10;
        let reg: number = 0, a: number = 0, b: number = 0;
        if (opcode === 99) {
            return output;
        } else if (opcode === 1 || opcode === 2) {
            a   = (modeA === 0)? list[list[i+1]]: list[i+1];
            b   = (modeB === 0)? list[list[i+2]]: list[i+2];
            reg = list[i+3];
            list[reg] = (opcode === 1)? a + b: a * b;
            i += 3;
        } else if (opcode === 3 || opcode === 4) {
            if (opcode === 3) {
                list[list[i+1]] = input;
            } else if (opcode === 4) {
                output = (modeA === 0)? list[list[i+1]]: list[i+1];
            }
            i++;
        }
    }
    return output;
}

function question10(numList: number[], input: number): number {
    const list: number[] = numList.slice();
    let output: number = -1;

    for (let i = 0; i < list.length; i++) {
        const opcode: number = list[i] % 100;
        const mode: number = Math.floor(list[i] / 100);
        const modeA: number = mode % 10;
        const modeB: number = Math.floor(mode / 10) % 10;
        const modeC: number = Math.floor(mode / 100);
        let reg: number = 0, a: number = 0, b: number = 0;
        if (opcode === 99) {
            return output;
        } else if (opcode === 1 || opcode === 2) {
            a   = (modeA === 0)? list[list[i+1]]: list[i+1];
            b   = (modeB === 0)? list[list[i+2]]: list[i+2];
            reg = list[i+3];
            list[reg] = (opcode === 1)? a + b: a * b;
            i += 3;
        } else if (opcode === 3 || opcode === 4) {
            if (opcode === 3) {
                list[list[i+1]] = input;
            } else if (opcode === 4) {
                output = (modeA === 0)? list[list[i+1]]: list[i+1];
            }
            i++;
        } else if (opcode === 5 || opcode === 6) {
            a = (modeA === 0)? list[list[i+1]]: list[i+1];
            b = (modeB === 0)? list[list[i+2]]: list[i+2];
            const nonZero: boolean = a !== 0;
            if ((nonZero && opcode === 5) || (!nonZero && opcode === 6)) {
                i = b - 1;
            } else {
                i += 2;
            }
        } else if (opcode === 7 || opcode === 8) {
            a   = (modeA === 0)? list[list[i+1]]: list[i+1];
            b   = (modeB === 0)? list[list[i+2]]: list[i+2];
            reg = list[i+3];
            let result: number = 0;
            if ((opcode === 7 && a < b) || (opcode === 8 && a === b)) {
                result = 1;
            }
            list[reg] = result;
            i += 3;
        }
    }
    return output;
}

getInput(5, (data: string) => {
    const numList: number[] = data.split(",").map((str: string) => +str);
    const answer9: number = question9(numList, 1);
    const answer10: number = question10(numList, 5);

    console.log("Q9: ", answer9);
    console.log("Q10: ", answer10);
});
