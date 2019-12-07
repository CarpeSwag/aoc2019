import {getInputLines} from './util/input';

function mapDirection(dir: string): number[] {
    switch (dir) {
        case 'U':
            return [0, 1];
        case 'D':
            return [0, -1];
        case 'L':
            return [-1, 0];
        case 'R':
            return [1, 0];
    }
    return [0,0];
}

class Direction {
    dir: number[];
    dist: number;

    constructor(dir: string, dist: number) {
        this.dir = mapDirection(dir);
        this.dist = dist;
    }
}

function question5(input: Direction[][]): number {
    const map: {[key: string]: boolean} = {};
    let x: number = 0;
    let y: number = 0;
    let closest: number = Infinity;
    map['0,0'] = true;
    for(let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[i].length; ++j) {
            const dx: number = input[i][j].dir[0];
            const dy: number = input[i][j].dir[1];
            let dist: number = input[i][j].dist;
            while (dist --> 0) {
                x += dx;
                y += dy;
                const curr: string = `${x},${y}`;
                if (i === 0) {
                    map[curr] = true;
                } else if (map[curr] !== undefined) {
                    const manDist: number = Math.abs(x) + Math.abs(y);
                    if (manDist < closest) {
                        closest = manDist;
                    }
                }
            }
        }
        x = 0;
        y = 0;
    }
    return closest;
}

function question6(input: Direction[][]): number {
    const map: {[key: string]: number} = {};
    let x: number = 0;
    let y: number = 0;
    
    let closest: number = Infinity;
    let len: number = 0;
    map['0,0'] = 0;
    for(let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[i].length; ++j) {
            const dx: number = input[i][j].dir[0];
            const dy: number = input[i][j].dir[1];
            let dist: number = input[i][j].dist;
            while (dist --> 0) {
                x += dx;
                y += dy;
                len++;
                const curr: string = `${x},${y}`;
                if (i === 0) {
                    map[curr] = len;
                } else if (map[curr] !== undefined) {
                    const traveled = map[curr] + len;
                    if (traveled < closest) {
                        closest = traveled;
                    }
                }
            }
        }
        len = 0;
        x = 0;
        y = 0;
    }
    return closest;
}

getInputLines(3, (data: string[]) => {
    const wires: Direction[][] = data.map((wire: string) => {
        return wire.split(',').map((str: string) => new Direction(str.substring(0,1), +str.substring(1)));
    });

    const answer5: number = question5(wires);
    const answer6: number = question6(wires);

    console.log("Q5: ", answer5);
    console.log("Q6: ", answer6);
});
