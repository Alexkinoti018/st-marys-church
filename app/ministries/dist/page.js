"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
function MinistriesPage() {
    var ministries = [
        {
            title: "Mother Council",
            description: "A pillar of strength in the church, dedicated to prayer, community service, and mentoring younger women in faith and life.",
            icon: react_1["default"].createElement(lucide_react_1.HeartHandshake, { size: 32 }),
            color: "text-pink-600",
            bg: "bg-pink-50",
            border: "group-hover:border-pink-200"
        },
        {
            title: "Church Elders",
            description: "Empowering men to be godly leaders in their homes and community through fellowship, mentorship, and economic empowerment.",
            icon: react_1["default"].createElement(lucide_react_1.Users, { size: 32 }),
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "group-hover:border-blue-200"
        },
        {
            title: "Youth Ministry",
            description: "A dynamic, energetic space for young adults to grow spiritually, discover their talents, and navigate life with a biblical foundation.",
            icon: react_1["default"].createElement(lucide_react_1.Flame, { size: 32 }),
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "group-hover:border-orange-200"
        },
        {
            title: "Sunday School",
            description: "Laying a strong spiritual foundation for our children through engaging Bible stories, songs, and age-appropriate teachings.",
            icon: react_1["default"].createElement(lucide_react_1.Baby, { size: 32 }),
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "group-hover:border-emerald-200"
        },
        {
            title: "Evangelism & Outreach",
            description: "Taking the Gospel beyond the church walls into Kathelwa and beyond, fulfilling the Great Commission with love and action.",
            icon: react_1["default"].createElement(lucide_react_1.BookOpen, { size: 32 }),
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "group-hover:border-purple-200"
        }
    ];
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-50 pb-20 font-sans" },
        react_1["default"].createElement("header", { className: "bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden" },
            react_1["default"].createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1a2233] to-slate-800" }),
            react_1["default"].createElement("div", { className: "relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000" },
                react_1["default"].createElement(lucide_react_1.Users, { className: "mx-auto mb-6 text-orange-500", size: 48 }),
                react_1["default"].createElement("h1", { className: "text-5xl md:text-7xl font-black italic mb-6 tracking-tight" }, "Our Ministries."),
                react_1["default"].createElement("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium" }, "There is a place for everyone at St. Mary's Church. Find your community, discover your purpose, and serve alongside fellow believers."))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-4 -mt-12 relative z-20" },
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" },
                ministries.map(function (ministry, i) { return (react_1["default"].createElement("div", { key: i, className: "group bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl " + ministry.border + " flex flex-col h-full" },
                    react_1["default"].createElement("div", { className: "w-16 h-16 rounded-2xl " + ministry.bg + " " + ministry.color + " flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" }, ministry.icon),
                    react_1["default"].createElement("h2", { className: "text-2xl font-black text-slate-900 mb-4" }, ministry.title),
                    react_1["default"].createElement("p", { className: "text-slate-600 leading-relaxed mb-8 flex-grow" }, ministry.description),
                    react_1["default"].createElement("div", { className: "pt-6 border-t border-slate-100 mt-auto" },
                        react_1["default"].createElement(link_1["default"], { href: "/about", className: "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors" },
                            "Learn More ",
                            react_1["default"].createElement(lucide_react_1.ChevronRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" }))))); }),
                react_1["default"].createElement("div", { className: "group bg-orange-500 rounded-[2rem] p-8 shadow-xl shadow-orange-500/20 border border-orange-400 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full text-white" },
                    react_1["default"].createElement("div", { className: "w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6" },
                        react_1["default"].createElement(lucide_react_1.HeartHandshake, { size: 32 })),
                    react_1["default"].createElement("h2", { className: "text-2xl font-black mb-4" }, "Get Involved"),
                    react_1["default"].createElement("p", { className: "text-orange-100 leading-relaxed mb-8 flex-grow" }, "We are always looking for passionate individuals to serve. Speak to the church leadership this Sunday to find where your talents can best be used!"),
                    react_1["default"].createElement("div", { className: "pt-6 border-t border-white/20 mt-auto" },
                        react_1["default"].createElement(link_1["default"], { href: "/give", className: "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-orange-200 transition-colors" },
                            "Support our work ",
                            react_1["default"].createElement(lucide_react_1.ChevronRight, { size: 16, className: "group-hover:translate-x-1 transition-transform" }))))))));
}
exports["default"] = MinistriesPage;
