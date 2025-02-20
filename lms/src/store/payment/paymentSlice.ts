import { createSlice } from "@reduxjs/toolkit";
import { Status, IPayment, IPaymentIntialState } from "./types";

const datas: IPaymentIntialState = {
  payments: [],
  status: Status.Loading,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: datas,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPayment(state, action) {
      state.payments = action.payload;
    },
  },
});

const { setPayment, setStatus } = paymentSlice.actions;
export default paymentSlice.reducer; // reducers pural ma lakda error aaxuxa so singular reducer
