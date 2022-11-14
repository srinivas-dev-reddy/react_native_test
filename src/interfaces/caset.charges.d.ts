export interface Charges {
  id: string;
  name: string;
  description: string;
  chargeFor: string;
  chargeType: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
