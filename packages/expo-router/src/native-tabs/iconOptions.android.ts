import type { NativeTabsTriggerIconProps } from './common/elements';
import { applyIconSrcOptions, applySelectedColor } from './iconOptions.shared';
import type { NativeTabOptions } from './types';
import { convertMaterialIconNameToImageSource } from './utils/materialIconConverter';

export function appendIconOptions(options: NativeTabOptions, props: NativeTabsTriggerIconProps) {
  if ('drawable' in props && props.drawable) {
    if ('md' in props) {
      console.warn(
        'Both `md` and `drawable` props are provided to NativeTabs.Trigger.Icon. `drawable` will take precedence on Android platform.'
      );
    }
    options.icon = { drawable: props.drawable };
    options.selectedIcon = undefined;
  } else if ('md' in props && props.md) {
    if (process.env.NODE_ENV !== 'production') {
      if ('drawable' in props) {
        console.warn(
          'Both `md` and `drawable` props are provided to NativeTabs.Trigger.Icon. `drawable` will take precedence on Android platform.'
        );
      }
    }
    options.icon = convertMaterialIconNameToImageSource(props.md);
  } else if ('src' in props && props.src) {
    applyIconSrcOptions(options, props);
  }
  applySelectedColor(options, props.selectedColor);
}
