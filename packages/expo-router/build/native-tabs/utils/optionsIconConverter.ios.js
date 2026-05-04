"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOptionsIconToScreensPropsIcon = convertOptionsIconToScreensPropsIcon;
function convertOptionsIconToScreensPropsIcon(icon, iconColor) {
    if (icon && 'sf' in icon && icon.sf) {
        return {
            type: 'sfSymbol',
            name: icon.sf,
        };
    }
    if (icon && (('xcasset' in icon && icon.xcasset) || ('src' in icon && icon.src))) {
        const imageSource = 'xcasset' in icon && icon.xcasset
            ? { uri: icon.xcasset }
            : icon.src;
        const renderingMode = 'renderingMode' in icon ? icon.renderingMode : undefined;
        const effectiveRenderingMode = renderingMode ?? (iconColor !== undefined ? 'template' : 'original');
        if (effectiveRenderingMode === 'original') {
            return { type: 'imageSource', imageSource };
        }
        return { type: 'templateSource', templateSource: imageSource };
    }
    return undefined;
}
//# sourceMappingURL=optionsIconConverter.ios.js.map