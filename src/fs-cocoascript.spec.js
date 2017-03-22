import Chance from 'chance';

import {readFile, rename, writeFile} from './fs-cocoascript';
import * as utils from './utils';

/* eslint-disable camelcase, import/namespace */
describe('fs-cocoascript', () => {
    const chance = new Chance();

    test('should read file', () => {
        const expectedFile = chance.string();
        const expectedFileNSString = chance.string();
        const stringWithContentsOfFileMock = jest.fn();

        global.nil = chance.string();
        global.NSString = {
            stringWithContentsOfFile_encoding_error: stringWithContentsOfFileMock
        };
        global.NSUTF8StringEncoding = chance.string();

        utils.stringToNSString = jest.fn((file) =>
            file === expectedFile ? expectedFileNSString : undefined
        );

        readFile(expectedFile);

        expect(stringWithContentsOfFileMock).toBeCalled();
        expect(stringWithContentsOfFileMock).toBeCalledWith(
            expectedFileNSString,
            global.NSUTF8StringEncoding,
            global.nil
        );
    });

    test('should rename', () => {
        const expectedOldPath = chance.string();
        const expectedOldPathNSString = chance.string();
        const expectedNewPath = chance.string();
        const expectedNewPathNSString = chance.string();
        const moveItemAtPathMock = jest.fn();

        global.nil = chance.string();
        global.NSFileManager = {
            defaultManager: () => ({
                moveItemAtPath_toPath_error: moveItemAtPathMock
            })
        };

        utils.stringToNSString = jest.fn((path) => {
            if (path === expectedOldPath) {
                return expectedOldPathNSString;
            }

            if (path === expectedNewPath) {
                return expectedNewPathNSString;
            }

            return undefined;
        });

        rename(expectedOldPath, expectedNewPath);

        expect(moveItemAtPathMock).toBeCalled();
        expect(moveItemAtPathMock).toBeCalledWith(
            expectedOldPathNSString,
            expectedNewPathNSString,
            global.nil
        );
    });

    test('should write file', () => {
        const expectedFile = chance.string();
        const expectedFileNSString = chance.string();
        const expectedData = chance.string();
        const writeToFileMock = jest.fn();
        const stringWithStringMock = jest.fn((data) => {
            const writeToFile = {
                writeToFile_atomically_encoding_error: writeToFileMock
            };

            return data === expectedData ? writeToFile : undefined;
        });

        global.nil = chance.string();
        global.NSString = {
            stringWithString: stringWithStringMock
        };
        global.NSUTF8StringEncoding = chance.string();

        utils.stringToNSString = jest.fn((file) =>
            file === expectedFile ? expectedFileNSString : undefined
        );

        writeFile(expectedFile, expectedData);

        expect(writeToFileMock).toBeCalled();
        expect(writeToFileMock).toBeCalledWith(
            expectedFileNSString,
            true,
            global.NSUTF8StringEncoding,
            global.nil
        );
    });
});
/* esloint-enable */
