import React from "react";
import {
    OrderCancelledIcon,
    OrderSuccessIcon,
    ServicesIcon,
    CreditCardIcon,
    AccountSetIcon,
} from '../../../assets/svgs/NotificationSvg'
const Data = [
    {
        icon: <OrderCancelledIcon />,
        head: 'Orders Cancelled!',
        date: "19 Dec, 2022",
        time: '20:50 PM',
        new: 'New',
        description: 'You have canceled an order at Burger Hut. We apologize for your inconvenience. We will try to improve our service next time.'
    },
    {
        icon: <OrderSuccessIcon />,
        head: 'Orders Successful!',
        date: "19 Dec, 2022",
        time: '20:50 PM',
        new: 'New',
        description: 'You have placed an order at Burger Hut and paid $24. Your food will arrive soon. Enjoy our services 😊'
    },
    {
        icon: <ServicesIcon />,
        head: 'New Services Available!',
        date: "19 Dec, 2022",
        time: '20:50 PM',
        description: 'You can now make multiple food orders at one time. You can also cancel your orders.'
    },
    {
        icon: <CreditCardIcon />,
        head: 'Credit Card Connected!',
        date: "19 Dec, 2022",
        time: '20:50 PM',
        description: 'Your credit card has been successfully linked with Foodu. Enjoy our services.'
    },
    {
        icon: <AccountSetIcon />,
        head: 'Account Setup Successful!',
        date: "19 Dec, 2022",
        time: '20:50 PM',
        description: 'Your account creation is successful, you can now experience our services.'
    },
]
export default Data;