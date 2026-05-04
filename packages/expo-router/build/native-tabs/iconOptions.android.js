"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendIconOptions = appendIconOptions;
const iconOptions_shared_1 = require("./iconOptions.shared");
const materialIconConverter_1 = require("./utils/materialIconConverter");
function appendIconOptions(options, props) {
    if ('drawable' in props && props.drawable) {
        if ('md' in props) {
            console.warn('Both `md` and `drawable` props are provided to NativeTabs.Trigger.Icon. `drawable` will take precedence on Android platform.');
        }
        options.icon = { drawable: props.drawable };
        options.selectedIcon = undefined;
    }
    else if ('md' in props && props.md) {
        if (process.env.NODE_ENV !== 'production') {
            if ('drawable' in props) {
                console.warn('Both `md` and `drawable` props are provided to NativeTabs.Trigger.Icon. `drawable` will take precedence on Android platform.');
            }
        }
        options.icon = (0, materialIconConverter_1.convertMaterialIconNameToImageSource)(props.md);
    }
    else if ('src' in props && props.src) {
        (0, iconOptions_shared_1.applyIconSrcOptions)(options, props);
    }
    (0, iconOptions_shared_1.applySelectedColor)(options, props.selectedColor);
}
//# sourceMappingURL=iconOptions.android.js.map