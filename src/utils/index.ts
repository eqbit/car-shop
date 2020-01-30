export const getUniqueValuesFromArray = array => array.sort().filter((item, pos, arr) => !pos || item != arr[pos - 1]);
