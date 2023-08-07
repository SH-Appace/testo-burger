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
export function HomeIconActive({color, width, height}) {
  return (
    <Svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.857 5.485L20.857 0.485C20.6762 0.184139 20.351 6.67533e-05 20 0H4.00001C3.64902 6.67533e-05 3.32376 0.184139 3.14301 0.485L0.143006 5.485C0.0494962 5.64051 6.37225e-05 5.81854 6.29156e-06 6C-0.00386456 8.20411 1.7789 9.99448 3.98301 10H3.99101C4.97875 10.0025 5.93203 9.63711 6.66501 8.975C8.17898 10.3433 10.483 10.3433 11.997 8.975C13.5117 10.3463 15.8193 10.3463 17.334 8.975C18.5067 10.0329 20.1927 10.3 21.635 9.65636C23.0772 9.01271 24.0043 7.57932 24 6C23.9999 5.81854 23.9505 5.64051 23.857 5.485Z"
        fill={Color.primary}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.016 11.9999C19.0864 12.0006 18.1694 11.7857 17.337 11.3719L17.322 11.3789C15.9028 12.0866 14.2598 12.1982 12.758 11.6889C12.4979 11.6015 12.244 11.4966 11.998 11.3749L11.987 11.3799C10.5683 12.088 8.92525 12.1993 7.424 11.6889C7.16422 11.6015 6.91064 11.4966 6.665 11.3749C5.83409 11.7875 4.91871 12.0015 3.991 11.9999C3.65878 11.9968 3.32736 11.9667 3 11.9099V21.9999C3 22.5522 3.44772 22.9999 4 22.9999H10V16.9999H14V22.9999H20C20.5523 22.9999 21 22.5522 21 21.9999V11.9059C20.6751 11.9641 20.346 11.9956 20.016 11.9999Z"
        fill={Color.primary}
      />
    </Svg>
  );
}
export function HomeIcon({color, width, height}) {
  return (
    <Svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.857 5.485L20.857 0.485C20.6762 0.184139 20.351 6.67533e-05 20 0H4.00001C3.64902 6.67533e-05 3.32376 0.184139 3.14301 0.485L0.143006 5.485C0.0494962 5.64051 6.37225e-05 5.81854 6.29156e-06 6C-0.00386456 8.20411 1.7789 9.99448 3.98301 10H3.99101C4.97875 10.0025 5.93203 9.63711 6.66501 8.975C8.17898 10.3433 10.483 10.3433 11.997 8.975C13.5117 10.3463 15.8193 10.3463 17.334 8.975C18.5067 10.0329 20.1927 10.3 21.635 9.65636C23.0772 9.01271 24.0043 7.57932 24 6C23.9999 5.81854 23.9505 5.64051 23.857 5.485Z"
        fill="#8A94A3"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.016 11.9999C19.0864 12.0006 18.1694 11.7857 17.337 11.3719L17.322 11.3789C15.9028 12.0866 14.2598 12.1982 12.758 11.6889C12.4979 11.6015 12.244 11.4966 11.998 11.3749L11.987 11.3799C10.5683 12.088 8.92525 12.1993 7.424 11.6889C7.16422 11.6015 6.91064 11.4966 6.665 11.3749C5.83409 11.7875 4.91871 12.0015 3.991 11.9999C3.65878 11.9968 3.32736 11.9667 3 11.9099V21.9999C3 22.5522 3.44772 22.9999 4 22.9999H10V16.9999H14V22.9999H20C20.5523 22.9999 21 22.5522 21 21.9999V11.9059C20.6751 11.9641 20.346 11.9956 20.016 11.9999Z"
        fill="#8A94A3"
      />
    </Svg>
  );
}
export function OrderIconActive({color, width, height}) {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 1H19V22L16 20L13 22L10 20L7 22L4 20L1 22V1Z"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 7H10"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 7H15"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 11H10"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 11H15"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 15H10"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 15H15"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function OrderIcon({color, width, height}) {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 1H19V22L16 20L13 22L10 20L7 22L4 20L1 22V1Z"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 7H10"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 7H15"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 11H10"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 11H15"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 15H10"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 15H15"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function MenuIconActive({color, width, height}) {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 22L10 17L1 22V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V22Z"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function MenuIcon({color, width, height}) {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 22L10 17L1 22V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V22Z"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function ProfileIconActive({color, width, height}) {
  return (
    <Svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 12V12C8.239 12 6 9.761 6 7V6C6 3.239 8.239 1 11 1V1C13.761 1 16 3.239 16 6V7C16 9.761 13.761 12 11 12Z"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 20.908C21 19.108 19.803 17.525 18.066 17.052C16.172 16.535 13.586 16 11 16C8.414 16 5.828 16.535 3.934 17.052C2.197 17.525 1 19.108 1 20.908V23H21V20.908Z"
        stroke={Color.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function ProfileIcon({color, width, height}) {
  return (
    <Svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 12V12C8.239 12 6 9.761 6 7V6C6 3.239 8.239 1 11 1V1C13.761 1 16 3.239 16 6V7C16 9.761 13.761 12 11 12Z"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 20.908C21 19.108 19.803 17.525 18.066 17.052C16.172 16.535 13.586 16 11 16C8.414 16 5.828 16.535 3.934 17.052C2.197 17.525 1 19.108 1 20.908V23H21V20.908Z"
        stroke="#8A94A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
