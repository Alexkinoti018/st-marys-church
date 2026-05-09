"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
// This is the crucial link to your database!
var supabase_1 = require("@/lib/supabase");
function PrayerWallPage() {
    var _this = this;
    var _a = react_1.useState([]), prayers = _a[0], setPrayers = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = react_1.useState({ name: '', request: '' }), newPrayer = _d[0], setNewPrayer = _d[1];
    var formatDate = function (dateString) {
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    // 2. Send the real prayer to the database
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, insertedPrayer, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!newPrayer.request.trim())
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('prayer_requests')
                            .insert([
                            {
                                name: newPrayer.name.trim() === '' ? 'Anonymous' : newPrayer.name,
                                request: newPrayer.request.trim()
                            }
                        ])
                            .select()];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    if (data) {
                        insertedPrayer = __assign(__assign({}, data[0]), { hasPrayed: false });
                        setPrayers(__spreadArrays([insertedPrayer], prayers));
                        setNewPrayer({ name: '', request: '' });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error submitting prayer:', error_1);
                    alert('Failed to submit prayer. Please try again.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // 3. Update the database when someone clicks "I Prayed"
    var handlePrayClick = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var prayerToUpdate, newCount, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prayerToUpdate = prayers.find(function (p) { return p.id === id; });
                    if (!prayerToUpdate)
                        return [2 /*return*/];
                    newCount = prayerToUpdate.hasPrayed
                        ? prayerToUpdate.prayers_count - 1
                        : prayerToUpdate.prayers_count + 1;
                    setPrayers(prayers.map(function (prayer) {
                        if (prayer.id === id) {
                            return __assign(__assign({}, prayer), { prayers_count: newCount, hasPrayed: !prayer.hasPrayed });
                        }
                        return prayer;
                    }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('prayer_requests')
                            .update({ prayers_count: newCount })
                            .eq('id', id)];
                case 2:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error updating prayer count:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-50 pb-20 font-sans" },
        react_1["default"].createElement("header", { className: "bg-[#1a2233] text-white py-24 px-4 text-center relative overflow-hidden" },
            react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-blue-900/40" }),
            react_1["default"].createElement("div", { className: "relative z-10 max-w-3xl mx-auto" },
                react_1["default"].createElement(lucide_react_1.MessageSquareQuote, { className: "mx-auto mb-6 text-orange-500", size: 48 }),
                react_1["default"].createElement("h1", { className: "text-5xl md:text-7xl font-black mb-6 tracking-tight italic" }, "Prayer Wall."),
                react_1["default"].createElement("p", { className: "text-lg text-slate-400 max-w-xl mx-auto leading-relaxed" },
                    "\"Carry each other\u2019s burdens, and in this way you will fulfill the law of Christ.\" ",
                    react_1["default"].createElement("br", null),
                    " ",
                    react_1["default"].createElement("span", { className: "text-orange-500 font-bold text-sm uppercase tracking-widest mt-2 block" }, "\u2014 Galatians 6:2")))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8" },
            react_1["default"].createElement("div", { className: "lg:col-span-1" },
                react_1["default"].createElement("div", { className: "bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 lg:sticky lg:top-28" },
                    react_1["default"].createElement("h2", { className: "text-2xl font-black text-slate-900 mb-2" }, "Share a Request"),
                    react_1["default"].createElement("p", { className: "text-slate-500 text-sm mb-8" }, "Let the St. Mary's community stand with you in prayer."),
                    react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        react_1["default"].createElement("div", { className: "relative border border-slate-200 rounded-2xl overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all" },
                            react_1["default"].createElement("div", { className: "absolute left-4 top-4 text-slate-400" },
                                react_1["default"].createElement(lucide_react_1.User, { size: 18 })),
                            react_1["default"].createElement("input", { type: "text", value: newPrayer.name, onChange: function (e) { return setNewPrayer(__assign(__assign({}, newPrayer), { name: e.target.value })); }, className: "w-full bg-slate-50 pl-12 pr-4 py-4 outline-none text-slate-900", placeholder: "Your Name (Optional)" })),
                        react_1["default"].createElement("textarea", { required: true, rows: 5, value: newPrayer.request, onChange: function (e) { return setNewPrayer(__assign(__assign({}, newPrayer), { request: e.target.value })); }, className: "w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none text-slate-900", placeholder: "How can we pray for you?" }),
                        react_1["default"].createElement("button", { type: "submit", disabled: isSubmitting || !newPrayer.request.trim(), className: "w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase tracking-widest text-sm" }, isSubmitting ? react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin", size: 18 }),
                            " POSTING...") : react_1["default"].createElement(react_1["default"].Fragment, null,
                            "SUBMIT PRAYER ",
                            react_1["default"].createElement(lucide_react_1.Send, { size: 18 })))))),
            react_1["default"].createElement("div", { className: "lg:col-span-2 space-y-6" },
                isLoading && (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center py-20 text-slate-400" },
                    react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin mb-4 text-orange-500", size: 40 }),
                    react_1["default"].createElement("p", { className: "font-bold tracking-widest uppercase text-sm" }, "Loading Prayers.Intercession Hour .."))),
                !isLoading && prayers.map(function (prayer) { return (react_1["default"].createElement("div", { key: prayer.id, className: "bg-white p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-xl" },
                    react_1["default"].createElement("div", { className: "flex justify-between items-center mb-6" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                            react_1["default"].createElement("div", { className: "w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black uppercase text-sm" }, (prayer.name || 'A').charAt(0)),
                            react_1["default"].createElement("h3", { className: "font-bold text-slate-900" }, prayer.name || 'Anonymous')),
                        react_1["default"].createElement("div", { className: "flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest" },
                            react_1["default"].createElement(lucide_react_1.Calendar, { size: 14 }),
                            " ",
                            formatDate(prayer.created_at))),
                    react_1["default"].createElement("p", { className: "text-slate-600 leading-relaxed mb-8 text-lg" },
                        "\"",
                        prayer.request,
                        "\""),
                    react_1["default"].createElement("div", { className: "flex items-center justify-between pt-6 border-t border-slate-100" },
                        react_1["default"].createElement("span", { className: "text-sm font-bold text-slate-400" },
                            react_1["default"].createElement("span", { className: "text-slate-900" }, prayer.prayers_count),
                            " people prayed for this"),
                        react_1["default"].createElement("button", { type: "button", onClick: function () { return handlePrayClick(prayer.id); }, className: "flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 " + (prayer.hasPrayed
                                ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-inner'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 shadow-sm') },
                            react_1["default"].createElement(lucide_react_1.Heart, { size: 16, className: prayer.hasPrayed ? 'fill-orange-500 text-orange-500' : '' }),
                            prayer.hasPrayed ? 'PRAYED' : 'I PRAYED FOR THIS')))); }),
                !isLoading && prayers.length === 0 && (react_1["default"].createElement("div", { className: "bg-white p-12 rounded-[2.5rem] text-center border border-slate-100" },
                    react_1["default"].createElement(lucide_react_1.Heart, { className: "mx-auto text-slate-300 mb-4", size: 48 }),
                    react_1["default"].createElement("h3", { className: "text-xl font-bold text-slate-900 mb-2" }, "No prayers yet"),
                    react_1["default"].createElement("p", { className: "text-slate-500" }, "Be the first to share a prayer request with the Kathelwa community.")))))));
}
exports["default"] = PrayerWallPage;
