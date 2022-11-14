import businesses from './all-businesses';

const businessNames = businesses.map(b => ({[b.name]: b}));

type businessNameTypes = keyof typeof businessNames;

interface Order {
  quantity: number;
  price: number;
  createdAt: number;
}

export interface ActiveInvestMentItemProp {
  id: number;
  name: string;
  businessLogoUrl: string;
  businessAlias: string;
  price: number;
  currency: string;
  currencySymbol: string;
  percentChange: string;
  percentChangeType: string;
  accentColor: string;
  boughtQuantity: number;
  averageBuyPrice?: number;
  orders: Order[];
}

const activeInvestments: ActiveInvestMentItemProp[] = [
  {
    id: 1,
    name: 'Nike',
    businessLogoUrl:
      'https://play-lh.googleusercontent.com/eLqKK4MkDoXXbD_F3A_2rs-othxTESxbocvyOGyhAmbNCydgnYKczItIY2-HLYJmhr6Q=w480-h960-rw',
    businessAlias: 'NIKE',
    price: 220.13,
    currency: 'INR',
    currencySymbol: '₹',
    percentChange: '1.25',
    percentChangeType: 'profit',
    accentColor: '#000',
    boughtQuantity: 120,
    orders: [
      {
        quantity: 100,
        price: 100,
        createdAt: Number(new Date()),
      },
      {
        quantity: 20,
        price: 120,
        createdAt: Number(new Date()),
      },
    ],
  },
  {
    id: 2,
    name: 'Bewakoof',
    businessLogoUrl:
      'https://play-lh.googleusercontent.com/U2e_iBIp_jSiFXYfSVAgEBglP-NpSpXpuyzIZY2R-1r1GYE5_ULD15ammyRiSAKtDw=s96-rw',
    price: 123.77,
    businessAlias: 'BWK',
    currency: 'INR',
    currencySymbol: '₹',
    percentChange: '2.31',
    percentChangeType: 'profit',
    accentColor: '#febe01',
    boughtQuantity: 250,
    orders: [
      {
        quantity: 100,
        price: 100,
        createdAt: Number(new Date()),
      },
      {
        quantity: 20,
        price: 120,
        createdAt: Number(new Date()),
      },
      {
        quantity: 130,
        price: 170,
        createdAt: Number(new Date()),
      },
    ],
  },
];

export default activeInvestments;
