import type { PlatformIconAndroid } from 'react-native-screens';

import type { AwaitedIcon } from './icon';

export function convertOptionsIconToScreensPropsIcon(
  icon: AwaitedIcon | undefined
): PlatformIconAndroid | undefined {
  if (icon && 'drawable' in icon && icon.drawable) {
    return {
      type: 'drawableResource',
      name: icon.drawable,
    };
  }
  if (icon && 'src' in icon && icon.src) {
    return { type: 'imageSource', imageSource: icon.src };
  }
  return undefined;
}
