import { empty, removeSpanTags } from "./utils";
import type { FilterFields, ProductData } from "@/types";

export const _searchProducts = function(text: string, productsMutable: ProductData[]) {
    let regexp = new RegExp(text, 'i');
    return productsMutable.filter(data => {
        let title = removeSpanTags(data.title);
        let matches = title.match(regexp) || [];
        if (matches.length > 0) {          
            let newStr = `<span style="background:gainsboro;">${matches[0]}</span>`;
            data.title = title.replaceAll(matches[0], newStr);
            return data;
        }
    });
};

export const _useFilter = function(filter: FilterFields, productsOrigin: ProductData[]) {
    console.log(filter)
    return productsOrigin.filter(data => {
        if (!empty(filter.priceFrom) && !empty(filter.priceTo) && !empty(filter.selectCategory)) {
            if (+data.price >= filter.priceFrom 
                && +data.price <= filter.priceTo 
                && data.category === filter.selectCategory) {
                    return data;
                }
        } else if (!empty(filter.priceFrom) && !empty(filter.priceTo) && empty(filter.selectCategory)) {
            if (+data.price >= filter.priceFrom && +data.price <= filter.priceTo) {
                return data;
            }
        } else if (!empty(filter.priceFrom) && empty(filter.priceTo, filter.selectCategory)) {
            if (+data.price >= filter.priceFrom) {
                return data;
            }
        } else if (!empty(filter.priceTo) && empty(filter.priceFrom, filter.selectCategory)) {
            if (+data.price <= filter.priceTo) {
                return data;
            }
        } else if (!empty(filter.selectCategory) && empty(filter.priceFrom, filter.priceTo)) {
            if (data.category === filter.selectCategory) {
                return data;
            }
        } else if (!empty(filter.selectCategory) && !empty(filter.priceFrom) && empty(filter.priceTo)) {
            if (+data.price >= filter.priceFrom && data.category === filter.selectCategory) {
                    return data;
                }
        } else if (!empty(filter.selectCategory) && !empty(filter.priceTo) && empty(filter.priceFrom)) {
            if (+data.price <= filter.priceTo && data.category === filter.selectCategory) {
                    return data;
                }
        } else {
            return data;
        }
    });
};