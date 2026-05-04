// helper function for geolocation

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

//Helper for the Browser API
const getPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );

// The Async Thunk (handled the multi-step async logic)
export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  //We get the user's geo location position (Browser Api)
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // Then we use the service to ger the readable address (Network API)
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;

  //return payload (this become the action.payload in fulfilled case)
  return { position, address };
});

interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: { latitude: number | null; longitude: number | null };
  address: string;
  error?: string;
}

const initialState: UserState = {
  username: "",
  status: "idle",
  position: { latitude: null, longitude: null },
  address: "",
  error: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  // handle the Asynce thunnk results
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = UserSlice.actions;

export default UserSlice.reducer;

export const getUserName = (state: any) => state.user.username;
