"use client";
"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var supabase_js_1 = require("@supabase/supabase-js");
// Connect to the live Supabase database
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
var supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
var supabase = supabase_js_1.createClient(supabaseUrl, supabaseKey);
// TEMPORARY DEBUG LINE
console.log("Debug URL:", supabaseUrl);
function PrayerWallPage() {
    var _this = this;
    var _a = react_1.useState([]), prayers = _a[0], setPrayers = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    // Form State
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(''), requestText = _d[0], setRequestText = _d[1];
    var _e = react_1.useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var _f = react_1.useState(false), successMsg = _f[0], setSuccessMsg = _f[1];
    // Fetch prayers when the page loads
    react_1.useEffect(function () {
        fetchPrayers();
    }, []);
    var fetchPrayers = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('prayer_requests')
                        .select('*')
                        .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (data) {
                        setPrayers(data);
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!name.trim() || !requestText.trim())
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    return [4 /*yield*/, supabase
                            .from('prayer_requests')
                            .insert([
                            { author_name: name, request_text: requestText }
                        ])];
                case 1:
                    error = (_a.sent()).error;
                    if (!error) {
                        setSuccessMsg(true);
                        setName('');
                        setRequestText('');
                        fetchPrayers(); // Refresh the wall instantly
                        // Hide success message after 4 seconds
                        setTimeout(function () { return setSuccessMsg(false); }, 4000);
                    }
                    else {
                        console.error("Supabase Error:", (error === null || error === void 0 ? void 0 : error.message) || error);
                    }
                    setIsSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-50 font-sans text-slate-900 pb-20" },
        react_1["default"].createElement("nav", { className: "bg-white text-slate-800 shadow-sm sticky top-0 z-40 h-16 px-4 md:px-8 flex items-center justify-between w-full border-b border-slate-100" },
            react_1["default"].createElement(link_1["default"], { href: "/", className: "flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-bold text-sm uppercase tracking-wide" },
                react_1["default"].createElement(lucide_react_1.ArrowLeft, { size: 18 }),
                " Back to Home"),
            react_1["default"].createElement("div", { className: "flex items-center gap-2 font-bold text-slate-900 tracking-tight" },
                react_1["default"].createElement(lucide_react_1.Church, { className: "text-orange-500", size: 24 }),
                "ST. MARY'S AIPCA")),
        react_1["default"].createElement("header", { className: "bg-slate-900 text-white py-16 px-4 text-center relative overflow-hidden" },
            react_1["default"].createElement("div", { className: "absolute inset-0 bg-blue-900/20 mix-blend-multiply" }),
            react_1["default"].createElement("div", { className: "relative z-10 max-w-3xl mx-auto" },
                react_1["default"].createElement("div", { className: "w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm" },
                    react_1["default"].createElement(lucide_react_1.MessageCircleHeart, { size: 32, className: "text-blue-300" })),
                react_1["default"].createElement("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" }, "Prayer Wall"),
                react_1["default"].createElement("p", { className: "text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto" }, "\"For where two or three gather in my name, there am I with them.\" Share your burdens, and let the Kathelwa community stand with you in prayer."))),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8" },
            react_1["default"].createElement("div", { className: "lg:col-span-1" },
                react_1["default"].createElement("div", { className: "bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 sticky top-24" },
                    react_1["default"].createElement("h2", { className: "text-2xl font-bold text-slate-900 mb-2" }, "Submit a Request"),
                    react_1["default"].createElement("p", { className: "text-slate-500 text-sm mb-6" }, "Your request will be posted publicly on the wall below so our congregation can pray for you."),
                    successMsg ? (react_1["default"].createElement("div", { className: "bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center font-medium animate-pulse" }, "Your prayer request has been shared!")) : (react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-bold text-slate-700 mb-1" }, "Your Name"),
                            react_1["default"].createElement("input", { type: "text", required: true, placeholder: "e.g., John Doe or Anonymous", value: name, onChange: function (e) { return setName(e.target.value); }, className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition" })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-sm font-bold text-slate-700 mb-1" }, "Your Prayer Request"),
                            react_1["default"].createElement("textarea", { required: true, rows: 4, placeholder: "How can we pray for you today?", value: requestText, onChange: function (e) { return setRequestText(e.target.value); }, className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" })),
                        react_1["default"].createElement("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex justify-center items-center gap-2 disabled:opacity-70" }, isSubmitting ? react_1["default"].createElement(lucide_react_1.Loader2, { size: 20, className: "animate-spin" }) : react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.Send, { size: 18 }),
                            " Post Prayer")))))),
            react_1["default"].createElement("div", { className: "lg:col-span-2" },
                react_1["default"].createElement("div", { className: "flex items-center justify-between mb-6" },
                    react_1["default"].createElement("h3", { className: "text-xl font-bold text-slate-900" }, "Recent Prayers"),
                    react_1["default"].createElement("span", { className: "bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full" },
                        prayers.length,
                        " Active")),
                loading ? (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center py-20 text-slate-400" },
                    react_1["default"].createElement(lucide_react_1.Loader2, { size: 40, className: "animate-spin mb-4 text-blue-300" }),
                    react_1["default"].createElement("p", null, "Intercession in progress..."))) : prayers.length === 0 ? (react_1["default"].createElement("div", { className: "bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center" },
                    react_1["default"].createElement(lucide_react_1.Heart, { size: 48, className: "text-slate-200 mx-auto mb-4" }),
                    react_1["default"].createElement("h4", { className: "text-lg font-bold text-slate-700 mb-1" }, "The wall is quiet right now"),
                    react_1["default"].createElement("p", { className: "text-slate-500 text-sm" }, "Be the first to share a prayer request with the community."))) : (react_1["default"].createElement("div", { className: "space-y-4" }, prayers.map(function (prayer) { return (react_1["default"].createElement("div", { key: prayer.id, className: "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition" },
                    react_1["default"].createElement("div", { className: "flex justify-between items-start mb-3" },
                        react_1["default"].createElement("h4", { className: "font-bold text-slate-900" }, prayer.author_name),
                        react_1["default"].createElement("span", { className: "text-xs font-medium text-slate-400" }, new Date(prayer.created_at).toLocaleDateString())),
                    react_1["default"].createElement("p", { className: "text-slate-600 leading-relaxed text-sm" },
                        "\"",
                        prayer.request_text,
                        "\""),
                    react_1["default"].createElement("div", { className: "mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 hover:text-red-500 cursor-pointer transition w-max" },
                        react_1["default"].createElement(lucide_react_1.Heart, { size: 16 }),
                        " ",
                        react_1["default"].createElement("span", { className: "text-xs font-bold" }, "Pray for this")))); })))))));
}
exports["default"] = PrayerWallPage;
