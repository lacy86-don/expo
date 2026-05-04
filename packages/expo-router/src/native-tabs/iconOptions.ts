import type { NativeTabsTriggerIconProps } from './common/elements';
import { applyIconSrcOptions, applySelectedColor } from './iconOptions.shared';
import type { NativeTabOptions } from './types';

export function appendIconOptions(options: NativeTabOptions, props: NativeTabsTriggerIconProps) {
  if ('src' in props && props.src) {
    applyIconSrcOptions(options, props);
  }
  applySelectedColor(options, props.selectedColor);
}
