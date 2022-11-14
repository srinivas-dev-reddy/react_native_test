type trnType = 'credit' | 'debit';
type status = 'success' | 'failed' | 'pending';

interface TransactionDataProps {
  id: number;
  trnType: trnType;
  amount: number;
  status: status;
  date: string;
}

const transactions: TransactionDataProps[] = [
  {
    id: 1,
    trnType: 'credit',
    amount: 12000,
    status: 'success',
    date: new Date().toString(),
  },
  {
    id: 2,
    trnType: 'debit',
    amount: 2000,
    status: 'success',
    date: new Date().toString(),
  },
  {
    id: 3,
    trnType: 'debit',
    amount: 2000,
    status: 'failed',
    date: new Date().toString(),
  },
  {
    id: 4,
    trnType: 'credit',
    amount: 10000,
    status: 'success',
    date: new Date().toString(),
  },
  {
    id: 5,
    trnType: 'debit',
    amount: 2000,
    status: 'success',
    date: new Date().toString(),
  },
  {
    id: 6,
    trnType: 'debit',
    amount: 2000,
    status: 'failed',
    date: new Date().toString(),
  },
  {
    id: 7,
    trnType: 'credit',
    amount: 10000,
    status: 'success',
    date: new Date().toString(),
  },
];

export default transactions;
