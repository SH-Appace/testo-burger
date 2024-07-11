import {
  HomeIcon,
  HomeIconActive,
  MenuIcon,
  MenuIconActive,
  OrderIcon,
  OrderIconActive,
  ProfileIcon,
  ProfileIconActive,
} from '../assets/svgs/TabIcons';
import HomeStack from './HomeStack';
import MenuStack from './MenuStack';
import OrderStack from './OrderStack';
import ProfileStack from './ProfileStack';

export const tabBarData = [
  {
    name: 'HomeStack',
    component: HomeStack,
    options: {
      label: 'Home',
      active: <HomeIconActive />,
      inActive: <HomeIcon />,
    },
  },
  {
    name: 'MenuStack',
    component: MenuStack,
    options: {
      label: 'Menu',
      active: <MenuIconActive />,
      inActive: <MenuIcon />,
    },
  },
  {
    name: 'OrderStack',
    component: OrderStack,
    options: {
      label: 'Order',
      active: <OrderIconActive />,
      inActive: <OrderIcon />,
    },
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
    options: {
      label: 'Profile',
      active: <ProfileIconActive />,
      inActive: <ProfileIcon />,
    },
  },
];

export const hiddenTabrScreens = [
  'CheckOut',
  'Delivery',
  'Payment',
  'SetLocation',
  'Custom',
  'SpecialOffer',
  'Faq',
  'Notification',
  'EditProfile',
  'Payment',
  'CancelOrder',
  'SearchType',
  'QRCode',
  'Referral',
  'Wishlist',
  'RecommendedFoods',
  'OrderReview',
  'Loyalty',
  'BookATable',
  'Reservation',
  'Settings',
  'PrivacyPolicy',
  'TermsConditions',
  'About',
  'Chat',
];
