import {getInputLines} from './util/input';

function question1(input: number[]): number {
    const fuelRequired = function(mass: number): number {
        return Math.floor(mass / 3) - 2;
    }

    return input.reduce(function(total: number, mass: number): number {
        return total + fuelRequired(mass);
    }, 0);
}

function question2(input: number[]): number {
    const fuelRequired = function(mass: number): number {
        const fuel = Math.max(0, Math.floor(mass / 3) - 2);
        return (fuel <= 0)? fuel: fuel + fuelRequired(fuel);
    }

    return input.reduce(function(total: number, mass: number): number {
        return total + fuelRequired(mass);
    }, 0);
}

getInputLines(1, (data: string[]) => {
    const mass: number[] = data.map(str => +str);
    const answer1: number = question1(mass);
    const answer2: number = question2(mass);

    console.log("Q1: ", answer1);
    console.log("Q2: ", answer2);
});
