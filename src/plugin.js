import path from 'path-browserify';

import {readFile, writeFile} from './fs-cocoascript';
import svgo from './svgo-sync';

global.run = (context) => {
    context.actionContext.exports.forEach((item) => {
        if (path.extname(item.path) === '.svg') {
            const svg = readFile(item.path);
            // const optimized = svgo(svg);

            // svgo
            // create react component
            // format js

            writeFile(item.path, 'asdf');
        }
    });
};
