interface IMidtrans {
  token: string;
  redirectUrl: string;
}

interface IPayment {
  santriId: string;
  paymentId: string;
  status: string;
  amount: number;
  type: "registration" | "spp";
  detail: IMidtrans;
  createdAt: Date;
}

interface IPaymentRequest {
  type: "registration" | "spp";
}

export { IPayment, IMidtrans, IPaymentRequest };
