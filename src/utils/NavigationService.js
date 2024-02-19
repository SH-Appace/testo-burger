// NavigationService.js
import * as React from 'react';

export const navigationRef = React.createRef();
export let openedFromNotification = false;
export function toggleOpenedFromNotification() {
  openedFromNotification = !openedFromNotification;
}
export const navigate = (name, params) => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current?.navigate(name, params);
  } else {
    console.log("Navigation isn't ready yet.");
    // Optionally, you can queue these navigation actions and execute them later when ready.
  }
};
