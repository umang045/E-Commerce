import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enqService from "./enquiriesService";

export const getEnq = createAsyncThunk("blog/get-enq", async (thunkAPI) => {
  try {
    return await enqService.getEnq();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enqService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enqService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enq, thunkAPI) => {
    try {
      return await enqService.udpateEnquiry(enq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  enqs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enqSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enqs = action.payload;
      })
      .addCase(getEnq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enqName = action.payload.name;
        state.enqMobile = action.payload.mobile;
        state.enqEmail = action.payload.email;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default enqSlice.reducer;
