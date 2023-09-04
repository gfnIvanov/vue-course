import { BaseInputBinds, GenericObject } from "vee-validate";


export type ButtonProps = {
    text: string
    active?: boolean
    image?: string
    noPad?: boolean
};

export type ProductData = {
    id?: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating?: {
        rate: number
        count: number
    }
};

export type HeaderProps = {
    logBtnText: string
};

export type FilterFields = {
    priceFrom: number
    priceTo: number 
    selectCategory: string
};

export type MenuButtons = {
    Catalog: boolean
    Contacts: boolean
    Admin: boolean
};

export type UserData = {
    login: string
    password: string
    admin?: boolean
};

export type UsersResponse = {
    payload?: Partial<UserData>
    error?: string
};

export type ProductsResponse = {
    payload?: Partial<ProductData>
    error?: string
};

export type StateUserData = Pick<UserData, 'login' | 'admin'>;

export type GridDataType = Partial<UserData & { username: string }> | Partial<Pick<ProductData, 'id' | 'title' | 'price' | 'category'>>;

export type GridProps = {
    data: GridDataType
    keys: string[]
};

export type InputBlockProps = {
    blockType: 'input' | 'textarea'
    pHolder: string
    bindVar: BaseInputBinds<string | number> & GenericObject
    isDis: boolean
    rows?: number
    error?: string
    type?: 'password'
    bindList?: string
};
