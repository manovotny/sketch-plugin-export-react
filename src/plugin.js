import SVGO from 'svgo';

import {readFile, writeFile} from './fs-cocoascript';
import {extname, renameExtname} from './path';
import {nsStringToString} from './utils';

global.run = (context) => {
    context.actionContext.exports.forEach((item) => {
        const path = nsStringToString(item.path);

        if (extname(path) === '.svg') {
            const svg = readFile(path);
            const reactPath = renameExtname(path, '.js');
            const options = {
                full: true,
                js2svg: {
                    indent: 4,
                    pretty: true
                },
                plugins: [
                    'removeComments'
                ]
            };
            const svgo = new SVGO(options);

            svgo.optimize(svg, (result) => {
                // create react component
                // format js

                writeFile(reactPath, result.data);
            });
        }
    });
};
