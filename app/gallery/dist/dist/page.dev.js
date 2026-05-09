"use client";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revalidate = void 0;
var revalidate = 0; // This forces the page to fetch fresh data every time

exports.revalidate = revalidate;

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

function GalleryPage() {
  var _this = this;

  var _a;

  var _b = react_1.useState('All'),
      filter = _b[0],
      setFilter = _b[1];

  var _c = react_1.useState(null),
      selectedImage = _c[0],
      setSelectedImage = _c[1];

  var _d = react_1.useState([]),
      photos = _d[0],
      setPhotos = _d[1];

  var _e = react_1.useState(true),
      isLoading = _e[0],
      setIsLoading = _e[1]; // Note: 'Choir' here matches your SQL/Upload form exactly


  var categories = [{
    name: 'All',
    icon: react_1["default"].createElement(lucide_react_1.LayoutGrid, {
      size: 18
    })
  }, {
    name: 'Sunday Service',
    icon: react_1["default"].createElement(lucide_react_1.Church, {
      size: 18
    })
  }, {
    name: 'Youth',
    icon: react_1["default"].createElement(lucide_react_1.Flame, {
      size: 18
    })
  }, {
    name: 'Community',
    icon: react_1["default"].createElement(lucide_react_1.Users, {
      size: 18
    })
  }, {
    name: 'Choir',
    icon: react_1["default"].createElement(lucide_react_1.Music, {
      size: 18
    })
  }];
  react_1.useEffect(function () {
    fetchImages();
  }, []);

  var fetchImages = function fetchImages() {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, formattedPhotos, error_1;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, 3, 4]);

            setIsLoading(true);
            return [4
            /*yield*/
            , supabase_1.supabase.from('gallery_images').select('*').order('created_at', {
              ascending: false
            })];

          case 1:
            _a = _b.sent(), data = _a.data, error = _a.error;
            if (error) throw error;

            if (data) {
              formattedPhotos = data.map(function (img) {
                return {
                  id: img.id,
                  category: img.category,
                  title: img.title,
                  src: img.image_url
                };
              });
              setPhotos(formattedPhotos);
            }

            return [3
            /*break*/
            , 4];

          case 2:
            error_1 = _b.sent();
            console.error('Error fetching gallery images:', error_1);
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

  var filteredPhotos = filter === 'All' ? photos : photos.filter(function (p) {
    return p.category === filter;
  });
  return react_1["default"].createElement("div", {
    className: "min-h-screen bg-slate-50 pb-20 " + (selectedImage ? 'overflow-hidden' : '')
  }, react_1["default"].createElement("header", {
    className: "bg-slate-900 text-white pt-24 pb-32 px-4 text-center relative overflow-hidden"
  }, react_1["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-blue-900/40"
  }), react_1["default"].createElement("div", {
    className: "relative z-10 max-w-4xl mx-auto"
  }, react_1["default"].createElement(lucide_react_1.Camera, {
    className: "mx-auto mb-6 text-orange-500",
    size: 48
  }), react_1["default"].createElement("h1", {
    className: "text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-white"
  }, "Church Life."), react_1["default"].createElement("p", {
    className: "text-lg text-slate-400 max-w-xl mx-auto"
  }, "Capturing moments of faith, joy, and community at St. Mary's AIPCA Kathelwa."))), react_1["default"].createElement("section", {
    className: "sticky top-20 z-40 px-4 -mt-10 flex justify-center"
  }, react_1["default"].createElement("div", {
    className: "bg-white/80 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-slate-100 max-w-full overflow-hidden"
  }, react_1["default"].createElement("div", {
    className: "flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
  }, categories.map(function (cat) {
    var isActive = filter === cat.name;
    return react_1["default"].createElement("button", {
      key: cat.name,
      onClick: function onClick() {
        return setFilter(cat.name);
      },
      className: "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 " + (isActive ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-slate-500 hover:bg-slate-100')
    }, react_1["default"].createElement("span", {
      className: isActive ? 'text-orange-500' : 'text-slate-400'
    }, cat.icon), cat.name);
  })))), react_1["default"].createElement("section", {
    className: "max-w-7xl mx-auto px-4 py-16 flex flex-wrap justify-center gap-8 relative z-20"
  }, isLoading && react_1["default"].createElement("div", {
    className: "w-full flex flex-col items-center justify-center py-20 text-slate-400"
  }, react_1["default"].createElement(lucide_react_1.Loader2, {
    className: "animate-spin mb-4 text-orange-500",
    size: 40
  }), react_1["default"].createElement("p", {
    className: "font-bold tracking-widest uppercase text-sm"
  }, "Loading Gallery...")), !isLoading && filteredPhotos.map(function (photo) {
    var _a;

    return react_1["default"].createElement("div", {
      key: photo.id,
      onClick: function onClick() {
        return setSelectedImage(photo);
      },
      className: "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group relative bg-slate-900 rounded-[2.5rem] overflow-hidden cursor-pointer aspect-[4/3] shadow-xl border border-white"
    }, react_1["default"].createElement("img", {
      src: photo.src,
      alt: photo.title,
      className: "w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out"
    }), react_1["default"].createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end"
    }, react_1["default"].createElement("span", {
      className: "text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2"
    }, (_a = categories.find(function (c) {
      return c.name === photo.category;
    })) === null || _a === void 0 ? void 0 : _a.icon, " ", photo.category), react_1["default"].createElement("h3", {
      className: "text-white text-2xl font-bold capitalize"
    }, photo.title)));
  }), !isLoading && filteredPhotos.length === 0 && react_1["default"].createElement("div", {
    className: "w-full text-center py-20 text-slate-400 font-bold tracking-widest uppercase"
  }, "No photos found in this category.")), selectedImage && react_1["default"].createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4"
  }, react_1["default"].createElement("div", {
    className: "absolute inset-0 bg-slate-900/95 backdrop-blur-xl",
    onClick: function onClick() {
      return setSelectedImage(null);
    }
  }), react_1["default"].createElement("div", {
    className: "relative w-full max-w-5xl animate-in zoom-in-95 duration-300"
  }, react_1["default"].createElement("button", {
    onClick: function onClick() {
      return setSelectedImage(null);
    },
    className: "absolute -top-12 right-0 text-white flex items-center gap-2 font-bold uppercase text-xs hover:text-orange-500 transition-colors"
  }, "CLOSE ", react_1["default"].createElement(lucide_react_1.X, {
    size: 24
  })), react_1["default"].createElement("div", {
    className: "bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800"
  }, react_1["default"].createElement("img", {
    src: selectedImage.src,
    alt: selectedImage.title,
    className: "w-full h-auto max-h-[75vh] object-contain"
  }), react_1["default"].createElement("div", {
    className: "p-8 md:p-10 bg-white"
  }, react_1["default"].createElement("span", {
    className: "text-orange-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2"
  }, (_a = categories.find(function (c) {
    return c.name === selectedImage.category;
  })) === null || _a === void 0 ? void 0 : _a.icon, " ", selectedImage.category), react_1["default"].createElement("h2", {
    className: "text-3xl font-black text-slate-900 capitalize"
  }, selectedImage.title))))));
}

exports["default"] = GalleryPage;