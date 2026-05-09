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
var supabase_1 = require("@/lib/supabase");
function AboutPage() {
    var _a = react_1.useState([]), leaders = _a[0], setLeaders = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var choirs = [
        "Main Church Choir", "Youth Choir", "Mother Council",
        "Church Elders", "Sunday School Choir", "St. Mary’s Praise Team",
        "Kathelwa Evangelism Choir", "Archdeaconry Choir", "Mothers Union Choir"
    ];
    react_1.useEffect(function () {
        function fetchStaff() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, data, error, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            setIsLoading(true);
                            return [4 /*yield*/, supabase_1.supabase
                                    .from('church-staff')
                                    .select('*')
                                    .order('priority', { ascending: true })];
                        case 1:
                            _a = _b.sent(), data = _a.data, error = _a.error;
                            if (error)
                                throw error;
                            setLeaders(data || []);
                            return [3 /*break*/, 4];
                        case 2:
                            err_1 = _b.sent();
                            console.error("Error fetching staff:", err_1);
                            return [3 /*break*/, 4];
                        case 3:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        fetchStaff();
    }, []);
    return (react_1["default"].createElement("div", { className: "bg-slate-50 min-h-screen pb-20 font-sans" },
        react_1["default"].createElement("header", { className: "bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden" },
            react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-orange-900/20" }),
            react_1["default"].createElement("div", { className: "relative z-10 max-w-4xl mx-auto" },
                react_1["default"].createElement(lucide_react_1.Church, { className: "mx-auto mb-6 text-orange-500", size: 48 }),
                react_1["default"].createElement("h1", { className: "text-5xl md:text-7xl font-black italic mb-6 tracking-tight" }, "Our Story."),
                react_1["default"].createElement("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium" }, "St. Mary's AIPCA Kathelwa is a vibrant family of believers dedicated to faith, community, and the rich traditions of the AIPCA."))),
        react_1["default"].createElement("section", { className: "max-w-6xl mx-auto px-4 -mt-12 relative z-20 mb-24" },
            react_1["default"].createElement("div", { className: "bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-16" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(lucide_react_1.BookOpen, { className: "text-orange-600 mb-6", size: 32 }),
                    react_1["default"].createElement("h2", { className: "text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4" }, "Our Mission"),
                    react_1["default"].createElement("p", { className: "text-slate-600 leading-relaxed text-lg" }, "To preach the gospel of Jesus Christ, nurture believers in spiritual growth, and serve the Kathelwa community with unwavering love.")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(lucide_react_1.Star, { className: "text-blue-600 mb-6", size: 32 }),
                    react_1["default"].createElement("h2", { className: "text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4" }, "Our Vision"),
                    react_1["default"].createElement("p", { className: "text-slate-600 leading-relaxed text-lg" }, "To be a beacon of hope and spiritual excellence, raising a generation that fiercely loves God.")))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-4 py-12" },
            react_1["default"].createElement("div", { className: "text-center mb-16" },
                react_1["default"].createElement("span", { className: "text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block" }, "Guided By Faith"),
                react_1["default"].createElement("h2", { className: "text-4xl md:text-6xl font-black tracking-tighter text-slate-900 text-center uppercase" }, "Church Leadership")),
            isLoading ? (react_1["default"].createElement("div", { className: "flex justify-center py-20" },
                react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin text-orange-500", size: 48 }))) : (react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10" }, leaders.map(function (leader, i) { return (react_1["default"].createElement("div", { key: i, className: "bg-white p-8 rounded-[2.5rem] border-2 border-transparent shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-orange-400 text-center" },
                react_1["default"].createElement("div", { className: "w-40 h-40 rounded-full mb-6 mx-auto bg-slate-100 border-4 border-slate-50 overflow-hidden shadow-inner flex items-center justify-center" },
                    react_1["default"].createElement("img", { src: leader.image_url || "/placeholder-avatar.png", alt: leader.name, className: "w-full h-full object-contain transition-all duration-700" })),
                react_1["default"].createElement("h3", { className: "text-xl font-black text-slate-900 mb-1" }, leader.name),
                react_1["default"].createElement("p", { className: "text-orange-600 text-xs font-black uppercase tracking-widest mb-4" }, leader.role),
                react_1["default"].createElement("p", { className: "text-slate-500 text-sm leading-relaxed" }, leader.bio || "Serving the St. Mary's congregation with dedication and faith."))); })))),
        react_1["default"].createElement("section", { className: "bg-slate-900 text-white py-28 mt-24 rounded-[4rem] mx-4 shadow-2xl" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-8" },
                react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 gap-6" },
                    react_1["default"].createElement("div", { className: "text-left" },
                        react_1["default"].createElement(lucide_react_1.Music, { className: "text-orange-500 mb-6", size: 48 }),
                        react_1["default"].createElement("h2", { className: "text-4xl md:text-6xl font-black italic" }, "The 9 Choirs"),
                        react_1["default"].createElement("p", { className: "text-slate-400 mt-4 text-xl" }, "Harmony in worship across all generations.")),
                    react_1["default"].createElement(link_1["default"], { href: "/gallery?filter=Choir", className: "bg-white/10 hover:bg-orange-600 px-8 py-4 rounded-full transition-all font-bold group flex items-center gap-2" },
                        "View Choir Gallery",
                        react_1["default"].createElement(lucide_react_1.ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" }))),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, choirs.map(function (choir, index) { return (react_1["default"].createElement("div", { key: index, className: "bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-orange-500 transition-all group" },
                    react_1["default"].createElement(lucide_react_1.CheckCircle2, { size: 20, className: "text-orange-500 group-hover:text-white" }),
                    react_1["default"].createElement("p", { className: "font-bold text-slate-200 group-hover:text-white" }, choir))); }))))));
}
exports["default"] = AboutPage;
