import * as https from "https";
import * as fs from 'fs';
import key from "./key";

function request(url: string, path: string, onSuccess: Function) {
    https.get(url, {headers: {Cookie: `session=${key}`}},
        res => {
            let data: string = "";
            res.on('data', (buf: Iterable<number>) => {
                const uintBuf: any = new Uint16Array(buf);
                data += String.fromCharCode.apply(null, uintBuf);
            });

            res.on('end', () => {
                fs.writeFile(path, data, () => {});
                onSuccess(data);
            });
        }
    );
}

export default function getInput(day: number, onSuccess: Function) {
    // Check filesystem first to see if we've downloaded it
    const path: string = `${__dirname}/../inputs/day_${day}.in`;
    if (fs.existsSync(path)) {
        const input: string = fs.readFileSync(path, "utf8");
        onSuccess(input);
        return;
    }

    // Download it otherwise and continue
    const url: string = `https://adventofcode.com/2019/day/${day}/input`;
    request(url, path, onSuccess);
}

export function getInputLines(day: number, onSuccess: Function) {
    getInput(day, (data: string) => {
        const lines: string[] = data.split('\n').filter((str: string) => str.length > 0);
        onSuccess(lines);
    });
}
