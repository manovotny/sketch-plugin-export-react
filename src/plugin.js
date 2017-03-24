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
            const svgo = new SVGO({
                full: true,
                js2svg: {
                    indent: 4,
                    pretty: true
                },
                plugins: [
                    'cleanupAttrs',
                    'cleanupEnableBackground',
                    'cleanupIDs',
                    'cleanupNumericValues',
                    'collapseGroups',
                    'convertColors',
                    'convertPathData',
                    'convertShapeToPath',
                    'convertStyleToAttrs',
                    'convertTransform',
                    'mergePaths',
                    'minifyStyles',
                    'moveElemsAttrsToGroup',
                    'moveGroupAttrsToElems',
                    'removeComments',
                    'removeDesc',
                    'removeDoctype',
                    'removeEditorsNSData',
                    'removeEmptyAttrs',
                    'removeEmptyContainers',
                    'removeEmptyText',
                    'removeHiddenElems',
                    'removeMetadata',
                    'removeNonInheritableGroupAttrs',
                    {removeRasterImages: {}},
                    {removeStyleElement: {}},
                    'removeUnknownsAndDefaults',
                    'removeUnusedNS',
                    'removeUselessStrokeAndFill',
                    {removeXMLNS: {}},
                    'removeXMLProcInst',
                    {removeTitle: {}}
                ]
            });

            svgo.optimize(svg, (result) => {
                // create react component
                // format js

                writeFile(reactPath, result.data);
            });
        }
    });
};
