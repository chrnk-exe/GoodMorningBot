"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (token) => {
    if (typeof token === 'string')
        return false;
    if (token)
        return 'uid' in token ? true : false;
    return false;
};
