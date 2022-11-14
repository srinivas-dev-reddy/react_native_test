interface Wallet {
  balance: number;
}

interface Investment {
  casetId: string;
  quantity: number;
  businessName: string;
  endDate: string;
}

export interface UserDeleteData {
  wallet: Wallet;
  investments: Investment[];
}
