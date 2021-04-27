"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * vue-i18n v9.1.6
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
var VueI18n = function (e, t) {
  "use strict";

  var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.toStringTag),
      r = function r(e) {
    return n ? Symbol(e) : e;
  },
      a = function a(e) {
    return JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  },
      o = function o(e) {
    return "number" == typeof e && isFinite(e);
  },
      s = function s(e) {
    return "[object RegExp]" === _(e);
  },
      l = function l(e) {
    return v(e) && 0 === Object.keys(e).length;
  };

  function c(e, t) {
    "undefined" != typeof console && (console.warn("[intlify] " + e), t && console.warn(t.stack));
  }

  var u = Object.assign;

  function i(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  var f = Object.prototype.hasOwnProperty;

  function m(e, t) {
    return f.call(e, t);
  }

  var p = Array.isArray,
      g = function g(e) {
    return "function" == typeof e;
  },
      _d2 = function d(e) {
    return "string" == typeof e;
  },
      b = function b(e) {
    return "boolean" == typeof e;
  },
      h = function h(e) {
    return null !== e && "object" == _typeof(e);
  },
      k = Object.prototype.toString,
      _ = function _(e) {
    return k.call(e);
  },
      v = function v(e) {
    return "[object Object]" === _(e);
  },
      y = [];

  y[0] = {
    w: [0],
    i: [3, 0],
    "[": [4],
    o: [7]
  }, y[1] = {
    w: [1],
    ".": [2],
    "[": [4],
    o: [7]
  }, y[2] = {
    w: [2],
    i: [3, 0],
    0: [3, 0]
  }, y[3] = {
    i: [3, 0],
    0: [3, 0],
    w: [1, 1],
    ".": [2, 1],
    "[": [4, 1],
    o: [7, 1]
  }, y[4] = {
    "'": [5, 0],
    '"': [6, 0],
    "[": [4, 2],
    "]": [1, 3],
    o: 8,
    l: [4, 0]
  }, y[5] = {
    "'": [4, 0],
    o: 8,
    l: [5, 0]
  }, y[6] = {
    '"': [4, 0],
    o: 8,
    l: [6, 0]
  };
  var F = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

  function L(e) {
    if (null == e) return "o";

    switch (e.charCodeAt(0)) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return e;

      case 95:
      case 36:
      case 45:
        return "i";

      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }

    return "i";
  }

  function w(e) {
    var t = e.trim();
    return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (F.test(t) ? function (e) {
      var t = e.charCodeAt(0);
      return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1);
    }(t) : "*" + t);
  }

  var T = new Map();

  function x(e, t) {
    if (!h(e)) return null;
    var n = T.get(t);
    if (n || (n = function (e) {
      var t = [];
      var n,
          r,
          a,
          o,
          s,
          l,
          c,
          u = -1,
          i = 0,
          f = 0;
      var m = [];

      function p() {
        var t = e[u + 1];
        if (5 === i && "'" === t || 6 === i && '"' === t) return u++, a = "\\" + t, m[0](), !0;
      }

      for (m[0] = function () {
        void 0 === r ? r = a : r += a;
      }, m[1] = function () {
        void 0 !== r && (t.push(r), r = void 0);
      }, m[2] = function () {
        m[0](), f++;
      }, m[3] = function () {
        if (f > 0) f--, i = 4, m[0]();else {
          if (f = 0, void 0 === r) return !1;
          if (r = w(r), !1 === r) return !1;
          m[1]();
        }
      }; null !== i;) {
        if (u++, n = e[u], "\\" !== n || !p()) {
          if (o = L(n), c = y[i], s = c[o] || c.l || 8, 8 === s) return;
          if (i = s[0], void 0 !== s[1] && (l = m[s[1]], l && (a = n, !1 === l()))) return;
          if (7 === i) return t;
        }
      }
    }(t), n && T.set(t, n)), !n) return null;
    var r = n.length;
    var a = e,
        o = 0;

    for (; o < r;) {
      var _e2 = a[n[o]];
      if (void 0 === _e2) return null;
      a = _e2, o++;
    }

    return a;
  }

  function P(e) {
    if (!h(e)) return e;

    for (var _t in e) {
      if (m(e, _t)) if (_t.includes(".")) {
        var _n = _t.split("."),
            _r = _n.length - 1;

        var _a = e;

        for (var _e3 = 0; _e3 < _r; _e3++) {
          _n[_e3] in _a || (_a[_n[_e3]] = {}), _a = _a[_n[_e3]];
        }

        _a[_n[_r]] = e[_t], delete e[_t], h(_a[_n[_r]]) && P(_a[_n[_r]]);
      } else h(e[_t]) && P(e[_t]);
    }

    return e;
  }

  var C = function C(e) {
    return e;
  },
      M = function M(e) {
    return "";
  },
      $ = function $(e) {
    return 0 === e.length ? "" : e.join("");
  },
      O = function O(e) {
    return null == e ? "" : p(e) || v(e) && e.toString === k ? JSON.stringify(e, null, 2) : String(e);
  };

  function I(e, t) {
    return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
  }

  function W() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var t = e.locale,
        n = function (e) {
      var t = o(e.pluralIndex) ? e.pluralIndex : -1;
      return e.named && (o(e.named.count) || o(e.named.n)) ? o(e.named.count) ? e.named.count : o(e.named.n) ? e.named.n : t : t;
    }(e),
        r = h(e.pluralRules) && _d2(t) && g(e.pluralRules[t]) ? e.pluralRules[t] : I,
        a = h(e.pluralRules) && _d2(t) && g(e.pluralRules[t]) ? I : void 0,
        s = e.list || [],
        l = e.named || {};

    o(e.pluralIndex) && function (e, t) {
      t.count || (t.count = e), t.n || (t.n = e);
    }(n, l);

    function c(t) {
      var n = g(e.messages) ? e.messages(t) : !!h(e.messages) && e.messages[t];
      return n || (e.parent ? e.parent.message(t) : M);
    }

    var u = v(e.processor) && g(e.processor.normalize) ? e.processor.normalize : $,
        i = v(e.processor) && g(e.processor.interpolate) ? e.processor.interpolate : O,
        f = {
      list: function list(e) {
        return s[e];
      },
      named: function named(e) {
        return l[e];
      },
      plural: function plural(e) {
        return e[r(n, e.length, a)];
      },
      linked: function linked(t, n) {
        var r = c(t)(f);
        return _d2(n) ? (a = n, e.modifiers ? e.modifiers[a] : C)(r) : r;
        var a;
      },
      message: c,
      type: v(e.processor) && _d2(e.processor.type) ? e.processor.type : "text",
      interpolate: i,
      normalize: u
    };
    return f;
  }

  function N(e) {
    throw e;
  }

  function S(e, t, n) {
    var r = {
      start: e,
      end: t
    };
    return null != n && (r.source = n), r;
  }

  var E = " ",
      j = "\n",
      H = String.fromCharCode(8232),
      R = String.fromCharCode(8233);

  function D(e) {
    var t = e;
    var n = 0,
        r = 1,
        a = 1,
        o = 0;

    var s = function s(e) {
      return "\r" === t[e] && t[e + 1] === j;
    },
        l = function l(e) {
      return t[e] === R;
    },
        c = function c(e) {
      return t[e] === H;
    },
        u = function u(e) {
      return s(e) || function (e) {
        return t[e] === j;
      }(e) || l(e) || c(e);
    },
        i = function i(e) {
      return s(e) || l(e) || c(e) ? j : t[e];
    };

    function f() {
      return o = 0, u(n) && (r++, a = 0), s(n) && n++, n++, a++, t[n];
    }

    return {
      index: function index() {
        return n;
      },
      line: function line() {
        return r;
      },
      column: function column() {
        return a;
      },
      peekOffset: function peekOffset() {
        return o;
      },
      charAt: i,
      currentChar: function currentChar() {
        return i(n);
      },
      currentPeek: function currentPeek() {
        return i(n + o);
      },
      next: f,
      peek: function peek() {
        return s(n + o) && o++, o++, t[n + o];
      },
      reset: function reset() {
        n = 0, r = 1, a = 1, o = 0;
      },
      resetPeek: function resetPeek() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        o = e;
      },
      skipToPeek: function skipToPeek() {
        var e = n + o;

        for (; e !== n;) {
          f();
        }

        o = 0;
      }
    };
  }

  var A = void 0;

  function U(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var n = !1 !== t.location,
        r = D(e),
        a = function a() {
      return r.index();
    },
        o = function o() {
      return e = r.line(), t = r.column(), n = r.index(), {
        line: e,
        column: t,
        offset: n
      };
      var e, t, n;
    },
        s = o(),
        l = a(),
        c = {
      currentType: 14,
      offset: l,
      startLoc: s,
      endLoc: s,
      lastType: 14,
      lastOffset: l,
      lastStartLoc: s,
      lastEndLoc: s,
      braceNest: 0,
      inLinked: !1,
      text: ""
    },
        u = function u() {
      return c;
    },
        i = t.onError;

    function f(e, t, r) {
      e.endLoc = o(), e.currentType = t;
      var a = {
        type: t
      };
      return n && (a.loc = S(e.startLoc, e.endLoc)), null != r && (a.value = r), a;
    }

    var m = function m(e) {
      return f(e, 14);
    };

    function p(e, t) {
      return e.currentChar() === t ? (e.next(), t) : (o(), "");
    }

    function g(e) {
      var t = "";

      for (; e.currentPeek() === E || e.currentPeek() === j;) {
        t += e.currentPeek(), e.peek();
      }

      return t;
    }

    function d(e) {
      var t = g(e);
      return e.skipToPeek(), t;
    }

    function b(e) {
      if (e === A) return !1;
      var t = e.charCodeAt(0);
      return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t;
    }

    function h(e, t) {
      var n = t.currentType;
      if (2 !== n) return !1;
      g(e);

      var r = function (e) {
        if (e === A) return !1;
        var t = e.charCodeAt(0);
        return t >= 48 && t <= 57;
      }("-" === e.currentPeek() ? e.peek() : e.currentPeek());

      return e.resetPeek(), r;
    }

    function k(e) {
      g(e);
      var t = "|" === e.currentPeek();
      return e.resetPeek(), t;
    }

    function _(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;

      var n = function n() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        var o = e.currentPeek();
        return "{" === o ? "%" !== r && t : "@" !== o && o ? "%" === o ? (e.peek(), n(t, "%", !0)) : "|" === o ? !("%" !== r && !a) || !(r === E || r === j) : o === E ? (e.peek(), n(!0, E, a)) : o !== j || (e.peek(), n(!0, j, a)) : "%" === r || t;
      },
          r = n();

      return t && e.resetPeek(), r;
    }

    function v(e, t) {
      var n = e.currentChar();
      return n === A ? A : t(n) ? (e.next(), n) : null;
    }

    function y(e) {
      return v(e, function (e) {
        var t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t;
      });
    }

    function F(e) {
      return v(e, function (e) {
        var t = e.charCodeAt(0);
        return t >= 48 && t <= 57;
      });
    }

    function L(e) {
      return v(e, function (e) {
        var t = e.charCodeAt(0);
        return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
      });
    }

    function w(e) {
      var t = "",
          n = "";

      for (; t = F(e);) {
        n += t;
      }

      return n;
    }

    function T(e) {
      var t = e.currentChar();

      switch (t) {
        case "\\":
        case "'":
          return e.next(), "\\".concat(t);

        case "u":
          return x(e, t, 4);

        case "U":
          return x(e, t, 6);

        default:
          return o(), "";
      }
    }

    function x(e, t, n) {
      p(e, t);
      var r = "";

      for (var _t2 = 0; _t2 < n; _t2++) {
        var _t3 = L(e);

        if (!_t3) {
          o(), e.currentChar();
          break;
        }

        r += _t3;
      }

      return "\\".concat(t).concat(r);
    }

    function P(e) {
      d(e);
      var t = p(e, "|");
      return d(e), t;
    }

    function C(e, t) {
      var n = null;

      switch (e.currentChar()) {
        case "{":
          return t.braceNest >= 1 && o(), e.next(), n = f(t, 2, "{"), d(e), t.braceNest++, n;

        case "}":
          return t.braceNest > 0 && 2 === t.currentType && o(), e.next(), n = f(t, 3, "}"), t.braceNest--, t.braceNest > 0 && d(e), t.inLinked && 0 === t.braceNest && (t.inLinked = !1), n;

        case "@":
          return t.braceNest > 0 && o(), n = M(e, t) || m(t), t.braceNest = 0, n;

        default:
          var _r2 = !0,
              _a2 = !0,
              _s = !0;

          if (k(e)) return t.braceNest > 0 && o(), n = f(t, 1, P(e)), t.braceNest = 0, t.inLinked = !1, n;
          if (t.braceNest > 0 && (5 === t.currentType || 6 === t.currentType || 7 === t.currentType)) return o(), t.braceNest = 0, $(e, t);
          if (_r2 = function (e, t) {
            var n = t.currentType;
            if (2 !== n) return !1;
            g(e);
            var r = b(e.currentPeek());
            return e.resetPeek(), r;
          }(e, t)) return n = f(t, 5, function (e) {
            d(e);
            var t = "",
                n = "";

            for (; t = y(e);) {
              n += t;
            }

            return e.currentChar() === A && o(), n;
          }(e)), d(e), n;
          if (_a2 = h(e, t)) return n = f(t, 6, function (e) {
            d(e);
            var t = "";
            return "-" === e.currentChar() ? (e.next(), t += "-".concat(w(e))) : t += w(e), e.currentChar() === A && o(), t;
          }(e)), d(e), n;
          if (_s = function (e, t) {
            var n = t.currentType;
            if (2 !== n) return !1;
            g(e);
            var r = "'" === e.currentPeek();
            return e.resetPeek(), r;
          }(e, t)) return n = f(t, 7, function (e) {
            d(e), p(e, "'");
            var t = "",
                n = "";

            var r = function r(e) {
              return "'" !== e && e !== j;
            };

            for (; t = v(e, r);) {
              n += "\\" === t ? T(e) : t;
            }

            var a = e.currentChar();
            return a === j || a === A ? (o(), a === j && (e.next(), p(e, "'")), n) : (p(e, "'"), n);
          }(e)), d(e), n;
          if (!_r2 && !_a2 && !_s) return n = f(t, 13, function (e) {
            d(e);
            var t = "",
                n = "";

            var r = function r(e) {
              return "{" !== e && "}" !== e && e !== E && e !== j;
            };

            for (; t = v(e, r);) {
              n += t;
            }

            return n;
          }(e)), o(), d(e), n;
      }

      return n;
    }

    function M(e, t) {
      var n = t.currentType;
      var r = null;
      var a = e.currentChar();

      switch (8 !== n && 9 !== n && 12 !== n && 10 !== n || a !== j && a !== E || o(), a) {
        case "@":
          return e.next(), r = f(t, 8, "@"), t.inLinked = !0, r;

        case ".":
          return d(e), e.next(), f(t, 9, ".");

        case ":":
          return d(e), e.next(), f(t, 10, ":");

        default:
          return k(e) ? (r = f(t, 1, P(e)), t.braceNest = 0, t.inLinked = !1, r) : function (e, t) {
            var n = t.currentType;
            if (8 !== n) return !1;
            g(e);
            var r = "." === e.currentPeek();
            return e.resetPeek(), r;
          }(e, t) || function (e, t) {
            var n = t.currentType;
            if (8 !== n && 12 !== n) return !1;
            g(e);
            var r = ":" === e.currentPeek();
            return e.resetPeek(), r;
          }(e, t) ? (d(e), M(e, t)) : function (e, t) {
            var n = t.currentType;
            if (9 !== n) return !1;
            g(e);
            var r = b(e.currentPeek());
            return e.resetPeek(), r;
          }(e, t) ? (d(e), f(t, 12, function (e) {
            var t = "",
                n = "";

            for (; t = y(e);) {
              n += t;
            }

            return n;
          }(e))) : function (e, t) {
            var n = t.currentType;
            if (10 !== n) return !1;

            var r = function r() {
              var t = e.currentPeek();
              return "{" === t ? b(e.peek()) : !("@" === t || "%" === t || "|" === t || ":" === t || "." === t || t === E || !t) && (t === j ? (e.peek(), r()) : b(t));
            },
                a = r();

            return e.resetPeek(), a;
          }(e, t) ? (d(e), "{" === a ? C(e, t) || r : f(t, 11, function (e) {
            var t = function t() {
              var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
              var r = arguments.length > 1 ? arguments[1] : undefined;
              var a = e.currentChar();
              return "{" !== a && "%" !== a && "@" !== a && "|" !== a && a ? a === E ? r : a === j ? (r += a, e.next(), t(n, r)) : (r += a, e.next(), t(!0, r)) : r;
            };

            return t(!1, "");
          }(e))) : (8 === n && o(), t.braceNest = 0, t.inLinked = !1, $(e, t));
      }
    }

    function $(e, t) {
      var n = {
        type: 14
      };
      if (t.braceNest > 0) return C(e, t) || m(t);
      if (t.inLinked) return M(e, t) || m(t);
      var r = e.currentChar();

      switch (r) {
        case "{":
          return C(e, t) || m(t);

        case "}":
          return o(), e.next(), f(t, 3, "}");

        case "@":
          return M(e, t) || m(t);

        default:
          if (k(e)) return n = f(t, 1, P(e)), t.braceNest = 0, t.inLinked = !1, n;
          if (_(e)) return f(t, 0, function (e) {
            var t = function t(n) {
              var r = e.currentChar();
              return "{" !== r && "}" !== r && "@" !== r && r ? "%" === r ? _(e) ? (n += r, e.next(), t(n)) : n : "|" === r ? n : r === E || r === j ? _(e) ? (n += r, e.next(), t(n)) : k(e) ? n : (n += r, e.next(), t(n)) : (n += r, e.next(), t(n)) : n;
            };

            return t("");
          }(e));
          if ("%" === r) return e.next(), f(t, 4, "%");
      }

      return n;
    }

    return {
      nextToken: function nextToken() {
        var e = c.currentType,
            t = c.offset,
            n = c.startLoc,
            s = c.endLoc;
        return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = s, c.offset = a(), c.startLoc = o(), r.currentChar() === A ? f(c, 14) : $(r, c);
      },
      currentOffset: a,
      currentPosition: o,
      context: u
    };
  }

  var z = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

  function J(e, t, n) {
    switch (e) {
      case "\\\\":
        return "\\";

      case "\\'":
        return "'";

      default:
        {
          var _e4 = parseInt(t || n, 16);

          return _e4 <= 55295 || _e4 >= 57344 ? String.fromCodePoint(_e4) : "�";
        }
    }
  }

  function V() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var t = !1 !== e.location,
        n = e.onError;

    function r(e, n, r) {
      var a = {
        type: e,
        start: n,
        end: n
      };
      return t && (a.loc = {
        start: r,
        end: r
      }), a;
    }

    function a(e, n, r, a) {
      e.end = n, a && (e.type = a), t && e.loc && (e.loc.end = r);
    }

    function o(e, t) {
      var n = e.context(),
          o = r(3, n.offset, n.startLoc);
      return o.value = t, a(o, e.currentOffset(), e.currentPosition()), o;
    }

    function s(e, t) {
      var n = e.context(),
          o = n.lastOffset,
          s = n.lastStartLoc,
          l = r(5, o, s);
      return l.index = parseInt(t, 10), e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l;
    }

    function l(e, t) {
      var n = e.context(),
          o = n.lastOffset,
          s = n.lastStartLoc,
          l = r(4, o, s);
      return l.key = t, e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l;
    }

    function c(e, t) {
      var n = e.context(),
          o = n.lastOffset,
          s = n.lastStartLoc,
          l = r(9, o, s);
      return l.value = t.replace(z, J), e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l;
    }

    function i(e) {
      var t = e.context(),
          n = r(6, t.offset, t.startLoc);
      var o = e.nextToken();

      if (9 === o.type) {
        var _t4 = function (e) {
          var t = e.nextToken(),
              n = e.context(),
              o = n.lastOffset,
              s = n.lastStartLoc,
              l = r(8, o, s);
          return 12 !== t.type ? (l.value = "", a(l, o, s), {
            nextConsumeToken: t,
            node: l
          }) : (null == t.value && q(t), l.value = t.value || "", a(l, e.currentOffset(), e.currentPosition()), {
            node: l
          });
        }(e);

        n.modifier = _t4.node, o = _t4.nextConsumeToken || e.nextToken();
      }

      switch (10 !== o.type && q(o), o = e.nextToken(), 2 === o.type && (o = e.nextToken()), o.type) {
        case 11:
          null == o.value && q(o), n.key = function (e, t) {
            var n = e.context(),
                o = r(7, n.offset, n.startLoc);
            return o.value = t, a(o, e.currentOffset(), e.currentPosition()), o;
          }(e, o.value || "");
          break;

        case 5:
          null == o.value && q(o), n.key = l(e, o.value || "");
          break;

        case 6:
          null == o.value && q(o), n.key = s(e, o.value || "");
          break;

        case 7:
          null == o.value && q(o), n.key = c(e, o.value || "");
          break;

        default:
          var _t5 = e.context(),
              _u = r(7, _t5.offset, _t5.startLoc);

          return _u.value = "", a(_u, _t5.offset, _t5.startLoc), n.key = _u, a(n, _t5.offset, _t5.startLoc), {
            nextConsumeToken: o,
            node: n
          };
      }

      return a(n, e.currentOffset(), e.currentPosition()), {
        node: n
      };
    }

    function f(e) {
      var t = e.context(),
          n = r(2, 1 === t.currentType ? e.currentOffset() : t.offset, 1 === t.currentType ? t.endLoc : t.startLoc);
      n.items = [];
      var u = null;

      do {
        var _t6 = u || e.nextToken();

        switch (u = null, _t6.type) {
          case 0:
            null == _t6.value && q(_t6), n.items.push(o(e, _t6.value || ""));
            break;

          case 6:
            null == _t6.value && q(_t6), n.items.push(s(e, _t6.value || ""));
            break;

          case 5:
            null == _t6.value && q(_t6), n.items.push(l(e, _t6.value || ""));
            break;

          case 7:
            null == _t6.value && q(_t6), n.items.push(c(e, _t6.value || ""));
            break;

          case 8:
            var _r3 = i(e);

            n.items.push(_r3.node), u = _r3.nextConsumeToken || null;
        }
      } while (14 !== t.currentType && 1 !== t.currentType);

      return a(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()), n;
    }

    function m(e) {
      var t = e.context(),
          n = t.offset,
          o = t.startLoc,
          s = f(e);
      return 14 === t.currentType ? s : function (e, t, n, o) {
        var s = e.context();
        var l = 0 === o.items.length;
        var c = r(1, t, n);
        c.cases = [], c.cases.push(o);

        do {
          var _t7 = f(e);

          l || (l = 0 === _t7.items.length), c.cases.push(_t7);
        } while (14 !== s.currentType);

        return a(c, e.currentOffset(), e.currentPosition()), c;
      }(e, n, o, s);
    }

    return {
      parse: function parse(n) {
        var o = U(n, u({}, e)),
            s = o.context(),
            l = r(0, s.offset, s.startLoc);
        return t && l.loc && (l.loc.source = n), l.body = m(o), a(l, o.currentOffset(), o.currentPosition()), l;
      }
    };
  }

  function q(e) {
    if (14 === e.type) return "EOF";
    var t = (e.value || "").replace(/\r?\n/g, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "…" : t;
  }

  function B(e, t) {
    for (var _n2 = 0; _n2 < e.length; _n2++) {
      G(e[_n2], t);
    }
  }

  function G(e, t) {
    switch (e.type) {
      case 1:
        B(e.cases, t), t.helper("plural");
        break;

      case 2:
        B(e.items, t);
        break;

      case 6:
        G(e.key, t), t.helper("linked");
        break;

      case 5:
        t.helper("interpolate"), t.helper("list");
        break;

      case 4:
        t.helper("interpolate"), t.helper("named");
    }
  }

  function Y(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var n = function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var n = {
        ast: e,
        helpers: new Set()
      };
      return {
        context: function context() {
          return n;
        },
        helper: function helper(e) {
          return n.helpers.add(e), e;
        }
      };
    }(e);

    n.helper("normalize"), e.body && G(e.body, n);
    var r = n.context();
    e.helpers = Array.from(r.helpers);
  }

  function K(e, t) {
    var n = e.helper;

    switch (t.type) {
      case 0:
        !function (e, t) {
          t.body ? K(e, t.body) : e.push("null");
        }(e, t);
        break;

      case 1:
        !function (e, t) {
          var n = e.helper,
              r = e.needIndent;

          if (t.cases.length > 1) {
            e.push("".concat(n("plural"), "([")), e.indent(r());
            var _a3 = t.cases.length;

            for (var _n3 = 0; _n3 < _a3 && (K(e, t.cases[_n3]), _n3 !== _a3 - 1); _n3++) {
              e.push(", ");
            }

            e.deindent(r()), e.push("])");
          }
        }(e, t);
        break;

      case 2:
        !function (e, t) {
          var n = e.helper,
              r = e.needIndent;
          e.push("".concat(n("normalize"), "([")), e.indent(r());
          var a = t.items.length;

          for (var _n4 = 0; _n4 < a && (K(e, t.items[_n4]), _n4 !== a - 1); _n4++) {
            e.push(", ");
          }

          e.deindent(r()), e.push("])");
        }(e, t);
        break;

      case 6:
        !function (e, t) {
          var n = e.helper;
          e.push("".concat(n("linked"), "(")), K(e, t.key), t.modifier && (e.push(", "), K(e, t.modifier)), e.push(")");
        }(e, t);
        break;

      case 8:
      case 7:
        e.push(JSON.stringify(t.value), t);
        break;

      case 5:
        e.push("".concat(n("interpolate"), "(").concat(n("list"), "(").concat(t.index, "))"), t);
        break;

      case 4:
        e.push("".concat(n("interpolate"), "(").concat(n("named"), "(").concat(JSON.stringify(t.key), "))"), t);
        break;

      case 9:
      case 3:
        e.push(JSON.stringify(t.value), t);
    }
  }

  function Z(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var n = u({}, t),
        r = V(n).parse(e);
    return Y(r, n), function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var n = _d2(t.mode) ? t.mode : "normal",
          r = _d2(t.filename) ? t.filename : "message.intl",
          a = t.needIndent ? t.needIndent : "arrow" !== n,
          o = e.helpers || [],
          s = function (e, t) {
        var n = t.filename,
            r = t.breakLineCode,
            a = t.needIndent,
            o = {
          source: e.loc.source,
          filename: n,
          code: "",
          column: 1,
          line: 1,
          offset: 0,
          map: void 0,
          breakLineCode: r,
          needIndent: a,
          indentLevel: 0
        };

        function s(e, t) {
          o.code += e;
        }

        function l(e) {
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
          var n = t ? r : "";
          s(a ? n + "  ".repeat(e) : n);
        }

        return {
          context: function context() {
            return o;
          },
          push: s,
          indent: function indent() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
            var t = ++o.indentLevel;
            e && l(t);
          },
          deindent: function deindent() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
            var t = --o.indentLevel;
            e && l(t);
          },
          newline: function newline() {
            l(o.indentLevel);
          },
          helper: function helper(e) {
            return "_".concat(e);
          },
          needIndent: function needIndent() {
            return o.needIndent;
          }
        };
      }(e, {
        mode: n,
        filename: r,
        sourceMap: !!t.sourceMap,
        breakLineCode: null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n",
        needIndent: a
      });

      s.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(a), o.length > 0 && (s.push("const { ".concat(o.map(function (e) {
        return "".concat(e, ": _").concat(e);
      }).join(", "), " } = ctx")), s.newline()), s.push("return "), K(s, e), s.deindent(a), s.push("}");

      var _s$context = s.context(),
          l = _s$context.code,
          c = _s$context.map;

      return {
        ast: e,
        code: l,
        map: c ? c.toJSON() : void 0
      };
    }(r, n);
  }

  var Q;
  var X = 0;

  function ee() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var t = _d2(e.version) ? e.version : "9.1.6",
        n = _d2(e.locale) ? e.locale : "en-US",
        r = p(e.fallbackLocale) || v(e.fallbackLocale) || _d2(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n,
        a = v(e.messages) ? e.messages : _defineProperty({}, n, {}),
        o = v(e.datetimeFormats) ? e.datetimeFormats : _defineProperty({}, n, {}),
        l = v(e.numberFormats) ? e.numberFormats : _defineProperty({}, n, {}),
        i = u({}, e.modifiers || {}, {
      upper: function upper(e) {
        return _d2(e) ? e.toUpperCase() : e;
      },
      lower: function lower(e) {
        return _d2(e) ? e.toLowerCase() : e;
      },
      capitalize: function capitalize(e) {
        return _d2(e) ? "".concat(e.charAt(0).toLocaleUpperCase()).concat(e.substr(1)) : e;
      }
    }),
        f = e.pluralRules || {},
        m = g(e.missing) ? e.missing : null,
        k = !b(e.missingWarn) && !s(e.missingWarn) || e.missingWarn,
        _ = !b(e.fallbackWarn) && !s(e.fallbackWarn) || e.fallbackWarn,
        y = !!e.fallbackFormat,
        F = !!e.unresolving,
        L = g(e.postTranslation) ? e.postTranslation : null,
        w = v(e.processor) ? e.processor : null,
        T = !b(e.warnHtmlMessage) || e.warnHtmlMessage,
        x = !!e.escapeParameter,
        P = g(e.messageCompiler) ? e.messageCompiler : Q,
        C = g(e.onWarn) ? e.onWarn : c,
        M = e,
        $ = h(M.__datetimeFormatters) ? M.__datetimeFormatters : new Map(),
        O = h(M.__numberFormatters) ? M.__numberFormatters : new Map(),
        I = h(M.__meta) ? M.__meta : {};

    X++;
    return {
      version: t,
      cid: X,
      locale: n,
      fallbackLocale: r,
      messages: a,
      datetimeFormats: o,
      numberFormats: l,
      modifiers: i,
      pluralRules: f,
      missing: m,
      missingWarn: k,
      fallbackWarn: _,
      fallbackFormat: y,
      unresolving: F,
      postTranslation: L,
      processor: w,
      warnHtmlMessage: T,
      escapeParameter: x,
      messageCompiler: P,
      onWarn: C,
      __datetimeFormatters: $,
      __numberFormatters: O,
      __meta: I
    };
  }

  function te(e, t, n, r, a) {
    var o = e.missing;

    if (null !== o) {
      var _r4 = o(e, n, t, a);

      return _d2(_r4) ? _r4 : t;
    }

    return t;
  }

  function ne(e, t, n) {
    var r = e;
    r.__localeChainCache || (r.__localeChainCache = new Map());

    var a = r.__localeChainCache.get(n);

    if (!a) {
      a = [];
      var _e5 = [n];

      for (; p(_e5);) {
        _e5 = re(a, _e5, t);
      }

      var _o = p(t) ? t : v(t) ? t["default"] ? t["default"] : null : t;

      _e5 = _d2(_o) ? [_o] : _o, p(_e5) && re(a, _e5, !1), r.__localeChainCache.set(n, a);
    }

    return a;
  }

  function re(e, t, n) {
    var r = !0;

    for (var _a4 = 0; _a4 < t.length && b(r); _a4++) {
      _d2(t[_a4]) && (r = ae(e, t[_a4], n));
    }

    return r;
  }

  function ae(e, t, n) {
    var r;
    var a = t.split("-");

    do {
      r = oe(e, a.join("-"), n), a.splice(-1, 1);
    } while (a.length && !0 === r);

    return r;
  }

  function oe(e, t, n) {
    var r = !1;

    if (!e.includes(t) && (r = !0, t)) {
      r = "!" !== t[t.length - 1];

      var _a5 = t.replace(/!/g, "");

      e.push(_a5), (p(n) || v(n)) && n[_a5] && (r = n[_a5]);
    }

    return r;
  }

  function se(e, t, n) {
    e.__localeChainCache = new Map(), ne(e, n, t);
  }

  var le = function le(e) {
    return e;
  };

  var ce = Object.create(null);

  var ue = function ue() {
    return "";
  },
      ie = function ie(e) {
    return g(e);
  };

  function fe(e) {
    for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      t[_key - 1] = arguments[_key];
    }

    var n = e.fallbackFormat,
        r = e.postTranslation,
        a = e.unresolving,
        s = e.fallbackLocale,
        l = e.messages,
        _pe = pe.apply(void 0, t),
        _pe2 = _slicedToArray(_pe, 2),
        c = _pe2[0],
        u = _pe2[1],
        f = (b(u.missingWarn), b(u.fallbackWarn), b(u.escapeParameter) ? u.escapeParameter : e.escapeParameter),
        m = !!u.resolvedMessage,
        k = _d2(u["default"]) || b(u["default"]) ? b(u["default"]) ? c : u["default"] : n ? c : "",
        _ = n || "" !== k,
        v = _d2(u.locale) ? u.locale : e.locale;

    f && function (e) {
      p(e.list) ? e.list = e.list.map(function (e) {
        return _d2(e) ? i(e) : e;
      }) : h(e.named) && Object.keys(e.named).forEach(function (t) {
        _d2(e.named[t]) && (e.named[t] = i(e.named[t]));
      });
    }(u);

    var _ref4 = m ? [c, v, l[v] || {}] : function (e, t, n, r, a, o) {
      var s = e.messages,
          l = ne(e, r, n);
      var c,
          u = {},
          i = null;
      var f = "translate";

      for (var _n5 = 0; _n5 < l.length && (c = l[_n5], u = s[c] || {}, null === (i = x(u, t)) && (i = u[t]), !_d2(i) && !g(i)); _n5++) {
        var _n6 = te(e, t, c, 0, f);

        _n6 !== t && (i = _n6);
      }

      return [i, c, u];
    }(e, c, v, s),
        _ref5 = _slicedToArray(_ref4, 3),
        y = _ref5[0],
        F = _ref5[1],
        L = _ref5[2],
        w = c;

    if (m || _d2(y) || ie(y) || _ && (y = k, w = y), !(m || (_d2(y) || ie(y)) && _d2(F))) return a ? -1 : c;
    var T = !1;
    var P = ie(y) ? y : me(e, c, F, y, w, function () {
      T = !0;
    });
    if (T) return y;

    var C = function (e, t, n) {
      return t(n);
    }(0, P, W(function (e, t, n, r) {
      var a = e.modifiers,
          s = e.pluralRules,
          l = {
        locale: t,
        modifiers: a,
        pluralRules: s,
        messages: function messages(r) {
          var a = x(n, r);

          if (_d2(a)) {
            var _n7 = !1;

            var _o2 = me(e, r, t, a, r, function () {
              _n7 = !0;
            });

            return _n7 ? ue : _o2;
          }

          return ie(a) ? a : ue;
        }
      };
      e.processor && (l.processor = e.processor);
      r.list && (l.list = r.list);
      r.named && (l.named = r.named);
      o(r.plural) && (l.pluralIndex = r.plural);
      return l;
    }(e, F, L, u)));

    return r ? r(C) : C;
  }

  function me(e, t, n, r, o, s) {
    var l = e.messageCompiler,
        c = e.warnHtmlMessage;

    if (ie(r)) {
      var _e6 = r;
      return _e6.locale = _e6.locale || n, _e6.key = _e6.key || t, _e6;
    }

    var u = l(r, function (e, t, n, r, o, s) {
      return {
        warnHtmlMessage: o,
        onError: function onError(e) {
          throw s && s(e), e;
        },
        onCacheKey: function onCacheKey(e) {
          return function (e, t, n) {
            return a({
              l: e,
              k: t,
              s: n
            });
          }(t, n, e);
        }
      };
    }(0, n, o, 0, c, s));
    return u.locale = n, u.key = t, u.source = r, u;
  }

  function pe() {
    for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      e[_key2] = arguments[_key2];
    }

    var t = e[0],
        n = e[1],
        r = e[2],
        a = {};
    if (!_d2(t) && !o(t) && !ie(t)) throw Error(14);
    var s = o(t) ? String(t) : (ie(t), t);
    return o(n) ? a.plural = n : _d2(n) ? a["default"] = n : v(n) && !l(n) ? a.named = n : p(n) && (a.list = n), o(r) ? a.plural = r : _d2(r) ? a["default"] = r : v(r) && u(a, r), [s, a];
  }

  function ge(e) {
    for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      t[_key3 - 1] = arguments[_key3];
    }

    var n = e.datetimeFormats,
        r = e.unresolving,
        a = e.fallbackLocale,
        o = e.__datetimeFormatters,
        _de = de.apply(void 0, t),
        _de2 = _slicedToArray(_de, 4),
        s = _de2[0],
        c = _de2[1],
        i = _de2[2],
        f = _de2[3];

    b(i.missingWarn);
    b(i.fallbackWarn);
    var m = !!i.part,
        p = _d2(i.locale) ? i.locale : e.locale,
        g = ne(e, a, p);
    if (!_d2(s) || "" === s) return new Intl.DateTimeFormat(p).format(c);
    var h,
        k = {},
        _ = null;

    for (var _t8 = 0; _t8 < g.length && (h = g[_t8], k = n[h] || {}, _ = k[s], !v(_)); _t8++) {
      te(e, s, h, 0, "datetime format");
    }

    if (!v(_) || !_d2(h)) return r ? -1 : s;
    var y = "".concat(h, "__").concat(s);
    l(f) || (y = "".concat(y, "__").concat(JSON.stringify(f)));
    var F = o.get(y);
    return F || (F = new Intl.DateTimeFormat(h, u({}, _, f)), o.set(y, F)), m ? F.formatToParts(c) : F.format(c);
  }

  function de() {
    for (var _len4 = arguments.length, e = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      e[_key4] = arguments[_key4];
    }

    var t = e[0],
        n = e[1],
        r = e[2],
        a = e[3];
    var s,
        l = {},
        c = {};

    if (_d2(t)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(t)) throw Error(16);
      s = new Date(t);

      try {
        s.toISOString();
      } catch (e) {
        throw Error(16);
      }
    } else if ("[object Date]" === _(t)) {
      if (isNaN(t.getTime())) throw Error(15);
      s = t;
    } else {
      if (!o(t)) throw Error(14);
      s = t;
    }

    return _d2(n) ? l.key = n : v(n) && (l = n), _d2(r) ? l.locale = r : v(r) && (c = r), v(a) && (c = a), [l.key || "", s, l, c];
  }

  function be(e, t, n) {
    var r = e;

    for (var _e7 in n) {
      var _n8 = "".concat(t, "__").concat(_e7);

      r.__datetimeFormatters.has(_n8) && r.__datetimeFormatters["delete"](_n8);
    }
  }

  function he(e) {
    for (var _len5 = arguments.length, t = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      t[_key5 - 1] = arguments[_key5];
    }

    var n = e.numberFormats,
        r = e.unresolving,
        a = e.fallbackLocale,
        o = e.__numberFormatters,
        _ke = ke.apply(void 0, t),
        _ke2 = _slicedToArray(_ke, 4),
        s = _ke2[0],
        c = _ke2[1],
        i = _ke2[2],
        f = _ke2[3];

    b(i.missingWarn);
    b(i.fallbackWarn);
    var m = !!i.part,
        p = _d2(i.locale) ? i.locale : e.locale,
        g = ne(e, a, p);
    if (!_d2(s) || "" === s) return new Intl.NumberFormat(p).format(c);
    var h,
        k = {},
        _ = null;

    for (var _t9 = 0; _t9 < g.length && (h = g[_t9], k = n[h] || {}, _ = k[s], !v(_)); _t9++) {
      te(e, s, h, 0, "number format");
    }

    if (!v(_) || !_d2(h)) return r ? -1 : s;
    var y = "".concat(h, "__").concat(s);
    l(f) || (y = "".concat(y, "__").concat(JSON.stringify(f)));
    var F = o.get(y);
    return F || (F = new Intl.NumberFormat(h, u({}, _, f)), o.set(y, F)), m ? F.formatToParts(c) : F.format(c);
  }

  function ke() {
    for (var _len6 = arguments.length, e = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      e[_key6] = arguments[_key6];
    }

    var t = e[0],
        n = e[1],
        r = e[2],
        a = e[3];
    var s = {},
        l = {};
    if (!o(t)) throw Error(14);
    var c = t;
    return _d2(n) ? s.key = n : v(n) && (s = n), _d2(r) ? s.locale = r : v(r) && (l = r), v(a) && (l = a), [s.key || "", c, s, l];
  }

  function _e(e, t, n) {
    var r = e;

    for (var _e8 in n) {
      var _n9 = "".concat(t, "__").concat(_e8);

      r.__numberFormatters.has(_n9) && r.__numberFormatters["delete"](_n9);
    }
  }

  var ve = "9.1.6",
      ye = r("__transrateVNode"),
      Fe = r("__datetimeParts"),
      Le = r("__numberParts"),
      we = r("__setPluralRules");
  var Te = 0;

  function xe(e) {
    return function (n, r, a, o) {
      return e(r, a, t.getCurrentInstance() || void 0, o);
    };
  }

  function Pe(e, t) {
    var n = t.messages,
        r = t.__i18n,
        a = v(n) ? n : p(r) ? {} : _defineProperty({}, e, {});
    if (p(r) && r.forEach(function (_ref7) {
      var e = _ref7.locale,
          t = _ref7.resource;
      e ? (a[e] = a[e] || {}, Me(t, a[e])) : Me(t, a);
    }), t.flatJson) for (var _e9 in a) {
      m(a, _e9) && P(a[_e9]);
    }
    return a;
  }

  var Ce = function Ce(e) {
    return !h(e) || p(e);
  };

  function Me(e, t) {
    if (Ce(e) || Ce(t)) throw Error(20);

    for (var _n10 in e) {
      m(e, _n10) && (Ce(e[_n10]) || Ce(t[_n10]) ? t[_n10] = e[_n10] : Me(e[_n10], t[_n10]));
    }
  }

  function $e() {
    var _ref10;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var n = e.__root,
        r = void 0 === n;
    var a = !b(e.inheritLocale) || e.inheritLocale;
    var l = t.ref(n && a ? n.locale.value : _d2(e.locale) ? e.locale : "en-US"),
        c = t.ref(n && a ? n.fallbackLocale.value : _d2(e.fallbackLocale) || p(e.fallbackLocale) || v(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : l.value),
        i = t.ref(Pe(l.value, e)),
        f = t.ref(v(e.datetimeFormats) ? e.datetimeFormats : _defineProperty({}, l.value, {})),
        m = t.ref(v(e.numberFormats) ? e.numberFormats : _defineProperty({}, l.value, {}));

    var k = n ? n.missingWarn : !b(e.missingWarn) && !s(e.missingWarn) || e.missingWarn,
        _ = n ? n.fallbackWarn : !b(e.fallbackWarn) && !s(e.fallbackWarn) || e.fallbackWarn,
        y = n ? n.fallbackRoot : !b(e.fallbackRoot) || e.fallbackRoot,
        F = !!e.fallbackFormat,
        L = g(e.missing) ? e.missing : null,
        w = g(e.missing) ? xe(e.missing) : null,
        T = g(e.postTranslation) ? e.postTranslation : null,
        P = !b(e.warnHtmlMessage) || e.warnHtmlMessage,
        C = !!e.escapeParameter;

    var M = n ? n.modifiers : v(e.modifiers) ? e.modifiers : {};
    var $,
        O = e.pluralRules || n && n.pluralRules;
    $ = ee({
      version: ve,
      locale: l.value,
      fallbackLocale: c.value,
      messages: i.value,
      datetimeFormats: f.value,
      numberFormats: m.value,
      modifiers: M,
      pluralRules: O,
      missing: null === w ? void 0 : w,
      missingWarn: k,
      fallbackWarn: _,
      fallbackFormat: F,
      unresolving: !0,
      postTranslation: null === T ? void 0 : T,
      warnHtmlMessage: P,
      escapeParameter: C,
      __datetimeFormatters: v($) ? $.__datetimeFormatters : void 0,
      __numberFormatters: v($) ? $.__numberFormatters : void 0,
      __v_emitter: v($) ? $.__v_emitter : void 0,
      __meta: {
        framework: "vue"
      }
    }), se($, l.value, c.value);
    var I = t.computed({
      get: function get() {
        return l.value;
      },
      set: function set(e) {
        l.value = e, $.locale = l.value;
      }
    }),
        W = t.computed({
      get: function get() {
        return c.value;
      },
      set: function set(e) {
        c.value = e, $.fallbackLocale = c.value, se($, l.value, e);
      }
    }),
        N = t.computed(function () {
      return i.value;
    }),
        S = t.computed(function () {
      return f.value;
    }),
        E = t.computed(function () {
      return m.value;
    });

    function j(e, t, r, a, s, l) {
      var c;

      if (c = e($), o(c) && -1 === c) {
        var _t10 = t(),
            _t11 = _slicedToArray(_t10, 2),
            _e10 = _t11[0],
            _r5 = _t11[1];

        return n && y ? a(n) : s(_e10);
      }

      if (l(c)) return c;
      throw Error(14);
    }

    function H() {
      for (var _len7 = arguments.length, e = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        e[_key7] = arguments[_key7];
      }

      return j(function (t) {
        return fe.apply(void 0, [t].concat(e));
      }, function () {
        return pe.apply(void 0, e);
      }, 0, function (t) {
        return t.t.apply(t, e);
      }, function (e) {
        return e;
      }, function (e) {
        return _d2(e);
      });
    }

    var R = {
      normalize: function normalize(e) {
        return e.map(function (e) {
          return _d2(e) ? t.createVNode(t.Text, null, e, 0) : e;
        });
      },
      interpolate: function interpolate(e) {
        return e;
      },
      type: "vnode"
    };

    function D(e) {
      return i.value[e] || {};
    }

    Te++, n && (t.watch(n.locale, function (e) {
      a && (l.value = e, $.locale = e, se($, l.value, c.value));
    }), t.watch(n.fallbackLocale, function (e) {
      a && (c.value = e, $.fallbackLocale = e, se($, l.value, c.value));
    }));
    return _ref10 = {
      id: Te,
      locale: I,
      fallbackLocale: W,

      get inheritLocale() {
        return a;
      },

      set inheritLocale(e) {
        a = e, e && n && (l.value = n.locale.value, c.value = n.fallbackLocale.value, se($, l.value, c.value));
      },

      get availableLocales() {
        return Object.keys(i.value).sort();
      },

      messages: N,
      datetimeFormats: S,
      numberFormats: E,

      get modifiers() {
        return M;
      },

      get pluralRules() {
        return O || {};
      },

      get isGlobal() {
        return r;
      },

      get missingWarn() {
        return k;
      },

      set missingWarn(e) {
        k = e, $.missingWarn = k;
      },

      get fallbackWarn() {
        return _;
      },

      set fallbackWarn(e) {
        _ = e, $.fallbackWarn = _;
      },

      get fallbackRoot() {
        return y;
      },

      set fallbackRoot(e) {
        y = e;
      },

      get fallbackFormat() {
        return F;
      },

      set fallbackFormat(e) {
        F = e, $.fallbackFormat = F;
      },

      get warnHtmlMessage() {
        return P;
      },

      set warnHtmlMessage(e) {
        P = e, $.warnHtmlMessage = e;
      },

      get escapeParameter() {
        return C;
      },

      set escapeParameter(e) {
        C = e, $.escapeParameter = e;
      },

      t: H,
      rt: function rt() {
        for (var _len8 = arguments.length, e = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          e[_key8] = arguments[_key8];
        }

        var t = e[0],
            n = e[1],
            r = e[2];
        if (r && !h(r)) throw Error(15);
        return H(t, n, u({
          resolvedMessage: !0
        }, r || {}));
      },
      d: function d() {
        for (var _len9 = arguments.length, e = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          e[_key9] = arguments[_key9];
        }

        return j(function (t) {
          return ge.apply(void 0, [t].concat(e));
        }, function () {
          return de.apply(void 0, e);
        }, 0, function (t) {
          return t.d.apply(t, e);
        }, function () {
          return "";
        }, function (e) {
          return _d2(e);
        });
      },
      n: function n() {
        for (var _len10 = arguments.length, e = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          e[_key10] = arguments[_key10];
        }

        return j(function (t) {
          return he.apply(void 0, [t].concat(e));
        }, function () {
          return ke.apply(void 0, e);
        }, 0, function (t) {
          return t.n.apply(t, e);
        }, function () {
          return "";
        }, function (e) {
          return _d2(e);
        });
      },
      te: function te(e, t) {
        return null !== x(D(_d2(t) ? t : l.value), e);
      },
      tm: function tm(e) {
        var t = function (e) {
          var t = null;
          var n = ne($, c.value, l.value);

          for (var _r6 = 0; _r6 < n.length; _r6++) {
            var _a6 = x(i.value[n[_r6]] || {}, e);

            if (null != _a6) {
              t = _a6;
              break;
            }
          }

          return t;
        }(e);

        return null != t ? t : n && n.tm(e) || {};
      },
      getLocaleMessage: D,
      setLocaleMessage: function setLocaleMessage(e, t) {
        i.value[e] = t, $.messages = i.value;
      },
      mergeLocaleMessage: function mergeLocaleMessage(e, t) {
        i.value[e] = i.value[e] || {}, Me(t, i.value[e]), $.messages = i.value;
      },
      getDateTimeFormat: function getDateTimeFormat(e) {
        return f.value[e] || {};
      },
      setDateTimeFormat: function setDateTimeFormat(e, t) {
        f.value[e] = t, $.datetimeFormats = f.value, be($, e, t);
      },
      mergeDateTimeFormat: function mergeDateTimeFormat(e, t) {
        f.value[e] = u(f.value[e] || {}, t), $.datetimeFormats = f.value, be($, e, t);
      },
      getNumberFormat: function getNumberFormat(e) {
        return m.value[e] || {};
      },
      setNumberFormat: function setNumberFormat(e, t) {
        m.value[e] = t, $.numberFormats = m.value, _e($, e, t);
      },
      mergeNumberFormat: function mergeNumberFormat(e, t) {
        m.value[e] = u(m.value[e] || {}, t), $.numberFormats = m.value, _e($, e, t);
      },
      getPostTranslationHandler: function getPostTranslationHandler() {
        return g(T) ? T : null;
      },
      setPostTranslationHandler: function setPostTranslationHandler(e) {
        T = e, $.postTranslation = e;
      },
      getMissingHandler: function getMissingHandler() {
        return L;
      },
      setMissingHandler: function setMissingHandler(e) {
        null !== e && (w = xe(e)), L = e, $.missing = w;
      }
    }, _defineProperty(_ref10, ye, function () {
      for (var _len11 = arguments.length, e = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        e[_key11] = arguments[_key11];
      }

      return j(function (t) {
        var n;
        var r = t;

        try {
          r.processor = R, n = fe.apply(void 0, [r].concat(e));
        } finally {
          r.processor = null;
        }

        return n;
      }, function () {
        return pe.apply(void 0, e);
      }, 0, function (t) {
        return t[ye].apply(t, e);
      }, function (e) {
        return [t.createVNode(t.Text, null, e, 0)];
      }, function (e) {
        return p(e);
      });
    }), _defineProperty(_ref10, Le, function () {
      for (var _len12 = arguments.length, e = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        e[_key12] = arguments[_key12];
      }

      return j(function (t) {
        return he.apply(void 0, [t].concat(e));
      }, function () {
        return ke.apply(void 0, e);
      }, 0, function (t) {
        return t[Le].apply(t, e);
      }, function () {
        return [];
      }, function (e) {
        return _d2(e) || p(e);
      });
    }), _defineProperty(_ref10, Fe, function () {
      for (var _len13 = arguments.length, e = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        e[_key13] = arguments[_key13];
      }

      return j(function (t) {
        return ge.apply(void 0, [t].concat(e));
      }, function () {
        return de.apply(void 0, e);
      }, 0, function (t) {
        return t[Fe].apply(t, e);
      }, function () {
        return [];
      }, function (e) {
        return _d2(e) || p(e);
      });
    }), _defineProperty(_ref10, we, function (e) {
      O = e, $.pluralRules = O;
    }), _ref10;
  }

  function Oe() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _t13 = $e(function (e) {
      var t = _d2(e.locale) ? e.locale : "en-US",
          n = _d2(e.fallbackLocale) || p(e.fallbackLocale) || v(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : t,
          r = g(e.missing) ? e.missing : void 0,
          a = !b(e.silentTranslationWarn) && !s(e.silentTranslationWarn) || !e.silentTranslationWarn,
          o = !b(e.silentFallbackWarn) && !s(e.silentFallbackWarn) || !e.silentFallbackWarn,
          l = !b(e.fallbackRoot) || e.fallbackRoot,
          c = !!e.formatFallbackMessages,
          i = v(e.modifiers) ? e.modifiers : {},
          f = e.pluralizationRules,
          m = g(e.postTranslation) ? e.postTranslation : void 0,
          h = !_d2(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage,
          k = !!e.escapeParameterHtml,
          _ = !b(e.sync) || e.sync;

      var y = e.messages;

      if (v(e.sharedMessages)) {
        var _t12 = e.sharedMessages;
        y = Object.keys(_t12).reduce(function (e, n) {
          var r = e[n] || (e[n] = {});
          return u(r, _t12[n]), e;
        }, y || {});
      }

      var F = e.__i18n,
          L = e.__root;
      return {
        locale: t,
        fallbackLocale: n,
        messages: y,
        flatJson: e.flatJson,
        datetimeFormats: e.datetimeFormats,
        numberFormats: e.numberFormats,
        missing: r,
        missingWarn: a,
        fallbackWarn: o,
        fallbackRoot: l,
        fallbackFormat: c,
        modifiers: i,
        pluralRules: f,
        postTranslation: m,
        warnHtmlMessage: h,
        escapeParameter: k,
        inheritLocale: _,
        __i18n: F,
        __root: L
      };
    }(e)),
        n = {
      id: _t13.id,

      get locale() {
        return _t13.locale.value;
      },

      set locale(e) {
        _t13.locale.value = e;
      },

      get fallbackLocale() {
        return _t13.fallbackLocale.value;
      },

      set fallbackLocale(e) {
        _t13.fallbackLocale.value = e;
      },

      get messages() {
        return _t13.messages.value;
      },

      get datetimeFormats() {
        return _t13.datetimeFormats.value;
      },

      get numberFormats() {
        return _t13.numberFormats.value;
      },

      get availableLocales() {
        return _t13.availableLocales;
      },

      get formatter() {
        return {
          interpolate: function interpolate() {
            return [];
          }
        };
      },

      set formatter(e) {},

      get missing() {
        return _t13.getMissingHandler();
      },

      set missing(e) {
        _t13.setMissingHandler(e);
      },

      get silentTranslationWarn() {
        return b(_t13.missingWarn) ? !_t13.missingWarn : _t13.missingWarn;
      },

      set silentTranslationWarn(e) {
        _t13.missingWarn = b(e) ? !e : e;
      },

      get silentFallbackWarn() {
        return b(_t13.fallbackWarn) ? !_t13.fallbackWarn : _t13.fallbackWarn;
      },

      set silentFallbackWarn(e) {
        _t13.fallbackWarn = b(e) ? !e : e;
      },

      get modifiers() {
        return _t13.modifiers;
      },

      get formatFallbackMessages() {
        return _t13.fallbackFormat;
      },

      set formatFallbackMessages(e) {
        _t13.fallbackFormat = e;
      },

      get postTranslation() {
        return _t13.getPostTranslationHandler();
      },

      set postTranslation(e) {
        _t13.setPostTranslationHandler(e);
      },

      get sync() {
        return _t13.inheritLocale;
      },

      set sync(e) {
        _t13.inheritLocale = e;
      },

      get warnHtmlInMessage() {
        return _t13.warnHtmlMessage ? "warn" : "off";
      },

      set warnHtmlInMessage(e) {
        _t13.warnHtmlMessage = "off" !== e;
      },

      get escapeParameterHtml() {
        return _t13.escapeParameter;
      },

      set escapeParameterHtml(e) {
        _t13.escapeParameter = e;
      },

      get preserveDirectiveContent() {
        return !0;
      },

      set preserveDirectiveContent(e) {},

      get pluralizationRules() {
        return _t13.pluralRules || {};
      },

      __composer: _t13,
      t: function t() {
        for (var _len14 = arguments.length, e = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          e[_key14] = arguments[_key14];
        }

        var n = e[0],
            r = e[1],
            a = e[2],
            o = {};
        var s = null,
            l = null;
        if (!_d2(n)) throw Error(15);
        var c = n;
        return _d2(r) ? o.locale = r : p(r) ? s = r : v(r) && (l = r), p(a) ? s = a : v(a) && (l = a), _t13.t(c, s || l || {}, o);
      },
      rt: function rt() {
        return _t13.rt.apply(_t13, arguments);
      },
      tc: function tc() {
        for (var _len15 = arguments.length, e = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
          e[_key15] = arguments[_key15];
        }

        var n = e[0],
            r = e[1],
            a = e[2],
            s = {
          plural: 1
        };
        var l = null,
            c = null;
        if (!_d2(n)) throw Error(15);
        var u = n;
        return _d2(r) ? s.locale = r : o(r) ? s.plural = r : p(r) ? l = r : v(r) && (c = r), _d2(a) ? s.locale = a : p(a) ? l = a : v(a) && (c = a), _t13.t(u, l || c || {}, s);
      },
      te: function te(e, n) {
        return _t13.te(e, n);
      },
      tm: function tm(e) {
        return _t13.tm(e);
      },
      getLocaleMessage: function getLocaleMessage(e) {
        return _t13.getLocaleMessage(e);
      },
      setLocaleMessage: function setLocaleMessage(e, n) {
        _t13.setLocaleMessage(e, n);
      },
      mergeLocaleMessage: function mergeLocaleMessage(e, n) {
        _t13.mergeLocaleMessage(e, n);
      },
      d: function d() {
        return _t13.d.apply(_t13, arguments);
      },
      getDateTimeFormat: function getDateTimeFormat(e) {
        return _t13.getDateTimeFormat(e);
      },
      setDateTimeFormat: function setDateTimeFormat(e, n) {
        _t13.setDateTimeFormat(e, n);
      },
      mergeDateTimeFormat: function mergeDateTimeFormat(e, n) {
        _t13.mergeDateTimeFormat(e, n);
      },
      n: function n() {
        return _t13.n.apply(_t13, arguments);
      },
      getNumberFormat: function getNumberFormat(e) {
        return _t13.getNumberFormat(e);
      },
      setNumberFormat: function setNumberFormat(e, n) {
        _t13.setNumberFormat(e, n);
      },
      mergeNumberFormat: function mergeNumberFormat(e, n) {
        _t13.mergeNumberFormat(e, n);
      },
      getChoiceIndex: function getChoiceIndex(e, t) {
        return -1;
      },
      __onComponentInstanceCreated: function __onComponentInstanceCreated(t) {
        var r = e.componentInstanceCreatedListener;
        r && r(t, n);
      }
    };

    return n;
  }

  var Ie = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: function validator(e) {
        return "parent" === e || "global" === e;
      },
      "default": "parent"
    },
    i18n: {
      type: Object
    }
  },
      We = {
    name: "i18n-t",
    props: u({
      keypath: {
        type: String,
        required: !0
      },
      plural: {
        type: [Number, String],
        validator: function validator(e) {
          return o(e) || !isNaN(e);
        }
      }
    }, Ie),
    setup: function setup(e, n) {
      var r = n.slots,
          a = n.attrs,
          o = e.i18n || Ae({
        useScope: e.scope
      }),
          s = Object.keys(r).filter(function (e) {
        return "_" !== e;
      });
      return function () {
        var r = {};
        e.locale && (r.locale = e.locale), void 0 !== e.plural && (r.plural = _d2(e.plural) ? +e.plural : e.plural);

        var l = function (_ref11, t) {
          var e = _ref11.slots;
          return 1 === t.length && "default" === t[0] ? e["default"] ? e["default"]() : [] : t.reduce(function (t, n) {
            var r = e[n];
            return r && (t[n] = r()), t;
          }, {});
        }(n, s),
            c = o[ye](e.keypath, l, r),
            i = u({}, a);

        return _d2(e.tag) || h(e.tag) ? t.h(e.tag, i, c) : t.h(t.Fragment, i, c);
      };
    }
  };

  function Ne(e, n, r, a) {
    var o = n.slots,
        s = n.attrs;
    return function () {
      var n = {
        part: !0
      };
      var l = {};
      e.locale && (n.locale = e.locale), _d2(e.format) ? n.key = e.format : h(e.format) && (_d2(e.format.key) && (n.key = e.format.key), l = Object.keys(e.format).reduce(function (t, n) {
        return r.includes(n) ? u({}, t, _defineProperty({}, n, e.format[n])) : t;
      }, {}));
      var c = a(e.value, n, l);
      var i = [n.key];
      p(c) ? i = c.map(function (e, t) {
        var _n11;

        var n = o[e.type];
        return n ? n((_n11 = {}, _defineProperty(_n11, e.type, e.value), _defineProperty(_n11, "index", t), _defineProperty(_n11, "parts", c), _n11)) : [e.value];
      }) : _d2(c) && (i = [c]);
      var f = u({}, s);
      return _d2(e.tag) || h(e.tag) ? t.h(e.tag, f, i) : t.h(t.Fragment, f, i);
    };
  }

  var Se = ["localeMatcher", "style", "unit", "unitDisplay", "currency", "currencyDisplay", "useGrouping", "numberingSystem", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "notation", "formatMatcher"],
      Ee = {
    name: "i18n-n",
    props: u({
      value: {
        type: Number,
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, Ie),
    setup: function setup(e, t) {
      var n = e.i18n || Ae({
        useScope: "parent"
      });
      return Ne(e, t, Se, function () {
        return n[Le].apply(n, arguments);
      });
    }
  },
      je = ["dateStyle", "timeStyle", "fractionalSecondDigits", "calendar", "dayPeriod", "numberingSystem", "localeMatcher", "timeZone", "hour12", "hourCycle", "formatMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"],
      He = {
    name: "i18n-d",
    props: u({
      value: {
        type: [Number, Date],
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, Ie),
    setup: function setup(e, t) {
      var n = e.i18n || Ae({
        useScope: "parent"
      });
      return Ne(e, t, je, function () {
        return n[Fe].apply(n, arguments);
      });
    }
  };

  function Re(e) {
    var t = function t(_t14, _ref12) {
      var n = _ref12.instance,
          r = _ref12.value;
      if (!n || !n.$) throw Error(22);

      var a = function (e, t) {
        var n = e;
        if ("composition" === e.mode) return n.__getInstance(t) || e.global;
        {
          var _r7 = n.__getInstance(t);

          return null != _r7 ? _r7.__composer : e.global.__composer;
        }
      }(e, n.$),
          s = function (e) {
        if (_d2(e)) return {
          path: e
        };

        if (v(e)) {
          if (!("path" in e)) throw Error(19, "path");
          return e;
        }

        throw Error(20);
      }(r);

      _t14.textContent = a.t.apply(a, _toConsumableArray(function (e) {
        var t = e.path,
            n = e.locale,
            r = e.args,
            a = e.choice,
            s = e.plural,
            l = {},
            c = r || {};
        _d2(n) && (l.locale = n);
        o(a) && (l.plural = a);
        o(s) && (l.plural = s);
        return [t, c, l];
      }(s)));
    };

    return {
      beforeMount: t,
      beforeUpdate: t
    };
  }

  function De(e, t) {
    e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[we](t.pluralizationRules || e.pluralizationRules);
    var n = Pe(e.locale, {
      messages: t.messages,
      __i18n: t.__i18n
    });
    return Object.keys(n).forEach(function (t) {
      return e.mergeLocaleMessage(t, n[t]);
    }), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach(function (n) {
      return e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
    }), t.numberFormats && Object.keys(t.numberFormats).forEach(function (n) {
      return e.mergeNumberFormat(n, t.numberFormats[n]);
    }), e;
  }

  function Ae() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var n = t.getCurrentInstance();
    if (null == n) throw Error(16);
    if (!n.appContext.app.__VUE_I18N_SYMBOL__) throw Error(17);
    var r = t.inject(n.appContext.app.__VUE_I18N_SYMBOL__);
    if (!r) throw Error(22);
    var a = "composition" === r.mode ? r.global : r.global.__composer,
        o = l(e) ? "__i18n" in n.type ? "local" : "global" : e.useScope ? e.useScope : "local";

    if ("global" === o) {
      var _t15 = h(e.messages) ? e.messages : {};

      "__i18nGlobal" in n.type && (_t15 = Pe(a.locale.value, {
        messages: _t15,
        __i18n: n.type.__i18nGlobal
      }));

      var _r8 = Object.keys(_t15);

      if (_r8.length && _r8.forEach(function (e) {
        a.mergeLocaleMessage(e, _t15[e]);
      }), h(e.datetimeFormats)) {
        var _t16 = Object.keys(e.datetimeFormats);

        _t16.length && _t16.forEach(function (t) {
          a.mergeDateTimeFormat(t, e.datetimeFormats[t]);
        });
      }

      if (h(e.numberFormats)) {
        var _t17 = Object.keys(e.numberFormats);

        _t17.length && _t17.forEach(function (t) {
          a.mergeNumberFormat(t, e.numberFormats[t]);
        });
      }

      return a;
    }

    if ("parent" === o) {
      var _e11 = function (e, t) {
        var n = null;
        var r = t.root;
        var a = t.parent;

        for (; null != a;) {
          var _t18 = e;
          if ("composition" === e.mode) n = _t18.__getInstance(a);else {
            var _e12 = _t18.__getInstance(a);

            null != _e12 && (n = _e12.__composer);
          }
          if (null != n) break;
          if (r === a) break;
          a = a.parent;
        }

        return n;
      }(r, n);

      return null == _e11 && (_e11 = a), _e11;
    }

    if ("legacy" === r.mode) throw Error(18);
    var s = r;

    var c = s.__getInstance(n);

    if (null == c) {
      var _r9 = n.type,
          _o3 = u({}, e);

      _r9.__i18n && (_o3.__i18n = _r9.__i18n), a && (_o3.__root = a), c = $e(_o3), function (e, n, r) {
        t.onMounted(function () {}, n), t.onUnmounted(function () {
          e.__deleteInstance(n);
        }, n);
      }(s, n), s.__setInstance(n, c);
    }

    return c;
  }

  var Ue = ["locale", "fallbackLocale", "availableLocales"],
      ze = ["t", "rt", "d", "n", "tm"];
  return Q = function Q(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    {
      var _n12 = (t.onCacheKey || le)(e),
          _r10 = ce[_n12];

      if (_r10) return _r10;

      var _a7 = !1;

      var _o4 = t.onError || N;

      t.onError = function (e) {
        _a7 = !0, _o4(e);
      };

      var _Z = Z(e, t),
          _s2 = _Z.code,
          _l = new Function("return ".concat(_s2))();

      return _a7 ? _l : ce[_n12] = _l;
    }
  }, e.DatetimeFormat = He, e.NumberFormat = Ee, e.Translation = We, e.VERSION = ve, e.createI18n = function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var n = !b(e.legacy) || e.legacy,
        a = !!e.globalInjection,
        o = new Map(),
        s = n ? Oe(e) : $e(e),
        l = r(""),
        c = {
      get mode() {
        return n ? "legacy" : "composition";
      },

      install: function install(e) {
        var _len16,
            r,
            _key16,
            _args = arguments;

        return regeneratorRuntime.async(function install$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len16 = _args.length, r = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
                  r[_key16 - 1] = _args[_key16];
                }

                e.__VUE_I18N_SYMBOL__ = l, e.provide(e.__VUE_I18N_SYMBOL__, c), !n && a && function (e, n) {
                  var r = Object.create(null);
                  Ue.forEach(function (e) {
                    var a = Object.getOwnPropertyDescriptor(n, e);
                    if (!a) throw Error(22);
                    var o = t.isRef(a.value) ? {
                      get: function get() {
                        return a.value.value;
                      },
                      set: function set(e) {
                        a.value.value = e;
                      }
                    } : {
                      get: function get() {
                        return a.get && a.get();
                      }
                    };
                    Object.defineProperty(r, e, o);
                  }), e.config.globalProperties.$i18n = r, ze.forEach(function (t) {
                    var r = Object.getOwnPropertyDescriptor(n, t);
                    if (!r || !r.value) throw Error(22);
                    Object.defineProperty(e.config.globalProperties, "$".concat(t), r);
                  });
                }(e, c.global), function (e, t) {
                  var r = v(arguments.length <= 2 ? undefined : arguments[2]) ? arguments.length <= 2 ? undefined : arguments[2] : {},
                      a = !!r.useI18nComponentName;
                  (!b(r.globalInstall) || r.globalInstall) && (e.component(a ? "i18n" : We.name, We), e.component(Ee.name, Ee), e.component(He.name, He)), e.directive("t", Re(t));
                }.apply(void 0, [e, c].concat(r)), n && e.mixin(function (e, n, r) {
                  return {
                    beforeCreate: function beforeCreate() {
                      var _this = this;

                      var a = t.getCurrentInstance();
                      if (!a) throw Error(22);
                      var o = this.$options;

                      if (o.i18n) {
                        var _t19 = o.i18n;
                        o.__i18n && (_t19.__i18n = o.__i18n), _t19.__root = n, this.$i18n = this === this.$root ? De(e, _t19) : Oe(_t19);
                      } else this.$i18n = o.__i18n ? this === this.$root ? De(e, o) : Oe({
                        __i18n: o.__i18n,
                        __root: n
                      }) : e;

                      e.__onComponentInstanceCreated(this.$i18n), r.__setInstance(a, this.$i18n), this.$t = function () {
                        var _this$$i18n;

                        return (_this$$i18n = _this.$i18n).t.apply(_this$$i18n, arguments);
                      }, this.$rt = function () {
                        var _this$$i18n2;

                        return (_this$$i18n2 = _this.$i18n).rt.apply(_this$$i18n2, arguments);
                      }, this.$tc = function () {
                        var _this$$i18n3;

                        return (_this$$i18n3 = _this.$i18n).tc.apply(_this$$i18n3, arguments);
                      }, this.$te = function (e, t) {
                        return _this.$i18n.te(e, t);
                      }, this.$d = function () {
                        var _this$$i18n4;

                        return (_this$$i18n4 = _this.$i18n).d.apply(_this$$i18n4, arguments);
                      }, this.$n = function () {
                        var _this$$i18n5;

                        return (_this$$i18n5 = _this.$i18n).n.apply(_this$$i18n5, arguments);
                      }, this.$tm = function (e) {
                        return _this.$i18n.tm(e);
                      };
                    },
                    mounted: function mounted() {},
                    beforeUnmount: function beforeUnmount() {
                      var e = t.getCurrentInstance();
                      if (!e) throw Error(22);
                      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, r.__deleteInstance(e), delete this.$i18n;
                    }
                  };
                }(s, s.__composer, c));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        });
      },

      get global() {
        return s;
      },

      __instances: o,
      __getInstance: function __getInstance(e) {
        return o.get(e) || null;
      },
      __setInstance: function __setInstance(e, t) {
        o.set(e, t);
      },
      __deleteInstance: function __deleteInstance(e) {
        o["delete"](e);
      }
    };
    return c;
  }, e.useI18n = Ae, e.vTDirective = Re, Object.defineProperty(e, "__esModule", {
    value: !0
  }), e;
}({}, Vue);