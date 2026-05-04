/**
 * TypeScript / non-native fallback. The real per-platform implementations live
 * in `optionsIconConverter.ios.ts` and `optionsIconConverter.android.ts`, which
 * Metro resolves at runtime via platform extensions.
 */
import type { ColorValue } from 'react-native';
import type { PlatformIconAndroid, PlatformIconIOS } from 'react-native-screens';

import type { AwaitedIcon } from './icon';

export function convertOptionsIconToScreensPropsIcon(
  _icon: AwaitedIcon | undefined,
  _iconColor?: ColorValue
): PlatformIconIOS | PlatformIconAndroid | undefined {
  return undefined;
}
