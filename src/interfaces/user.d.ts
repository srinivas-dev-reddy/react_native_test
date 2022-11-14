export interface KycJson {
  aadhaarNo: string;
  aadhaarVerified: boolean;
  panNo: string;
  panVerified: boolean;
}

export interface User {
  id: string;
  OTP: string;
  email?: any;
  name?: any;
  phoneNumber: string;
  upiAddress: string;
  emailVerified: boolean;
  accountVerified: boolean;
  vpaVerified: boolean;
  isKycVerified: boolean;
  kycJson: KycJson;
  bankAccount: string;
  ifsc: string;
}
export interface UserVpa {
  bankAccount: string;
  ifsc: string;
  upiAddress: string;
}
