export interface ITours {
    name: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    id: string,
    type: string,
    data: string,
    date?: string
}

export interface ITourTypeSelect {
    label?: string,
    value?: string,
    date?: string
}