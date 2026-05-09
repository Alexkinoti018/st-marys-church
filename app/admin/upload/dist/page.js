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
var supabase_1 = require("@/lib/supabase");
var lucide_react_1 = require("lucide-react");
function UploadPortal() {
    var _this = this;
    var _a = react_1.useState(null), file = _a[0], setFile = _a[1];
    var _b = react_1.useState(''), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState('Sunday Service'), category = _c[0], setCategory = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState({ type: null, msg: '' }), status = _e[0], setStatus = _e[1];
    var handleUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var fileExt, fileName, filePath, uploadError, publicUrl, dbError, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!file || !title)
                        return [2 /*return*/];
                    setLoading(true);
                    setStatus({ type: null, msg: '' });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    fileExt = file.name.split('.').pop();
                    fileName = Date.now() + "-" + Math.floor(Math.random() * 1000) + "." + fileExt;
                    filePath = "gallery/" + fileName;
                    return [4 /*yield*/, supabase_1.supabase.storage
                            .from('church-gallery')
                            .upload(filePath, file)];
                case 2:
                    uploadError = (_a.sent()).error;
                    if (uploadError)
                        throw uploadError;
                    publicUrl = supabase_1.supabase.storage
                        .from('church-gallery')
                        .getPublicUrl(filePath).data.publicUrl;
                    return [4 /*yield*/, supabase_1.supabase
                            .from('gallery_images')
                            .insert([{ title: title, category: category, image_url: publicUrl }])];
                case 3:
                    dbError = (_a.sent()).error;
                    if (dbError)
                        throw dbError;
                    setStatus({ type: 'success', msg: 'Post successful!' });
                    setFile(null);
                    setTitle('');
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setStatus({ type: 'error', msg: "Error: " + err_1.message });
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-100 flex items-center justify-center p-4" },
        react_1["default"].createElement("div", { className: "bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-slate-300" },
            react_1["default"].createElement("div", { className: "text-center mb-10" },
                react_1["default"].createElement("div", { className: "bg-orange-500 w-16 h-16 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6" },
                    react_1["default"].createElement(lucide_react_1.Camera, { className: "text-white -rotate-12", size: 32 })),
                react_1["default"].createElement("h1", { className: "text-3xl font-black text-slate-900 tracking-tight" }, "Admin Portal"),
                react_1["default"].createElement("p", { className: "text-slate-600 font-bold text-sm uppercase tracking-widest mt-1" }, "St. Mary's Gallery")),
            react_1["default"].createElement("form", { onSubmit: handleUpload, className: "space-y-6" },
                react_1["default"].createElement("div", { className: "relative border-4 border-dashed border-slate-300 rounded-3xl p-12 text-center bg-slate-50 group transition-all hover:border-orange-500" },
                    react_1["default"].createElement("input", { id: "file-input", type: "file", accept: "image/*", onChange: function (e) { var _a; return setFile(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); }, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10", "aria-label": "Choose photo to upload", title: "Choose photo to upload" }),
                    react_1["default"].createElement(lucide_react_1.Upload, { className: "mx-auto text-slate-500 mb-4", size: 40 }),
                    react_1["default"].createElement("p", { className: "text-sm font-black text-slate-900" }, file ? file.name : "CHOOSE PHOTO")),
                react_1["default"].createElement("div", { className: "space-y-2" },
                    react_1["default"].createElement("label", { htmlFor: "title", className: "text-xs font-black text-slate-900 uppercase ml-1" }, "Photo Title"),
                    react_1["default"].createElement("input", { id: "title", type: "text", placeholder: "Enter title...", value: title, onChange: function (e) { return setTitle(e.target.value); }, className: "w-full p-5 bg-white border-2 border-slate-400 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:border-orange-500 outline-none font-bold", required: true })),
                react_1["default"].createElement("div", { className: "space-y-2" },
                    react_1["default"].createElement("label", { htmlFor: "category", className: "text-xs font-black text-slate-900 uppercase ml-1" }, "Category"),
                    react_1["default"].createElement("select", { id: "category", value: category, onChange: function (e) { return setCategory(e.target.value); }, className: "w-full p-5 bg-white border-2 border-slate-400 rounded-2xl text-slate-900 font-bold focus:border-orange-500 outline-none appearance-none", title: "Category" },
                        react_1["default"].createElement("option", { value: "Sunday Service" }, "Sunday Service"),
                        react_1["default"].createElement("option", { value: "Choir" }, "Choir"),
                        react_1["default"].createElement("option", { value: "Youth" }, "Youth"),
                        react_1["default"].createElement("option", { value: "Community" }, "Community"))),
                react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-500 transition-all active:scale-95 disabled:bg-slate-300 shadow-xl" }, loading ? react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin mx-auto" }) : "PUBLISH NOW"),
                status.type && (react_1["default"].createElement("div", { className: "p-4 rounded-2xl flex items-center gap-3 font-bold text-sm " + (status.type === 'success' ? 'bg-green-100 text-green-900 border border-green-300' : 'bg-red-100 text-red-900 border border-red-300') },
                    status.type === 'success' ? react_1["default"].createElement(lucide_react_1.CheckCircle, { size: 20 }) : react_1["default"].createElement(lucide_react_1.AlertCircle, { size: 20 }),
                    status.msg))))));
}
exports["default"] = UploadPortal;
