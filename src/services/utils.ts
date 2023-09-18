export const empty = function (...values: any[]): boolean {
    const results = [];
    values.forEach((v: any) => {
        if (Array.isArray(v)) {
            if (v.length === 0) {
                results.push(true);
                return;
            }
        }
        const subRes = v === undefined || v === null || v === '' || v === 0;
        subRes && results.push(true);
    });
    return results.length === values.length;
};

export const removeSpanTags = function (text: string) {
    return text
        .replaceAll('<span style="background:gainsboro;">', '')
        .replaceAll('</span>', '');
};
