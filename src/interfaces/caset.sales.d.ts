export interface LastMonthData {
  customers: number;
  sale: number;
  amount: number;
}

export interface CurrentMonthStat {
  customers: number;
  sale: number;
  amount: number;
  proper_date: string;
}

export interface CasetSalesStats {
  last_month_data: LastMonthData;
  current_month_stats: CurrentMonthStat[];
  todays_sale: number;
  actual_bought: number;
  available_casets: number;
}
