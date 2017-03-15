import Chance from 'chance';

import {basename, extname, format, parse} from './path';

const chance = new Chance();

const generateRandomPath = () =>
    chance.n(chance.word, chance.natural({
        max: 5,
        min: 1
    })).join('/');

const generatePathObject = ({root, dir, base, ext, name}) => {
    const pathObject = {};

    if (root) {
        pathObject.root = '/';
    }

    if (dir) {
        pathObject.dir = `${generateRandomPath()}`;
    }

    if (name) {
        pathObject.name = chance.word();
    }

    if (ext) {
        pathObject.ext = `.${chance.word()}`;
    }

    if (base) {
        pathObject.base = `${chance.word()}.${chance.word()}`;
    }

    return pathObject;
};

describe('path', () => {
    describe('basename', () => {
        test('returns basename with extension', () => {
            const expectedBasename = `${chance.word()}.${chance.word()}`;
            const path = `${generateRandomPath()}/${expectedBasename}`;

            const actualBasename = basename(path);

            expect(actualBasename).toBe(expectedBasename);
        });

        test('returns basename without extension', () => {
            const expectedBasename = `${chance.word()}`;
            const extension = `.${chance.word()}`;
            const path = `${generateRandomPath()}/${expectedBasename}${extension}`;

            const actualBasename = basename(path, extension);

            expect(actualBasename).toBe(expectedBasename);
        });
    });

    describe('extname', () => {
        test('returns ext', () => {
            const expectedExtension = `.${chance.word()}`;
            const basename = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${basename}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('returns last ext with multiple exts', () => {
            const expectedExtension = `.${chance.word()}`;
            const basename = `${chance.word()}.${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${basename}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('returns dot if file ends in dot', () => {
            const expectedExtension = `.`;
            const basename = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${basename}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('returns empty string if file has no ext', () => {
            const expectedExtension = '';
            const basename = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${basename}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('returns empty string if file starts with dot', () => {
            const expectedExtension = '';
            const basename = `.${chance.word()}`;
            const path = `${generateRandomPath()}/${basename}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });
    });

    describe('format', () => {
        test('returns base using base', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: false,
                name: false,
                ext: false,
                base: true,
            });
            const expectedResult = pathObject.base;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns base using name and ext', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: false,
                name: true,
                ext: true,
                base: false,
            });
            const expectedResult = pathObject.name + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns name using name', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: false,
                name: true,
                ext: false,
                base: false,
            });
            const expectedResult = pathObject.name;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns ext using ext', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: false,
                name: false,
                ext: true,
                base: false,
            });
            const expectedResult = pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns root and base using root and base', () => {
            const pathObject = generatePathObject({
                root: true,
                dir: false,
                name: false,
                ext: false,
                base: true,
            });
            const expectedResult = pathObject.root + pathObject.base;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns root and base using root, name, and ext', () => {
            const pathObject = generatePathObject({
                root: true,
                dir: false,
                name: true,
                ext: true,
                base: false,
            });
            const expectedResult = pathObject.root + pathObject.name + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns root and name using root and name', () => {
            const pathObject = generatePathObject({
                root: true,
                dir: false,
                name: true,
                ext: false,
                base: false,
            });
            const expectedResult = pathObject.root + pathObject.name;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns root and ext using root and ext', () => {
            const pathObject = generatePathObject({
                root: true,
                dir: false,
                name: false,
                ext: true,
                base: false,
            });
            const expectedResult = pathObject.root + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns dir and name using dir, name, and ext', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: true,
                name: true,
                ext: true,
                base: false,
            });
            const expectedResult = `${pathObject.dir}/${pathObject.name}${pathObject.ext}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns dir and base using dir and base', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: true,
                name: false,
                ext: false,
                base: true,
            });
            const expectedResult = `${pathObject.dir}/${pathObject.base}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns dir and name using dir and name', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: true,
                name: true,
                ext: false,
                base: false,
            });
            const expectedResult = `${pathObject.dir}/${pathObject.name}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('returns dir and ext using dir and ext', () => {
            const pathObject = generatePathObject({
                root: false,
                dir: true,
                name: false,
                ext: true,
                base: false,
            });
            const expectedResult = `${pathObject.dir}/${pathObject.ext}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });
    });

    describe('parse', () => {
        test('root path', () => {
            const expectedRoot = '/';
            const dir = generateRandomPath();
            const expectedDir = `/${dir}`;
            const expectedExt = `.${chance.word()}`;
            const expectedName = chance.word();
            const expectedBase = expectedName + expectedExt;
            const path = `${expectedDir}/${expectedBase}`;

            const actualResult = parse(path);

            expect(actualResult.root).toBe(expectedRoot);
            expect(actualResult.dir).toBe(expectedDir);
            expect(actualResult.base).toBe(expectedBase);
            expect(actualResult.name).toBe(expectedName);
            expect(actualResult.ext).toBe(expectedExt);
        });

        test('dir path', () => {
            const expectedRoot = '';
            const expectedDir = `../${generateRandomPath()}`;
            const expectedExt = `.${chance.word()}`;
            const expectedName = chance.word();
            const expectedBase = expectedName + expectedExt;
            const path = `${expectedDir}/${expectedBase}`;

            const actualResult = parse(path);

            expect(actualResult.root).toBe(expectedRoot);
            expect(actualResult.dir).toBe(expectedDir);
            expect(actualResult.base).toBe(expectedBase);
            expect(actualResult.name).toBe(expectedName);
            expect(actualResult.ext).toBe(expectedExt);
        });

        test('base path', () => {
            const expectedRoot = '';
            const expectedDir = '';
            const expectedExt = `.${chance.word()}`;
            const expectedName = chance.word();
            const expectedBase = expectedName + expectedExt;
            const path = expectedBase;

            const actualResult = parse(path);

            expect(actualResult.root).toBe(expectedRoot);
            expect(actualResult.dir).toBe(expectedDir);
            expect(actualResult.base).toBe(expectedBase);
            expect(actualResult.name).toBe(expectedName);
            expect(actualResult.ext).toBe(expectedExt);
        });

        test('name path', () => {
            const expectedRoot = '';
            const expectedDir = '';
            const expectedExt = '';
            const expectedName = chance.word();
            const expectedBase = expectedName;
            const path = expectedBase;

            const actualResult = parse(path);

            expect(actualResult.root).toBe(expectedRoot);
            expect(actualResult.dir).toBe(expectedDir);
            expect(actualResult.base).toBe(expectedBase);
            expect(actualResult.name).toBe(expectedName);
            expect(actualResult.ext).toBe(expectedExt);
        });

        test('dot path', () => {
            const expectedRoot = '';
            const expectedDir = '';
            const expectedExt = '';
            const expectedName = `.${chance.word()}`;
            const expectedBase = expectedName;
            const path = expectedBase;

            const actualResult = parse(path);

            expect(actualResult.root).toBe(expectedRoot);
            expect(actualResult.dir).toBe(expectedDir);
            expect(actualResult.base).toBe(expectedBase);
            expect(actualResult.name).toBe(expectedName);
            expect(actualResult.ext).toBe(expectedExt);
        });
    });
});
