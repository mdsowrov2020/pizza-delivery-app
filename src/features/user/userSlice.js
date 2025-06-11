import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/geocodingApiService";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  console.log(position);

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName}`;
  return { position, address };
});

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ||
          "There was an error getting your address. Please fill this field!";
        console.error("Thunk rejected:", action.error);
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
