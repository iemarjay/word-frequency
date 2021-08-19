import WordFrequency from "./src/WordFrequency.js";
import { resolve } from "path";
import fs from "fs";

const paths = {
    long: 'texts/long.txt',
    longer: 'texts/longer.txt',
    wiki: 'texts/wiki.txt',
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

// const f = new WordFrequency(
//     fs.readFileSync(path, "utf-8")
// ).getFrequency();
//
// fs.writeFile(
//     resolve('frequency.txt'),
//     Object.keys(f).reduce((carry, key) => {
//         return `${carry}${key}: ${f[key]}<br/>`
//     }, ''),
//     (error) => console.log(error));
