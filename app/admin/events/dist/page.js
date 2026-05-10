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
var actions_1 = require("./actions");
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
var supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
var supabase = supabase_js_1.createClient(supabaseUrl, supabaseKey);
function AdminEventsPage() {
    var _this = this;
    var _a = react_1.useState(false), isMounted = _a[0], setIsMounted = _a[1];
    var _b = react_1.useState(''), pin = _b[0], setPin = _b[1];
    var _c = react_1.useState(false), isAuthorized = _c[0], setIsAuthorized = _c[1];
    var _d = react_1.useState(false), pinError = _d[0], setPinError = _d[1];
    var _e = react_1.useState(false), isVerifying = _e[0], setIsVerifying = _e[1];
    var _f = react_1.useState([]), events = _f[0], setEvents = _f[1];
    var _g = react_1.useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = react_1.useState(''), title = _h[0], setTitle = _h[1];
    var _j = react_1.useState(''), description = _j[0], setDescription = _j[1];
    var _k = react_1.useState(''), eventDate = _k[0], setEventDate = _k[1];
    var _l = react_1.useState('St. Mary’s AIPCA Church, Kathelwa'), location = _l[0], setLocation = _l[1];
    react_1.useEffect(function () {
        setIsMounted(true);
    }, []);
    var fetchEvents = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    return [4 /*yield*/, supabase
                            .from('church_events')
                            .select('*')
                            .order('event_date', { ascending: true })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (!error && data) {
                        setEvents(data);
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        if (isAuthorized) {
            fetchEvents();
        }
    }, [isAuthorized, fetchEvents]);
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
    var handleAddEvent = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var isoDate, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    isoDate = new Date(eventDate).toISOString();
                    return [4 /*yield*/, supabase.from('church_events').insert([
                            { title: title, description: description, event_date: isoDate, location: location }
                        ])];
                case 1:
                    error = (_a.sent()).error;
                    if (!error) {
                        setTitle('');
                        setDescription('');
                        setEventDate('');
                        setLocation('St. Mary’s AIPCA Church, Kathelwa');
                        fetchEvents();
                    }
                    else {
                        alert('Failed to add event.');
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this event?'))
                        return [2 /*return*/];
                    setIsLoading(true);
                    return [4 /*yield*/, supabase.from('church_events')["delete"]().eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (!error) {
                        setEvents(events.filter(function (event) { return event.id !== id; }));
                    }
                    else {
                        alert('Failed to delete event.');
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
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
                    React.createElement("p", { className: "text-gray-500 text-sm mt-1" }, "Events Calendar Moderation")),
                React.createElement("form", { onSubmit: handleLogin, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("input", { id: "admin-pin-events", title: "Admin PIN", "aria-label": "Admin PIN", type: "password", placeholder: "Enter Admin PIN", value: pin, onChange: function (e) { return setPin(e.target.value); }, className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors", required: true }),
                        pinError && React.createElement("p", { className: "text-red-500 text-sm mt-2" }, "Incorrect PIN. Please try again.")),
                    React.createElement("button", { type: "submit", disabled: isVerifying, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50" },
                        isVerifying && React.createElement(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin" }),
                        "Unlock Dashboard")))));
    }
    return (React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-8" },
        React.createElement("div", { className: "flex justify-between items-center mb-8" },
            React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Events Management"),
            React.createElement("button", { onClick: function () { return setIsAuthorized(false); }, className: "text-sm text-gray-500 hover:text-gray-800 transition-colors" }, "Lock Dashboard")),
        React.createElement("div", { className: "grid md:grid-cols-3 gap-8" },
            React.createElement("div", { className: "md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit" },
                React.createElement("h2", { className: "text-xl font-semibold mb-4 flex items-center gap-2" },
                    React.createElement(lucide_react_1.CalendarPlus, { className: "w-5 h-5 text-blue-600" }),
                    "Add New Event"),
                React.createElement("form", { onSubmit: handleAddEvent, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "event-title", className: "block text-sm font-medium text-gray-700 mb-1" }, "Event Title"),
                        React.createElement("input", { id: "event-title", type: "text", required: true, value: title, onChange: function (e) { return setTitle(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "e.g. Youth Choir Practice" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "event-date", className: "block text-sm font-medium text-gray-700 mb-1" }, "Date & Time"),
                        React.createElement("input", { id: "event-date", type: "datetime-local", title: "Event Date and Time", "aria-label": "Event Date and Time", required: true, value: eventDate, onChange: function (e) { return setEventDate(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "event-location", className: "block text-sm font-medium text-gray-700 mb-1" }, "Location"),
                        React.createElement("input", { id: "event-location", type: "text", placeholder: "e.g. Main Sanctuary", required: true, value: location, onChange: function (e) { return setLocation(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "event-description", className: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                        React.createElement("textarea", { id: "event-description", required: true, rows: 3, value: description, onChange: function (e) { return setDescription(e.target.value); }, className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "Details about the event..." })),
                    React.createElement("button", { type: "submit", disabled: isLoading, className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2" },
                        isLoading && React.createElement(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin" }),
                        "Publish Event"))),
            React.createElement("div", { className: "md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm" },
                React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Current Events"),
                isLoading && events.length === 0 ? (React.createElement("div", { className: "flex justify-center py-10" },
                    React.createElement(lucide_react_1.Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }))) : (React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left border-collapse" },
                        React.createElement("thead", null,
                            React.createElement("tr", { className: "border-b border-gray-200 bg-gray-50" },
                                React.createElement("th", { className: "p-3 font-medium text-gray-600" }, "Date & Time"),
                                React.createElement("th", { className: "p-3 font-medium text-gray-600" }, "Event Details"),
                                React.createElement("th", { className: "p-3 font-medium text-gray-600 text-right" }, "Actions"))),
                        React.createElement("tbody", null,
                            events.map(function (event) {
                                var d = new Date(event.event_date);
                                return (React.createElement("tr", { key: event.id, className: "border-b border-gray-100 hover:bg-gray-50" },
                                    React.createElement("td", { className: "p-3 text-sm text-gray-700" },
                                        React.createElement("div", { className: "font-semibold" }, d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Africa/Nairobi' })),
                                        React.createElement("div", { className: "text-gray-500" }, d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }))),
                                    React.createElement("td", { className: "p-3" },
                                        React.createElement("div", { className: "font-semibold text-gray-900" }, event.title),
                                        React.createElement("div", { className: "text-sm text-gray-500 truncate max-w-xs" }, event.description)),
                                    React.createElement("td", { className: "p-3 text-right" },
                                        React.createElement("button", { "aria-label": "Delete event: " + event.title, onClick: function () { return handleDelete(event.id); }, className: "text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors" },
                                            React.createElement(lucide_react_1.Trash2, { className: "w-5 h-5" })))));
                            }),
                            events.length === 0 && (React.createElement("tr", null,
                                React.createElement("td", { colSpan: 3, className: "p-6 text-center text-gray-500" }, "No events found. Add one to get started.")))))))))));
}
exports["default"] = AdminEventsPage;
