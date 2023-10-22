import { createSlice } from "@reduxjs/toolkit";
import { getProducts, addNewProduct, updateProduct, deleteProducts, getOrders, addNewOrder, updateOrder, deleteOrder, 
  getCustomers, addNewCustomer, updateCustomer, deleteCustomer, getSellers } from './thunk';
export const initialState = {
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

// extraReducers는 Redux Toolkit의 createSlice 함수 내에서 사용되는 기능 중 하나입니다. 
// 이 기능을 통해 비동기 액션 처리 및 다른 슬라이스의 액션에 대한 응답을 처리할 수 있습니다. 
// 일반적으로 이것은 Redux Thunk 또는 Redux Saga와 같은 미들웨어를 사용하여 비동기 작업을 수행할 때 유용하게 활용됩니다.

// builder.addCase(actionType.fulfilled, (state, action) => { ... }): 
// 비동기 액션이 성공했을 때의 처리를 정의합니다. 
// actionType.fulfilled는 Redux Toolkit의 createAsyncThunk를 사용하여 생성된 비동기 액션의 성공 상태를 나타내며, 
// 해당 액션이 발생했을 때 state 객체를 업데이트합니다.

// builder.addCase(actionType.rejected, (state, action) => { ... }): 
// 비동기 액션이 실패했을 때의 처리를 정의합니다. 
// actionType.rejected는 Redux Toolkit의 createAsyncThunk를 사용하여 생성된 비동기 액션의 실패 상태를 나타내며, 
// 해당 액션이 발생했을 때 state 객체를 업데이트합니다.

const EcommerceSlice = createSlice({
  name: 'EcommerceSlice',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(addNewProduct.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map(product =>
        product._id.toString() === action.payload.data._id.toString()
          ? { ...product, ...action.payload.data }
          : product
      );;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.products = (state.products || []).filter((product) => product._id.toString() !== action.payload.product.toString());
    });

    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
    });

    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.payload.error || null;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;  
    });

    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload.data);
      state.isOrderCreated = true;
    });

    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map(order =>
        order._id.toString() === action.payload.data._id.toString()
          ? { ...order, ...action.payload.data }
          : order
      );
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        order => order._id.toString() !== action.payload.order.toString()
      );
    });

    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSellers.fulfilled, (state, action) => {
      state.sellers = action.payload;
    });

    builder.addCase(getSellers.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.data;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
    });

    builder.addCase(getCustomers.rejected, (state, action) => {
      state.error = action.payload.error || null;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload.data);
      state.isCustomerCreated = true;
    });
    builder.addCase(addNewCustomer.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.map(customer =>
        customer._id.toString() === action.payload.data._id.toString()
          ? { ...customer, ...action.payload.data }
          : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(
        customer => customer._id.toString() !== action.payload.customer.toString()
      );
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  }
});

export default EcommerceSlice.reducer;