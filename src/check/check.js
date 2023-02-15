export const checkExistInTheCart = (cart, item) => {
 return cart.some((a) => a.id === item.id)
};

export const checkStockInTheCart = (cart, item) => {
    return cart.filter((a) => a.stock & item.stock < 1)
};