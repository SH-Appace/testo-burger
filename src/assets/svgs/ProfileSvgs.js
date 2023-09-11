import React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  ClipPath,
  Rect,
  Mask,
} from 'react-native-svg';
import {Color} from '../../globalStyle/Theme';

export function OfferIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19 5H19.5C19.5 4.72386 19.2761 4.5 19 4.5V5ZM5 5V4.5C4.72386 4.5 4.5 4.72386 4.5 5H5ZM22 8H22.5C22.5 7.72386 22.2761 7.5 22 7.5V8ZM22 16V16.5C22.2761 16.5 22.5 16.2761 22.5 16H22ZM19 19V19.5C19.2761 19.5 19.5 19.2761 19.5 19H19ZM5 19H4.5C4.5 19.2761 4.72386 19.5 5 19.5V19ZM2 16H1.5C1.5 16.2761 1.72386 16.5 2 16.5V16ZM2 8V7.5C1.72386 7.5 1.5 7.72386 1.5 8H2ZM19 4.5H5V5.5H19V4.5ZM22 7.5C20.6193 7.5 19.5 6.38071 19.5 5H18.5C18.5 6.933 20.067 8.5 22 8.5V7.5ZM22.5 16V8H21.5V16H22.5ZM19.5 19C19.5 17.6193 20.6193 16.5 22 16.5V15.5C20.067 15.5 18.5 17.067 18.5 19H19.5ZM5 19.5H19V18.5H5V19.5ZM2 16.5C3.38071 16.5 4.5 17.6193 4.5 19H5.5C5.5 17.067 3.933 15.5 2 15.5V16.5ZM1.5 8V16H2.5V8H1.5ZM4.5 5C4.5 6.38071 3.38071 7.5 2 7.5V8.5C3.933 8.5 5.5 6.933 5.5 5H4.5Z"
        fill={Color.primary}
      />
      <Circle
        cx="10"
        cy="9"
        r="1.5"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
      <Circle
        cx="14.5"
        cy="14.5"
        r="1.5"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
      <Path
        d="M15.5 8.5L8.5 15.5"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
    </Svg>
  );
}
export function PaymentIcon({width, height}) {
  return (
    <Svg
      width="26"
      height="26"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M22.6992 14.1217H18.1648C16.5137 14.1217 15.1748 12.7828 15.1748 11.1306C15.1748 9.47951 16.5137 8.14062 18.1648 8.14062H22.6637"
        stroke={Color.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.6752 11.0614H18.3285"
        stroke={Color.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.87305 6.50087H11.6097"
        stroke={Color.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.16602 11.2952C1.16602 3.82301 3.87824 1.33301 12.0171 1.33301C20.1549 1.33301 22.8671 3.82301 22.8671 11.2952C22.8671 18.7663 20.1549 21.2575 12.0171 21.2575C3.87824 21.2575 1.16602 18.7663 1.16602 11.2952Z"
        stroke={Color.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function ReferIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15 20H17C18.1046 20 19 19.1046 19 18V15"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 16.5L19 15L21.3209 16.5"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M9.32129 4H7.32129C6.21672 4 5.32129 4.89543 5.32129 6V9"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M7.82129 7.5L5.32129 9L3.0004 7.5"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Circle
        cx="17.2008"
        cy="4.4"
        r="2.4"
        stroke={Color.primary}
        strokeLinejoin="bevel"
      />
      <Path
        d="M17.2004 8.59998C15.7263 8.59998 14.4074 8.93223 13.5269 9.45513C12.5771 10.0191 13.2958 11 14.4004 11H20.0004C21.105 11 21.8236 10.0191 20.8739 9.45513C19.9934 8.93223 18.6745 8.59998 17.2004 8.59998Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Circle
        cx="6.80039"
        cy="15.4"
        r="2.4"
        stroke={Color.primary}
        strokeLinejoin="bevel"
      />
      <Path
        d="M6.8 19.6C5.32589 19.6 4.00698 19.9322 3.12647 20.4551C2.17675 21.0191 2.89543 22 4 22H9.6C10.7046 22 11.4232 21.0191 10.4735 20.4551C9.59302 19.9322 8.27411 19.6 6.8 19.6Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function ProfileIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle
        cx="12"
        cy="9.25"
        r="3.75"
        stroke={Color.primary}
        stroke-linejoin="bevel"
      />
      <Path
        d="M19.5 18.5C19.5 17.4289 16.1421 15.25 12 15.25C7.85786 15.25 4.5 17.4289 4.5 18.5"
        stroke={Color.primary}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
    </Svg>
  );
}
export function NotificationIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.37604 8.74461C6.73822 6.86125 8.38619 5.5 10.3041 5.5H13.6959C15.6138 5.5 17.2618 6.86125 17.624 8.74461L19.5 18.5H4.5L6.37604 8.74461Z"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
      <Path d="M2 18.5H22" stroke={Color.primary} stroke-linejoin="round" />
      <Path
        d="M9 18.5H15V19.5C15 20.6046 14.1046 21.5 13 21.5H11C9.89543 21.5 9 20.6046 9 19.5V18.5Z"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
      <Path
        d="M10 5.5H14V4.5C14 3.39543 13.1046 2.5 12 2.5V2.5C10.8954 2.5 10 3.39543 10 4.5V5.5Z"
        stroke={Color.primary}
        stroke-linejoin="round"
      />
    </Svg>
  );
}
export function LogoutIcon({width, height}) {
  return (
    <Svg
      width="3"
      height="3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M7 12H19" stroke={Color.primary} strokeLinejoin="round" />
      <Path
        d="M15.5 8.5L19 12L15.5 15.5"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M12 17V20H4V4H12V7"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function LoyaltyIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.0489 3.92705C11.3483 3.00574 12.6517 3.00574 12.9511 3.92705L14.2451 7.90983C14.379 8.32185 14.763 8.60081 15.1962 8.60081H19.3839C20.3527 8.60081 20.7554 9.84043 19.9717 10.4098L16.5838 12.8713C16.2333 13.126 16.0866 13.5773 16.2205 13.9894L17.5146 17.9721C17.8139 18.8934 16.7595 19.6596 15.9757 19.0902L12.5878 16.6287C12.2373 16.374 11.7627 16.374 11.4122 16.6287L8.02426 19.0902C7.24054 19.6596 6.18607 18.8934 6.48542 17.9721L7.7795 13.9894C7.91338 13.5773 7.76672 13.126 7.41623 12.8713L4.02827 10.4098C3.24456 9.84043 3.64734 8.60081 4.61606 8.60081H8.8038C9.23703 8.60081 9.62099 8.32185 9.75486 7.90983L11.0489 3.92705Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function HelpCenterIcon({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 4.5L14.9605 3.51317C15.9802 3.17328 17.048 3 18.1228 3H21V17H18.1228C17.048 17 15.9802 17.1733 14.9605 17.5132L12 18.5V4.5Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M12 18V21.5L14.9605 20.5132C15.9802 20.1733 17.048 20 18.1228 20H21V16.5"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M12 4.5L9.0395 3.51317C8.01984 3.17328 6.95204 3 5.87722 3H3V17H5.87722C6.95204 17 8.01984 17.1733 9.0395 17.5132L12 18.5V4.5Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path
        d="M12 18V21.5L9.0395 20.5132C8.01984 20.1733 6.95204 20 5.87722 20H3V16.5"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function DeleteAccountSvg({width, height}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5 7.5H19L18 22H6L5 7.5Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
      <Path d="M2 5H22" stroke={Color.primary} strokeLinejoin="round" />
      <Path d="M12 10V19" stroke={Color.primary} strokeLinejoin="round" />
      <Path d="M8.5 10L9 19" stroke={Color.primary} strokeLinejoin="round" />
      <Path d="M15.5 10L15 19" stroke={Color.primary} strokeLinejoin="round" />
      <Path
        d="M6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V5H6V4Z"
        stroke={Color.primary}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WarningSvg() {
  return (
    <Svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6C11.9983 4.40924 11.3656 2.88413 10.2407 1.75929C9.11587 0.634449 7.59076 0.00174696 6 0ZM6 10.8C5.05065 10.8 4.12262 10.5185 3.33326 9.99105C2.54391 9.46362 1.92868 8.71396 1.56538 7.83688C1.20208 6.95979 1.10702 5.99467 1.29223 5.06357C1.47744 4.13246 1.9346 3.27718 2.60589 2.60589C3.27718 1.9346 4.13246 1.47744 5.06357 1.29223C5.99468 1.10702 6.9598 1.20208 7.83688 1.56538C8.71397 1.92868 9.46362 2.54391 9.99105 3.33326C10.5185 4.12262 10.8 5.05065 10.8 6C10.7986 7.2726 10.2924 8.49267 9.39254 9.39253C8.49267 10.2924 7.2726 10.7986 6 10.8Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
      <Path
        d="M6.5999 3H5.3999V7.2H6.5999V3Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
      <Path
        d="M6.5999 7.8H5.3999V9H6.5999V7.8Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
    </Svg>
  );
}
export function WarningSvgBig() {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6C11.9983 4.40924 11.3656 2.88413 10.2407 1.75929C9.11587 0.634449 7.59076 0.00174696 6 0ZM6 10.8C5.05065 10.8 4.12262 10.5185 3.33326 9.99105C2.54391 9.46362 1.92868 8.71396 1.56538 7.83688C1.20208 6.95979 1.10702 5.99467 1.29223 5.06357C1.47744 4.13246 1.9346 3.27718 2.60589 2.60589C3.27718 1.9346 4.13246 1.47744 5.06357 1.29223C5.99468 1.10702 6.9598 1.20208 7.83688 1.56538C8.71397 1.92868 9.46362 2.54391 9.99105 3.33326C10.5185 4.12262 10.8 5.05065 10.8 6C10.7986 7.2726 10.2924 8.49267 9.39254 9.39253C8.49267 10.2924 7.2726 10.7986 6 10.8Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
      <Path
        d="M6.5999 3H5.3999V7.2H6.5999V3Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
      <Path
        d="M6.5999 7.8H5.3999V9H6.5999V7.8Z"
        fill={Color.secondary}
        strokeWidth={5}
      />
    </Svg>
  );
}
