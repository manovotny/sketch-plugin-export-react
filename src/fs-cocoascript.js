import {stringToNSString} from './utils';

export const readFile = (file) =>
    NSString
        .stringWithContentsOfFile_encoding_error(
            stringToNSString(file),
            NSUTF8StringEncoding,
            nil
        );

export const rename = (oldPath, newPath) =>
    NSFileManager
        .defaultManager()
        .moveItemAtPath_toPath_error(
            stringToNSString(oldPath),
            stringToNSString(newPath),
            nil
        );

export const writeFile = (file, data) =>
    NSString
        .stringWithString(data)
        .writeToFile_atomically_encoding_error(
            stringToNSString(file),
            true,
            NSUTF8StringEncoding,
            nil
        );
