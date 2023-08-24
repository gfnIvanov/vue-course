export const empty = function(v: any): boolean {
    if (Array.isArray(v)) {
        return v.length === 0;
    }
    return v === undefined || v === null || v === '';
}
