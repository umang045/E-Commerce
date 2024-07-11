import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrands = createAsyncThunk(
  "brand/create-brands",
  async (brandData, thunkAPI) => {
    try {
      console.log(brandData);
      return await brandService.createBrands(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getaBrand = createAsyncThunk(
  "brand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getaBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateaBrand = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await brandService.updateaBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABrand = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteABrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBrands = action.payload;
        if (state.isSuccess) {
          toast.success("Brand Added successFully");
        }
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      })
      .addCase(getaBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload.title;
      })
      .addCase(getaBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateaBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateaBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
        if (state.isSuccess) {
          toast.success("Brand Updated successFully");
        }
      })
      .addCase(updateaBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      })
      .addCase(deleteABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        if (state.isSuccess) {
          toast.success("Brand Deleted successFully");
        }
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
