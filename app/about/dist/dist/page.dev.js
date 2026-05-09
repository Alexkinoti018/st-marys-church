"use client";
"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var react_1 = require("react");

var lucide_react_1 = require("lucide-react");

var supabase_1 = require("@/lib/supabase");

function AboutPage() {
  var _this = this;

  var _a = react_1.useState([]),
      leaders = _a[0],
      setLeaders = _a[1];

  var _b = react_1.useState(true),
      isLoading = _b[0],
      setIsLoading = _b[1];

  react_1.useEffect(function () {
    var fetchStaff = function fetchStaff() {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, err_1;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, 3, 4]);

              return [4
              /*yield*/
              , supabase_1.supabase.from('church-staff').select('*').order('priority', {
                ascending: true
              })];

            case 1:
              _a = _b.sent(), data = _a.data, error = _a.error;
              if (error) throw error;
              setLeaders(data || []);
              return [3
              /*break*/
              , 4];

            case 2:
              err_1 = _b.sent();
              console.error("Error fetching staff:", err_1);
              return [3
              /*break*/
              , 4];

            case 3:
              setIsLoading(false);
              return [7
              /*endfinally*/
              ];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    fetchStaff();
  }, []);
  return React.createElement("div", {
    className: "bg-slate-50 min-h-screen pb-20"
  }, React.createElement("header", {
    className: "bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden"
  }, React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-orange-900/20"
  }), React.createElement("div", {
    className: "relative z-10 max-w-4xl mx-auto"
  }, React.createElement(lucide_react_1.Church, {
    className: "mx-auto mb-6 text-orange-500",
    size: 48
  }), React.createElement("h1", {
    className: "text-5xl md:text-7xl font-black italic mb-6"
  }, "Our Story."))), React.createElement("section", {
    className: "max-w-7xl mx-auto px-4 py-20"
  }, React.createElement("div", {
    className: "text-center mb-16"
  }, React.createElement("h2", {
    className: "text-4xl md:text-6xl font-black text-slate-900"
  }, "Church Leadership")), isLoading ? React.createElement("div", {
    className: "flex justify-center py-10"
  }, React.createElement(lucide_react_1.Loader2, {
    className: "animate-spin text-orange-500",
    size: 40
  })) : React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
  }, leaders.map(function (leader) {
    return React.createElement("div", {
      key: leader.id,
      className: "bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-orange-400 transition-all duration-500 text-center"
    }, React.createElement("div", {
      className: "w-32 h-32 rounded-full mb-6 mx-auto border-4 border-slate-100 overflow-hidden"
    }, React.createElement("img", {
      src: leader.image_url || "https://via.placeholder.com/150",
      alt: leader.name,
      className: "w-full h-full object-cover"
    })), React.createElement("h3", {
      className: "text-xl font-black text-slate-900 mb-1"
    }, leader.name), React.createElement("p", {
      className: "text-orange-600 text-xs font-black uppercase tracking-widest mb-4"
    }, leader.role), React.createElement("p", {
      className: "text-slate-500 text-sm leading-relaxed"
    }, leader.bio || "Serving St. Mary's with faith."));
  }))));
}

exports["default"] = AboutPage;