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
function AdminDashboard() {
    var _this = this;
    var _a = react_1.useState(false), isAuthenticated = _a[0], setIsAuthenticated = _a[1];
    var _b = react_1.useState(''), passcode = _b[0], setPasscode = _b[1];
    var _c = react_1.useState([]), prayers = _c[0], setPrayers = _c[1];
    var _d = react_1.useState(true), loading = _d[0], setLoading = _d[1];
    // Gallery Upload State
    var _e = react_1.useState(false), uploadingGallery = _e[0], setUploadingGallery = _e[1];
    var _f = react_1.useState(''), uploadProgress = _f[0], setUploadProgress = _f[1];
    var galleryInputRef = react_1.useRef(null);
    // Leadership Upload State - UPGRADED TO INCLUDE NAME
    var _g = react_1.useState('Chairman'), leaderRole = _g[0], setLeaderRole = _g[1];
    var _h = react_1.useState(''), leaderName = _h[0], setLeaderName = _h[1];
    var _j = react_1.useState(false), uploadingLeader = _j[0], setUploadingLeader = _j[1];
    var leaderInputRef = react_1.useRef(null);
    var SECRET_PIN = "kathelwa2026";
    var handleLogin = function (e) {
        e.preventDefault();
        if (passcode === SECRET_PIN) {
            setIsAuthenticated(true);
            fetchPrayers();
        }
        else {
            alert("Incorrect passcode.");
            setPasscode('');
        }
    };
    // ==========================================
    // PRAYER MODERATION LOGIC
    // ==========================================
    // THIS IS THE ADMIN CODE: It must fetch EVERYTHING!
    var fetchPrayers = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, supabase_1.supabase
                            .from('prayer_requests')
                            .select('*')
                            .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        console.error("Error fetching prayers:", error);
                    else if (data)
                        setPrayers(data);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleApprove = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabase_1.supabase
                        .from('prayer_requests')
                        .update({ is_approved: true })
                        .eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        alert("Approval Failed: " + error.message);
                    }
                    else {
                        fetchPrayers();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Are you sure you want to delete this prayer request?"))
                        return [2 /*return*/];
                    return [4 /*yield*/, supabase_1.supabase
                            .from('prayer_requests')["delete"]()
                            .eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        alert("Deletion Failed: " + error.message);
                    }
                    else {
                        fetchPrayers();
                    }
                    return [2 /*return*/];
            }
        });
    }); }; // FIXED: Added missing semicolon
    // ==========================================
    // GALLERY BULK UPLOADER
    // ==========================================
    var handleGalleryBulkUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var files, successCount, errorCount, i, file, fileExt, uniqueFileName, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = e.target.files;
                    if (!files || files.length === 0)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    setUploadingGallery(true);
                    successCount = 0;
                    errorCount = 0;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < files.length)) return [3 /*break*/, 5];
                    file = files[i];
                    setUploadProgress("Uploading " + (i + 1) + " of " + files.length + "...");
                    fileExt = file.name.split('.').pop();
                    uniqueFileName = "Community/bulk-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9) + "." + fileExt;
                    return [4 /*yield*/, supabase_1.supabase.storage.from('church-gallery').upload(uniqueFileName, file, { cacheControl: '3600', upsert: false })];
                case 3:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("Error uploading " + file.name + ":", error);
                        errorCount++;
                    }
                    else {
                        successCount++;
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (errorCount > 0)
                        alert("Finished. Uploaded " + successCount + " photos, but " + errorCount + " failed.");
                    else
                        alert("Success! All " + successCount + " photos have been added to the public gallery.");
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    alert("An unexpected error occurred during the bulk upload.");
                    return [3 /*break*/, 8];
                case 7:
                    setUploadingGallery(false);
                    setUploadProgress('');
                    if (galleryInputRef.current)
                        galleryInputRef.current.value = '';
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    // ==========================================
    // LEADERSHIP PROFILE UPLOADER (Wired to Database!)
    // ==========================================
    var handleLeaderUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var file, fileExt, fileName, storageError, urlData, imageUrl, dbError, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    file = (_b = (_a = leaderInputRef.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                    if (!leaderName || !file) {
                        alert("Please enter the leader's name AND select a photo first.");
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    setUploadingLeader(true);
                    fileExt = file.name.split('.').pop();
                    fileName = "Leadership/" + leaderRole.toLowerCase() + "-" + Date.now() + "." + fileExt;
                    return [4 /*yield*/, supabase_1.supabase.storage
                            .from('church-gallery')
                            .upload(fileName, file)];
                case 2:
                    storageError = (_c.sent()).error;
                    if (storageError)
                        throw storageError;
                    urlData = supabase_1.supabase.storage.from('church-gallery').getPublicUrl(fileName).data;
                    imageUrl = urlData.publicUrl;
                    return [4 /*yield*/, supabase_1.supabase
                            .from('leadership')
                            .upsert({ role: leaderRole, name: leaderName, image_url: imageUrl }, { onConflict: 'role' })];
                case 3:
                    dbError = (_c.sent()).error;
                    if (dbError)
                        throw dbError;
                    alert(leaderRole + " updated successfully! Check the About page.");
                    setLeaderName('');
                    if (leaderInputRef.current)
                        leaderInputRef.current.value = '';
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _c.sent();
                    alert("An error occurred: " + error_2.message);
                    return [3 /*break*/, 6];
                case 5:
                    setUploadingLeader(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // ==========================================
    // VIEW 1: THE LOCK SCREEN
    // ==========================================
    if (!isAuthenticated) {
        return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans" },
            react_1["default"].createElement("div", { className: "bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100" },
                react_1["default"].createElement("div", { className: "mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100" },
                    react_1["default"].createElement(lucide_react_1.Lock, { size: 32 })),
                react_1["default"].createElement("h1", { className: "text-2xl font-black text-slate-900 mb-2" }, "Admin Access"),
                react_1["default"].createElement("p", { className: "text-slate-500 mb-8 text-sm" }, "Enter the secure passcode to manage the St. Mary's live database."),
                react_1["default"].createElement("form", { onSubmit: handleLogin },
                    react_1["default"].createElement("input", { type: "password", value: passcode, onChange: function (e) { return setPasscode(e.target.value); }, placeholder: "Enter PIN...", className: "w-full text-center text-2xl tracking-[0.5em] p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none mb-6 font-bold text-slate-900 transition-all", autoFocus: true }),
                    react_1["default"].createElement("button", { type: "submit", className: "w-full bg-blue-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg" }, "Unlock Dashboard")))));
    }
    // ==========================================
    // VIEW 2: THE ADMIN DASHBOARD
    // ==========================================
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-50 p-4 md:p-8 font-sans" },
        react_1["default"].createElement("div", { className: "max-w-6xl mx-auto space-y-8" },
            react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200" },
                react_1["default"].createElement("div", { className: "flex items-center gap-4" },
                    react_1["default"].createElement("div", { className: "w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.ShieldCheck, { size: 28 })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h1", { className: "text-2xl font-black text-slate-900 tracking-tight" }, "Master Dashboard"),
                        react_1["default"].createElement("p", { className: "text-sm text-slate-500 font-medium" }, "Managing St. Mary's AIPCA live data"))),
                react_1["default"].createElement(link_1["default"], { href: "/", className: "flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-slate-200" },
                    react_1["default"].createElement(lucide_react_1.Church, { size: 16 }),
                    " Back to Website")),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                react_1["default"].createElement("div", { className: "bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex flex-col justify-between" },
                    react_1["default"].createElement("div", { className: "mb-6" },
                        react_1["default"].createElement("h2", { className: "text-lg font-black text-slate-900 mb-2 flex items-center gap-2" },
                            react_1["default"].createElement(lucide_react_1.UserPen, { className: "text-blue-600", size: 20 }),
                            " Leadership Profiles"),
                        react_1["default"].createElement("p", { className: "text-sm text-slate-500" }, "Update the official names and photos for the church committee.")),
                    react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                        react_1["default"].createElement("select", { "aria-label": "Leader role", value: leaderRole, onChange: function (e) { return setLeaderRole(e.target.value); }, className: "w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-500" },
                            react_1["default"].createElement("option", { value: "Chairman" }, "Chairman"),
                            react_1["default"].createElement("option", { value: "Chairlady" }, "Chairlady"),
                            react_1["default"].createElement("option", { value: "Secretary" }, "Secretary"),
                            react_1["default"].createElement("option", { value: "Treasurer" }, "Treasurer")),
                        react_1["default"].createElement("input", { type: "text", placeholder: "Leader's Full Name", value: leaderName, onChange: function (e) { return setLeaderName(e.target.value); }, className: "w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 outline-none focus:border-blue-500" }),
                        react_1["default"].createElement("input", { type: "file", accept: "image/*", ref: leaderInputRef, title: "Leader photo", "aria-label": "Leader photo", className: "w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 cursor-pointer" }),
                        react_1["default"].createElement("button", { onClick: handleLeaderUpload, disabled: uploadingLeader, className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold tracking-wide transition-all mt-2 " + (uploadingLeader ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700') }, uploadingLeader ? react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin", size: 18 }),
                            " Saving...") : react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.UploadCloud, { size: 18 }),
                            " Update Profile")))),
                react_1["default"].createElement("div", { className: "bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex flex-col justify-between" },
                    react_1["default"].createElement("div", { className: "mb-6" },
                        react_1["default"].createElement("h2", { className: "text-lg font-black text-slate-900 mb-2 flex items-center gap-2" },
                            react_1["default"].createElement(lucide_react_1.ImagePlus, { className: "text-orange-500", size: 20 }),
                            " Event Gallery"),
                        react_1["default"].createElement("p", { className: "text-sm text-slate-500" }, "Upload multiple photos at once. They will automatically appear in the 'Community' tab of the public gallery.")),
                    react_1["default"].createElement("div", { className: "relative mt-auto" },
                        react_1["default"].createElement("input", { type: "file", accept: "image/*", multiple: true, onChange: handleGalleryBulkUpload, ref: galleryInputRef, disabled: uploadingGallery, title: "Select gallery photos", "aria-label": "Select gallery photos", className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" }),
                        react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold tracking-wide transition-all " + (uploadingGallery ? 'bg-slate-100 text-slate-400' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600') }, uploadingGallery ? react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin", size: 18 }),
                            " ",
                            uploadProgress) : react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.UploadCloud, { size: 18 }),
                            " Select Bulk Photos"))))),
            react_1["default"].createElement("div", { className: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden" },
                react_1["default"].createElement("div", { className: "p-6 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white" },
                    react_1["default"].createElement("h2", { className: "font-bold text-lg tracking-wide" }, "Prayer Moderation")),
                react_1["default"].createElement("div", { className: "overflow-x-auto" },
                    react_1["default"].createElement("table", { className: "w-full text-left border-collapse min-w-[800px]" },
                        react_1["default"].createElement("thead", null,
                            react_1["default"].createElement("tr", { className: "bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-black" },
                                react_1["default"].createElement("th", { className: "p-5" }, "Status"),
                                react_1["default"].createElement("th", { className: "p-5" }, "Date"),
                                react_1["default"].createElement("th", { className: "p-5" }, "Author"),
                                react_1["default"].createElement("th", { className: "p-5 w-1/2" }, "Request Text"),
                                react_1["default"].createElement("th", { className: "p-5 text-right" }, "Actions"))),
                        react_1["default"].createElement("tbody", null, loading ? (react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("td", { colSpan: 5, className: "p-12 text-center text-slate-400" },
                                react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin mx-auto mb-2 text-blue-500", size: 32 }),
                                react_1["default"].createElement("p", { className: "font-bold tracking-widest uppercase text-xs" }, "Loading database...")))) : prayers.length === 0 ? (react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("td", { colSpan: 5, className: "p-12 text-center text-slate-400 font-medium" }, "No prayers found in the database."))) : (prayers.map(function (prayer) { return (react_1["default"].createElement("tr", { key: prayer.id, className: "border-b border-slate-100 hover:bg-slate-50/80 transition-colors group" },
                            react_1["default"].createElement("td", { className: "p-5" }, prayer.is_approved ? (react_1["default"].createElement("span", { className: "bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" }, "Live")) : (react_1["default"].createElement("span", { className: "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" }, "Pending"))),
                            react_1["default"].createElement("td", { className: "p-5 text-sm text-slate-500 font-medium whitespace-nowrap" }, new Date(prayer.created_at).toLocaleDateString()),
                            react_1["default"].createElement("td", { className: "p-5 font-bold text-slate-900 whitespace-nowrap" }, prayer.name || "Anonymous"),
                            react_1["default"].createElement("td", { className: "p-5 text-slate-600 text-sm leading-relaxed" }, prayer.request),
                            react_1["default"].createElement("td", { className: "p-5" },
                                react_1["default"].createElement("div", { className: "flex justify-end gap-2" },
                                    !prayer.is_approved && (react_1["default"].createElement("button", { onClick: function () { return handleApprove(prayer.id); }, className: "p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all", title: "Approve Prayer" },
                                        react_1["default"].createElement(lucide_react_1.CheckCircle, { size: 20 }))),
                                    react_1["default"].createElement("button", { onClick: function () { return handleDelete(prayer.id); }, className: "p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all", title: "Delete Prayer" },
                                        react_1["default"].createElement(lucide_react_1.Trash2, { size: 20 })))))); })))))))));
}
exports["default"] = AdminDashboard;
