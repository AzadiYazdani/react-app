// src/utils/validators.js
export const filterEnglishOnly = (value) => {
    // فقط حروف انگلیسی (A-Z, a-z)، اعداد (0-9)، فاصله، خط تیره و زیرخط مجاز هستند
    return value.replace(/[^A-Za-z0-9\s\-_]/g, '');
};
