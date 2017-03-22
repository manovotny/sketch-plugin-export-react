export const nsStringToString = (nsString) =>
    String(nsString);

export const stringToNSString = (string) =>
    NSString.stringWithString(string.toString());
