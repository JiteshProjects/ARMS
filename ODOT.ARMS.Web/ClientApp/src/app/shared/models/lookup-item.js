"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupItem = void 0;
var LookupItem = /** @class */ (function () {
    function LookupItem() {
    }
    LookupItem.getTxtById = function (id, lst) {
        var retVal = '';
        if ((typeof (id) === 'undefined') || (id === null) || (id === "null"))
            return '';
        try {
            for (var _i = 0, lst_1 = lst; _i < lst_1.length; _i++) {
                var el = lst_1[_i];
                if (el.value === id) {
                    retVal = el.text;
                    break;
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        return retVal;
    };
    return LookupItem;
}());
exports.LookupItem = LookupItem;
//# sourceMappingURL=lookup-item.js.map