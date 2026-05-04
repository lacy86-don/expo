"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendIconOptions = appendIconOptions;
const iconOptions_shared_1 = require("./iconOptions.shared");
function appendIconOptions(options, props) {
    if ('sf' in props && props.sf) {
        if (typeof props.sf === 'string') {
            options.icon = props.sf
                ? {
                    sf: props.sf,
                }
                : undefined;
            options.selectedIcon = undefined;
        }
        else if (props.sf) {
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
    }
    else if ('xcasset' in props && props.xcasset) {
        if (typeof props.xcasset === 'string') {
            options.icon = { xcasset: props.xcasset };
            options.selectedIcon = undefined;
        }
        else {
            options.icon = props.xcasset.default ? { xcasset: props.xcasset.default } : undefined;
            options.selectedIcon = props.xcasset.selected
                ? { xcasset: props.xcasset.selected }
                : undefined;
        }
    }
    else if ('src' in props && props.src) {
        (0, iconOptions_shared_1.applyIconSrcOptions)(options, props);
    }
    (0, iconOptions_shared_1.applySelectedColor)(options, props.selectedColor);
}
//# sourceMappingURL=iconOptions.ios.js.map