import WordFrequency from "./src/WordFrequency.js";
import { resolve } from "path";
import fs from "fs";

const paths = {
    long: 'src/textSamples/long.txt',
    longer: 'src/textSamples/longer.txt',
    wiki: 'src/textSamples/wiki.txt',
}

const argument = process.argv[2] || 'wiki';
let path;

if (fs.existsSync(resolve(argument))) {
    path = resolve(argument);
} else if (paths.hasOwnProperty(argument)){
    path = resolve(paths[argument])
} else {
    throw new Error('File not found');
}

console.log(
    new WordFrequency(
        fs.readFileSync(path, "utf-8")
    ).getFrequency()
)
