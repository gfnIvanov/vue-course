import { empty, removeSpanTags } from "./utils";
import type { FilterFields, ProductData } from "@/types";


export const _searchProducts = function(text: string, productsMutable: ProductData[]) {
    let regexp = new RegExp(text, 'i');
    return productsMutable.filter(data => {
        let title = removeSpanTags(data.title);
        let matches = title.match(regexp) || [];
        if (matches.length > 0) {
            let newStr = `<span style="background:gainsboro;">${matches[0]}</span>`;
            data.title = title.replaceAll(matches[0] as string, newStr);
            return data;
        }
    });
};

export const _useFilter = function(filter: FilterFields, productsOrigin: ProductData[]) {
    let filteredProducts = productsOrigin.slice(0);
    if (!empty(filter.priceFrom)) {
        filteredProducts = filteredProducts.filter(data => +data.price >= filter.priceFrom);
    }
    if (!empty(filter.priceTo)) {
        filteredProducts = filteredProducts.filter(data => data.price <= filter.priceTo);
    }
    if (!empty(filter.selectCategory)) {
        filteredProducts = filteredProducts.filter(data => data.category === filter.selectCategory);
    }
    return filteredProducts;
};