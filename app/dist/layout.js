"use strict";
exports.__esModule = true;
exports.metadata = void 0;
// Fonts must be imported from next/font/google
var google_1 = require("next/font/google");
require("./globals.css");
// Components are imported cleanly by themselves
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
// Font configurations
var geistSans = google_1.Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});
var geistMono = google_1.Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});
var dancingScript = google_1.Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"]
});
exports.metadata = {
    title: "St. Mary's AIPCA Church - Kathelwa",
    description: "Worshipping God, Serving Community in Meru County."
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", suppressHydrationWarning: true },
        React.createElement("body", { className: geistSans.variable + " " + geistMono.variable + " ...", suppressHydrationWarning: true },
            React.createElement(Navbar_1["default"], null),
            React.createElement("main", null, children),
            React.createElement(Footer_1["default"], null))));
}
exports["default"] = RootLayout;
