export const move = (src, dest) => {
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(src, dest, nil)
};

export const readFile = (file) => {
    return NSString.stringWithContentsOfFile_encoding_error(file, NSUTF8StringEncoding, nil);
};

export const rename = (oldPath, newPath) => {
    move(oldPath, newPath);
};

export const writeFile = (file, data) => {
    NSString.stringWithString(data).writeToFile_atomically_encoding_error(file, true, NSUTF8StringEncoding, nil);
};
