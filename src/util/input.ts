import * as https from "https";
import * as fs from 'fs';
import key from "./key";

function request(url: string, path: string, onSuccess: Function) {
    https.get(url, {headers: {Cookie: `session=${key}`}},
        res => {
            res.on('data', buf => {
                const data: string = String.fromCharCode.apply(null, new Uint16Array(buf));
                fs.writeFile(path, data, () => {});
                onSuccess(data);
            })
        }
    );
}

export default function getInput(day: number, onSuccess: Function) {
    // Check filesystem first to see if we've downloaded it
    const path = `${__dirname}/../inputs/day_${day}.in`;
    if (fs.existsSync(path)) {
        const input: string = fs.readFileSync(path, "utf8");
        onSuccess(input);
        return;
    }

    // Download it otherwise and continue
    const url = `https://adventofcode.com/2019/day/${day}/input`;
    request(url, path, onSuccess);
}

export function getInputLines(day: number, onSuccess: Function) {
    getInput(day, data => {
        const lines: string[] = data.split('\n').filter(str => str.length > 0);
        onSuccess(lines);
    });
}
