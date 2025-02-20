export enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface IPayment {
  paymentMethod: string;
  paymentAmount: string;
}
export interface IPaymentIntialState {
  payments: IPayment[];
  status: Status;
}
