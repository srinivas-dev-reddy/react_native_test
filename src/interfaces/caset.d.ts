export interface Business {
  id: string;
  name: string;
  foundedDate: Date;
  accentColor: string;
  ratingId: number;
  location: Location;
  misc: {
    brandImage?: string;
    backgroundColor?: string;
    desc?: string;
    images?: string[];
    points?: string[];
  };
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  mapLink?: any;
}

export interface Rating {
  source: string;
  rating: number;
}

export interface BusinessBranch {
  subLocation: string;
  isActive: boolean;
  foundedDate: Date;
  businessId: string;
  ratingId: number;
  business: Business;
  rating: Rating;
}

export interface Category {
  title: string;
  isActive: boolean;
}

export interface Caset {
  id: string;
  businessBranchId: string;
  businessBranch: BusinessBranch;
  casetCategoryId: number;
  casetBuyStartDate: Date;
  unitPrice: number;
  unitPercentReturns: number;
  startDate: Date;
  validity: number;
  totalUnits: number;
  isActive: boolean;
  businessBranch: BusinessBranch;
  category: Category;
  expectedUpside: number;
  sold: number;
}

export interface Payment {
  status: string;
  reason: string;
  amount: number;
  id: string;
}
export interface UserCaset {
  id: string;
  userId: string;
  casetId: string;
  casetQuantity: number;
  caset: Caset;
  status: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  payment: Payment;
}

export interface CasetWithUserCasetInfo extends Caset {
  userCasets: UserCaset[];
}

export interface RoyaltyFeedAPIResp {
  totalEarned: number;
  royaltyFeed: RoyaltyFeed[];
}

export interface RoyaltyFeed {
  amount: number;
  createdAt: Date;
}

export interface UserOrderResp {
  results: UserCaset[];
  total: number;
}

interface Sale {
  amount: number;
  saleDateTime: Date;
}

export interface PseudoSalesResp {
  pseudoSales: Sale[];
  totalSales: number;
}
