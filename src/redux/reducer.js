import { createAction, createReducer } from '@reduxjs/toolkit'

const adminPriceAndOrderInfo = createAction('adminPriceAndOrderInfo')

export const cartReducer = createReducer(
    {
        price: 0,
        orderInfo: ""
    },

    (builder) => {
        builder.addCase(adminPriceAndOrderInfo, (state, action) => {
            const info = action.payload;
            const price = info.price;
            const orderInfo = info.orderInfo;

            state.price = price;
            state.orderInfo = orderInfo;

            localStorage.setItem("price", state.price);
            localStorage.setItem("orderInfo", state.orderInfo);
        })
    }
)