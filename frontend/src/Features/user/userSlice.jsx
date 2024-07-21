import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "auth/add-wishlist",
  async (prodId, thunkAPI) => {
    try {
      console.log(prodId);
      return await userService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const getWishlist = createAsyncThunk(
  "auth/get-wishlist",
  async (thunkAPI) => {
    try {
      // console.log(prodId);
      return await userService.getWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/add-cart",
  async (addToCart, thunkAPI) => {
    try {
      // console.log(prodId);
      return await userService.addToCart(addToCart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

export const getCart = createAsyncThunk("auth/get-cart", async (thunkAPI) => {
  try {
    // console.log(prodId);
    return await userService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
    // throw new Error(error)
  }
});
export const removeProductfromCart = createAsyncThunk(
  "auth/remove-product-cart",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await userService.removeProductfromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const updateProductfromCart = createAsyncThunk(
  "auth/update-product-cart",
  async (cartDetail, thunkAPI) => {
    try {
      // console.log(cartDetail);
      return await userService.updateProductfromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "auth/get-user-order",
  async (thunkAPI) => {
    try {
      // console.log(cartDetail);
      return await userService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // throw new Error(error)
    }
  }
);

const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.success("User Created Sucessfully");
        }
        state.message = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError === true) {
          toast.error("Something wrong");
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        // console.log(action.payload.updateUser.refreshToken);
        if (state.isSuccess) {
          localStorage.setItem("token", action.payload.message);
        }
        state.message = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError) {
          toast.error(action.payload.response.message);
        }
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToWishlist = action.payload;
        // console.log(action.payload.updateUser.refreshToken);
        // localStorage.setItem("token", action.payload.updateUser.refreshToken);
        toast.success("Add To Wishlist Sucessfully");
        state.message = "success";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError === true) {
          toast.error("Something wrong");
        }
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getWishlist = action.payload;
        // console.log(action.payload.updateUser.refreshToken);
        // localStorage.setItem("token", action.payload.updateUser.refreshToken);
        // toast.success("Add To Wishlist Sucessfully");
        state.message = "success";
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        // if (state.isError === true) {
        //   toast.error("Something wrong");
        // }
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getCart = action.payload;
        state.message = "success";
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToCart = action.payload;
        toast.success("Add To Cart Sucessfully");
        state.message = "success";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError === true) {
          toast.error("Something wrong");
        }
      })
      .addCase(removeProductfromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductfromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.removeProductfromCart = action.payload;
        toast.success("Product Remove From Cart Sucessfully");
        state.message = "success";
      })
      .addCase(removeProductfromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
        if (state.isError === true) {
          toast.error("Something wrong");
        }
      })
      .addCase(updateProductfromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductfromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateProductfromCart = action.payload;
       
      })
      .addCase(updateProductfromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getUserOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error;
        state.isSuccess = true;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
