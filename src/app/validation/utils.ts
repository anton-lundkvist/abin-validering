export const isInteger = (val: any) => {
    return Number.isInteger(val);
};
export const isPositiveInteger = (val: any) => {
    return Number.isInteger(val) && val > 0;
};
