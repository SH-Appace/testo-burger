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
  SettingsSvg,
  AboutSvg,
} from '../../../assets/svgs/ProfileSvgs';
import {LogoutSvg, LogoutSvgPrimary} from '../../../assets/svgs/DrawerSvgs';

const Data = [
  {
    id: 1,
    icon: <OfferIcon />,
    name: 'Special Offers & Promo',
    chevron: 'chevron-right',
    link: 'SpecialOffer',
  },

  {
    id: 2,
    icon: <ReferIcon />,
    name: 'Refer a Friend',
    chevron: 'chevron-right',
    link: 'Referral',
  },
  {
    id: 3,
    icon: <LoyaltyIcon />,
    name: 'Loyalty Points',
    chevron: 'chevron-right',
    link: 'Loyalty',
  },
  {
    id: 4,
    icon: <HelpCenterIcon />,
    name: 'Help Center',
    chevron: 'chevron-right',
    link: 'Faq',
  },
  {
    id: 5,
    icon: <SettingsSvg />,
    name: 'Settings',
    chevron: 'chevron-right',
    link: 'Settings',
  },
  {
    id: 6,
    icon: <AboutSvg />,
    name: 'About',
    chevron: 'chevron-right',
    link: 'About',
  },
  {
    id: 9,
    icon: <LogoutSvgPrimary />,
    name: 'Logout',
  },
];
const DataNotLogin = [
  {
    id: 1,
    icon: <OfferIcon />,
    name: 'Special Offers & Promo',
    chevron: 'chevron-right',
    link: 'SpecialOffer',
  },
  {
    id: 4,
    icon: <HelpCenterIcon />,
    name: 'Help Center',
    chevron: 'chevron-right',
    link: 'Faq',
  },

  {
    id: 6,
    icon: <AboutSvg />,
    name: 'About',
    chevron: 'chevron-right',
    link: 'About',
  },
];
export {Data, DataNotLogin};
