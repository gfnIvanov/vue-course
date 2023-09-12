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
    Basket: boolean
};

export type UserData = {
    id?: number
    login: string
    password: string
    admin?: boolean
};

export type UsersResponse = {
    payload?: Partial<UserData>
    error?: string
};

export type ProductsResponse = {
    payload?: Partial<ProductData>[]
    error?: string
};

export type StateUserData = Pick<UserData, 'id' | 'login' | 'admin'>;

export type GridDataType = Partial<UserData
                                   & { username: string }>
                                   | Partial<Pick<ProductData, 'id' | 'title' | 'price' | 'category' | 'image'>>;

export type GridProps = {
    data: GridDataType
    keys: string[]
};

export type BaseInputProps = {
    name: string
    pHolder: string
    isDis?: boolean
    required?: boolean
    bindList?: string
    tArea?: boolean
    rows?: number
};

export type OrderData = {
    user: number
    name: string
    phone: string
    email: string
    address: string
    compound: string
    summ: number
}

export type CommentData = {
    id?: number
    product: number
    user?: number
    text: string
    addDate?: string
}

export type CommentResponse = {
    payload?: Partial<CommentData>[]
    error?: string
};
