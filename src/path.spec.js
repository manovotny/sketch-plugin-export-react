import Chance from 'chance';

import {basename, extname, format, parse, renameExtname} from './path';

describe('path', () => {
    const chance = new Chance();

    const generateRandomPath = () =>
        chance.n(chance.word, chance.natural({
            max: 5,
            min: 1
        })).join('/');

    /* eslint-disable complexity */
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
    /* eslint-enable */

    describe('basename', () => {
        test('should return basename with extension', () => {
            const expectedBasename = `${chance.word()}.${chance.word()}`;
            const path = `${generateRandomPath()}/${expectedBasename}`;

            const actualBasename = basename(path);

            expect(actualBasename).toBe(expectedBasename);
        });

        test('should return basename without extension', () => {
            const expectedBasename = `${chance.word()}`;
            const extension = `.${chance.word()}`;
            const path = `${generateRandomPath()}/${expectedBasename}${extension}`;

            const actualBasename = basename(path, extension);

            expect(actualBasename).toBe(expectedBasename);
        });
    });

    describe('extname', () => {
        test('should return ext', () => {
            const expectedExtension = `.${chance.word()}`;
            const base = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${base}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('should return last ext with multiple exts', () => {
            const expectedExtension = `.${chance.word()}`;
            const base = `${chance.word()}.${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${base}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('should return dot if file ends in dot', () => {
            const expectedExtension = '.';
            const base = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${base}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('should return empty string if file has no ext', () => {
            const expectedExtension = '';
            const base = `${chance.word()}${expectedExtension}`;
            const path = `${generateRandomPath()}/${base}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });

        test('should return empty string if file starts with dot', () => {
            const expectedExtension = '';
            const base = `.${chance.word()}`;
            const path = `${generateRandomPath()}/${base}`;

            const actualExtension = extname(path);

            expect(actualExtension).toBe(expectedExtension);
        });
    });

    describe('format', () => {
        test('should return base using base', () => {
            const pathObject = generatePathObject({
                base: true,
                dir: false,
                ext: false,
                name: false,
                root: false
            });
            const expectedResult = pathObject.base;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return base using name and ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: true,
                name: true,
                root: false
            });
            const expectedResult = pathObject.name + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return name using name', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: false,
                name: true,
                root: false
            });
            const expectedResult = pathObject.name;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return ext using ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: true,
                name: false,
                root: false
            });
            const expectedResult = pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return root and base using root and base', () => {
            const pathObject = generatePathObject({
                base: true,
                dir: false,
                ext: false,
                name: false,
                root: true
            });
            const expectedResult = pathObject.root + pathObject.base;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return root and base using root, name, and ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: true,
                name: true,
                root: true
            });
            const expectedResult = pathObject.root + pathObject.name + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return root and name using root and name', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: false,
                name: true,
                root: true
            });
            const expectedResult = pathObject.root + pathObject.name;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return root and ext using root and ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: false,
                ext: true,
                name: false,
                root: true
            });
            const expectedResult = pathObject.root + pathObject.ext;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return dir and name using dir, name, and ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: true,
                ext: true,
                name: true,
                root: false
            });
            const expectedResult = `${pathObject.dir}/${pathObject.name}${pathObject.ext}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return dir and base using dir and base', () => {
            const pathObject = generatePathObject({
                base: true,
                dir: true,
                ext: false,
                name: false,
                root: false
            });
            const expectedResult = `${pathObject.dir}/${pathObject.base}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return dir and name using dir and name', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: true,
                ext: false,
                name: true,
                root: false
            });
            const expectedResult = `${pathObject.dir}/${pathObject.name}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });

        test('should return dir and ext using dir and ext', () => {
            const pathObject = generatePathObject({
                base: false,
                dir: true,
                ext: true,
                name: false,
                root: false
            });
            const expectedResult = `${pathObject.dir}/${pathObject.ext}`;

            const actualResult = format(pathObject);

            expect(actualResult).toBe(expectedResult);
        });
    });

    describe('parse', () => {
        test('should parse root path', () => {
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

        test('should parse dir path', () => {
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

        test('should parse base path', () => {
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

        test('should parse name path', () => {
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

        test('should parse dot path', () => {
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

    describe('renameExtname', () => {
        test('should return path with renamed ext', () => {
            const expectedExt = `.${chance.word()}`;
            const path = `${generateRandomPath()}/${chance.word()}.${chance.word()}`;

            const actualPath = renameExtname(path, expectedExt);

            expect(actualPath.endsWith(expectedExt)).toBe(true);
        });
    });
});
