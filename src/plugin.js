import {readFile, writeFile} from './fs-cocoascript';
import {extname, renameExtname} from './path';
import {nsStringToString} from './utils';

global.run = (context) => {
    context.actionContext.exports.forEach((item) => {
        const path = nsStringToString(item.path);

        if (extname(path) === '.svg') {
            const svg = readFile(path);
            const reactPath = renameExtname(path, '.js');

            // svgo
            // create react component
            // format js

            writeFile(reactPath, svg);
        }
    });
};
