import type { NativeTabsTriggerIconProps } from './common/elements';
import { applyIconSrcOptions, applySelectedColor } from './iconOptions.shared';
import type { NativeTabOptions } from './types';

export function appendIconOptions(options: NativeTabOptions, props: NativeTabsTriggerIconProps) {
  if ('sf' in props && props.sf) {
    if (typeof props.sf === 'string') {
      options.icon = props.sf
        ? {
            sf: props.sf,
          }
        : undefined;
      options.selectedIcon = undefined;
    } else if (props.sf) {
      options.icon = props.sf.default
        ? {
            sf: props.sf.default,
          }
        : undefined;
      options.selectedIcon = props.sf.selected
        ? {
            sf: props.sf.selected,
          }
        : undefined;
    }
  } else if ('xcasset' in props && props.xcasset) {
    if (typeof props.xcasset === 'string') {
      options.icon = { xcasset: props.xcasset };
      options.selectedIcon = undefined;
    } else {
      options.icon = props.xcasset.default ? { xcasset: props.xcasset.default } : undefined;
      options.selectedIcon = props.xcasset.selected
        ? { xcasset: props.xcasset.selected }
        : undefined;
    }
  } else if ('src' in props && props.src) {
    applyIconSrcOptions(options, props);
  }
  applySelectedColor(options, props.selectedColor);
}
