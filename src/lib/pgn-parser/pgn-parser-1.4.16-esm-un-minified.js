/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@mliebelt/pgn-parser@1.4.16/lib/index.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
var t = { exports: {} };
!(function (t) {
    function n(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    }
    var r,
        e = { exports: {} };
    function u() {
        return (
            r ||
                ((r = 1),
                (function (t) {
                    !(function (n, r) {
                        t.exports && (t.exports = r());
                    })(0, function () {
                        function t(t, n) {
                            function r() {
                                this.constructor = t;
                            }
                            (r.prototype = n.prototype), (t.prototype = new r());
                        }
                        function n(t, r, e, u) {
                            var o = Error.call(this, t);
                            return Object.setPrototypeOf && Object.setPrototypeOf(o, n.prototype), (o.expected = r), (o.found = e), (o.location = u), (o.name = "SyntaxError"), o;
                        }
                        function r(t, n, r) {
                            return (r = r || " "), t.length > n ? t : ((n -= t.length), t + (r += r.repeat(n)).slice(0, n));
                        }
                        function e(t, r) {
                            var e,
                                u = {},
                                o = (r = void 0 !== r ? r : {}).grammarSource,
                                a = { pgn: Eh, tags: ul, game: el, games: rl },
                                i = Eh,
                                c = "\ufeff",
                                s = "Event",
                                f = "event",
                                l = "Site",
                                h = "site",
                                v = "Date",
                                p = "date",
                                m = "Round",
                                b = "round",
                                d = "White",
                                g = "white",
                                A = "Black",
                                C = "black",
                                k = "Result",
                                y = "result",
                                B = "WhiteTitle",
                                T = "Whitetitle",
                                E = "whitetitle",
                                W = "whiteTitle",
                                $ = "BlackTitle",
                                w = "Blacktitle",
                                x = "blacktitle",
                                O = "blackTitle",
                                U = "WhiteELO",
                                R = "WhiteElo",
                                S = "Whiteelo",
                                N = "whiteelo",
                                F = "whiteElo",
                                D = "BlackELO",
                                j = "BlackElo",
                                P = "Blackelo",
                                I = "blackelo",
                                V = "blackElo",
                                G = "WhiteUSCF",
                                M = "WhiteUscf",
                                Q = "Whiteuscf",
                                L = "whiteuscf",
                                Z = "whiteUscf",
                                K = "BlackUSCF",
                                _ = "BlackUscf",
                                Y = "Blackuscf",
                                q = "blackuscf",
                                z = "blackUscf",
                                H = "WhiteNA",
                                J = "WhiteNa",
                                X = "Whitena",
                                tt = "whitena",
                                nt = "whiteNa",
                                rt = "whiteNA",
                                et = "BlackNA",
                                ut = "BlackNa",
                                ot = "Blackna",
                                at = "blackna",
                                it = "blackNA",
                                ct = "blackNa",
                                st = "WhiteType",
                                ft = "Whitetype",
                                lt = "whitetype",
                                ht = "whiteType",
                                vt = "BlackType",
                                pt = "Blacktype",
                                mt = "blacktype",
                                bt = "blackType",
                                dt = "EventDate",
                                gt = "Eventdate",
                                At = "eventdate",
                                Ct = "eventDate",
                                kt = "EventSponsor",
                                yt = "Eventsponsor",
                                Bt = "eventsponsor",
                                Tt = "eventSponsor",
                                Et = "Section",
                                Wt = "section",
                                $t = "Stage",
                                wt = "stage",
                                xt = "Board",
                                Ot = "board",
                                Ut = "Opening",
                                Rt = "opening",
                                St = "Variation",
                                Nt = "variation",
                                Ft = "SubVariation",
                                Dt = "Subvariation",
                                jt = "subvariation",
                                Pt = "subVariation",
                                It = "ECO",
                                Vt = "Eco",
                                Gt = "eco",
                                Mt = "NIC",
                                Qt = "Nic",
                                Lt = "nic",
                                Zt = "Time",
                                Kt = "time",
                                _t = "UTCTime",
                                Yt = "UTCtime",
                                qt = "UtcTime",
                                zt = "Utctime",
                                Ht = "utctime",
                                Jt = "utcTime",
                                Xt = "UTCDate",
                                tn = "UTCdate",
                                nn = "UtcDate",
                                rn = "Utcdate",
                                en = "utcdate",
                                un = "utcDate",
                                on = "TimeControl",
                                an = "Timecontrol",
                                cn = "timecontrol",
                                sn = "timeControl",
                                fn = "SetUp",
                                ln = "Setup",
                                hn = "setup",
                                vn = "setUp",
                                pn = "FEN",
                                mn = "Fen",
                                bn = "fen",
                                dn = "Termination",
                                gn = "termination",
                                An = "Annotator",
                                Cn = "annotator",
                                kn = "Mode",
                                yn = "mode",
                                Bn = "PlyCount",
                                Tn = "Plycount",
                                En = "plycount",
                                Wn = "plyCount",
                                $n = "Variant",
                                wn = "variant",
                                xn = "WhiteRatingDiff",
                                On = "BlackRatingDiff",
                                Un = "WhiteFideId",
                                Rn = "BlackFideId",
                                Sn = "WhiteTeam",
                                Nn = "BlackTeam",
                                Fn = "Clock",
                                Dn = "WhiteClock",
                                jn = "BlackClock",
                                Pn = '"',
                                In = "\\",
                                Vn = ".",
                                Gn = ":",
                                Mn = "/",
                                Qn = "?",
                                Ln = "-",
                                Zn = "+",
                                Kn = "*",
                                _n = "1-0",
                                Yn = "0-1",
                                qn = "1/2-1/2",
                                zn = "1/2",
                                Hn = "=",
                                Jn = "%csl",
                                Xn = "%cal",
                                tr = "%",
                                nr = "%eval",
                                rr = "[%",
                                er = "}",
                                ur = ",",
                                or = "Y",
                                ar = "G",
                                ir = "R",
                                cr = "B",
                                sr = "O",
                                fr = "C",
                                lr = "{",
                                hr = "[",
                                vr = "]",
                                pr = ";",
                                mr = "clk",
                                br = "egt",
                                dr = "emt",
                                gr = "mct",
                                Ar = "(",
                                Cr = ")",
                                kr = " ",
                                yr = "e.p.",
                                Br = "O-O-O",
                                Tr = "O-O",
                                Er = "@",
                                Wr = "Z0",
                                $r = "+-",
                                wr = "$$$",
                                xr = "#",
                                Or = "$",
                                Ur = "!!",
                                Rr = "??",
                                Sr = "!?",
                                Nr = "?!",
                                Fr = "!",
                                Dr = "‼",
                                jr = "⁇",
                                Pr = "⁉",
                                Ir = "⁈",
                                Vr = "□",
                                Gr = "∞",
                                Mr = "⩲",
                                Qr = "⩱",
                                Lr = "±",
                                Zr = "∓",
                                Kr = "-+",
                                _r = "⨀",
                                Yr = "⟳",
                                qr = "→",
                                zr = "↑",
                                Hr = "⇆",
                                Jr = "D",
                                Xr = "x",
                                te = /^[ \t\n\r]/,
                                ne = /^[\n\r]/,
                                re = /^[\-a-zA-Z0-9_.]/,
                                ee = /^[^"\\\r\n]/,
                                ue = /^[0-9?]/,
                                oe = /^[0-9]/,
                                ae = /^[BNW]/,
                                ie = /^[^\n\r]/,
                                ce = /^[1-8a-h]/,
                                se = /^[RNBQKP]/,
                                fe = /^[RNBQ]/,
                                le = /^[a-h]/,
                                he = /^[1-8]/,
                                ve = /^[\-x]/,
                                pe = Kf("\ufeff", !1),
                                me = Kf("Event", !1),
                                be = Kf("event", !1),
                                de = Kf("Site", !1),
                                ge = Kf("site", !1),
                                Ae = Kf("Date", !1),
                                Ce = Kf("date", !1),
                                ke = Kf("Round", !1),
                                ye = Kf("round", !1),
                                Be = Kf("White", !1),
                                Te = Kf("white", !1),
                                Ee = Kf("Black", !1),
                                We = Kf("black", !1),
                                $e = Kf("Result", !1),
                                we = Kf("result", !1),
                                xe = Kf("WhiteTitle", !1),
                                Oe = Kf("Whitetitle", !1),
                                Ue = Kf("whitetitle", !1),
                                Re = Kf("whiteTitle", !1),
                                Se = Kf("BlackTitle", !1),
                                Ne = Kf("Blacktitle", !1),
                                Fe = Kf("blacktitle", !1),
                                De = Kf("blackTitle", !1),
                                je = Kf("WhiteELO", !1),
                                Pe = Kf("WhiteElo", !1),
                                Ie = Kf("Whiteelo", !1),
                                Ve = Kf("whiteelo", !1),
                                Ge = Kf("whiteElo", !1),
                                Me = Kf("BlackELO", !1),
                                Qe = Kf("BlackElo", !1),
                                Le = Kf("Blackelo", !1),
                                Ze = Kf("blackelo", !1),
                                Ke = Kf("blackElo", !1),
                                _e = Kf("WhiteUSCF", !1),
                                Ye = Kf("WhiteUscf", !1),
                                qe = Kf("Whiteuscf", !1),
                                ze = Kf("whiteuscf", !1),
                                He = Kf("whiteUscf", !1),
                                Je = Kf("BlackUSCF", !1),
                                Xe = Kf("BlackUscf", !1),
                                tu = Kf("Blackuscf", !1),
                                nu = Kf("blackuscf", !1),
                                ru = Kf("blackUscf", !1),
                                eu = Kf("WhiteNA", !1),
                                uu = Kf("WhiteNa", !1),
                                ou = Kf("Whitena", !1),
                                au = Kf("whitena", !1),
                                iu = Kf("whiteNa", !1),
                                cu = Kf("whiteNA", !1),
                                su = Kf("BlackNA", !1),
                                fu = Kf("BlackNa", !1),
                                lu = Kf("Blackna", !1),
                                hu = Kf("blackna", !1),
                                vu = Kf("blackNA", !1),
                                pu = Kf("blackNa", !1),
                                mu = Kf("WhiteType", !1),
                                bu = Kf("Whitetype", !1),
                                du = Kf("whitetype", !1),
                                gu = Kf("whiteType", !1),
                                Au = Kf("BlackType", !1),
                                Cu = Kf("Blacktype", !1),
                                ku = Kf("blacktype", !1),
                                yu = Kf("blackType", !1),
                                Bu = Kf("EventDate", !1),
                                Tu = Kf("Eventdate", !1),
                                Eu = Kf("eventdate", !1),
                                Wu = Kf("eventDate", !1),
                                $u = Kf("EventSponsor", !1),
                                wu = Kf("Eventsponsor", !1),
                                xu = Kf("eventsponsor", !1),
                                Ou = Kf("eventSponsor", !1),
                                Uu = Kf("Section", !1),
                                Ru = Kf("section", !1),
                                Su = Kf("Stage", !1),
                                Nu = Kf("stage", !1),
                                Fu = Kf("Board", !1),
                                Du = Kf("board", !1),
                                ju = Kf("Opening", !1),
                                Pu = Kf("opening", !1),
                                Iu = Kf("Variation", !1),
                                Vu = Kf("variation", !1),
                                Gu = Kf("SubVariation", !1),
                                Mu = Kf("Subvariation", !1),
                                Qu = Kf("subvariation", !1),
                                Lu = Kf("subVariation", !1),
                                Zu = Kf("ECO", !1),
                                Ku = Kf("Eco", !1),
                                _u = Kf("eco", !1),
                                Yu = Kf("NIC", !1),
                                qu = Kf("Nic", !1),
                                zu = Kf("nic", !1),
                                Hu = Kf("Time", !1),
                                Ju = Kf("time", !1),
                                Xu = Kf("UTCTime", !1),
                                to = Kf("UTCtime", !1),
                                no = Kf("UtcTime", !1),
                                ro = Kf("Utctime", !1),
                                eo = Kf("utctime", !1),
                                uo = Kf("utcTime", !1),
                                oo = Kf("UTCDate", !1),
                                ao = Kf("UTCdate", !1),
                                io = Kf("UtcDate", !1),
                                co = Kf("Utcdate", !1),
                                so = Kf("utcdate", !1),
                                fo = Kf("utcDate", !1),
                                lo = Kf("TimeControl", !1),
                                ho = Kf("Timecontrol", !1),
                                vo = Kf("timecontrol", !1),
                                po = Kf("timeControl", !1),
                                mo = Kf("SetUp", !1),
                                bo = Kf("Setup", !1),
                                go = Kf("setup", !1),
                                Ao = Kf("setUp", !1),
                                Co = Kf("FEN", !1),
                                ko = Kf("Fen", !1),
                                yo = Kf("fen", !1),
                                Bo = Kf("Termination", !1),
                                To = Kf("termination", !1),
                                Eo = Kf("Annotator", !1),
                                Wo = Kf("annotator", !1),
                                $o = Kf("Mode", !1),
                                wo = Kf("mode", !1),
                                xo = Kf("PlyCount", !1),
                                Oo = Kf("Plycount", !1),
                                Uo = Kf("plycount", !1),
                                Ro = Kf("plyCount", !1),
                                So = Kf("Variant", !1),
                                No = Kf("variant", !1),
                                Fo = Kf("WhiteRatingDiff", !1),
                                Do = Kf("BlackRatingDiff", !1),
                                jo = Kf("WhiteFideId", !1),
                                Po = Kf("BlackFideId", !1),
                                Io = Kf("WhiteTeam", !1),
                                Vo = Kf("BlackTeam", !1),
                                Go = Kf("Clock", !1),
                                Mo = Kf("WhiteClock", !1),
                                Qo = Kf("BlackClock", !1),
                                Lo = zf("whitespace"),
                                Zo = _f([" ", "\t", "\n", "\r"], !1, !1),
                                Ko = _f(["\n", "\r"], !1, !1),
                                _o = _f(["-", ["a", "z"], ["A", "Z"], ["0", "9"], "_", "."], !1, !1),
                                Yo = Kf('"', !1),
                                qo = _f(['"', "\\", "\r", "\n"], !0, !1),
                                zo = Kf("\\", !1),
                                Ho = _f([["0", "9"], "?"], !1, !1),
                                Jo = Kf(".", !1),
                                Xo = _f([["0", "9"]], !1, !1),
                                ta = Kf(":", !1),
                                na = Kf("/", !1),
                                ra = _f(["B", "N", "W"], !1, !1),
                                ea = Kf("?", !1),
                                ua = Kf("-", !1),
                                oa = Kf("+", !1),
                                aa = Kf("*", !1),
                                ia = Kf("1-0", !1),
                                ca = Kf("0-1", !1),
                                sa = Kf("1/2-1/2", !1),
                                fa = Kf("1/2", !1),
                                la = Kf("=", !1),
                                ha = Kf("%csl", !1),
                                va = Kf("%cal", !1),
                                pa = Kf("%", !1),
                                ma = Kf("%eval", !1),
                                ba = Kf("[%", !1),
                                da = Kf("}", !1),
                                ga = Yf(),
                                Aa = _f(["\n", "\r"], !0, !1),
                                Ca = Kf(",", !1),
                                ka = Kf("Y", !1),
                                ya = Kf("G", !1),
                                Ba = Kf("R", !1),
                                Ta = Kf("B", !1),
                                Ea = Kf("O", !1),
                                Wa = Kf("C", !1),
                                $a = Kf("{", !1),
                                wa = Kf("[", !1),
                                xa = Kf("]", !1),
                                Oa = Kf(";", !1),
                                Ua = Kf("clk", !1),
                                Ra = Kf("egt", !1),
                                Sa = Kf("emt", !1),
                                Na = Kf("mct", !1),
                                Fa = Kf("(", !1),
                                Da = Kf(")", !1),
                                ja = zf("integer"),
                                Pa = Kf(" ", !1),
                                Ia = Kf("e.p.", !1),
                                Va = Kf("O-O-O", !1),
                                Ga = Kf("O-O", !1),
                                Ma = Kf("@", !1),
                                Qa = Kf("Z0", !1),
                                La = Kf("+-", !1),
                                Za = Kf("$$$", !1),
                                Ka = Kf("#", !1),
                                _a = Kf("$", !1),
                                Ya = Kf("!!", !1),
                                qa = Kf("??", !1),
                                za = Kf("!?", !1),
                                Ha = Kf("?!", !1),
                                Ja = Kf("!", !1),
                                Xa = Kf("‼", !1),
                                ti = Kf("⁇", !1),
                                ni = Kf("⁉", !1),
                                ri = Kf("⁈", !1),
                                ei = Kf("□", !1),
                                ui = Kf("∞", !1),
                                oi = Kf("⩲", !1),
                                ai = Kf("⩱", !1),
                                ii = Kf("±", !1),
                                ci = Kf("∓", !1),
                                si = Kf("-+", !1),
                                fi = Kf("⨀", !1),
                                li = Kf("⟳", !1),
                                hi = Kf("→", !1),
                                vi = Kf("↑", !1),
                                pi = Kf("⇆", !1),
                                mi = Kf("D", !1),
                                bi = _f(
                                    [
                                        ["1", "8"],
                                        ["a", "h"],
                                    ],
                                    !1,
                                    !1
                                ),
                                di = _f(["R", "N", "B", "Q", "K", "P"], !1, !1),
                                gi = _f(["R", "N", "B", "Q"], !1, !1),
                                Ai = _f([["a", "h"]], !1, !1),
                                Ci = _f([["1", "8"]], !1, !1),
                                ki = Kf("x", !1),
                                yi = _f(["-", "x"], !1, !1),
                                Bi = function (t, n) {
                                    return n;
                                },
                                Ti = function (t, n) {
                                    return [t].concat(n);
                                },
                                Ei = function (t) {
                                    return t;
                                },
                                Wi = function (t, n, r) {
                                    var e = Av;
                                    return (Av = []), { tags: t, gameComment: n, moves: r, messages: e };
                                },
                                $i = function (t, n) {
                                    return n;
                                },
                                wi = function (t, n) {
                                    var r = {};
                                    return (
                                        [t].concat(n).forEach(function (t) {
                                            r[t.name] = t.value;
                                        }),
                                        r
                                    );
                                },
                                xi = function (t) {
                                    return null === t ? {} : ((t.messages = Av), t);
                                },
                                Oi = function (t) {
                                    return t;
                                },
                                Ui = function (t) {
                                    return { name: "Event", value: t };
                                },
                                Ri = function (t) {
                                    return { name: "Site", value: t };
                                },
                                Si = function (t) {
                                    return { name: "Date", value: t };
                                },
                                Ni = function (t) {
                                    return { name: "Round", value: t };
                                },
                                Fi = function (t) {
                                    return { name: "WhiteTitle", value: t };
                                },
                                Di = function (t) {
                                    return { name: "BlackTitle", value: t };
                                },
                                ji = function (t) {
                                    return { name: "WhiteElo", value: t };
                                },
                                Pi = function (t) {
                                    return { name: "BlackElo", value: t };
                                },
                                Ii = function (t) {
                                    return { name: "WhiteUSCF", value: t };
                                },
                                Vi = function (t) {
                                    return { name: "BlackUSCF", value: t };
                                },
                                Gi = function (t) {
                                    return { name: "WhiteNA", value: t };
                                },
                                Mi = function (t) {
                                    return { name: "BlackNA", value: t };
                                },
                                Qi = function (t) {
                                    return { name: "WhiteType", value: t };
                                },
                                Li = function (t) {
                                    return { name: "BlackType", value: t };
                                },
                                Zi = function (t) {
                                    return { name: "White", value: t };
                                },
                                Ki = function (t) {
                                    return { name: "Black", value: t };
                                },
                                _i = function (t) {
                                    return { name: "Result", value: t };
                                },
                                Yi = function (t) {
                                    return { name: "EventDate", value: t };
                                },
                                qi = function (t) {
                                    return { name: "EventSponsor", value: t };
                                },
                                zi = function (t) {
                                    return { name: "Section", value: t };
                                },
                                Hi = function (t) {
                                    return { name: "Stage", value: t };
                                },
                                Ji = function (t) {
                                    return { name: "Board", value: t };
                                },
                                Xi = function (t) {
                                    return { name: "Opening", value: t };
                                },
                                tc = function (t) {
                                    return { name: "Variation", value: t };
                                },
                                nc = function (t) {
                                    return { name: "SubVariation", value: t };
                                },
                                rc = function (t) {
                                    return { name: "ECO", value: t };
                                },
                                ec = function (t) {
                                    return { name: "NIC", value: t };
                                },
                                uc = function (t) {
                                    return { name: "Time", value: t };
                                },
                                oc = function (t) {
                                    return { name: "UTCTime", value: t };
                                },
                                ac = function (t) {
                                    return { name: "UTCDate", value: t };
                                },
                                ic = function (t) {
                                    return { name: "TimeControl", value: t };
                                },
                                cc = function (t) {
                                    return { name: "SetUp", value: t };
                                },
                                sc = function (t) {
                                    return { name: "FEN", value: t };
                                },
                                fc = function (t) {
                                    return { name: "Termination", value: t };
                                },
                                lc = function (t) {
                                    return { name: "Annotator", value: t };
                                },
                                hc = function (t) {
                                    return { name: "Mode", value: t };
                                },
                                vc = function (t) {
                                    return { name: "PlyCount", value: t };
                                },
                                pc = function (t) {
                                    return { name: "Variant", value: t };
                                },
                                mc = function (t) {
                                    return { name: "WhiteRatingDiff", value: t };
                                },
                                bc = function (t) {
                                    return { name: "BlackRatingDiff", value: t };
                                },
                                dc = function (t) {
                                    return { name: "WhiteFideId", value: t };
                                },
                                gc = function (t) {
                                    return { name: "BlackFideId", value: t };
                                },
                                Ac = function (t) {
                                    return { name: "WhiteTeam", value: t };
                                },
                                Cc = function (t) {
                                    return { name: "BlackTeam", value: t };
                                },
                                kc = function (t) {
                                    return { name: "Clock", value: t };
                                },
                                yc = function (t) {
                                    return { name: "WhiteClock", value: t };
                                },
                                Bc = function (t) {
                                    return { name: "BlackClock", value: t };
                                },
                                Tc = function (t, n) {
                                    return Cv({ key: t, value: n, message: `Format of tag: "${t}" not correct: "${n}"` }), { name: t, value: n };
                                },
                                Ec = function (t, n) {
                                    return Cv({ key: t, value: n, message: `Tag: "${t}" not known: "${n}"` }), { name: t, value: n };
                                },
                                Wc = function (t) {
                                    return t.join("");
                                },
                                $c = function (t) {
                                    return t.map((t) => t.char || t).join("");
                                },
                                wc = function () {
                                    return { type: "char", char: "\\" };
                                },
                                xc = function () {
                                    return { type: "char", char: '"' };
                                },
                                Oc = function (t) {
                                    return t;
                                },
                                Uc = function (t, n, r) {
                                    return { value: t.join("") + "." + n.join("") + "." + r.join(""), year: yv(t), month: yv(n), day: yv(r) };
                                },
                                Rc = function (t, n, r, e) {
                                    let u = t.join("") + ":" + n.join("") + ":" + r.join(""),
                                        o = 0;
                                    return e && ((u = u + "." + e), Cv({ message: `Unusual use of millis in time: ${u}` }), yv(e)), { value: u, hour: yv(t), minute: yv(n), second: yv(r), millis: o };
                                },
                                Sc = function (t) {
                                    return t.join("");
                                },
                                Nc = function (t) {
                                    return t;
                                },
                                Fc = function (t, n) {
                                    return t + "/" + n;
                                },
                                Dc = function (t) {
                                    return t;
                                },
                                jc = function (t) {
                                    return t;
                                },
                                Pc = function (t) {
                                    return t || (Cv({ message: "Tag TimeControl has to have a value" }), "");
                                },
                                Ic = function (t, n) {
                                    return n;
                                },
                                Vc = function (t, n) {
                                    let r = [t].concat(n);
                                    return (r.value = r.map((t) => t.value).join(":")), r;
                                },
                                Gc = function (t) {
                                    return t;
                                },
                                Mc = function () {
                                    return { kind: "unknown", value: "?" };
                                },
                                Qc = function () {
                                    return { kind: "unlimited", value: "-" };
                                },
                                Lc = function (t, n, r) {
                                    return { kind: "movesInSecondsIncrement", moves: t, seconds: n, increment: r, value: t + "/" + n + "+" + r };
                                },
                                Zc = function (t, n) {
                                    return { kind: "movesInSeconds", moves: t, seconds: n, value: t + "/" + n };
                                },
                                Kc = function (t, n) {
                                    return { kind: "increment", seconds: t, increment: n, value: t + "+" + n };
                                },
                                _c = function (t) {
                                    return { kind: "suddenDeath", seconds: t, value: "" + t };
                                },
                                Yc = function (t) {
                                    return { kind: "hourglass", seconds: t, value: "*" + t };
                                },
                                qc = function (t) {
                                    return t;
                                },
                                zc = function (t) {
                                    return t;
                                },
                                Hc = function (t) {
                                    return t;
                                },
                                Jc = function (t) {
                                    return t;
                                },
                                Xc = function () {
                                    return "1/2-1/2";
                                },
                                ts = function (t) {
                                    return t;
                                },
                                ns = function (t) {
                                    return t;
                                },
                                rs = function () {
                                    return 0;
                                },
                                es = function () {
                                    return Cv({ message: 'Use "-" for an unknown value' }), 0;
                                },
                                us = function (t) {
                                    return kv(t);
                                },
                                os = function (t, n, r, e, u, o, a, i) {
                                    var c = i || [],
                                        s = {};
                                    return (
                                        (s.moveNumber = n),
                                        (s.notation = r),
                                        o && (s.commentAfter = o.comment),
                                        t && (s.commentMove = t.comment),
                                        u && (s.drawOffer = !0),
                                        (s.variations = a || []),
                                        (s.nag = e || null),
                                        c.unshift(s),
                                        (s.commentDiag = o),
                                        c
                                    );
                                },
                                as = function (t) {
                                    return t;
                                },
                                is = function (t) {
                                    return [t];
                                },
                                cs = function (t, n) {
                                    return n;
                                },
                                ss = function (t, n) {
                                    return Bv([t].concat(n));
                                },
                                fs = function () {},
                                ls = function (t) {
                                    return t;
                                },
                                hs = function (t) {
                                    return { comment: t };
                                },
                                vs = function (t, n) {
                                    return n;
                                },
                                ps = function (t, n) {
                                    return Bv([{ colorFields: t }].concat(n[0]));
                                },
                                ms = function (t, n) {
                                    return n;
                                },
                                bs = function (t, n) {
                                    return Bv([{ colorArrows: t }].concat(n[0]));
                                },
                                ds = function (t, n, r) {
                                    return r;
                                },
                                gs = function (t, n, r) {
                                    var e = {};
                                    return (e[t] = n), Bv([e].concat(r[0]));
                                },
                                As = function (t, n, r) {
                                    return r;
                                },
                                Cs = function (t, n, r) {
                                    var e = {};
                                    return (e[t] = n), Bv([e].concat(r[0]));
                                },
                                ks = function (t, n) {
                                    return n;
                                },
                                ys = function (t, n) {
                                    var r = {};
                                    return (r.eval = parseFloat(t)), Bv([r].concat(n[0]));
                                },
                                Bs = function (t, n, r) {
                                    return r;
                                },
                                Ts = function (t, n, r) {
                                    var e = {};
                                    return (e[t] = n.join("")), Bv([e].concat(r[0]));
                                },
                                Es = function (t, n) {
                                    return n;
                                },
                                Ws = function (t, n) {
                                    return n.length > 0 ? Bv([{ comment: Ev(t.join("")) }].concat(Tv(n[0]))) : { comment: t.join("") };
                                },
                                $s = function (t) {
                                    return t;
                                },
                                ws = function (t) {
                                    return t;
                                },
                                xs = function (t) {
                                    return t.join("");
                                },
                                Os = function (t, n) {
                                    var r = [];
                                    r.push(t);
                                    for (var e = 0; e < n.length; e++) r.push(n[e][2]);
                                    return r;
                                },
                                Us = function (t, n) {
                                    return t + n;
                                },
                                Rs = function (t, n) {
                                    var r = [];
                                    r.push(t);
                                    for (var e = 0; e < n.length; e++) r.push(n[e][2]);
                                    return r;
                                },
                                Ss = function (t, n, r) {
                                    return t + n + r;
                                },
                                Ns = function () {
                                    return "Y";
                                },
                                Fs = function () {
                                    return "G";
                                },
                                Ds = function () {
                                    return "R";
                                },
                                js = function () {
                                    return "B";
                                },
                                Ps = function () {
                                    return "O";
                                },
                                Is = function () {
                                    return "C";
                                },
                                Vs = function (t, n) {
                                    return t + n;
                                },
                                Gs = function () {
                                    return "clk";
                                },
                                Ms = function () {
                                    return "egt";
                                },
                                Qs = function () {
                                    return "emt";
                                },
                                Ls = function () {
                                    return "mct";
                                },
                                Zs = function (t, n, r, e) {
                                    let u = n;
                                    return (
                                        t ? (u = t + u) : Cv({ message: "Hours and minutes missing" }),
                                        t && 2 == (t.match(/:/g) || []).length && 2 == t.search(":") && Cv({ message: "Only 1 digit for hours normally used" }),
                                        r ? (u += r) : Cv({ message: "Only 2 digit for seconds normally used" }),
                                        e && (Cv({ message: "Unusual use of millis in clock value" }), (u += "." + e)),
                                        u
                                    );
                                },
                                Ks = function (t, n, r) {
                                    let e = n;
                                    return (
                                        t ? (e = t + e) : Cv({ message: "Hours and minutes missing" }),
                                        t && 2 == (t.match(/:/g) || []).length && 1 == t.search(":") && Cv({ message: "Only 2 digits for hours normally used" }),
                                        r ? (e += r) : Cv({ message: "Only 2 digit for seconds normally used" }),
                                        e
                                    );
                                },
                                _s = function (t, n) {
                                    return n ? t + n : (Cv({ message: "No hours found" }), t);
                                },
                                Ys = function (t, n) {
                                    let r = t;
                                    return (r += n ? n + ":" : ":"), r;
                                },
                                qs = function (t, n) {
                                    let r = t;
                                    return n ? (r += n + ":") : ((r += ":"), Cv({ message: "Only 2 digits for minutes normally used" })), r;
                                },
                                zs = function (t) {
                                    return t;
                                },
                                Hs = function (t, n) {
                                    var r = n || [];
                                    return r.unshift(t), r;
                                },
                                Js = function (t) {
                                    return t;
                                },
                                Xs = function (t) {
                                    return kv(t);
                                },
                                tf = function () {
                                    return "";
                                },
                                nf = function (t, n, r, e, u, o, a) {
                                    var i = {};
                                    return (
                                        (i.fig = t || null),
                                        (i.disc = n || null),
                                        (i.strike = r || null),
                                        (i.col = e),
                                        (i.row = u),
                                        (i.check = a || null),
                                        (i.promotion = o),
                                        (i.notation = (t || "") + (n || "") + (r || "") + e + u + (o || "") + (a || "")),
                                        i
                                    );
                                },
                                rf = function (t, n, r, e, u, o, a, i) {
                                    var c = {};
                                    return (
                                        (c.fig = t || null),
                                        (c.strike = "x" == e ? e : null),
                                        (c.col = u),
                                        (c.row = o),
                                        (c.notation = (t && "P" !== t ? t : "") + n + r + ("x" == e ? e : "-") + u + o + (a || "") + (i || "")),
                                        (c.check = i || null),
                                        (c.promotion = a),
                                        c
                                    );
                                },
                                ef = function (t, n, r, e, u, o) {
                                    var a = {};
                                    return (a.fig = t || null), (a.strike = n || null), (a.col = r), (a.row = e), (a.check = o || null), (a.promotion = u), (a.notation = (t || "") + (n || "") + r + e + (u || "") + (o || "")), a;
                                },
                                uf = function (t) {
                                    var n = {};
                                    return (n.notation = "O-O-O" + (t || "")), (n.check = t || null), n;
                                },
                                of = function (t) {
                                    var n = {};
                                    return (n.notation = "O-O" + (t || "")), (n.check = t || null), n;
                                },
                                af = function (t, n, r) {
                                    var e = {};
                                    return (e.fig = t), (e.drop = !0), (e.col = n), (e.row = r), (e.notation = t + "@" + n + r), e;
                                },
                                cf = function () {
                                    var t = { notation: "Z0" };
                                    return t;
                                },
                                sf = function (t) {
                                    return t[1];
                                },
                                ff = function (t) {
                                    return t[1];
                                },
                                lf = function (t) {
                                    return "=" + t;
                                },
                                hf = function (t, n) {
                                    var r = n || [];
                                    return r.unshift(t), r;
                                },
                                vf = function (t) {
                                    return "$" + t;
                                },
                                pf = function () {
                                    return "$3";
                                },
                                mf = function () {
                                    return "$4";
                                },
                                bf = function () {
                                    return "$5";
                                },
                                df = function () {
                                    return "$6";
                                },
                                gf = function () {
                                    return "$1";
                                },
                                Af = function () {
                                    return "$2";
                                },
                                Cf = function () {
                                    return "$3";
                                },
                                kf = function () {
                                    return "$4";
                                },
                                yf = function () {
                                    return "$5";
                                },
                                Bf = function () {
                                    return "$6";
                                },
                                Tf = function () {
                                    return "$7";
                                },
                                Ef = function () {
                                    return "$10";
                                },
                                Wf = function () {
                                    return "$13";
                                },
                                $f = function () {
                                    return "$14";
                                },
                                wf = function () {
                                    return "$15";
                                },
                                xf = function () {
                                    return "$16";
                                },
                                Of = function () {
                                    return "$17";
                                },
                                Uf = function () {
                                    return "$18";
                                },
                                Rf = function () {
                                    return "$19";
                                },
                                Sf = function () {
                                    return "$22";
                                },
                                Nf = function () {
                                    return "$32";
                                },
                                Ff = function () {
                                    return "$36";
                                },
                                Df = function () {
                                    return "$40";
                                },
                                jf = function () {
                                    return "$132";
                                },
                                Pf = function () {
                                    return "$220";
                                },
                                If = 0 | r.peg$currPos,
                                Vf = If,
                                Gf = [{ line: 1, column: 1 }],
                                Mf = If,
                                Qf = r.peg$maxFailExpected || [],
                                Lf = 0 | r.peg$silentFails;
                            if (r.startRule) {
                                if (!(r.startRule in a)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
                                i = a[r.startRule];
                            }
                            function Zf() {
                                return Jf(Vf, If);
                            }
                            function Kf(t, n) {
                                return { type: "literal", text: t, ignoreCase: n };
                            }
                            function _f(t, n, r) {
                                return { type: "class", parts: t, inverted: n, ignoreCase: r };
                            }
                            function Yf() {
                                return { type: "any" };
                            }
                            function qf() {
                                return { type: "end" };
                            }
                            function zf(t) {
                                return { type: "other", description: t };
                            }
                            function Hf(n) {
                                var r,
                                    e = Gf[n];
                                if (e) return e;
                                if (n >= Gf.length) r = Gf.length - 1;
                                else for (r = n; !Gf[--r]; );
                                for (e = { line: (e = Gf[r]).line, column: e.column }; r < n; ) 10 === t.charCodeAt(r) ? (e.line++, (e.column = 1)) : e.column++, r++;
                                return (Gf[n] = e), e;
                            }
                            function Jf(t, n, r) {
                                var e = Hf(t),
                                    u = Hf(n);
                                return { source: o, start: { offset: t, line: e.line, column: e.column }, end: { offset: n, line: u.line, column: u.column } };
                            }
                            function Xf(t) {
                                If < Mf || (If > Mf && ((Mf = If), (Qf = [])), Qf.push(t));
                            }
                            function tl(t, r, e, text, location) {  // Customized line
                                // Customized start
                                let textlength = 22;
                                let cleaned = text.replaceAll('\r\n','  ').replaceAll('\n',' ')
                                let errorlocation = 'Approximate location of error:\n';
                                errorlocation += cleaned.substring((location-textlength),(location+textlength+1))+'\n';
                                errorlocation += ' '.repeat(textlength) + '^';
                                
                                e.errorHint = errorlocation;
                               
                                let error = new n(n.buildMessage(t, r), t, r, e);
                                error.errorHint = errorlocation;
                                return error;
                                // Customized end
                                // return new n(n.buildMessage(t, r), t, r, e); // Original line
                            }
                            function nl() {
                                var n;
                                return 65279 === t.charCodeAt(If) ? ((n = c), If++) : ((n = u), 0 === Lf && Xf(pe)), n;
                            }
                            function rl() {
                                var t, n, r, e, o, a;
                                if (((t = If), nl(), nh(), (n = If), (r = el()) !== u)) {
                                    for (e = [], o = If, nh(), (a = el()) !== u ? ((Vf = o), (o = Bi(r, a))) : ((If = o), (o = u)); o !== u; ) e.push(o), (o = If), nh(), (a = el()) !== u ? ((Vf = o), (o = Bi(r, a))) : ((If = o), (o = u));
                                    (Vf = n), (n = Ti(r, e));
                                } else (If = n), (n = u);
                                return n === u && (n = null), (Vf = t), (t = Ei(n));
                            }
                            function el() {
                                var t, n, r, e;
                                return (t = If), nl(), (n = ul()), (r = wh()) === u && (r = null), (e = Eh()) !== u ? ((Vf = t), (t = Wi(n, r, e))) : ((If = t), (t = u)), t;
                            }
                            function ul() {
                                var t, n, r, e, o, a;
                                if (((t = If), nl(), nh(), (n = If), (r = ol()) !== u)) {
                                    for (e = [], o = If, nh(), (a = ol()) !== u ? ((Vf = o), (o = $i(r, a))) : ((If = o), (o = u)); o !== u; ) e.push(o), (o = If), nh(), (a = ol()) !== u ? ((Vf = o), (o = $i(r, a))) : ((If = o), (o = u));
                                    (Vf = n), (n = wi(r, e));
                                } else (If = n), (n = u);
                                return n === u && (n = null), (r = nh()), (Vf = t), (t = xi(n));
                            }
                            function ol() {
                                var t, n;
                                return (t = If), Mh() !== u ? (nh(), (n = al()) !== u ? (nh(), Qh() !== u ? ((Vf = t), (t = Oi(n))) : ((If = t), (t = u))) : ((If = t), (t = u))) : ((If = t), (t = u)), t;
                            }
                            function al() {
                                var t, n, r, e, o;
                                return (
                                    (t = If),
                                    (n = cl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Ui(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                    t === u &&
                                        ((t = If),
                                        (n = sl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Ri(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                        t === u &&
                                            ((t = If),
                                            (n = fl()) !== u ? ((r = nh()), (e = fh()) !== u ? ((Vf = t), (t = Si(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                            t === u &&
                                                ((t = If),
                                                (n = ll()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Ni(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                t === u &&
                                                    ((t = If),
                                                    (n = ml()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Fi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                    t === u &&
                                                        ((t = If),
                                                        (n = bl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Di(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                        t === u &&
                                                            ((t = If),
                                                            (n = dl()) !== u ? ((r = nh()), (e = Bh()) !== u ? ((Vf = t), (t = ji(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                            t === u &&
                                                                ((t = If),
                                                                (n = gl()) !== u ? ((r = nh()), (e = Bh()) !== u ? ((Vf = t), (t = Pi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                t === u &&
                                                                    ((t = If),
                                                                    (n = Al()) !== u ? ((r = nh()), (e = Th()) !== u ? ((Vf = t), (t = Ii(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                    t === u &&
                                                                        ((t = If),
                                                                        (n = Cl()) !== u ? ((r = nh()), (e = Th()) !== u ? ((Vf = t), (t = Vi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                        t === u &&
                                                                            ((t = If),
                                                                            (n = kl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Gi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                            t === u &&
                                                                                ((t = If),
                                                                                (n = yl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Mi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                t === u &&
                                                                                    ((t = If),
                                                                                    (n = Bl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Qi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                    t === u &&
                                                                                        ((t = If),
                                                                                        (n = Tl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Li(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                        t === u &&
                                                                                            ((t = If),
                                                                                            (n = hl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Zi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                            t === u &&
                                                                                                ((t = If),
                                                                                                (n = vl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Ki(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                t === u &&
                                                                                                    ((t = If),
                                                                                                    (n = pl()) !== u ? ((r = nh()), (e = kh()) !== u ? ((Vf = t), (t = _i(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                    t === u &&
                                                                                                        ((t = If),
                                                                                                        (n = El()) !== u ? ((r = nh()), (e = fh()) !== u ? ((Vf = t), (t = Yi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                        t === u &&
                                                                                                            ((t = If),
                                                                                                            (n = Wl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = qi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                            t === u &&
                                                                                                                ((t = If),
                                                                                                                (n = $l()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = zi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                                t === u &&
                                                                                                                    ((t = If),
                                                                                                                    (n = wl()) !== u ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Hi(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                                    t === u &&
                                                                                                                        ((t = If),
                                                                                                                        (n = xl()) !== u ? ((r = nh()), (e = Th()) !== u ? ((Vf = t), (t = Ji(e))) : ((If = t), (t = u))) : ((If = t), (t = u)),
                                                                                                                        t === u &&
                                                                                                                            ((t = If),
                                                                                                                            (n = Ol()) !== u
                                                                                                                                ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = Xi(e))) : ((If = t), (t = u)))
                                                                                                                                : ((If = t), (t = u)),
                                                                                                                            t === u &&
                                                                                                                                ((t = If),
                                                                                                                                (n = Ul()) !== u
                                                                                                                                    ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = tc(e))) : ((If = t), (t = u)))
                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                t === u &&
                                                                                                                                    ((t = If),
                                                                                                                                    (n = Rl()) !== u
                                                                                                                                        ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = nc(e))) : ((If = t), (t = u)))
                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                    t === u &&
                                                                                                                                        ((t = If),
                                                                                                                                        (n = Sl()) !== u
                                                                                                                                            ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = rc(e))) : ((If = t), (t = u)))
                                                                                                                                            : ((If = t), (t = u)),
                                                                                                                                        t === u &&
                                                                                                                                            ((t = If),
                                                                                                                                            (n = Nl()) !== u
                                                                                                                                                ? ((r = nh()), (e = ah()) !== u ? ((Vf = t), (t = ec(e))) : ((If = t), (t = u)))
                                                                                                                                                : ((If = t), (t = u)),
                                                                                                                                            t === u &&
                                                                                                                                                ((t = If),
                                                                                                                                                (n = Fl()) !== u
                                                                                                                                                    ? ((r = nh()), (e = lh()) !== u ? ((Vf = t), (t = uc(e))) : ((If = t), (t = u)))
                                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                                t === u &&
                                                                                                                                                    ((t = If),
                                                                                                                                                    (n = Dl()) !== u
                                                                                                                                                        ? ((r = nh()), (e = lh()) !== u ? ((Vf = t), (t = oc(e))) : ((If = t), (t = u)))
                                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                                    t === u &&
                                                                                                                                                        ((t = If),
                                                                                                                                                        (n = jl()) !== u
                                                                                                                                                            ? ((r = nh()), (e = fh()) !== u ? ((Vf = t), (t = ac(e))) : ((If = t), (t = u)))
                                                                                                                                                            : ((If = t), (t = u)),
                                                                                                                                                        t === u &&
                                                                                                                                                            ((t = If),
                                                                                                                                                            (n = Pl()) !== u
                                                                                                                                                                ? ((r = nh()), (e = gh()) !== u ? ((Vf = t), (t = ic(e))) : ((If = t), (t = u)))
                                                                                                                                                                : ((If = t), (t = u)),
                                                                                                                                                            t === u &&
                                                                                                                                                                ((t = If),
                                                                                                                                                                (n = Il()) !== u
                                                                                                                                                                    ? ((r = nh()),
                                                                                                                                                                      (e = ah()) !== u ? ((Vf = t), (t = cc(e))) : ((If = t), (t = u)))
                                                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                                                t === u &&
                                                                                                                                                                    ((t = If),
                                                                                                                                                                    (n = Vl()) !== u
                                                                                                                                                                        ? ((r = nh()),
                                                                                                                                                                          (e = ah()) !== u ? ((Vf = t), (t = sc(e))) : ((If = t), (t = u)))
                                                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                                                    t === u &&
                                                                                                                                                                        ((t = If),
                                                                                                                                                                        (n = Gl()) !== u
                                                                                                                                                                            ? ((r = nh()),
                                                                                                                                                                              (e = ah()) !== u ? ((Vf = t), (t = fc(e))) : ((If = t), (t = u)))
                                                                                                                                                                            : ((If = t), (t = u)),
                                                                                                                                                                        t === u &&
                                                                                                                                                                            ((t = If),
                                                                                                                                                                            (n = Ml()) !== u
                                                                                                                                                                                ? ((r = nh()),
                                                                                                                                                                                  (e = ah()) !== u
                                                                                                                                                                                      ? ((Vf = t), (t = lc(e)))
                                                                                                                                                                                      : ((If = t), (t = u)))
                                                                                                                                                                                : ((If = t), (t = u)),
                                                                                                                                                                            t === u &&
                                                                                                                                                                                ((t = If),
                                                                                                                                                                                (n = Ql()) !== u
                                                                                                                                                                                    ? ((r = nh()),
                                                                                                                                                                                      (e = ah()) !== u
                                                                                                                                                                                          ? ((Vf = t), (t = hc(e)))
                                                                                                                                                                                          : ((If = t), (t = u)))
                                                                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                                                                t === u &&
                                                                                                                                                                                    ((t = If),
                                                                                                                                                                                    (n = Ll()) !== u
                                                                                                                                                                                        ? ((r = nh()),
                                                                                                                                                                                          (e = Th()) !== u
                                                                                                                                                                                              ? ((Vf = t), (t = vc(e)))
                                                                                                                                                                                              : ((If = t), (t = u)))
                                                                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                                                                    t === u &&
                                                                                                                                                                                        ((t = If),
                                                                                                                                                                                        (n = Zl()) !== u
                                                                                                                                                                                            ? ((r = nh()),
                                                                                                                                                                                              (e = ah()) !== u
                                                                                                                                                                                                  ? ((Vf = t), (t = pc(e)))
                                                                                                                                                                                                  : ((If = t), (t = u)))
                                                                                                                                                                                            : ((If = t), (t = u)),
                                                                                                                                                                                        t === u &&
                                                                                                                                                                                            ((t = If),
                                                                                                                                                                                            (n = Kl()) !== u
                                                                                                                                                                                                ? ((r = nh()),
                                                                                                                                                                                                  (e = ah()) !== u
                                                                                                                                                                                                      ? ((Vf = t), (t = mc(e)))
                                                                                                                                                                                                      : ((If = t), (t = u)))
                                                                                                                                                                                                : ((If = t), (t = u)),
                                                                                                                                                                                            t === u &&
                                                                                                                                                                                                ((t = If),
                                                                                                                                                                                                (n = _l()) !== u
                                                                                                                                                                                                    ? ((r = nh()),
                                                                                                                                                                                                      (e = ah()) !== u
                                                                                                                                                                                                          ? ((Vf = t), (t = bc(e)))
                                                                                                                                                                                                          : ((If = t), (t = u)))
                                                                                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                                                                                t === u &&
                                                                                                                                                                                                    ((t = If),
                                                                                                                                                                                                    (n = Yl()) !== u
                                                                                                                                                                                                        ? ((r = nh()),
                                                                                                                                                                                                          (e = ah()) !== u
                                                                                                                                                                                                              ? ((Vf = t), (t = dc(e)))
                                                                                                                                                                                                              : ((If = t), (t = u)))
                                                                                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                                                                                    t === u &&
                                                                                                                                                                                                        ((t = If),
                                                                                                                                                                                                        (n = ql()) !== u
                                                                                                                                                                                                            ? ((r = nh()),
                                                                                                                                                                                                              (e = ah()) !== u
                                                                                                                                                                                                                  ? ((Vf = t), (t = gc(e)))
                                                                                                                                                                                                                  : ((If = t), (t = u)))
                                                                                                                                                                                                            : ((If = t), (t = u)),
                                                                                                                                                                                                        t === u &&
                                                                                                                                                                                                            ((t = If),
                                                                                                                                                                                                            (n = zl()) !== u
                                                                                                                                                                                                                ? ((r = nh()),
                                                                                                                                                                                                                  (e = ah()) !== u
                                                                                                                                                                                                                      ? ((Vf = t), (t = Ac(e)))
                                                                                                                                                                                                                      : ((If = t), (t = u)))
                                                                                                                                                                                                                : ((If = t), (t = u)),
                                                                                                                                                                                                            t === u &&
                                                                                                                                                                                                                ((t = If),
                                                                                                                                                                                                                (n = Hl()) !== u
                                                                                                                                                                                                                    ? ((r = nh()),
                                                                                                                                                                                                                      (e = ah()) !== u
                                                                                                                                                                                                                          ? ((Vf = t),
                                                                                                                                                                                                                            (t = Cc(e)))
                                                                                                                                                                                                                          : ((If = t), (t = u)))
                                                                                                                                                                                                                    : ((If = t), (t = u)),
                                                                                                                                                                                                                t === u &&
                                                                                                                                                                                                                    ((t = If),
                                                                                                                                                                                                                    (n = Jl()) !== u
                                                                                                                                                                                                                        ? ((r = nh()),
                                                                                                                                                                                                                          (e = vh()) !== u
                                                                                                                                                                                                                              ? ((Vf = t),
                                                                                                                                                                                                                                (t = kc(e)))
                                                                                                                                                                                                                              : ((If = t),
                                                                                                                                                                                                                                (t = u)))
                                                                                                                                                                                                                        : ((If = t), (t = u)),
                                                                                                                                                                                                                    t === u &&
                                                                                                                                                                                                                        ((t = If),
                                                                                                                                                                                                                        (n = Xl()) !== u
                                                                                                                                                                                                                            ? ((r = nh()),
                                                                                                                                                                                                                              (e = bh()) !== u
                                                                                                                                                                                                                                  ? ((Vf = t),
                                                                                                                                                                                                                                    (t = yc(e)))
                                                                                                                                                                                                                                  : ((If = t),
                                                                                                                                                                                                                                    (t = u)))
                                                                                                                                                                                                                            : ((If = t),
                                                                                                                                                                                                                              (t = u)),
                                                                                                                                                                                                                        t === u &&
                                                                                                                                                                                                                            ((t = If),
                                                                                                                                                                                                                            (n = th()) !== u
                                                                                                                                                                                                                                ? ((r = nh()),
                                                                                                                                                                                                                                  (e = bh()) !==
                                                                                                                                                                                                                                  u
                                                                                                                                                                                                                                      ? ((Vf = t),
                                                                                                                                                                                                                                        (t = Bc(
                                                                                                                                                                                                                                            e
                                                                                                                                                                                                                                        )))
                                                                                                                                                                                                                                      : ((If = t),
                                                                                                                                                                                                                                        (t = u)))
                                                                                                                                                                                                                                : ((If = t),
                                                                                                                                                                                                                                  (t = u)),
                                                                                                                                                                                                                            t === u &&
                                                                                                                                                                                                                                ((t = If),
                                                                                                                                                                                                                                (n = If),
                                                                                                                                                                                                                                Lf++,
                                                                                                                                                                                                                                (r = il()),
                                                                                                                                                                                                                                Lf--,
                                                                                                                                                                                                                                r !== u
                                                                                                                                                                                                                                    ? ((If = n),
                                                                                                                                                                                                                                      (n = void 0))
                                                                                                                                                                                                                                    : (n = u),
                                                                                                                                                                                                                                n !== u
                                                                                                                                                                                                                                    ? ((r = uh()),
                                                                                                                                                                                                                                      (e = nh()),
                                                                                                                                                                                                                                      (o = ah()) !==
                                                                                                                                                                                                                                      u
                                                                                                                                                                                                                                          ? ((Vf = t),
                                                                                                                                                                                                                                            (t = Tc(
                                                                                                                                                                                                                                                r,
                                                                                                                                                                                                                                                o
                                                                                                                                                                                                                                            )))
                                                                                                                                                                                                                                          : ((If = t),
                                                                                                                                                                                                                                            (t = u)))
                                                                                                                                                                                                                                    : ((If = t),
                                                                                                                                                                                                                                      (t = u)),
                                                                                                                                                                                                                                t === u &&
                                                                                                                                                                                                                                    ((t = If),
                                                                                                                                                                                                                                    (n = If),
                                                                                                                                                                                                                                    Lf++,
                                                                                                                                                                                                                                    (r = il()),
                                                                                                                                                                                                                                    Lf--,
                                                                                                                                                                                                                                    r === u
                                                                                                                                                                                                                                        ? (n = void 0)
                                                                                                                                                                                                                                        : ((If = n),
                                                                                                                                                                                                                                          (n = u)),
                                                                                                                                                                                                                                    n !== u
                                                                                                                                                                                                                                        ? ((r = uh()),
                                                                                                                                                                                                                                          (e = nh()),
                                                                                                                                                                                                                                          (o = ah()) !==
                                                                                                                                                                                                                                          u
                                                                                                                                                                                                                                              ? ((Vf = t),
                                                                                                                                                                                                                                                (t = Ec(
                                                                                                                                                                                                                                                    r,
                                                                                                                                                                                                                                                    o
                                                                                                                                                                                                                                                )))
                                                                                                                                                                                                                                              : ((If = t),
                                                                                                                                                                                                                                                (t = u)))
                                                                                                                                                                                                                                        : ((If = t),
                                                                                                                                                                                                                                          (t = u)))))))))))))))))))))))))))))))))))))))))))))))))),
                                    t
                                );
                            }
                            function il() {
                                var t;
                                return (
                                    (t = fl()) === u &&
                                        (t = dl()) === u &&
                                        (t = gl()) === u &&
                                        (t = Al()) === u &&
                                        (t = Cl()) === u &&
                                        (t = pl()) === u &&
                                        (t = El()) === u &&
                                        (t = xl()) === u &&
                                        (t = Fl()) === u &&
                                        (t = Dl()) === u &&
                                        (t = jl()) === u &&
                                        (t = Pl()) === u &&
                                        (t = Ll()) === u &&
                                        (t = Jl()) === u &&
                                        (t = Xl()) === u &&
                                        (t = th()),
                                    t
                                );
                            }
                            function cl() {
                                var n;
                                return t.substr(If, 5) === s ? ((n = s), (If += 5)) : ((n = u), 0 === Lf && Xf(me)), n === u && (t.substr(If, 5) === f ? ((n = f), (If += 5)) : ((n = u), 0 === Lf && Xf(be))), n;
                            }
                            function sl() {
                                var n;
                                return t.substr(If, 4) === l ? ((n = l), (If += 4)) : ((n = u), 0 === Lf && Xf(de)), n === u && (t.substr(If, 4) === h ? ((n = h), (If += 4)) : ((n = u), 0 === Lf && Xf(ge))), n;
                            }
                            function fl() {
                                var n;
                                return t.substr(If, 4) === v ? ((n = v), (If += 4)) : ((n = u), 0 === Lf && Xf(Ae)), n === u && (t.substr(If, 4) === p ? ((n = p), (If += 4)) : ((n = u), 0 === Lf && Xf(Ce))), n;
                            }
                            function ll() {
                                var n;
                                return t.substr(If, 5) === m ? ((n = m), (If += 5)) : ((n = u), 0 === Lf && Xf(ke)), n === u && (t.substr(If, 5) === b ? ((n = b), (If += 5)) : ((n = u), 0 === Lf && Xf(ye))), n;
                            }
                            function hl() {
                                var n;
                                return t.substr(If, 5) === d ? ((n = d), (If += 5)) : ((n = u), 0 === Lf && Xf(Be)), n === u && (t.substr(If, 5) === g ? ((n = g), (If += 5)) : ((n = u), 0 === Lf && Xf(Te))), n;
                            }
                            function vl() {
                                var n;
                                return t.substr(If, 5) === A ? ((n = A), (If += 5)) : ((n = u), 0 === Lf && Xf(Ee)), n === u && (t.substr(If, 5) === C ? ((n = C), (If += 5)) : ((n = u), 0 === Lf && Xf(We))), n;
                            }
                            function pl() {
                                var n;
                                return t.substr(If, 6) === k ? ((n = k), (If += 6)) : ((n = u), 0 === Lf && Xf($e)), n === u && (t.substr(If, 6) === y ? ((n = y), (If += 6)) : ((n = u), 0 === Lf && Xf(we))), n;
                            }
                            function ml() {
                                var n;
                                return (
                                    t.substr(If, 10) === B ? ((n = B), (If += 10)) : ((n = u), 0 === Lf && Xf(xe)),
                                    n === u &&
                                        (t.substr(If, 10) === T ? ((n = T), (If += 10)) : ((n = u), 0 === Lf && Xf(Oe)),
                                        n === u && (t.substr(If, 10) === E ? ((n = E), (If += 10)) : ((n = u), 0 === Lf && Xf(Ue)), n === u && (t.substr(If, 10) === W ? ((n = W), (If += 10)) : ((n = u), 0 === Lf && Xf(Re))))),
                                    n
                                );
                            }
                            function bl() {
                                var n;
                                return (
                                    t.substr(If, 10) === $ ? ((n = $), (If += 10)) : ((n = u), 0 === Lf && Xf(Se)),
                                    n === u &&
                                        (t.substr(If, 10) === w ? ((n = w), (If += 10)) : ((n = u), 0 === Lf && Xf(Ne)),
                                        n === u && (t.substr(If, 10) === x ? ((n = x), (If += 10)) : ((n = u), 0 === Lf && Xf(Fe)), n === u && (t.substr(If, 10) === O ? ((n = O), (If += 10)) : ((n = u), 0 === Lf && Xf(De))))),
                                    n
                                );
                            }
                            function dl() {
                                var n;
                                return (
                                    t.substr(If, 8) === U ? ((n = U), (If += 8)) : ((n = u), 0 === Lf && Xf(je)),
                                    n === u &&
                                        (t.substr(If, 8) === R ? ((n = R), (If += 8)) : ((n = u), 0 === Lf && Xf(Pe)),
                                        n === u &&
                                            (t.substr(If, 8) === S ? ((n = S), (If += 8)) : ((n = u), 0 === Lf && Xf(Ie)),
                                            n === u && (t.substr(If, 8) === N ? ((n = N), (If += 8)) : ((n = u), 0 === Lf && Xf(Ve)), n === u && (t.substr(If, 8) === F ? ((n = F), (If += 8)) : ((n = u), 0 === Lf && Xf(Ge)))))),
                                    n
                                );
                            }
                            function gl() {
                                var n;
                                return (
                                    t.substr(If, 8) === D ? ((n = D), (If += 8)) : ((n = u), 0 === Lf && Xf(Me)),
                                    n === u &&
                                        (t.substr(If, 8) === j ? ((n = j), (If += 8)) : ((n = u), 0 === Lf && Xf(Qe)),
                                        n === u &&
                                            (t.substr(If, 8) === P ? ((n = P), (If += 8)) : ((n = u), 0 === Lf && Xf(Le)),
                                            n === u && (t.substr(If, 8) === I ? ((n = I), (If += 8)) : ((n = u), 0 === Lf && Xf(Ze)), n === u && (t.substr(If, 8) === V ? ((n = V), (If += 8)) : ((n = u), 0 === Lf && Xf(Ke)))))),
                                    n
                                );
                            }
                            function Al() {
                                var n;
                                return (
                                    t.substr(If, 9) === G ? ((n = G), (If += 9)) : ((n = u), 0 === Lf && Xf(_e)),
                                    n === u &&
                                        (t.substr(If, 9) === M ? ((n = M), (If += 9)) : ((n = u), 0 === Lf && Xf(Ye)),
                                        n === u &&
                                            (t.substr(If, 9) === Q ? ((n = Q), (If += 9)) : ((n = u), 0 === Lf && Xf(qe)),
                                            n === u && (t.substr(If, 9) === L ? ((n = L), (If += 9)) : ((n = u), 0 === Lf && Xf(ze)), n === u && (t.substr(If, 9) === Z ? ((n = Z), (If += 9)) : ((n = u), 0 === Lf && Xf(He)))))),
                                    n
                                );
                            }
                            function Cl() {
                                var n;
                                return (
                                    t.substr(If, 9) === K ? ((n = K), (If += 9)) : ((n = u), 0 === Lf && Xf(Je)),
                                    n === u &&
                                        (t.substr(If, 9) === _ ? ((n = _), (If += 9)) : ((n = u), 0 === Lf && Xf(Xe)),
                                        n === u &&
                                            (t.substr(If, 9) === Y ? ((n = Y), (If += 9)) : ((n = u), 0 === Lf && Xf(tu)),
                                            n === u && (t.substr(If, 9) === q ? ((n = q), (If += 9)) : ((n = u), 0 === Lf && Xf(nu)), n === u && (t.substr(If, 9) === z ? ((n = z), (If += 9)) : ((n = u), 0 === Lf && Xf(ru)))))),
                                    n
                                );
                            }
                            function kl() {
                                var n;
                                return (
                                    t.substr(If, 7) === H ? ((n = H), (If += 7)) : ((n = u), 0 === Lf && Xf(eu)),
                                    n === u &&
                                        (t.substr(If, 7) === J ? ((n = J), (If += 7)) : ((n = u), 0 === Lf && Xf(uu)),
                                        n === u &&
                                            (t.substr(If, 7) === X ? ((n = X), (If += 7)) : ((n = u), 0 === Lf && Xf(ou)),
                                            n === u &&
                                                (t.substr(If, 7) === tt ? ((n = tt), (If += 7)) : ((n = u), 0 === Lf && Xf(au)),
                                                n === u && (t.substr(If, 7) === nt ? ((n = nt), (If += 7)) : ((n = u), 0 === Lf && Xf(iu)), n === u && (t.substr(If, 7) === rt ? ((n = rt), (If += 7)) : ((n = u), 0 === Lf && Xf(cu))))))),
                                    n
                                );
                            }
                            function yl() {
                                var n;
                                return (
                                    t.substr(If, 7) === et ? ((n = et), (If += 7)) : ((n = u), 0 === Lf && Xf(su)),
                                    n === u &&
                                        (t.substr(If, 7) === ut ? ((n = ut), (If += 7)) : ((n = u), 0 === Lf && Xf(fu)),
                                        n === u &&
                                            (t.substr(If, 7) === ot ? ((n = ot), (If += 7)) : ((n = u), 0 === Lf && Xf(lu)),
                                            n === u &&
                                                (t.substr(If, 7) === at ? ((n = at), (If += 7)) : ((n = u), 0 === Lf && Xf(hu)),
                                                n === u && (t.substr(If, 7) === it ? ((n = it), (If += 7)) : ((n = u), 0 === Lf && Xf(vu)), n === u && (t.substr(If, 7) === ct ? ((n = ct), (If += 7)) : ((n = u), 0 === Lf && Xf(pu))))))),
                                    n
                                );
                            }
                            function Bl() {
                                var n;
                                return (
                                    t.substr(If, 9) === st ? ((n = st), (If += 9)) : ((n = u), 0 === Lf && Xf(mu)),
                                    n === u &&
                                        (t.substr(If, 9) === ft ? ((n = ft), (If += 9)) : ((n = u), 0 === Lf && Xf(bu)),
                                        n === u && (t.substr(If, 9) === lt ? ((n = lt), (If += 9)) : ((n = u), 0 === Lf && Xf(du)), n === u && (t.substr(If, 9) === ht ? ((n = ht), (If += 9)) : ((n = u), 0 === Lf && Xf(gu))))),
                                    n
                                );
                            }
                            function Tl() {
                                var n;
                                return (
                                    t.substr(If, 9) === vt ? ((n = vt), (If += 9)) : ((n = u), 0 === Lf && Xf(Au)),
                                    n === u &&
                                        (t.substr(If, 9) === pt ? ((n = pt), (If += 9)) : ((n = u), 0 === Lf && Xf(Cu)),
                                        n === u && (t.substr(If, 9) === mt ? ((n = mt), (If += 9)) : ((n = u), 0 === Lf && Xf(ku)), n === u && (t.substr(If, 9) === bt ? ((n = bt), (If += 9)) : ((n = u), 0 === Lf && Xf(yu))))),
                                    n
                                );
                            }
                            function El() {
                                var n;
                                return (
                                    t.substr(If, 9) === dt ? ((n = dt), (If += 9)) : ((n = u), 0 === Lf && Xf(Bu)),
                                    n === u &&
                                        (t.substr(If, 9) === gt ? ((n = gt), (If += 9)) : ((n = u), 0 === Lf && Xf(Tu)),
                                        n === u && (t.substr(If, 9) === At ? ((n = At), (If += 9)) : ((n = u), 0 === Lf && Xf(Eu)), n === u && (t.substr(If, 9) === Ct ? ((n = Ct), (If += 9)) : ((n = u), 0 === Lf && Xf(Wu))))),
                                    n
                                );
                            }
                            function Wl() {
                                var n;
                                return (
                                    t.substr(If, 12) === kt ? ((n = kt), (If += 12)) : ((n = u), 0 === Lf && Xf($u)),
                                    n === u &&
                                        (t.substr(If, 12) === yt ? ((n = yt), (If += 12)) : ((n = u), 0 === Lf && Xf(wu)),
                                        n === u && (t.substr(If, 12) === Bt ? ((n = Bt), (If += 12)) : ((n = u), 0 === Lf && Xf(xu)), n === u && (t.substr(If, 12) === Tt ? ((n = Tt), (If += 12)) : ((n = u), 0 === Lf && Xf(Ou))))),
                                    n
                                );
                            }
                            function $l() {
                                var n;
                                return t.substr(If, 7) === Et ? ((n = Et), (If += 7)) : ((n = u), 0 === Lf && Xf(Uu)), n === u && (t.substr(If, 7) === Wt ? ((n = Wt), (If += 7)) : ((n = u), 0 === Lf && Xf(Ru))), n;
                            }
                            function wl() {
                                var n;
                                return t.substr(If, 5) === $t ? ((n = $t), (If += 5)) : ((n = u), 0 === Lf && Xf(Su)), n === u && (t.substr(If, 5) === wt ? ((n = wt), (If += 5)) : ((n = u), 0 === Lf && Xf(Nu))), n;
                            }
                            function xl() {
                                var n;
                                return t.substr(If, 5) === xt ? ((n = xt), (If += 5)) : ((n = u), 0 === Lf && Xf(Fu)), n === u && (t.substr(If, 5) === Ot ? ((n = Ot), (If += 5)) : ((n = u), 0 === Lf && Xf(Du))), n;
                            }
                            function Ol() {
                                var n;
                                return t.substr(If, 7) === Ut ? ((n = Ut), (If += 7)) : ((n = u), 0 === Lf && Xf(ju)), n === u && (t.substr(If, 7) === Rt ? ((n = Rt), (If += 7)) : ((n = u), 0 === Lf && Xf(Pu))), n;
                            }
                            function Ul() {
                                var n;
                                return t.substr(If, 9) === St ? ((n = St), (If += 9)) : ((n = u), 0 === Lf && Xf(Iu)), n === u && (t.substr(If, 9) === Nt ? ((n = Nt), (If += 9)) : ((n = u), 0 === Lf && Xf(Vu))), n;
                            }
                            function Rl() {
                                var n;
                                return (
                                    t.substr(If, 12) === Ft ? ((n = Ft), (If += 12)) : ((n = u), 0 === Lf && Xf(Gu)),
                                    n === u &&
                                        (t.substr(If, 12) === Dt ? ((n = Dt), (If += 12)) : ((n = u), 0 === Lf && Xf(Mu)),
                                        n === u && (t.substr(If, 12) === jt ? ((n = jt), (If += 12)) : ((n = u), 0 === Lf && Xf(Qu)), n === u && (t.substr(If, 12) === Pt ? ((n = Pt), (If += 12)) : ((n = u), 0 === Lf && Xf(Lu))))),
                                    n
                                );
                            }
                            function Sl() {
                                var n;
                                return (
                                    t.substr(If, 3) === It ? ((n = It), (If += 3)) : ((n = u), 0 === Lf && Xf(Zu)),
                                    n === u && (t.substr(If, 3) === Vt ? ((n = Vt), (If += 3)) : ((n = u), 0 === Lf && Xf(Ku)), n === u && (t.substr(If, 3) === Gt ? ((n = Gt), (If += 3)) : ((n = u), 0 === Lf && Xf(_u)))),
                                    n
                                );
                            }
                            function Nl() {
                                var n;
                                return (
                                    t.substr(If, 3) === Mt ? ((n = Mt), (If += 3)) : ((n = u), 0 === Lf && Xf(Yu)),
                                    n === u && (t.substr(If, 3) === Qt ? ((n = Qt), (If += 3)) : ((n = u), 0 === Lf && Xf(qu)), n === u && (t.substr(If, 3) === Lt ? ((n = Lt), (If += 3)) : ((n = u), 0 === Lf && Xf(zu)))),
                                    n
                                );
                            }
                            function Fl() {
                                var n;
                                return t.substr(If, 4) === Zt ? ((n = Zt), (If += 4)) : ((n = u), 0 === Lf && Xf(Hu)), n === u && (t.substr(If, 4) === Kt ? ((n = Kt), (If += 4)) : ((n = u), 0 === Lf && Xf(Ju))), n;
                            }
                            function Dl() {
                                var n;
                                return (
                                    t.substr(If, 7) === _t ? ((n = _t), (If += 7)) : ((n = u), 0 === Lf && Xf(Xu)),
                                    n === u &&
                                        (t.substr(If, 7) === Yt ? ((n = Yt), (If += 7)) : ((n = u), 0 === Lf && Xf(to)),
                                        n === u &&
                                            (t.substr(If, 7) === qt ? ((n = qt), (If += 7)) : ((n = u), 0 === Lf && Xf(no)),
                                            n === u &&
                                                (t.substr(If, 7) === zt ? ((n = zt), (If += 7)) : ((n = u), 0 === Lf && Xf(ro)),
                                                n === u && (t.substr(If, 7) === Ht ? ((n = Ht), (If += 7)) : ((n = u), 0 === Lf && Xf(eo)), n === u && (t.substr(If, 7) === Jt ? ((n = Jt), (If += 7)) : ((n = u), 0 === Lf && Xf(uo))))))),
                                    n
                                );
                            }
                            function jl() {
                                var n;
                                return (
                                    t.substr(If, 7) === Xt ? ((n = Xt), (If += 7)) : ((n = u), 0 === Lf && Xf(oo)),
                                    n === u &&
                                        (t.substr(If, 7) === tn ? ((n = tn), (If += 7)) : ((n = u), 0 === Lf && Xf(ao)),
                                        n === u &&
                                            (t.substr(If, 7) === nn ? ((n = nn), (If += 7)) : ((n = u), 0 === Lf && Xf(io)),
                                            n === u &&
                                                (t.substr(If, 7) === rn ? ((n = rn), (If += 7)) : ((n = u), 0 === Lf && Xf(co)),
                                                n === u && (t.substr(If, 7) === en ? ((n = en), (If += 7)) : ((n = u), 0 === Lf && Xf(so)), n === u && (t.substr(If, 7) === un ? ((n = un), (If += 7)) : ((n = u), 0 === Lf && Xf(fo))))))),
                                    n
                                );
                            }
                            function Pl() {
                                var n;
                                return (
                                    t.substr(If, 11) === on ? ((n = on), (If += 11)) : ((n = u), 0 === Lf && Xf(lo)),
                                    n === u &&
                                        (t.substr(If, 11) === an ? ((n = an), (If += 11)) : ((n = u), 0 === Lf && Xf(ho)),
                                        n === u && (t.substr(If, 11) === cn ? ((n = cn), (If += 11)) : ((n = u), 0 === Lf && Xf(vo)), n === u && (t.substr(If, 11) === sn ? ((n = sn), (If += 11)) : ((n = u), 0 === Lf && Xf(po))))),
                                    n
                                );
                            }
                            function Il() {
                                var n;
                                return (
                                    t.substr(If, 5) === fn ? ((n = fn), (If += 5)) : ((n = u), 0 === Lf && Xf(mo)),
                                    n === u &&
                                        (t.substr(If, 5) === ln ? ((n = ln), (If += 5)) : ((n = u), 0 === Lf && Xf(bo)),
                                        n === u && (t.substr(If, 5) === hn ? ((n = hn), (If += 5)) : ((n = u), 0 === Lf && Xf(go)), n === u && (t.substr(If, 5) === vn ? ((n = vn), (If += 5)) : ((n = u), 0 === Lf && Xf(Ao))))),
                                    n
                                );
                            }
                            function Vl() {
                                var n;
                                return (
                                    t.substr(If, 3) === pn ? ((n = pn), (If += 3)) : ((n = u), 0 === Lf && Xf(Co)),
                                    n === u && (t.substr(If, 3) === mn ? ((n = mn), (If += 3)) : ((n = u), 0 === Lf && Xf(ko)), n === u && (t.substr(If, 3) === bn ? ((n = bn), (If += 3)) : ((n = u), 0 === Lf && Xf(yo)))),
                                    n
                                );
                            }
                            function Gl() {
                                var n;
                                return t.substr(If, 11) === dn ? ((n = dn), (If += 11)) : ((n = u), 0 === Lf && Xf(Bo)), n === u && (t.substr(If, 11) === gn ? ((n = gn), (If += 11)) : ((n = u), 0 === Lf && Xf(To))), n;
                            }
                            function Ml() {
                                var n;
                                return t.substr(If, 9) === An ? ((n = An), (If += 9)) : ((n = u), 0 === Lf && Xf(Eo)), n === u && (t.substr(If, 9) === Cn ? ((n = Cn), (If += 9)) : ((n = u), 0 === Lf && Xf(Wo))), n;
                            }
                            function Ql() {
                                var n;
                                return t.substr(If, 4) === kn ? ((n = kn), (If += 4)) : ((n = u), 0 === Lf && Xf($o)), n === u && (t.substr(If, 4) === yn ? ((n = yn), (If += 4)) : ((n = u), 0 === Lf && Xf(wo))), n;
                            }
                            function Ll() {
                                var n;
                                return (
                                    t.substr(If, 8) === Bn ? ((n = Bn), (If += 8)) : ((n = u), 0 === Lf && Xf(xo)),
                                    n === u &&
                                        (t.substr(If, 8) === Tn ? ((n = Tn), (If += 8)) : ((n = u), 0 === Lf && Xf(Oo)),
                                        n === u && (t.substr(If, 8) === En ? ((n = En), (If += 8)) : ((n = u), 0 === Lf && Xf(Uo)), n === u && (t.substr(If, 8) === Wn ? ((n = Wn), (If += 8)) : ((n = u), 0 === Lf && Xf(Ro))))),
                                    n
                                );
                            }
                            function Zl() {
                                var n;
                                return t.substr(If, 7) === $n ? ((n = $n), (If += 7)) : ((n = u), 0 === Lf && Xf(So)), n === u && (t.substr(If, 7) === wn ? ((n = wn), (If += 7)) : ((n = u), 0 === Lf && Xf(No))), n;
                            }
                            function Kl() {
                                var n;
                                return t.substr(If, 15) === xn ? ((n = xn), (If += 15)) : ((n = u), 0 === Lf && Xf(Fo)), n;
                            }
                            function _l() {
                                var n;
                                return t.substr(If, 15) === On ? ((n = On), (If += 15)) : ((n = u), 0 === Lf && Xf(Do)), n;
                            }
                            function Yl() {
                                var n;
                                return t.substr(If, 11) === Un ? ((n = Un), (If += 11)) : ((n = u), 0 === Lf && Xf(jo)), n;
                            }
                            function ql() {
                                var n;
                                return t.substr(If, 11) === Rn ? ((n = Rn), (If += 11)) : ((n = u), 0 === Lf && Xf(Po)), n;
                            }
                            function zl() {
                                var n;
                                return t.substr(If, 9) === Sn ? ((n = Sn), (If += 9)) : ((n = u), 0 === Lf && Xf(Io)), n;
                            }
                            function Hl() {
                                var n;
                                return t.substr(If, 9) === Nn ? ((n = Nn), (If += 9)) : ((n = u), 0 === Lf && Xf(Vo)), n;
                            }
                            function Jl() {
                                var n;
                                return t.substr(If, 5) === Fn ? ((n = Fn), (If += 5)) : ((n = u), 0 === Lf && Xf(Go)), n;
                            }
                            function Xl() {
                                var n;
                                return t.substr(If, 10) === Dn ? ((n = Dn), (If += 10)) : ((n = u), 0 === Lf && Xf(Mo)), n;
                            }
                            function th() {
                                var n;
                                return t.substr(If, 10) === jn ? ((n = jn), (If += 10)) : ((n = u), 0 === Lf && Xf(Qo)), n;
                            }
                            function nh() {
                                var n, r;
                                for (Lf++, n = [], r = t.charAt(If), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo)); r !== u; ) n.push(r), (r = t.charAt(If)), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo));
                                return Lf--, (r = u), 0 === Lf && Xf(Lo), n;
                            }
                            function rh() {
                                var n, r;
                                if (((n = []), (r = t.charAt(If)), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo)), r !== u)) for (; r !== u; ) n.push(r), (r = t.charAt(If)), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo));
                                else n = u;
                                return n;
                            }
                            function eh() {
                                var n, r;
                                if (((n = []), (r = t.charAt(If)), ne.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Ko)), r !== u)) for (; r !== u; ) n.push(r), (r = t.charAt(If)), ne.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Ko));
                                else n = u;
                                return n;
                            }
                            function uh() {
                                var n, r, e;
                                for (n = If, r = [], e = t.charAt(If), re.test(e) ? If++ : ((e = u), 0 === Lf && Xf(_o)); e !== u; ) r.push(e), (e = t.charAt(If)), re.test(e) ? If++ : ((e = u), 0 === Lf && Xf(_o));
                                return (Vf = n), (n = r = Wc(r));
                            }
                            function oh() {
                                var n;
                                return 34 === t.charCodeAt(If) ? ((n = Pn), If++) : ((n = u), 0 === Lf && Xf(Yo)), n;
                            }
                            function ah() {
                                var n, r, e, o, a;
                                if (((n = If), 34 === t.charCodeAt(If) ? ((r = Pn), If++) : ((r = u), 0 === Lf && Xf(Yo)), r !== u)) {
                                    for (ch(), e = [], o = ih(); o !== u; ) e.push(o), (o = ih());
                                    (o = ch()), 34 === t.charCodeAt(If) ? ((a = Pn), If++) : ((a = u), 0 === Lf && Xf(Yo)), a !== u ? ((Vf = n), (n = $c(e))) : ((If = n), (n = u));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function ih() {
                                var n, r, e;
                                return (
                                    (n = t.charAt(If)),
                                    ee.test(n) ? If++ : ((n = u), 0 === Lf && Xf(qo)),
                                    n === u &&
                                        ((n = If),
                                        sh() !== u
                                            ? ((r = If),
                                              92 === t.charCodeAt(If) ? ((e = In), If++) : ((e = u), 0 === Lf && Xf(zo)),
                                              e !== u && ((Vf = r), (e = wc())),
                                              (r = e) === u && ((r = If), 34 === t.charCodeAt(If) ? ((e = Pn), If++) : ((e = u), 0 === Lf && Xf(Yo)), e !== u && ((Vf = r), (e = xc())), (r = e)),
                                              r !== u ? ((Vf = n), (n = Oc(r))) : ((If = n), (n = u)))
                                            : ((If = n), (n = u))),
                                    n
                                );
                            }
                            function ch() {
                                var n, r;
                                for (Lf++, n = [], r = t.charAt(If), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo)); r !== u; ) n.push(r), (r = t.charAt(If)), te.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Zo));
                                return Lf--, (r = u), 0 === Lf && Xf(Lo), n;
                            }
                            function sh() {
                                var n;
                                return 92 === t.charCodeAt(If) ? ((n = In), If++) : ((n = u), 0 === Lf && Xf(zo)), n;
                            }
                            function fh() {
                                var n, r, e, o, a, i, c, s;
                                return (
                                    (n = If),
                                    oh() !== u
                                        ? ((r = If),
                                          (e = t.charAt(If)),
                                          ue.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Ho)),
                                          e !== u
                                              ? ((o = t.charAt(If)),
                                                ue.test(o) ? If++ : ((o = u), 0 === Lf && Xf(Ho)),
                                                o !== u
                                                    ? ((a = t.charAt(If)),
                                                      ue.test(a) ? If++ : ((a = u), 0 === Lf && Xf(Ho)),
                                                      a !== u ? ((i = t.charAt(If)), ue.test(i) ? If++ : ((i = u), 0 === Lf && Xf(Ho)), i !== u ? (r = e = [e, o, a, i]) : ((If = r), (r = u))) : ((If = r), (r = u)))
                                                    : ((If = r), (r = u)))
                                              : ((If = r), (r = u)),
                                          r !== u
                                              ? (46 === t.charCodeAt(If) ? ((e = Vn), If++) : ((e = u), 0 === Lf && Xf(Jo)),
                                                e !== u
                                                    ? ((o = If),
                                                      (a = t.charAt(If)),
                                                      ue.test(a) ? If++ : ((a = u), 0 === Lf && Xf(Ho)),
                                                      a !== u ? ((i = t.charAt(If)), ue.test(i) ? If++ : ((i = u), 0 === Lf && Xf(Ho)), i !== u ? (o = a = [a, i]) : ((If = o), (o = u))) : ((If = o), (o = u)),
                                                      o !== u
                                                          ? (46 === t.charCodeAt(If) ? ((a = Vn), If++) : ((a = u), 0 === Lf && Xf(Jo)),
                                                            a !== u
                                                                ? ((i = If),
                                                                  (c = t.charAt(If)),
                                                                  ue.test(c) ? If++ : ((c = u), 0 === Lf && Xf(Ho)),
                                                                  c !== u ? ((s = t.charAt(If)), ue.test(s) ? If++ : ((s = u), 0 === Lf && Xf(Ho)), s !== u ? (i = c = [c, s]) : ((If = i), (i = u))) : ((If = i), (i = u)),
                                                                  i !== u && (c = oh()) !== u ? ((Vf = n), (n = Uc(r, o, i))) : ((If = n), (n = u)))
                                                                : ((If = n), (n = u)))
                                                          : ((If = n), (n = u)))
                                                    : ((If = n), (n = u)))
                                              : ((If = n), (n = u)))
                                        : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function lh() {
                                var n, r, e, o, a, i, c;
                                if (((n = If), oh() !== u)) {
                                    if (((r = []), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo)), e !== u)) for (; e !== u; ) r.push(e), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo));
                                    else r = u;
                                    if (r !== u)
                                        if ((58 === t.charCodeAt(If) ? ((e = Gn), If++) : ((e = u), 0 === Lf && Xf(ta)), e !== u)) {
                                            if (((o = []), (a = t.charAt(If)), oe.test(a) ? If++ : ((a = u), 0 === Lf && Xf(Xo)), a !== u)) for (; a !== u; ) o.push(a), (a = t.charAt(If)), oe.test(a) ? If++ : ((a = u), 0 === Lf && Xf(Xo));
                                            else o = u;
                                            if (o !== u)
                                                if ((58 === t.charCodeAt(If) ? ((a = Gn), If++) : ((a = u), 0 === Lf && Xf(ta)), a !== u)) {
                                                    if (((i = []), (c = t.charAt(If)), oe.test(c) ? If++ : ((c = u), 0 === Lf && Xf(Xo)), c !== u))
                                                        for (; c !== u; ) i.push(c), (c = t.charAt(If)), oe.test(c) ? If++ : ((c = u), 0 === Lf && Xf(Xo));
                                                    else i = u;
                                                    i !== u ? ((c = hh()) === u && (c = null), oh() !== u ? ((Vf = n), (n = Rc(r, o, i, c))) : ((If = n), (n = u))) : ((If = n), (n = u));
                                                } else (If = n), (n = u);
                                            else (If = n), (n = u);
                                        } else (If = n), (n = u);
                                    else (If = n), (n = u);
                                } else (If = n), (n = u);
                                return n;
                            }
                            function hh() {
                                var n, r, e, o;
                                if (((n = If), 46 === t.charCodeAt(If) ? ((r = Vn), If++) : ((r = u), 0 === Lf && Xf(Jo)), r !== u)) {
                                    if (((e = []), (o = t.charAt(If)), oe.test(o) ? If++ : ((o = u), 0 === Lf && Xf(Xo)), o !== u)) for (; o !== u; ) e.push(o), (o = t.charAt(If)), oe.test(o) ? If++ : ((o = u), 0 === Lf && Xf(Xo));
                                    else e = u;
                                    e !== u ? ((Vf = n), (n = Sc(e))) : ((If = n), (n = u));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function vh() {
                                var t, n;
                                return (t = If), oh() !== u && (n = ph()) !== u && oh() !== u ? ((Vf = t), (t = Nc(n))) : ((If = t), (t = u)), t;
                            }
                            function ph() {
                                var n, r, e, o;
                                return (
                                    (n = If),
                                    (r = mh()) !== u ? (47 === t.charCodeAt(If) ? ((e = Mn), If++) : ((e = u), 0 === Lf && Xf(na)), e !== u && (o = dh()) !== u ? ((Vf = n), (n = Fc(r, o))) : ((If = n), (n = u))) : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function mh() {
                                var n;
                                return (n = t.charAt(If)), ae.test(n) ? If++ : ((n = u), 0 === Lf && Xf(ra)), n;
                            }
                            function bh() {
                                var t, n;
                                return (t = If), oh() !== u && (n = dh()) !== u && oh() !== u ? ((Vf = t), (t = Dc(n))) : ((If = t), (t = u)), t;
                            }
                            function dh() {
                                var t, n;
                                return (t = If), (n = _h()) !== u && ((Vf = t), (n = jc(n))), (t = n);
                            }
                            function gh() {
                                var t, n;
                                return (t = If), oh() !== u ? ((n = Ah()), oh() !== u ? ((Vf = t), (t = Pc(n))) : ((If = t), (t = u))) : ((If = t), (t = u)), t;
                            }
                            function Ah() {
                                var n, r, e, o, a, i, c;
                                if (((n = If), (r = If), (e = Ch()) !== u)) {
                                    for (o = [], a = If, 58 === t.charCodeAt(If) ? ((i = Gn), If++) : ((i = u), 0 === Lf && Xf(ta)), i !== u && (c = Ch()) !== u ? ((Vf = a), (a = Ic(e, c))) : ((If = a), (a = u)); a !== u; )
                                        o.push(a), (a = If), 58 === t.charCodeAt(If) ? ((i = Gn), If++) : ((i = u), 0 === Lf && Xf(ta)), i !== u && (c = Ch()) !== u ? ((Vf = a), (a = Ic(e, c))) : ((If = a), (a = u));
                                    (Vf = r), (r = Vc(e, o));
                                } else (If = r), (r = u);
                                return r === u && (r = null), (Vf = n), (n = r = Gc(r));
                            }
                            function Ch() {
                                var n, r, e, o, a, i;
                                return (
                                    (n = If),
                                    63 === t.charCodeAt(If) ? ((r = Qn), If++) : ((r = u), 0 === Lf && Xf(ea)),
                                    r !== u && ((Vf = n), (r = Mc())),
                                    (n = r) === u &&
                                        ((n = If),
                                        45 === t.charCodeAt(If) ? ((r = Ln), If++) : ((r = u), 0 === Lf && Xf(ua)),
                                        r !== u && ((Vf = n), (r = Qc())),
                                        (n = r) === u &&
                                            ((n = If),
                                            (r = uv()) !== u
                                                ? (47 === t.charCodeAt(If) ? ((e = Mn), If++) : ((e = u), 0 === Lf && Xf(na)),
                                                  e !== u && (o = uv()) !== u
                                                      ? (43 === t.charCodeAt(If) ? ((a = Zn), If++) : ((a = u), 0 === Lf && Xf(oa)), a !== u && (i = uv()) !== u ? ((Vf = n), (n = Lc(r, o, i))) : ((If = n), (n = u)))
                                                      : ((If = n), (n = u)))
                                                : ((If = n), (n = u)),
                                            n === u &&
                                                ((n = If),
                                                (r = uv()) !== u
                                                    ? (47 === t.charCodeAt(If) ? ((e = Mn), If++) : ((e = u), 0 === Lf && Xf(na)), e !== u && (o = uv()) !== u ? ((Vf = n), (n = Zc(r, o))) : ((If = n), (n = u)))
                                                    : ((If = n), (n = u)),
                                                n === u &&
                                                    ((n = If),
                                                    (r = uv()) !== u
                                                        ? (43 === t.charCodeAt(If) ? ((e = Zn), If++) : ((e = u), 0 === Lf && Xf(oa)), e !== u && (o = uv()) !== u ? ((Vf = n), (n = Kc(r, o))) : ((If = n), (n = u)))
                                                        : ((If = n), (n = u)),
                                                    n === u &&
                                                        ((n = If),
                                                        (r = uv()) !== u && ((Vf = n), (r = _c(r))),
                                                        (n = r) === u &&
                                                            ((n = If), 42 === t.charCodeAt(If) ? ((r = Kn), If++) : ((r = u), 0 === Lf && Xf(aa)), r !== u && (e = uv()) !== u ? ((Vf = n), (n = Yc(e))) : ((If = n), (n = u)))))))),
                                    n
                                );
                            }
                            function kh() {
                                var t, n;
                                return (t = If), oh() !== u && (n = yh()) !== u && oh() !== u ? ((Vf = t), (t = qc(n))) : ((If = t), (t = u)), t;
                            }
                            function yh() {
                                var n, r;
                                return (
                                    (n = If),
                                    t.substr(If, 3) === _n ? ((r = _n), (If += 3)) : ((r = u), 0 === Lf && Xf(ia)),
                                    r !== u && ((Vf = n), (r = zc(r))),
                                    (n = r) === u &&
                                        ((n = If),
                                        t.substr(If, 3) === Yn ? ((r = Yn), (If += 3)) : ((r = u), 0 === Lf && Xf(ca)),
                                        r !== u && ((Vf = n), (r = Hc(r))),
                                        (n = r) === u &&
                                            ((n = If),
                                            t.substr(If, 7) === qn ? ((r = qn), (If += 7)) : ((r = u), 0 === Lf && Xf(sa)),
                                            r !== u && ((Vf = n), (r = Jc(r))),
                                            (n = r) === u &&
                                                ((n = If),
                                                t.substr(If, 3) === zn ? ((r = zn), (If += 3)) : ((r = u), 0 === Lf && Xf(fa)),
                                                r !== u && ((Vf = n), (r = Xc())),
                                                (n = r) === u && ((n = If), 42 === t.charCodeAt(If) ? ((r = Kn), If++) : ((r = u), 0 === Lf && Xf(aa)), r !== u && ((Vf = n), (r = ts(r))), (n = r))))),
                                    n
                                );
                            }
                            function Bh() {
                                var n, r, e;
                                return (
                                    (n = If),
                                    (r = Th()) !== u && ((Vf = n), (r = ns(r))),
                                    (n = r) === u &&
                                        ((n = If),
                                        (r = oh()) !== u ? (45 === t.charCodeAt(If) ? ((e = Ln), If++) : ((e = u), 0 === Lf && Xf(ua)), e !== u && oh() !== u ? ((Vf = n), (n = rs())) : ((If = n), (n = u))) : ((If = n), (n = u)),
                                        n === u && ((n = If), (r = oh()) !== u && (e = oh()) !== u ? ((Vf = n), (n = es())) : ((If = n), (n = u)))),
                                    n
                                );
                            }
                            function Th() {
                                var n, r, e;
                                if (((n = If), oh() !== u)) {
                                    if (((r = []), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo)), e !== u)) for (; e !== u; ) r.push(e), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo));
                                    else r = u;
                                    r !== u && (e = oh()) !== u ? ((Vf = n), (n = us(r))) : ((If = n), (n = u));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function Eh() {
                                var t, n, r, e, o, a, i, c, s, f;
                                return (
                                    (t = If),
                                    nl(),
                                    (n = nh()),
                                    (r = wh()) === u && (r = null),
                                    nh(),
                                    (e = rv()) === u && (e = null),
                                    nh(),
                                    (o = av()) !== u
                                        ? (nh(),
                                          (a = sv()) === u && (a = null),
                                          (i = Wh()) === u && (i = null),
                                          nh(),
                                          (c = wh()) === u && (c = null),
                                          nh(),
                                          (s = Xh()) === u && (s = null),
                                          (f = Eh()) === u && (f = null),
                                          (Vf = t),
                                          (t = os(r, e, o, a, i, c, s, f)))
                                        : ((If = t), (t = u)),
                                    t === u && ((t = If), nh(), (n = $h()) !== u ? ((r = nh()), (Vf = t), (t = as(n))) : ((If = t), (t = u))),
                                    t
                                );
                            }
                            function Wh() {
                                var n, r, e, o;
                                return (
                                    (n = If), (r = tv()) !== u ? (61 === t.charCodeAt(If) ? ((e = Hn), If++) : ((e = u), 0 === Lf && Xf(la)), e !== u && (o = nv()) !== u ? (n = r = [r, e, o]) : ((If = n), (n = u))) : ((If = n), (n = u)), n
                                );
                            }
                            function $h() {
                                var t, n;
                                return (t = If), (n = yh()) !== u && ((Vf = t), (n = is(n))), (t = n);
                            }
                            function wh() {
                                var t, n, r, e, o;
                                if (((t = If), (n = xh()) !== u)) {
                                    for (r = [], e = If, nh(), (o = xh()) !== u ? ((Vf = e), (e = cs(n, o))) : ((If = e), (e = u)); e !== u; ) r.push(e), (e = If), nh(), (o = xh()) !== u ? ((Vf = e), (e = cs(n, o))) : ((If = e), (e = u));
                                    (Vf = t), (t = ss(n, r));
                                } else (If = t), (t = u);
                                return t;
                            }
                            function xh() {
                                var t, n, r;
                                return (
                                    (t = If),
                                    (n = Vh()) !== u && (r = Gh()) !== u ? ((Vf = t), (t = fs())) : ((If = t), (t = u)),
                                    t === u && ((t = If), (n = Vh()) !== u && (r = Oh()) !== u && Gh() !== u ? ((Vf = t), (t = ls(r))) : ((If = t), (t = u)), t === u && ((t = If), (n = Sh()) !== u && ((Vf = t), (n = hs(n))), (t = n))),
                                    t
                                );
                            }
                            function Oh() {
                                var n, r, e, o, a, i, c, s, f, l, h, v;
                                if (((n = If), (r = nh()), (e = Mh()) !== u))
                                    if ((t.substr(If, 4) === Jn ? ((o = Jn), (If += 4)) : ((o = u), 0 === Lf && Xf(ha)), o !== u))
                                        if ((a = rh()) !== u)
                                            if (((i = Nh()) === u && (i = null), (c = nh()), (s = Qh()) !== u)) {
                                                for (nh(), f = [], l = If, (h = Oh()) !== u && ((Vf = l), (h = vs(i, h))), l = h; l !== u; ) f.push(l), (l = If), (h = Oh()) !== u && ((Vf = l), (h = vs(i, h))), (l = h);
                                                (Vf = n), (n = ps(i, f));
                                            } else (If = n), (n = u);
                                        else (If = n), (n = u);
                                    else (If = n), (n = u);
                                else (If = n), (n = u);
                                if (n === u) {
                                    if (((n = If), (r = nh()), (e = Mh()) !== u))
                                        if ((t.substr(If, 4) === Xn ? ((o = Xn), (If += 4)) : ((o = u), 0 === Lf && Xf(va)), o !== u))
                                            if ((a = rh()) !== u)
                                                if (((i = Dh()) === u && (i = null), (c = nh()), (s = Qh()) !== u)) {
                                                    for (nh(), f = [], l = If, (h = Oh()) !== u && ((Vf = l), (h = ms(i, h))), l = h; l !== u; ) f.push(l), (l = If), (h = Oh()) !== u && ((Vf = l), (h = ms(i, h))), (l = h);
                                                    (Vf = n), (n = bs(i, f));
                                                } else (If = n), (n = u);
                                            else (If = n), (n = u);
                                        else (If = n), (n = u);
                                    else (If = n), (n = u);
                                    if (n === u) {
                                        if (((n = If), (r = nh()), (e = Mh()) !== u))
                                            if ((37 === t.charCodeAt(If) ? ((o = tr), If++) : ((o = u), 0 === Lf && Xf(pa)), o !== u))
                                                if ((a = Zh()) !== u)
                                                    if ((i = rh()) !== u)
                                                        if ((c = _h()) !== u)
                                                            if (((s = nh()), Qh() !== u)) {
                                                                for (f = nh(), l = [], h = If, (v = Oh()) !== u && ((Vf = h), (v = ds(a, c, v))), h = v; h !== u; )
                                                                    l.push(h), (h = If), (v = Oh()) !== u && ((Vf = h), (v = ds(a, c, v))), (h = v);
                                                                (Vf = n), (n = gs(a, c, l));
                                                            } else (If = n), (n = u);
                                                        else (If = n), (n = u);
                                                    else (If = n), (n = u);
                                                else (If = n), (n = u);
                                            else (If = n), (n = u);
                                        else (If = n), (n = u);
                                        if (n === u) {
                                            if (((n = If), (r = nh()), (e = Mh()) !== u))
                                                if ((37 === t.charCodeAt(If) ? ((o = tr), If++) : ((o = u), 0 === Lf && Xf(pa)), o !== u))
                                                    if ((a = Kh()) !== u)
                                                        if ((i = rh()) !== u)
                                                            if ((c = Yh()) !== u)
                                                                if (((s = nh()), Qh() !== u)) {
                                                                    for (f = nh(), l = [], h = If, (v = Oh()) !== u && ((Vf = h), (v = As(a, c, v))), h = v; h !== u; )
                                                                        l.push(h), (h = If), (v = Oh()) !== u && ((Vf = h), (v = As(a, c, v))), (h = v);
                                                                    (Vf = n), (n = Cs(a, c, l));
                                                                } else (If = n), (n = u);
                                                            else (If = n), (n = u);
                                                        else (If = n), (n = u);
                                                    else (If = n), (n = u);
                                                else (If = n), (n = u);
                                            else (If = n), (n = u);
                                            if (n === u) {
                                                if (((n = If), (r = nh()), (e = Mh()) !== u))
                                                    if ((t.substr(If, 5) === nr ? ((o = nr), (If += 5)) : ((o = u), 0 === Lf && Xf(ma)), o !== u))
                                                        if ((a = rh()) !== u)
                                                            if (((i = uh()), (c = nh()), (s = Qh()) !== u)) {
                                                                for (nh(), f = [], l = If, (h = Oh()) !== u && ((Vf = l), (h = ks(i, h))), l = h; l !== u; ) f.push(l), (l = If), (h = Oh()) !== u && ((Vf = l), (h = ks(i, h))), (l = h);
                                                                (Vf = n), (n = ys(i, f));
                                                            } else (If = n), (n = u);
                                                        else (If = n), (n = u);
                                                    else (If = n), (n = u);
                                                else (If = n), (n = u);
                                                if (n === u) {
                                                    if (((n = If), (r = nh()), (e = Mh()) !== u))
                                                        if ((37 === t.charCodeAt(If) ? ((o = tr), If++) : ((o = u), 0 === Lf && Xf(pa)), o !== u))
                                                            if (((a = uh()), (i = rh()) !== u)) {
                                                                if (((c = []), (s = Rh()) !== u)) for (; s !== u; ) c.push(s), (s = Rh());
                                                                else c = u;
                                                                if (c !== u)
                                                                    if ((s = Qh()) !== u) {
                                                                        for (nh(), f = [], l = If, (h = Oh()) !== u && ((Vf = l), (h = Bs(a, c, h))), l = h; l !== u; )
                                                                            f.push(l), (l = If), (h = Oh()) !== u && ((Vf = l), (h = Bs(a, c, h))), (l = h);
                                                                        (Vf = n), (n = Ts(a, c, f));
                                                                    } else (If = n), (n = u);
                                                                else (If = n), (n = u);
                                                            } else (If = n), (n = u);
                                                        else (If = n), (n = u);
                                                    else (If = n), (n = u);
                                                    if (n === u) {
                                                        if (((n = If), (r = []), (e = Uh()) !== u)) for (; e !== u; ) r.push(e), (e = Uh());
                                                        else r = u;
                                                        if (r !== u) {
                                                            for (e = [], o = If, a = nh(), (i = Oh()) !== u ? ((Vf = o), (o = Es(r, i))) : ((If = o), (o = u)); o !== u; )
                                                                e.push(o), (o = If), (a = nh()), (i = Oh()) !== u ? ((Vf = o), (o = Es(r, i))) : ((If = o), (o = u));
                                                            (Vf = n), (n = Ws(r, e));
                                                        } else (If = n), (n = u);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return n;
                            }
                            function Uh() {
                                var n, r, e, o;
                                return (
                                    (n = If),
                                    (r = If),
                                    Lf++,
                                    t.substr(If, 2) === rr ? ((e = rr), (If += 2)) : ((e = u), 0 === Lf && Xf(ba)),
                                    Lf--,
                                    e === u ? (r = void 0) : ((If = r), (r = u)),
                                    r !== u
                                        ? ((e = If),
                                          Lf++,
                                          125 === t.charCodeAt(If) ? ((o = er), If++) : ((o = u), 0 === Lf && Xf(da)),
                                          Lf--,
                                          o === u ? (e = void 0) : ((If = e), (e = u)),
                                          e !== u ? (t.length > If ? ((o = t.charAt(If)), If++) : ((o = u), 0 === Lf && Xf(ga)), o !== u ? ((Vf = n), (n = $s(o))) : ((If = n), (n = u))) : ((If = n), (n = u)))
                                        : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function Rh() {
                                var n, r, e;
                                return (
                                    (n = If),
                                    (r = If),
                                    Lf++,
                                    (e = Qh()),
                                    Lf--,
                                    e === u ? (r = void 0) : ((If = r), (r = u)),
                                    r !== u ? (t.length > If ? ((e = t.charAt(If)), If++) : ((e = u), 0 === Lf && Xf(ga)), e !== u ? ((Vf = n), (n = ws(e))) : ((If = n), (n = u))) : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function Sh() {
                                var n, r, e;
                                if (((n = If), Lh() !== u)) {
                                    for (r = [], e = t.charAt(If), ie.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Aa)); e !== u; ) r.push(e), (e = t.charAt(If)), ie.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Aa));
                                    (e = eh()) !== u ? ((Vf = n), (n = xs(r))) : ((If = n), (n = u));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function Nh() {
                                var n, r, e, o, a, i, c;
                                if (((n = If), (r = Fh()) !== u)) {
                                    for (
                                        nh(),
                                            e = [],
                                            o = If,
                                            44 === t.charCodeAt(If) ? ((a = ur), If++) : ((a = u), 0 === Lf && Xf(Ca)),
                                            a !== u ? ((i = nh()), (c = Fh()) !== u ? (o = a = [a, i, c]) : ((If = o), (o = u))) : ((If = o), (o = u));
                                        o !== u;

                                    )
                                        e.push(o),
                                            (o = If),
                                            44 === t.charCodeAt(If) ? ((a = ur), If++) : ((a = u), 0 === Lf && Xf(Ca)),
                                            a !== u ? ((i = nh()), (c = Fh()) !== u ? (o = a = [a, i, c]) : ((If = o), (o = u))) : ((If = o), (o = u));
                                    (Vf = n), (n = Os(r, e));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function Fh() {
                                var t, n, r;
                                return (t = If), (n = Ph()) !== u && (r = Ih()) !== u ? ((Vf = t), (t = Us(n, r))) : ((If = t), (t = u)), t;
                            }
                            function Dh() {
                                var n, r, e, o, a, i, c;
                                if (((n = If), (r = jh()) !== u)) {
                                    for (
                                        nh(),
                                            e = [],
                                            o = If,
                                            44 === t.charCodeAt(If) ? ((a = ur), If++) : ((a = u), 0 === Lf && Xf(Ca)),
                                            a !== u ? ((i = nh()), (c = jh()) !== u ? (o = a = [a, i, c]) : ((If = o), (o = u))) : ((If = o), (o = u));
                                        o !== u;

                                    )
                                        e.push(o),
                                            (o = If),
                                            44 === t.charCodeAt(If) ? ((a = ur), If++) : ((a = u), 0 === Lf && Xf(Ca)),
                                            a !== u ? ((i = nh()), (c = jh()) !== u ? (o = a = [a, i, c]) : ((If = o), (o = u))) : ((If = o), (o = u));
                                    (Vf = n), (n = Rs(r, e));
                                } else (If = n), (n = u);
                                return n;
                            }
                            function jh() {
                                var t, n, r, e;
                                return (t = If), (n = Ph()) !== u && (r = Ih()) !== u && (e = Ih()) !== u ? ((Vf = t), (t = Ss(n, r, e))) : ((If = t), (t = u)), t;
                            }
                            function Ph() {
                                var n, r;
                                return (
                                    (n = If),
                                    89 === t.charCodeAt(If) ? ((r = or), If++) : ((r = u), 0 === Lf && Xf(ka)),
                                    r !== u && ((Vf = n), (r = Ns())),
                                    (n = r) === u &&
                                        ((n = If),
                                        71 === t.charCodeAt(If) ? ((r = ar), If++) : ((r = u), 0 === Lf && Xf(ya)),
                                        r !== u && ((Vf = n), (r = Fs())),
                                        (n = r) === u &&
                                            ((n = If),
                                            82 === t.charCodeAt(If) ? ((r = ir), If++) : ((r = u), 0 === Lf && Xf(Ba)),
                                            r !== u && ((Vf = n), (r = Ds())),
                                            (n = r) === u &&
                                                ((n = If),
                                                66 === t.charCodeAt(If) ? ((r = cr), If++) : ((r = u), 0 === Lf && Xf(Ta)),
                                                r !== u && ((Vf = n), (r = js())),
                                                (n = r) === u &&
                                                    ((n = If),
                                                    79 === t.charCodeAt(If) ? ((r = sr), If++) : ((r = u), 0 === Lf && Xf(Ea)),
                                                    r !== u && ((Vf = n), (r = Ps())),
                                                    (n = r) === u && ((n = If), 67 === t.charCodeAt(If) ? ((r = fr), If++) : ((r = u), 0 === Lf && Xf(Wa)), r !== u && ((Vf = n), (r = Is())), (n = r)))))),
                                    n
                                );
                            }
                            function Ih() {
                                var t, n, r;
                                return (t = If), (n = mv()) !== u && (r = bv()) !== u ? ((Vf = t), (t = Vs(n, r))) : ((If = t), (t = u)), t;
                            }
                            function Vh() {
                                var n;
                                return 123 === t.charCodeAt(If) ? ((n = lr), If++) : ((n = u), 0 === Lf && Xf($a)), n;
                            }
                            function Gh() {
                                var n;
                                return 125 === t.charCodeAt(If) ? ((n = er), If++) : ((n = u), 0 === Lf && Xf(da)), n;
                            }
                            function Mh() {
                                var n;
                                return 91 === t.charCodeAt(If) ? ((n = hr), If++) : ((n = u), 0 === Lf && Xf(wa)), n;
                            }
                            function Qh() {
                                var n;
                                return 93 === t.charCodeAt(If) ? ((n = vr), If++) : ((n = u), 0 === Lf && Xf(xa)), n;
                            }
                            function Lh() {
                                var n;
                                return 59 === t.charCodeAt(If) ? ((n = pr), If++) : ((n = u), 0 === Lf && Xf(Oa)), n;
                            }
                            function Zh() {
                                var n, r;
                                return (
                                    (n = If),
                                    t.substr(If, 3) === mr ? ((r = mr), (If += 3)) : ((r = u), 0 === Lf && Xf(Ua)),
                                    r !== u && ((Vf = n), (r = Gs())),
                                    (n = r) === u &&
                                        ((n = If),
                                        t.substr(If, 3) === br ? ((r = br), (If += 3)) : ((r = u), 0 === Lf && Xf(Ra)),
                                        r !== u && ((Vf = n), (r = Ms())),
                                        (n = r) === u && ((n = If), t.substr(If, 3) === dr ? ((r = dr), (If += 3)) : ((r = u), 0 === Lf && Xf(Sa)), r !== u && ((Vf = n), (r = Qs())), (n = r))),
                                    n
                                );
                            }
                            function Kh() {
                                var n, r;
                                return (n = If), t.substr(If, 3) === gr ? ((r = gr), (If += 3)) : ((r = u), 0 === Lf && Xf(Na)), r !== u && ((Vf = n), (r = Ls())), (n = r);
                            }
                            function _h() {
                                var t, n, r, e, o;
                                return (t = If), (n = qh()) === u && (n = null), (r = Jh()) !== u ? ((e = Jh()) === u && (e = null), (o = hh()) === u && (o = null), (Vf = t), (t = Zs(n, r, e, o))) : ((If = t), (t = u)), t;
                            }
                            function Yh() {
                                var t, n, r, e;
                                return (t = If), (n = qh()) === u && (n = null), (r = Jh()) !== u ? ((e = Jh()) === u && (e = null), (Vf = t), (t = Ks(n, r, e))) : ((If = t), (t = u)), t;
                            }
                            function qh() {
                                var t, n, r;
                                return (t = If), (n = zh()) !== u ? ((r = Hh()) === u && (r = null), (Vf = t), (t = _s(n, r))) : ((If = t), (t = u)), t;
                            }
                            function zh() {
                                var n, r, e, o;
                                return (
                                    (n = If),
                                    (r = Jh()) !== u
                                        ? ((e = Jh()) === u && (e = null), 58 === t.charCodeAt(If) ? ((o = Gn), If++) : ((o = u), 0 === Lf && Xf(ta)), o !== u ? ((Vf = n), (n = Ys(r, e))) : ((If = n), (n = u)))
                                        : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function Hh() {
                                var n, r, e, o;
                                return (
                                    (n = If),
                                    (r = Jh()) !== u
                                        ? ((e = Jh()) === u && (e = null), 58 === t.charCodeAt(If) ? ((o = Gn), If++) : ((o = u), 0 === Lf && Xf(ta)), o !== u ? ((Vf = n), (n = qs(r, e))) : ((If = n), (n = u)))
                                        : ((If = n), (n = u)),
                                    n
                                );
                            }
                            function Jh() {
                                var n, r;
                                return (n = If), (r = t.charAt(If)), oe.test(r) ? If++ : ((r = u), 0 === Lf && Xf(Xo)), r !== u && ((Vf = n), (r = zs(r))), (n = r);
                            }
                            function Xh() {
                                var t, n, r;
                                return (t = If), tv() !== u && (n = Eh()) !== u && nv() !== u ? (nh(), (r = Xh()) === u && (r = null), (Vf = t), (t = Hs(n, r))) : ((If = t), (t = u)), t;
                            }
                            function tv() {
                                var n;
                                return 40 === t.charCodeAt(If) ? ((n = Ar), If++) : ((n = u), 0 === Lf && Xf(Fa)), n;
                            }
                            function nv() {
                                var n;
                                return 41 === t.charCodeAt(If) ? ((n = Cr), If++) : ((n = u), 0 === Lf && Xf(Da)), n;
                            }
                            function rv() {
                                var t, n, r, e, o, a, i;
                                if (((t = If), (n = uv()) !== u)) {
                                    for (r = [], e = ov(); e !== u; ) r.push(e), (e = ov());
                                    for (e = [], o = ev(); o !== u; ) e.push(o), (o = ev());
                                    for (o = [], a = ov(); a !== u; ) o.push(a), (a = ov());
                                    for (a = [], i = ev(); i !== u; ) a.push(i), (i = ev());
                                    (Vf = t), (t = Js(n));
                                } else (If = t), (t = u);
                                return t;
                            }
                            function ev() {
                                var n;
                                return 46 === t.charCodeAt(If) ? ((n = Vn), If++) : ((n = u), 0 === Lf && Xf(Jo)), n;
                            }
                            function uv() {
                                var n, r, e;
                                if ((Lf++, (n = If), (r = []), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo)), e !== u))
                                    for (; e !== u; ) r.push(e), (e = t.charAt(If)), oe.test(e) ? If++ : ((e = u), 0 === Lf && Xf(Xo));
                                else r = u;
                                return r !== u && ((Vf = n), (r = Xs(r))), Lf--, (n = r) === u && ((r = u), 0 === Lf && Xf(ja)), n;
                            }
                            function ov() {
                                var n, r, e;
                                if (((n = If), (r = []), 32 === t.charCodeAt(If) ? ((e = kr), If++) : ((e = u), 0 === Lf && Xf(Pa)), e !== u))
                                    for (; e !== u; ) r.push(e), 32 === t.charCodeAt(If) ? ((e = kr), If++) : ((e = u), 0 === Lf && Xf(Pa));
                                else r = u;
                                return r !== u && ((Vf = n), (r = tf())), (n = r);
                            }
                            function av() {
                                var n, r, e, o, a, i, c, s, f;
                                return (
                                    (n = If),
                                    (r = vv()) === u && (r = null),
                                    (e = If),
                                    Lf++,
                                    (o = hv()),
                                    Lf--,
                                    o !== u ? ((If = e), (e = void 0)) : (e = u),
                                    e !== u && (o = lv()) !== u
                                        ? ((a = dv()) === u && (a = null),
                                          (i = mv()) !== u && (c = bv()) !== u
                                              ? ((s = cv()) === u && (s = null), (f = iv()) === u && (f = null), nh(), t.substr(If, 4) === yr ? (If += 4) : 0 === Lf && Xf(Ia), (Vf = n), (n = nf(r, o, a, i, c, s, f)))
                                              : ((If = n), (n = u)))
                                        : ((If = n), (n = u)),
                                    n === u &&
                                        ((n = If),
                                        (r = vv()) === u && (r = null),
                                        (e = mv()) !== u && (o = bv()) !== u
                                            ? ((a = gv()) === u && (a = null),
                                              (i = mv()) !== u && (c = bv()) !== u ? ((s = cv()) === u && (s = null), (f = iv()) === u && (f = null), (Vf = n), (n = rf(r, e, o, a, i, c, s, f))) : ((If = n), (n = u)))
                                            : ((If = n), (n = u)),
                                        n === u &&
                                            ((n = If),
                                            (r = vv()) === u && (r = null),
                                            (e = dv()) === u && (e = null),
                                            (o = mv()) !== u && (a = bv()) !== u ? ((i = cv()) === u && (i = null), (c = iv()) === u && (c = null), (Vf = n), (n = ef(r, e, o, a, i, c))) : ((If = n), (n = u)),
                                            n === u &&
                                                ((n = If),
                                                t.substr(If, 5) === Br ? ((r = Br), (If += 5)) : ((r = u), 0 === Lf && Xf(Va)),
                                                r !== u ? ((e = iv()) === u && (e = null), (Vf = n), (n = uf(e))) : ((If = n), (n = u)),
                                                n === u &&
                                                    ((n = If),
                                                    t.substr(If, 3) === Tr ? ((r = Tr), (If += 3)) : ((r = u), 0 === Lf && Xf(Ga)),
                                                    r !== u ? ((e = iv()) === u && (e = null), (Vf = n), (n = of(e))) : ((If = n), (n = u)),
                                                    n === u &&
                                                        ((n = If),
                                                        (r = vv()) !== u
                                                            ? (64 === t.charCodeAt(If) ? ((e = Er), If++) : ((e = u), 0 === Lf && Xf(Ma)),
                                                              e !== u && (o = mv()) !== u && (a = bv()) !== u ? ((Vf = n), (n = af(r, o, a))) : ((If = n), (n = u)))
                                                            : ((If = n), (n = u)),
                                                        n === u &&
                                                            ((n = If),
                                                            t.substr(If, 2) === Wr ? ((r = Wr), (If += 2)) : ((r = u), 0 === Lf && Xf(Qa)),
                                                            r === u &&
                                                                ((r = If),
                                                                45 === t.charCodeAt(If) ? ((e = Ln), If++) : ((e = u), 0 === Lf && Xf(ua)),
                                                                e !== u ? (45 === t.charCodeAt(If) ? ((o = Ln), If++) : ((o = u), 0 === Lf && Xf(ua)), o !== u ? (r = e = [e, o]) : ((If = r), (r = u))) : ((If = r), (r = u))),
                                                            r !== u && ((Vf = n), (r = cf())),
                                                            (n = r))))))),
                                    n
                                );
                            }
                            function iv() {
                                var n, r, e, o;
                                return (
                                    (n = If),
                                    (r = If),
                                    (e = If),
                                    Lf++,
                                    t.substr(If, 2) === $r ? ((o = $r), (If += 2)) : ((o = u), 0 === Lf && Xf(La)),
                                    Lf--,
                                    o === u ? (e = void 0) : ((If = e), (e = u)),
                                    e !== u ? (43 === t.charCodeAt(If) ? ((o = Zn), If++) : ((o = u), 0 === Lf && Xf(oa)), o !== u ? (r = e = [e, o]) : ((If = r), (r = u))) : ((If = r), (r = u)),
                                    r !== u && ((Vf = n), (r = sf(r))),
                                    (n = r) === u &&
                                        ((n = If),
                                        (r = If),
                                        (e = If),
                                        Lf++,
                                        t.substr(If, 3) === wr ? ((o = wr), (If += 3)) : ((o = u), 0 === Lf && Xf(Za)),
                                        Lf--,
                                        o === u ? (e = void 0) : ((If = e), (e = u)),
                                        e !== u ? (35 === t.charCodeAt(If) ? ((o = xr), If++) : ((o = u), 0 === Lf && Xf(Ka)), o !== u ? (r = e = [e, o]) : ((If = r), (r = u))) : ((If = r), (r = u)),
                                        r !== u && ((Vf = n), (r = ff(r))),
                                        (n = r)),
                                    n
                                );
                            }
                            function cv() {
                                var n, r;
                                return (n = If), 61 === t.charCodeAt(If) ? If++ : 0 === Lf && Xf(la), (r = pv()) !== u ? ((Vf = n), (n = lf(r))) : ((If = n), (n = u)), n;
                            }
                            function sv() {
                                var t, n, r;
                                return (t = If), (n = fv()) !== u ? (nh(), (r = sv()) === u && (r = null), (Vf = t), (t = hf(n, r))) : ((If = t), (t = u)), t;
                            }
                            function fv() {
                                var n, r, e;
                                return (
                                    (n = If),
                                    36 === t.charCodeAt(If) ? ((r = Or), If++) : ((r = u), 0 === Lf && Xf(_a)),
                                    r !== u && (e = uv()) !== u ? ((Vf = n), (n = vf(e))) : ((If = n), (n = u)),
                                    n === u &&
                                        ((n = If),
                                        t.substr(If, 2) === Ur ? ((r = Ur), (If += 2)) : ((r = u), 0 === Lf && Xf(Ya)),
                                        r !== u && ((Vf = n), (r = pf())),
                                        (n = r) === u &&
                                            ((n = If),
                                            t.substr(If, 2) === Rr ? ((r = Rr), (If += 2)) : ((r = u), 0 === Lf && Xf(qa)),
                                            r !== u && ((Vf = n), (r = mf())),
                                            (n = r) === u &&
                                                ((n = If),
                                                t.substr(If, 2) === Sr ? ((r = Sr), (If += 2)) : ((r = u), 0 === Lf && Xf(za)),
                                                r !== u && ((Vf = n), (r = bf())),
                                                (n = r) === u &&
                                                    ((n = If),
                                                    t.substr(If, 2) === Nr ? ((r = Nr), (If += 2)) : ((r = u), 0 === Lf && Xf(Ha)),
                                                    r !== u && ((Vf = n), (r = df())),
                                                    (n = r) === u &&
                                                        ((n = If),
                                                        33 === t.charCodeAt(If) ? ((r = Fr), If++) : ((r = u), 0 === Lf && Xf(Ja)),
                                                        r !== u && ((Vf = n), (r = gf())),
                                                        (n = r) === u &&
                                                            ((n = If),
                                                            63 === t.charCodeAt(If) ? ((r = Qn), If++) : ((r = u), 0 === Lf && Xf(ea)),
                                                            r !== u && ((Vf = n), (r = Af())),
                                                            (n = r) === u &&
                                                                ((n = If),
                                                                8252 === t.charCodeAt(If) ? ((r = Dr), If++) : ((r = u), 0 === Lf && Xf(Xa)),
                                                                r !== u && ((Vf = n), (r = Cf())),
                                                                (n = r) === u &&
                                                                    ((n = If),
                                                                    8263 === t.charCodeAt(If) ? ((r = jr), If++) : ((r = u), 0 === Lf && Xf(ti)),
                                                                    r !== u && ((Vf = n), (r = kf())),
                                                                    (n = r) === u &&
                                                                        ((n = If),
                                                                        8265 === t.charCodeAt(If) ? ((r = Pr), If++) : ((r = u), 0 === Lf && Xf(ni)),
                                                                        r !== u && ((Vf = n), (r = yf())),
                                                                        (n = r) === u &&
                                                                            ((n = If),
                                                                            8264 === t.charCodeAt(If) ? ((r = Ir), If++) : ((r = u), 0 === Lf && Xf(ri)),
                                                                            r !== u && ((Vf = n), (r = Bf())),
                                                                            (n = r) === u &&
                                                                                ((n = If),
                                                                                9633 === t.charCodeAt(If) ? ((r = Vr), If++) : ((r = u), 0 === Lf && Xf(ei)),
                                                                                r !== u && ((Vf = n), (r = Tf())),
                                                                                (n = r) === u &&
                                                                                    ((n = If),
                                                                                    61 === t.charCodeAt(If) ? ((r = Hn), If++) : ((r = u), 0 === Lf && Xf(la)),
                                                                                    r !== u && ((Vf = n), (r = Ef())),
                                                                                    (n = r) === u &&
                                                                                        ((n = If),
                                                                                        8734 === t.charCodeAt(If) ? ((r = Gr), If++) : ((r = u), 0 === Lf && Xf(ui)),
                                                                                        r !== u && ((Vf = n), (r = Wf())),
                                                                                        (n = r) === u &&
                                                                                            ((n = If),
                                                                                            10866 === t.charCodeAt(If) ? ((r = Mr), If++) : ((r = u), 0 === Lf && Xf(oi)),
                                                                                            r !== u && ((Vf = n), (r = $f())),
                                                                                            (n = r) === u &&
                                                                                                ((n = If),
                                                                                                10865 === t.charCodeAt(If) ? ((r = Qr), If++) : ((r = u), 0 === Lf && Xf(ai)),
                                                                                                r !== u && ((Vf = n), (r = wf())),
                                                                                                (n = r) === u &&
                                                                                                    ((n = If),
                                                                                                    177 === t.charCodeAt(If) ? ((r = Lr), If++) : ((r = u), 0 === Lf && Xf(ii)),
                                                                                                    r !== u && ((Vf = n), (r = xf())),
                                                                                                    (n = r) === u &&
                                                                                                        ((n = If),
                                                                                                        8723 === t.charCodeAt(If) ? ((r = Zr), If++) : ((r = u), 0 === Lf && Xf(ci)),
                                                                                                        r !== u && ((Vf = n), (r = Of())),
                                                                                                        (n = r) === u &&
                                                                                                            ((n = If),
                                                                                                            t.substr(If, 2) === $r ? ((r = $r), (If += 2)) : ((r = u), 0 === Lf && Xf(La)),
                                                                                                            r !== u && ((Vf = n), (r = Uf())),
                                                                                                            (n = r) === u &&
                                                                                                                ((n = If),
                                                                                                                t.substr(If, 2) === Kr ? ((r = Kr), (If += 2)) : ((r = u), 0 === Lf && Xf(si)),
                                                                                                                r !== u && ((Vf = n), (r = Rf())),
                                                                                                                (n = r) === u &&
                                                                                                                    ((n = If),
                                                                                                                    10752 === t.charCodeAt(If) ? ((r = _r), If++) : ((r = u), 0 === Lf && Xf(fi)),
                                                                                                                    r !== u && ((Vf = n), (r = Sf())),
                                                                                                                    (n = r) === u &&
                                                                                                                        ((n = If),
                                                                                                                        10227 === t.charCodeAt(If) ? ((r = Yr), If++) : ((r = u), 0 === Lf && Xf(li)),
                                                                                                                        r !== u && ((Vf = n), (r = Nf())),
                                                                                                                        (n = r) === u &&
                                                                                                                            ((n = If),
                                                                                                                            8594 === t.charCodeAt(If) ? ((r = qr), If++) : ((r = u), 0 === Lf && Xf(hi)),
                                                                                                                            r !== u && ((Vf = n), (r = Ff())),
                                                                                                                            (n = r) === u &&
                                                                                                                                ((n = If),
                                                                                                                                8593 === t.charCodeAt(If) ? ((r = zr), If++) : ((r = u), 0 === Lf && Xf(vi)),
                                                                                                                                r !== u && ((Vf = n), (r = Df())),
                                                                                                                                (n = r) === u &&
                                                                                                                                    ((n = If),
                                                                                                                                    8646 === t.charCodeAt(If) ? ((r = Hr), If++) : ((r = u), 0 === Lf && Xf(pi)),
                                                                                                                                    r !== u && ((Vf = n), (r = jf())),
                                                                                                                                    (n = r) === u &&
                                                                                                                                        ((n = If),
                                                                                                                                        68 === t.charCodeAt(If) ? ((r = Jr), If++) : ((r = u), 0 === Lf && Xf(mi)),
                                                                                                                                        r !== u && ((Vf = n), (r = Pf())),
                                                                                                                                        (n = r)))))))))))))))))))))))))),
                                    n
                                );
                            }
                            function lv() {
                                var n;
                                return (n = t.charAt(If)), ce.test(n) ? If++ : ((n = u), 0 === Lf && Xf(bi)), n;
                            }
                            function hv() {
                                var t, n, r, e, o;
                                return (t = If), (n = lv()) !== u ? ((r = dv()) === u && (r = null), (e = mv()) !== u && (o = bv()) !== u ? (t = n = [n, r, e, o]) : ((If = t), (t = u))) : ((If = t), (t = u)), t;
                            }
                            function vv() {
                                var n;
                                return (n = t.charAt(If)), se.test(n) ? If++ : ((n = u), 0 === Lf && Xf(di)), n;
                            }
                            function pv() {
                                var n;
                                return (n = t.charAt(If)), fe.test(n) ? If++ : ((n = u), 0 === Lf && Xf(gi)), n;
                            }
                            function mv() {
                                var n;
                                return (n = t.charAt(If)), le.test(n) ? If++ : ((n = u), 0 === Lf && Xf(Ai)), n;
                            }
                            function bv() {
                                var n;
                                return (n = t.charAt(If)), he.test(n) ? If++ : ((n = u), 0 === Lf && Xf(Ci)), n;
                            }
                            function dv() {
                                var n;
                                return 120 === t.charCodeAt(If) ? ((n = Xr), If++) : ((n = u), 0 === Lf && Xf(ki)), n;
                            }
                            function gv() {
                                var n;
                                return (n = t.charAt(If)), ve.test(n) ? If++ : ((n = u), 0 === Lf && Xf(yi)), n;
                            }
                            var Av = [];
                            function Cv(t) {
                                var n = Object.assign(t, Zf());
                                return Av.push(n), n;
                            }
                            function kv(t) {
                                return parseInt(t.join(""), 10);
                            }
                            function yv(t) {
                                return t.join("").match(/\?/) ? t.join("") : kv(t);
                            }
                            function Bv(t) {
                                var n = {};
                                return (
                                    t.forEach(function (t) {
                                        for (var r in t) Array.isArray(t[r]) ? (n[r] = n[r] ? n[r].concat(t[r]) : t[r]) : (n[r] = n[r] ? Ev(n[r]) + " " + Tv(t[r]) : t[r]);
                                    }),
                                    n
                                );
                            }
                            function Tv(t) {
                                if ("string" != typeof t) return t;
                                var n = /^\s+/;
                                return t.replace(n, "");
                            }
                            function Ev(t) {
                                if ("string" != typeof t) return t;
                                var n = /\s+$/;
                                return t.replace(n, "");
                            }
                            if (((e = i()), r.peg$library)) return { peg$result: e, peg$currPos: If, peg$FAILED: u, peg$maxFailExpected: Qf, peg$maxFailPos: Mf };
                            if (e !== u && If === t.length) return e;
                            throw (e !== u && If < t.length && Xf(qf()), tl(Qf, Mf < t.length ? t.charAt(Mf) : null, Mf < t.length ? Jf(Mf, Mf + 1) : Jf(Mf, Mf),t,Mf));  // Customized line
                            //throw (e !== u && If < t.length && Xf(qf()), tl(Qf, Mf < t.length ? t.charAt(Mf) : null, Mf < t.length ? Jf(Mf, Mf + 1) : Jf(Mf, Mf)));  // Original Line
                        }
                        return (
                            t(n, Error),
                            (n.prototype.format = function (t) {
                                var n = "Error: " + this.message;
                                if (this.location) {
                                    var e,
                                        u = null;
                                    for (e = 0; e < t.length; e++)
                                        if (t[e].source === this.location.source) {
                                            u = t[e].text.split(/\r\n|\n|\r/g);
                                            break;
                                        }
                                    var o = this.location.start,
                                        a = this.location.source && "function" == typeof this.location.source.offset ? this.location.source.offset(o) : o,
                                        i = this.location.source + ":" + a.line + ":" + a.column;
                                    if (u) {
                                        var c = this.location.end,
                                            s = r("", a.line.toString().length, " "),
                                            f = u[o.line - 1],
                                            l = (o.line === c.line ? c.column : f.length + 1) - o.column || 1;
                                        n += "\n --\x3e " + i + "\n" + s + " |\n" + a.line + " | " + f + "\n" + s + " | " + r("", o.column - 1, " ") + r("", l, "^");
                                    } else n += "\n at " + i;
                                }
                                return n;
                            }),
                            (n.buildMessage = function (t, n) {
                                var r = {
                                    literal: function (t) {
                                        return '"' + u(t.text) + '"';
                                    },
                                    class: function (t) {
                                        var n = t.parts.map(function (t) {
                                            return Array.isArray(t) ? o(t[0]) + "-" + o(t[1]) : o(t);
                                        });
                                        return "[" + (t.inverted ? "^" : "") + n.join("") + "]";
                                    },
                                    any: function () {
                                        return "any character";
                                    },
                                    end: function () {
                                        return "end of input";
                                    },
                                    other: function (t) {
                                        return t.description;
                                    },
                                };
                                function e(t) {
                                    return t.charCodeAt(0).toString(16).toUpperCase();
                                }
                                function u(t) {
                                    return t
                                        .replace(/\\/g, "\\\\")
                                        .replace(/"/g, '\\"')
                                        .replace(/\0/g, "\\0")
                                        .replace(/\t/g, "\\t")
                                        .replace(/\n/g, "\\n")
                                        .replace(/\r/g, "\\r")
                                        .replace(/[\x00-\x0F]/g, function (t) {
                                            return "\\x0" + e(t);
                                        })
                                        .replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
                                            return "\\x" + e(t);
                                        });
                                }
                                function o(t) {
                                    return t
                                        .replace(/\\/g, "\\\\")
                                        .replace(/\]/g, "\\]")
                                        .replace(/\^/g, "\\^")
                                        .replace(/-/g, "\\-")
                                        .replace(/\0/g, "\\0")
                                        .replace(/\t/g, "\\t")
                                        .replace(/\n/g, "\\n")
                                        .replace(/\r/g, "\\r")
                                        .replace(/[\x00-\x0F]/g, function (t) {
                                            return "\\x0" + e(t);
                                        })
                                        .replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
                                            return "\\x" + e(t);
                                        });
                                }
                                function a(t) {
                                    return r[t.type](t);
                                }
                                function i(t) {
                                    var n,
                                        r,
                                        e = t.map(a);
                                    if ((e.sort(), e.length > 0)) {
                                        for (n = 1, r = 1; n < e.length; n++) e[n - 1] !== e[n] && ((e[r] = e[n]), r++);
                                        e.length = r;
                                    }
                                    switch (e.length) {
                                        case 1:
                                            return e[0];
                                        case 2:
                                            return e[0] + " or " + e[1];
                                        default:
                                            return e.slice(0, -1).join(", ") + ", or " + e[e.length - 1];
                                    }
                                }
                                function c(t) {
                                    return t ? '"' + u(t) + '"' : "end of input";
                                }
                                return "Expected " + i(t) + " but " + c(n) + " found.";
                            }),
                            { StartRules: ["pgn", "tags", "game", "games"], SyntaxError: n, parse: e }
                        );
                    });
                })(e)),
            e.exports
        );
    }
    e.exports;
    var o = n(u());
    function a(t, n) {
        return n && "games" !== n.startRule ? i(t, n) : s(t, n);
    }
    function i(t, n = { startRule: "game" }) {
        t = t.trim();
        let r = o.parse(t, n),
            e = { moves: [], messages: [] };
        return "pgn" === n.startRule ? (e.moves = r) : "tags" === n.startRule ? (e.tags = r) : (e = r), c(e, t, n);
    }
    function c(t, n, r) {
        function e(t) {
            if ("tags" !== r.startRule) {
                let n = t.moves[t.moves.length - 1];
                if ("string" == typeof n && (t.moves.pop(), t.tags)) {
                    let r = t.tags.Result;
                    r && n !== r && t.messages.push({ key: "Result", value: r, message: "Result in tags is different to result in SAN" }), (t.tags.Result = n);
                }
            }
            return t;
        }
        function u(t) {
            function n(t) {
                function n(t) {
                    return t.split(/\s+/)[1];
                }
                function e(t, n) {
                    function r(t) {
                        return "w" === t ? "b" : "w";
                    }
                    return (
                        (t.turn = n),
                        t.variations &&
                            t.variations.forEach(function (t) {
                                let r = n;
                                t.forEach((t) => (r = e(t, r)));
                            }),
                        r(n)
                    );
                }
                const u = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
                let o = n(r.fen || (t.tags && t.tags.FEN) || u);
                return t.moves.forEach((t) => (o = e(t, o))), t;
            }
            return t.moves ? n(t) : t;
        }
        return u(e(t));
    }
    function s(t, n = { startRule: "games" }) {
        function r(t) {
            if (!Array.isArray(t)) return [];
            if (0 === t.length) return t;
            let n = t.pop();
            return (void 0 !== n.tags || n.moves.length > 0) && t.push(n), t;
        }
        function e(t, n, e = { startRule: "games" }) {
            return r(t);
        }
        const u = Object.assign({ startRule: "games" }, n);
        let a = o.parse(t, u);
        return a
            ? (e(a, t, u),
              a.forEach((n) => {
                  c(n, t, u);
              }),
              a)
            : [];
    }
    const f = (t, n = "\n") => t.replace(/\r?\n/g, n);
    function l(t, n = { startRule: "games" }) {
        let r = f(t).split(/\n\n+/),
            e = [],
            u = { tags: "", pgn: "", all: "" };
        return (
            r.forEach(function (t) {
                if (t.startsWith("[")) u.tags = t;
                else if (t) {
                    u.pgn = t;
                    let n = u.tags ? u.tags + "\n\n" + u.pgn : u.pgn;
                    (u.all = n), e.push(u), (u = { tags: "", pgn: "", all: "" });
                }
            }),
            e
        );
    }
    (t.parse = a), (t.parseGame = i), (t.parseGames = s), (t.split = l);
})(t.exports);
var n = t.exports,
    r = t.exports.parse,
    e = t.exports.parseGame,
    u = t.exports.parseGames,
    o = t.exports.split;
export { n as default, r as parse, e as parseGame, u as parseGames, o as split };
//# sourceMappingURL=/sm/6310018d0884e04ac93347771120b1c39a15da4ec16d8568c2e3b4ee43363fcf.map
