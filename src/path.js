export const basename = (path, ext) => {
    const base = path.substr(path.lastIndexOf('/') + 1, path.length);

    if (ext && base.endsWith(ext)) {
        return base.substring(0, base.lastIndexOf(ext));
    }

    return base;
};

export const extname = (path) => {
    const base = basename(path);
    const lastIndex = base.lastIndexOf('.');

    if (lastIndex <= 0) {
        return '';
    }

    return base.substring(lastIndex, base.length);
};

export const format = (pathObject) => {
    const dir = pathObject.dir || pathObject.root || '';
    const base = pathObject.base || ((pathObject.name || '') + (pathObject.ext || ''));

    if (!dir) {
        return base;
    }

    if (dir === pathObject.root) {
        return dir + base;
    }

    return `${dir}/${base}`;
};

export const parse = (path) => {
    const root = path.startsWith('/') ? '/' : '';
    const ext = extname(path);
    const name = basename(path, ext);
    const base = name + ext;
    const dir = path.endsWith(`/${base}`) ? path.replace(`/${base}`, '') : '';

    return {
        root,
        dir,
        base,
        ext,
        name
    }
};
