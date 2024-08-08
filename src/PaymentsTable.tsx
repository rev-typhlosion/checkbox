interface User {
    id: number,
    priorRefund: boolean,
    isBanned: boolean,
    name: string,
}

export interface ChargeItem {
    id: number,
    status: string,
    paymentType: string,
    productType: string,
    // refundableStatus: string,
    billedOn: Date,
    userId: User['id'],
}

export function isPaymentRefundable(charge: ChargeItem, user: User): boolean {
    if (charge.status !== 'Completed') return false
    if (charge.paymentType === 'Apple' || charge.paymentType === 'Placeholder') return false
    if (charge.productType.includes('Gift')) return false
    // if (charge.billedOn...)
    if (user.priorRefund === true) return false
    if (user.isBanned === true) return false
    return true
}

export const USER_TABLE: Array<User> = [
    {id: 1, priorRefund: false, isBanned: false, name: 'wumpus'},
    {id: 2, priorRefund: true, isBanned: false, name: 'nelly'},
    {id: 3, priorRefund: false, isBanned: true, name: 'clyde'},
]

export const PAYMENTS_TABLE: Array<ChargeItem> = [
    {id: 1, userId: 1, status: 'Completed', paymentType: 'Stripe', productType: 'Nitro Monthly', billedOn: new Date('07/07/2024')},
    {id: 2, userId: 1, status: 'Failed', paymentType: 'Stripe', productType: 'Nitro Monthly', billedOn: new Date('06/07/2024')},
    {id: 3, userId: 1, status: 'Refunded', paymentType: 'Stripe', productType: 'Nitro Monthly', billedOn: new Date('07/07/2023')},
    {id: 4, userId: 1, status: 'Completed', paymentType: 'Apple', productType: 'Nitro Monthly', billedOn: new Date('07/07/2023')},
    {id: 5, userId: 1, status: 'Pending', paymentType: 'Stripe', productType: 'Gift - Nitro Yearly', billedOn: new Date('07/07/2023')},
    {id: 6, userId: 2, status: 'Completed', paymentType: 'Stripe', productType: 'Nitro Monthly', billedOn: new Date('07/07/2024')},
    {id: 7, userId: 3, status: 'Reversed', paymentType: 'Stripe', productType: 'Nitro Monthly', billedOn: new Date('07/07/2024')},
]


