import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enqService } from "./contactService";

export const createEnq = createAsyncThunk(
  "enquiry/create",
  async (enqData, thunkAPI) => {
    try {
        // console.log(enqData);
      return await enqService.createEnq(enqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

const initialState = {
  enq: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "enq",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createEnq = action.payload;
        if (state.isSuccess === true) {
          toast.success("Your Enquiry Submited Successfully!!");
        }
        state.message = "success";
      })
      .addCase(createEnq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        if (state.isError === true) {
          toast.success("Something Went Wrong!!");
        }
        state.user = null;
      });
  },
});

export default contactSlice.reducer;
