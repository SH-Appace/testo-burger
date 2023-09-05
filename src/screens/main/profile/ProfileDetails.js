import React from 'react';
import {
  OfferIcon,
  PaymentIcon,
  ProfileIcon,
  NotificationIcon,
  HelpCenterIcon,
  LogoutIcon,
  ReferIcon,
  LoyaltyIcon,
  DeleteAccountSvg,
} from '../../../assets/svgs/ProfileSvgs';
import { LogoutSvg, LogoutSvgPrimary } from '../../../assets/svgs/DrawerSvgs';

const Data = [
  {
    id: 1,
    icon: <OfferIcon />,
    name: 'Special Offers & Promo',
    chevron: 'chevron-right',
    link: 'SpecialOffer',
  },

  {
    id: 3,
    icon: <ProfileIcon />,
    name: 'Profile',
    chevron: 'chevron-right',
    link: 'EditProfile',
  },

  {
    id: 4,
    icon: <NotificationIcon />,
    name: 'Notification',
    chevron: 'chevron-right',
    link: 'Notification',
  },
  {
    id: 5,
    icon: <ReferIcon />,
    name: 'Refer a Friend',
    chevron: 'chevron-right',
    link: 'Referral',
  },
  {
    id: 6,
    icon: <LoyaltyIcon />,
    name: 'Loyalty Points',
    chevron: 'chevron-right',
    link: 'Loyalty',
  },
  {
    id: 7,
    icon: <HelpCenterIcon />,
    name: 'Help Center',
    chevron: 'chevron-right',
    link: 'Faq',
  },
  {
    id: 8,
    icon: <LogoutSvgPrimary />,
    name: 'Logout',
  },
  {
    id: 9,
    icon: <DeleteAccountSvg />,
    name: 'Delete Account',

  },
];
export default Data;
