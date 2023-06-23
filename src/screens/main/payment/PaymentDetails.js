import {
    WalletSvg,
    PayPalSvg,
    GoogleSvg,
    AppleSvg,
    CashMoneySvg,
    MasterCardSvg,
} from '../../../assets/svgs/PaymentSvgs';
import React from 'react';

const PaymentData = [
    {
        icon: <WalletSvg />,
        wallet: '$9,379',
        text: 'My Wallet',
        id: 1,
    },
    {
        icon: <PayPalSvg />,
        text: 'PayPal',
        id: 2,
    },
    {
        icon: <GoogleSvg />,
        text: 'Google Pay',
        id: 3,
    },
    {
        icon: <AppleSvg />,
        text: 'Apple Pay',
        id: 4,
    },
    {
        icon: <CashMoneySvg />,
        text: 'Cash Money',
        id: 5,
    },
    {
        icon: <MasterCardSvg />,
        text: '•••• •••• •••• •••• 4679',
        id: 6,
    },

]


export default PaymentData;
