export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const LOAD_CART = 'LOAD_CART';

export const loadCart = (cartItems) => ({
    type: LOAD_CART,
    payload: cartItems,
});


export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const updateQuantity = (product, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { product, quantity },
});