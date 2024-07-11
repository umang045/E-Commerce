import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allblogService from "./allblogsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllBlogs = createAsyncThunk(
  "blog/get-allblogs",
  async (thunkAPI) => {
    try {
      return await allblogService.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogs = createAsyncThunk(
  "blog/create-blogs",
  async (blogData, thunkAPI) => {
    try {
      return await allblogService.createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    try {
      // console.log(id);
      return await allblogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlog = createAsyncThunk(
  "blog/update-blog",
  async (brand, thunkAPI) => {
    try {
      return await allblogService.updateBlog(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      return await allblogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  allblogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const allblogSlice = createSlice({
  name: "Allblogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allblogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
        if (state.isSuccess) {
          toast.success("Blog Added SuccesFully!!");
        }
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogName = action.payload.title;
        state.blogDesc = action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogImages = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
        if (state.isSuccess) {
          toast.success("Blog Updated SuccesFully!!");
        }
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
        if (state.isSuccess) {
          toast.success("Blog Deleted SuccesFully!!");
        }
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!!");
        }
      });
  },
});

export default allblogSlice.reducer;
