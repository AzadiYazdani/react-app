// src/utils/validators.js
export const filterEnglishOnly = (value) => {
    return value.replace(/[^A-Za-z0-9\s\-_]/g, '');
};
