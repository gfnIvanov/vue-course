export type ButtonProps = {
    text: string
    image?: string
    noPad?: boolean
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