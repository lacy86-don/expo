"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOptionsIconToScreensPropsIcon = convertOptionsIconToScreensPropsIcon;
function convertOptionsIconToScreensPropsIcon(icon) {
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
//# sourceMappingURL=optionsIconConverter.android.js.map