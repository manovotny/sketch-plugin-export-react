import {readFile, writeFile} from './fs-cocoascript';
import {extname, renameExtname} from './path';

global.run = (context) => {
    log('Export React!');

    context.actionContext.exports.forEach((item) => {
        if (extname(item.path) === '.svg') {
            const svg = readFile(item.path);
            const path = renameExtname(item.path, '.js');

            // svgo
            // create react component
            // format js

            writeFile(path, svg);
        }
    });
};
