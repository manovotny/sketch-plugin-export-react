import Chance from 'chance';

import {nsStringToString, stringToNSString} from './utils';

describe('utils', () => {
    const chance = new Chance();

    test('should convert nsstring to string', () => {
        const expectedString = chance.word();

        global.String = jest.fn((nsString) =>
            nsString === expectedString ? nsString : undefined
        );

        const actualString = nsStringToString(expectedString);

        expect(actualString).toBe(expectedString);
        expect(global.String).toBeCalled();
    });

    test('should convert string to nsstring', () => {
        const expectedNSString = chance.word();

        global.NSString = {
            stringWithString: jest.fn((string) =>
                string === expectedNSString ? string : undefined
            )
        };

        const string = {
            toString: jest.fn(() => expectedNSString)
        };

        const actualString = stringToNSString(string);

        expect(string.toString).toBeCalled();
        expect(actualString).toBe(expectedNSString);
        expect(global.NSString.stringWithString).toBeCalled();
    });
});
