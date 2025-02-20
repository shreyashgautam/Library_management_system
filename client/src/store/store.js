import { configureStore } from '@reduxjs/toolkit';
import AdminProductsSlice from './admin/products-slice'
import authReducer from './auth-slice'
import ShopProductsSlice from './shop/product-slice'
import ShopcartSlice from './shop/cart-slice'
import commonSlice from './common-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';

import adminOrderSlice from "./admin/order-slice";



const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:AdminProductsSlice,
        shoppingProducts:ShopProductsSlice,
        shopCart:ShopcartSlice,
        commonFeature:commonSlice,
        shopAddress:shopAddressSlice,
        shopOrder:shopOrderSlice,
        adminOrder: adminOrderSlice
        
    },
})

export default store;