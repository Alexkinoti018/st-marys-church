"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function Navbar() {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Ministries', href: '/ministries' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Prayer Wall', href: '/prayer-wall' },
    ];
    return (React.createElement("header", { className: "w-full sticky top-0 z-[100] flex flex-col drop-shadow-sm" },
        React.createElement("div", { className: "bg-[#1a2233] text-white py-3 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs border-b border-slate-700" },
            React.createElement("div", { className: "flex items-center gap-6 w-full md:w-auto justify-between md:justify-start mb-2 md:mb-0" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement(link_1["default"], { href: "#", className: "hover:text-orange-500 transition" },
                        React.createElement(lucide_react_1.Facebook, { size: 14 })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:text-orange-500 transition" },
                        React.createElement(lucide_react_1.Instagram, { size: 14 })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:text-orange-500 transition" },
                        React.createElement(lucide_react_1.Twitter, { size: 14 })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:text-orange-500 transition" },
                        React.createElement(lucide_react_1.Youtube, { size: 14 }))),
                React.createElement("div", { className: "hidden md:flex items-center gap-5 text-slate-300 font-medium tracking-wide" },
                    React.createElement("span", { className: "flex items-center gap-1.5" },
                        React.createElement(lucide_react_1.MapPin, { size: 12, className: "text-orange-500" }),
                        " Kathelwa, Meru County"),
                    React.createElement("span", { className: "flex items-center gap-1.5" },
                        React.createElement(lucide_react_1.Phone, { size: 12, className: "text-orange-500" }),
                        " +254724236350"))),
            React.createElement("div", { className: "flex items-center gap-6 font-bold text-orange-500 uppercase tracking-widest text-[10px] md:text-xs" },
                React.createElement(link_1["default"], { href: "/contact", className: "hover:text-white transition" }, "Partner With Us"),
                React.createElement(link_1["default"], { href: "/contact", className: "hover:text-white transition" }, "Become A Volunteer"))),
        React.createElement("nav", { className: "bg-white/95 backdrop-blur-md relative border-b border-slate-100" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 md:px-8" },
                React.createElement("div", { className: "flex justify-between h-20 items-center" },
                    React.createElement(link_1["default"], { href: "/", className: "flex items-center gap-2 font-black text-slate-900 tracking-tighter text-xl" },
                        React.createElement(lucide_react_1.Church, { className: "text-orange-500", size: 28 }),
                        "ST. MARY'S AIPCA"),
                    React.createElement("div", { className: "hidden lg:flex items-center gap-7" }, navLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.name, href: link.href, className: "text-sm font-bold text-slate-500 hover:text-orange-500 transition uppercase tracking-widest" }, link.name)); })),
                    React.createElement("div", { className: "hidden lg:flex items-center justify-end w-32 h-20 relative" },
                        React.createElement("div", { className: "absolute top-2 right-0 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-50 z-50" },
                            React.createElement(link_1["default"], { href: "/give", className: "bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-7 rounded-full transition text-sm uppercase tracking-widest shadow-lg shadow-orange-500/30" }, "GIVE"))),
                    React.createElement("button", { className: "lg:hidden p-2 text-slate-600 hover:text-orange-500 transition", onClick: function () { return setIsOpen(!isOpen); } }, isOpen ? React.createElement(lucide_react_1.X, { size: 28 }) : React.createElement(lucide_react_1.Menu, { size: 28 })))),
            isOpen && (React.createElement("div", { className: "lg:hidden bg-white border-t border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl absolute w-full left-0 z-40" },
                React.createElement("div", { className: "flex flex-col gap-3 pb-6 mb-2 border-b border-slate-100 text-sm text-slate-600 font-medium" },
                    React.createElement("span", { className: "flex items-center gap-3" },
                        React.createElement(lucide_react_1.MapPin, { size: 18, className: "text-orange-500" }),
                        " Kathelwa, Meru County"),
                    React.createElement("span", { className: "flex items-center gap-3" },
                        React.createElement(lucide_react_1.Phone, { size: 18, className: "text-orange-500" }),
                        " 0111 012200")),
                navLinks.map(function (link) { return (React.createElement(link_1["default"], { key: link.name, href: link.href, onClick: function () { return setIsOpen(false); }, className: "block text-xl font-black text-slate-900 hover:text-orange-500 transition" }, link.name)); }),
                React.createElement("div", { className: "pt-4 mt-2 border-t border-slate-100 flex flex-col items-center gap-4" },
                    React.createElement(link_1["default"], { href: "/give", className: "w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20" }, "GIVE"),
                    React.createElement(link_1["default"], { href: "/contact", className: "text-slate-500 font-bold hover:text-orange-500 text-xs flex items-center gap-2 uppercase tracking-widest" },
                        "Become a Volunteer ",
                        React.createElement(lucide_react_1.ArrowRight, { size: 14 }))))))));
}
exports["default"] = Navbar;
