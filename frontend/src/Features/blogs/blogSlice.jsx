import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk("blog/get", async (thunkAPI) => {
  try {
    return await blogService.getAllBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
    // throw new Error(error)
  }
});

export const getABlog = createAsyncThunk(
  "blog/get-one",
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blog/like",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await blogService.likeBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const dislikeBlog = createAsyncThunk(
  "blog/dislike",
  async (data, thunkAPI) => {
    try {
      return await blogService.dislikeBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

const initialState = {
  blogs: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getAllBlogs = action.payload;
        state.message = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getABlog = action.payload;
        state.message = "success";
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(likeBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.likeBlog = action.payload;
        state.message = "success";
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(dislikeBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dislikeBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dislikeBlog = action.payload;
        state.message = "success";
      })
      .addCase(dislikeBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
  },
});

export default blogSlice.reducer;
