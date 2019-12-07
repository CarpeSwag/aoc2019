import {getInputLines} from './util/input';
import { stringify } from 'querystring';

class Orbit {
    name: string;
    parent: string;
    steps: number;

    constructor(input: string) {
        const split = input.split(")");
        this.parent = split[0];
        this.name = split[1];
        this.steps = -1;
    }
}

function createOrbitGraph(input: string[]): {[key: string]: Orbit} {
    const center: Orbit = new Orbit(")COM");
    center.steps = 0;
    const orbits: {[key: string]: Orbit} = {"COM": center};
    const orbitsUnknown: Orbit[] = input.map((str: string) => new Orbit(str));

    while (orbitsUnknown.length > 0) {
        for (let i = 0; i < orbitsUnknown.length; ++i) {
            const curr: Orbit = orbitsUnknown[i];
            if (orbits[curr.parent] !== undefined) {
                curr.steps = orbits[curr.parent].steps + 1;
                orbits[curr.name] = orbitsUnknown.splice(i, 1)[0];  
                --i;
            }
        }
    }
    
    return orbits;
}

function getTrace(orbits: {[key: string]: Orbit}, key: string): string[] {
    const start = orbits[key];
    const trace: string[] = [];
    let curr: Orbit = start;
    while (curr.name !== "COM") {
        curr = orbits[curr.parent];
        trace.push(curr.name);
    }
    return trace;
}

function question11(orbits: {[key: string]: Orbit}): number {
    let orbitCount: number = 0;
    Object.values(orbits).forEach(orbit => orbitCount += orbit.steps);
    return orbitCount;
}

function question12(orbits: {[key: string]: Orbit}): number {
    const you: Orbit = orbits["YOU"];
    const san: Orbit = orbits["SAN"];
    const youTrace: string[] = getTrace(orbits, "YOU");
    const sanTrace: string[] = getTrace(orbits, "SAN");
    let cca: Orbit = orbits["COM"]; // Closest Common Ancestor
    for (let i = 0; i < youTrace.length; ++i) {
        for (let j = 0; j < sanTrace.length; ++j) {
            if (youTrace[i] === sanTrace[j]) {
                const curr: Orbit = orbits[youTrace[i]];
                if (curr.steps > cca.steps) {
                    cca = curr;
                }
            }
        }
    }
    
    return (you.steps + san.steps) - ((cca.steps + 1) * 2);
}

getInputLines(6, (data: string[]) => {
    const orbits: {[key: string]: Orbit} = createOrbitGraph(data);
    const answer11: number = question11(orbits);
    const answer12: number = question12(orbits);

    console.log("Q11: ", answer11);
    console.log("Q12: ", answer12);
});
