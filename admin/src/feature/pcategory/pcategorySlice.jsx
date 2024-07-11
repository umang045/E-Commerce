import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getPcategory = createAsyncThunk(
  "productCategory/get-category",
  async (thunkAPI) => {
    try {
      return await pcategoryService.getPcategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createPcategory = createAsyncThunk(
  "productCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await pcategoryService.createPcategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAProductCategory = createAsyncThunk(
  "productCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await pcategoryService.updateProductCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProductCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await pcategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProductCategory = createAsyncThunk(
  "productCategory/get-product-category",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await pcategoryService.getAProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  pcategorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pcategorySlice = createSlice({
  name: "pcategorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pcategorys = action.payload;
      })
      .addCase(getPcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createPcategory = action.payload;
        if (state.isSuccess) {
          toast.success("Category Added SucccesFully!!");
        }
      })
      .addCase(createPcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      })
      .addCase(updateAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
        if (state.isSuccess) {
          toast.success("Category Updated SucccesFully!!");
        }
      })
      .addCase(updateAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      })
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
        if (state.isSuccess) {
          toast.success("Category Deleted SucccesFully!!");
        }
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong");
        }
      })
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
