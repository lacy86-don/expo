"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendIconOptions = appendIconOptions;
const iconOptions_shared_1 = require("./iconOptions.shared");
function appendIconOptions(options, props) {
    if ('src' in props && props.src) {
        (0, iconOptions_shared_1.applyIconSrcOptions)(options, props);
    }
    (0, iconOptions_shared_1.applySelectedColor)(options, props.selectedColor);
}
//# sourceMappingURL=iconOptions.js.map