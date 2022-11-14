export interface UserWallet {
  id: string;
  beneId: string;
  upiAddress: string;
  bankAccount: string;
  ifsc: string;
  amount: number;
  processingAmount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletHistory {
  id: string;
  trnxType: 'credit' | 'debit';
  action: string;
  amount: number;
  status: 'completed' | 'rejected' | 'pending';
  walletId: string;
  createdAt: Date;
  updatedAt: Date;
}
