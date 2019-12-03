import getInput from './util/input';

function question3(input: number[], noun: number, verb: number): number {
    const list: number[] = input.slice();
    list[1] = noun;
    list[2] = verb;
    for (let i = 0; i < list.length; i += 4) {
        const opcode: number = list[i];
        let reg: number = 0, a: number = 0, b: number = 0;
        if (opcode === 99) {
            return list[0];
        } else {
            a = list[list[i+1]];
            b = list[list[i+2]];
            reg = list[i+3];
            list[reg] = (opcode === 1)? a + b: a * b;
        }
    }
    return list[0];
}

function question4(input: number[]): number {
    for (let i = 0; i < 100; ++i) {
        for (let j = 0; j < 100; ++j) {
            const out: number = question3(input, i, j);
            if (out === 19690720) {
                return 100 * i + j;
            }
        }
    }
    return -1;
}

getInput(2, (data: string) => {
    const opcodes: number[] = data.split(',').map((str: string) => +str);

    const answer3: number = question3(opcodes, 12, 2);
    const answer4: number = question4(opcodes);

    console.log("Q3: ", answer3);
    console.log("Q4: ", answer4);
});
