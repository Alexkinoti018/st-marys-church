'use client';
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
var supabase_js_1 = require("@supabase/supabase-js");
var lucide_react_1 = require("lucide-react");
var actions_1 = require("../events/actions");
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
var supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
var supabase = supabase_js_1.createClient(supabaseUrl, supabaseKey);
function AdminGalleryPage() {
    var _this = this;
    var _a = react_1.useState(false), isMounted = _a[0], setIsMounted = _a[1];
    var fileInputRef = react_1.useRef(null);
    var _b = react_1.useState(''), pin = _b[0], setPin = _b[1];
    var _c = react_1.useState(false), isAuthorized = _c[0], setIsAuthorized = _c[1];
    var _d = react_1.useState(false), pinError = _d[0], setPinError = _d[1];
    var _e = react_1.useState(false), isVerifying = _e[0], setIsVerifying = _e[1];
    var _f = react_1.useState([]), images = _f[0], setImages = _f[1];
    var _g = react_1.useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = react_1.useState(false), isUploading = _h[0], setIsUploading = _h[1];
    var _j = react_1.useState(''), title = _j[0], setTitle = _j[1];
    var _k = react_1.useState('General'), category = _k[0], setCategory = _k[1];
    var _l = react_1.useState(null), file = _l[0], setFile = _l[1];
    react_1.useEffect(function () {
        setIsMounted(true);
    }, []);
    var fetchImages = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    return [4 /*yield*/, supabase
                            .from('gallery_images')
                            .select('*')
                            .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (!error && data) {
                        setImages(data);
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        if (isAuthorized) {
            fetchImages();
        }
    }, [isAuthorized, fetchImages]);
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsVerifying(true);
                    return [4 /*yield*/, actions_1.verifyAdminPin(pin)];
                case 1:
                    isValid = _a.sent();
                    if (isValid) {
                        setIsAuthorized(true);
                        setPinError(false);
                    }
                    else {
                        setPinError(true);
                        setPin('');
                    }
                    setIsVerifying(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUpload = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var fileExt, fileName, filePath, uploadError, publicUrlData, imageUrl, dbError, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!file) {
                        alert('Please select an image to upload.');
                        return [2 /*return*/];
                    }
                    setIsUploading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    fileExt = file.name.split('.').pop();
                    fileName = Date.now() + "-" + Math.random().toString(36).substring(2, 15) + "." + fileExt;
                    filePath = "uploads/" + fileName;
                    return [4 /*yield*/, supabase.storage.from('church-gallery').upload(filePath, file)];
                case 2:
                    uploadError = (_a.sent()).error;
                    if (uploadError)
                        throw uploadError;
                    publicUrlData = supabase.storage.from('church-gallery').getPublicUrl(filePath).data;
                    imageUrl = publicUrlData.publicUrl;
                    return [4 /*yield*/, supabase.from('gallery_images').insert([{ title: title, image_url: imageUrl, category: category }])];
                case 3:
                    dbError = (_a.sent()).error;
                    if (dbError)
                        throw dbError;
                    setTitle('');
                    setCategory('General');
                    setFile(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    fetchImages();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Upload failed:', error_1);
                    alert('Failed to upload image. Check Supabase Storage policies.');
                    return [3 /*break*/, 6];
                case 5:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (image) { return __awaiter(_this, void 0, void 0, function () {
        var urlParts, filePath, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this image?'))
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    urlParts = image.image_url.split('/');
                    filePath = "uploads/" + urlParts[urlParts.length - 1];
                    return [4 /*yield*/, supabase.storage.from('church-gallery').remove([filePath])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supabase.from('gallery_images')["delete"]().eq('id', image.id)];
                case 3:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    setImages(images.filter(function (img) { return img.id !== image.id; }));
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Delete failed:', error_2);
                    alert('Failed to delete image.');
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!isMounted)
        return null;
    if (!isAuthorized) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 px-4" },
            React.createElement("div", { className: "max-w-md w-full bg-white rounded-xl shadow-lg p-8" },
                React.createElement("div", { className: "flex flex-col items-center mb-6" },
                    React.createElement("div", { className: "bg-blue-100 p-3 rounded-full mb-4" },
                        React.createElement(lucide_react_1.Lock, { className: "w-6 h-6 text-blue-600" })),
                    React.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, "Admin Access"),
                    React.createElement("p", { className: "text-gray-500 text-sm mt-1" }, "Photo Gallery Moderation")),
                React.createElement("form", { onSubmit: handleLogin, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("input", { id: "admin-pin-gallery", title: "Admin PIN", "aria-label": "Admin PIN", type: "password", placeholder: "Enter Admin PIN", value: pin, onChange: function (e) { return setPin(e.target.value); }, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors", required: true }),
                        pinError && React.createElement("p", { className: "text-red-500 text-sm mt-2" }, "Incorrect PIN. Please try again.")),
                    React.createElement("button", { type: "submit", disabled: isVerifying, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50" },
                        isVerifying && React.createElement(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin" }),
                        "Unlock Dashboard")))));
    }
    return (React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-8" },
        React.createElement("div", { className: "flex justify-between items-center mb-8" },
            React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Gallery Management"),
            React.createElement("button", { onClick: function () { return setIsAuthorized(false); }, className: "text-sm text-gray-500 hover:text-gray-800 transition-colors" }, "Lock Dashboard")),
        React.createElement("div", { className: "grid md:grid-cols-3 gap-8" },
            React.createElement("div", { className: "md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit" },
                React.createElement("h2", { className: "text-xl font-semibold mb-4 flex items-center gap-2" },
                    React.createElement(lucide_react_1.Upload, { className: "w-5 h-5 text-blue-600" }),
                    "Upload Photo"),
                React.createElement("form", { onSubmit: handleUpload, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "image-title", className: "block text-sm font-medium text-gray-700 mb-1" }, "Photo Title"),
                        React.createElement("input", { id: "image-title", type: "text", required: true, value: title, onChange: function (e) { return setTitle(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "e.g. Youth Choir Sunday" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "image-category", className: "block text-sm font-medium text-gray-700 mb-1" }, "Category"),
                        React.createElement("select", { id: "image-category", "aria-label": "Image Category", title: "Image Category", value: category, onChange: function (e) { return setCategory(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md bg-white" },
                            React.createElement("option", { value: "General" }, "General"),
                            React.createElement("option", { value: "Sunday Service" }, "Sunday Service"),
                            React.createElement("option", { value: "Youth" }, "Youth"),
                            React.createElement("option", { value: "Choir" }, "Choir"),
                            React.createElement("option", { value: "Events" }, "Special Events"))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "image-upload", className: "block text-sm font-medium text-gray-700 mb-1" }, "Select Image"),
                        React.createElement("input", { id: "image-upload", ref: fileInputRef, type: "file", accept: "image/*", title: "Upload Image File", "aria-label": "Upload Image File", required: true, onChange: function (e) { var _a; return setFile(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); }, className: "w-full p-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" })),
                    React.createElement("button", { type: "submit", disabled: isUploading, className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2" },
                        isUploading ? React.createElement(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin" }) : React.createElement(lucide_react_1.Upload, { className: "w-4 h-4" }),
                        isUploading ? 'Uploading...' : 'Upload Image'))),
            React.createElement("div", { className: "md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm" },
                React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Current Gallery"),
                isLoading && images.length === 0 ? (React.createElement("div", { className: "flex justify-center py-10" },
                    React.createElement(lucide_react_1.Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }))) : (React.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4" },
                    images.map(function (image) { return (React.createElement("div", { key: image.id, className: "group relative rounded-lg overflow-hidden border border-gray-200 shadow-sm" },
                        React.createElement("img", { src: image.image_url, alt: image.title, className: "w-full h-40 object-cover" }),
                        React.createElement("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "bg-blue-500 text-white text-xs px-2 py-1 rounded-full" }, image.category)),
                            React.createElement("div", { className: "flex justify-between items-end" },
                                React.createElement("p", { className: "text-white text-sm font-medium truncate pr-2" }, image.title),
                                React.createElement("button", { "aria-label": "Delete image: " + image.title, onClick: function () { return handleDelete(image); }, className: "text-red-400 hover:text-red-300 bg-white/10 hover:bg-white/20 p-1.5 rounded-md transition-colors" },
                                    React.createElement(lucide_react_1.Trash2, { className: "w-4 h-4" })))))); }),
                    images.length === 0 && (React.createElement("div", { className: "col-span-full flex flex-col items-center justify-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300" },
                        React.createElement(lucide_react_1.Image, { className: "w-12 h-12 mb-3 text-gray-400" }),
                        React.createElement("p", null, "No photos uploaded yet.")))))))));
}
exports["default"] = AdminGalleryPage;
