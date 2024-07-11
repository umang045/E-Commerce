import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (data,thunkAPI) => {
    try {
      return await productService.getAllProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const getAProduct = createAsyncThunk(
  "product/get-one",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const rateProduct = createAsyncThunk(
  "product/ratting",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await productService.rateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

const initialState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        state.message = "success";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getAProduct = action.payload;
        state.message = "success";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rateProduct = action.payload;
        state.message = "success";
        if (state.isSuccess) {
          toast.success("Review Submited SucessFully!");
        }
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError) {
          toast.error("Something went wrong!");
        }
      });
  },
});

export default productSlice.reducer;
