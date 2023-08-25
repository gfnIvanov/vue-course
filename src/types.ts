export type ButtonProps = {
    text: string
    action?: any
    image?: string
    noPad?: boolean
    count?: number
}

export type ProductData = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}