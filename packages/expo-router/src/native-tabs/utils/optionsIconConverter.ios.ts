import type { ColorValue, ImageSourcePropType } from 'react-native';
import type { PlatformIconIOS } from 'react-native-screens';

import type { AwaitedIcon } from './icon';

export function convertOptionsIconToScreensPropsIcon(
  icon: AwaitedIcon | undefined,
  iconColor?: ColorValue
): PlatformIconIOS | undefined {
  if (icon && 'sf' in icon && icon.sf) {
    return {
      type: 'sfSymbol',
      name: icon.sf,
    };
  }
  if (icon && (('xcasset' in icon && icon.xcasset) || ('src' in icon && icon.src))) {
    const imageSource =
      'xcasset' in icon && icon.xcasset
        ? { uri: icon.xcasset }
        : (icon as { src: ImageSourcePropType }).src;
    const renderingMode = 'renderingMode' in icon ? icon.renderingMode : undefined;
    const effectiveRenderingMode =
      renderingMode ?? (iconColor !== undefined ? 'template' : 'original');
    if (effectiveRenderingMode === 'original') {
      return { type: 'imageSource', imageSource };
    }
    return { type: 'templateSource', templateSource: imageSource };
  }
  return undefined;
}
