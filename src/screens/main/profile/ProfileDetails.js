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
} from '../../../assets/svgs/ProfileSvgs';

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
];
export default Data;
