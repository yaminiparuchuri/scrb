(function () {
    var e = window.AmCharts;
    e.AmSerialChart = e.Class({
        inherits: e.AmRectangularChart, construct: function (a) {
            this.type = "serial";
            e.AmSerialChart.base.construct.call(this, a);
            this.cname = "AmSerialChart";
            this.theme = a;
            this.createEvents("changed");
            this.columnSpacing = 5;
            this.columnSpacing3D = 0;
            this.columnWidth = .8;
            this.updateScrollbar = !0;
            var b = new e.CategoryAxis(a);
            b.chart = this;
            this.categoryAxis = b;
            this.zoomOutOnDataUpdate = !0;
            this.mouseWheelZoomEnabled = this.mouseWheelScrollEnabled = this.rotate = this.skipZoom = !1;
            this.minSelectedTime = 0;
            e.applyTheme(this, a, this.cname)
        }, initChart: function () {
            e.AmSerialChart.base.initChart.call(this);
            this.updateCategoryAxis(this.categoryAxis, this.rotate, "categoryAxis");
            this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
            var a = this.chartCursor;
            a && a.updateData && (a.updateData(), a.fullWidth && (a.fullRectSet = this.cursorLineSet));
            var a = this.countColumns(), b = this.graphs, c;
            for (c = 0; c < b.length; c++)b[c].columnCount = a;
            this.updateScrollbar = !0;
            this.drawChart();
            this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
        }, handleWheelReal: function (a, b) {
            if (!this.wheelBusy) {
                var c = this.categoryAxis, d = c.parseDates, g = c.minDuration(), e = c = 1;
                this.mouseWheelZoomEnabled ? b || (c = -1) : b && (c = -1);
                var f = this.chartData.length, k = this.lastTime, m = this.firstTime;
                0 > a ? d ? (f = this.endTime - this.startTime, d = this.startTime + c * g, g = this.endTime + e * g, 0 < e && 0 < c && g >= k && (g = k, d = k - f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < c && this.end >= f - 1 && (c = e = 0), d = this.start +
                    c, g = this.end + e, this.zoomToIndexes(d, g)) : d ? (f = this.endTime - this.startTime, d = this.startTime - c * g, g = this.endTime - e * g, 0 < e && 0 < c && d <= m && (d = m, g = m + f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < c && 1 > this.start && (c = e = 0), d = this.start - c, g = this.end - e, this.zoomToIndexes(d, g))
            }
        }, validateData: function (a) {
            this.marginsUpdated = !1;
            this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
            e.AmSerialChart.base.validateData.call(this)
        }, drawChart: function () {
            if (0 < this.realWidth && 0 < this.realHeight) {
                e.AmSerialChart.base.drawChart.call(this);
                var a = this.chartData;
                if (e.ifArray(a)) {
                    var b = this.chartScrollbar;
                    b && b.draw();
                    var a = a.length - 1, c, b = this.categoryAxis;
                    if (b.parseDates && !b.equalSpacing) {
                        if (b = this.startTime, c = this.endTime, isNaN(b) || isNaN(c))b = this.firstTime, c = this.lastTime
                    } else if (b = this.start, c = this.end, isNaN(b) || isNaN(c))b = 0, c = a;
                    this.endTime = this.startTime = this.end = this.start = void 0;
                    this.zoom(b, c)
                }
            } else this.cleanChart();
            this.dispDUpd()
        }, cleanChart: function () {
            e.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
        }, updateCategoryAxis: function (a, b, c) {
            a.chart = this;
            a.id = c;
            a.rotate = b;
            a.axisRenderer = e.RecAxis;
            a.guideFillRenderer = e.RecFill;
            a.axisItemRenderer = e.RecItem;
            a.setOrientation(!this.rotate);
            a.x = this.marginLeftReal;
            a.y = this.marginTopReal;
            a.dx = this.dx;
            a.dy = this.dy;
            a.width = this.plotAreaWidth - 1;
            a.height = this.plotAreaHeight - 1;
            a.viW = this.plotAreaWidth - 1;
            a.viH = this.plotAreaHeight - 1;
            a.viX = this.marginLeftReal;
            a.viY = this.marginTopReal;
            a.marginsChanged = !0
        }, updateValueAxes: function () {
            e.AmSerialChart.base.updateValueAxes.call(this);
            var a = this.valueAxes, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b], d = this.rotate;
                c.rotate = d;
                c.setOrientation(d);
                d = this.categoryAxis;
                if (!d.startOnAxis || d.parseDates)c.expandMinMax = !0
            }
        }, updateData: function () {
            this.parseData();
            var a = this.graphs, b, c = this.chartData;
            for (b = 0; b < a.length; b++)a[b].data = c;
            0 < c.length && (this.firstTime = this.getStartTime(c[0].time), this.lastTime = this.getEndTime(c[c.length - 1].time))
        }, getStartTime: function (a) {
            var b = this.categoryAxis;
            return e.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
        }, getEndTime: function (a) {
            var b = e.extractPeriod(this.categoryAxis.minPeriod);
            return e.changeDate(new Date(a), b.period, b.count, !0).getTime() - 1
        }, updateMargins: function () {
            e.AmSerialChart.base.updateMargins.call(this);
            var a = this.chartScrollbar;
            a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
        }, updateScrollbars: function () {
            e.AmSerialChart.base.updateScrollbars.call(this);
            this.updateChartScrollbar(this.chartScrollbar, this.rotate)
        }, zoom: function (a, b) {
            var c = this.categoryAxis;
            c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b);
            this.updateLegendValues()
        }, timeZoom: function (a, b) {
            var c = this.maxSelectedTime;
            isNaN(c) || (b != this.endTime && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.startTime && b - a > c && (b = a + c, this.updateScrollbar = !0));
            var d = this.minSelectedTime;
            if (0 < d && b - a < d) {
                var g = Math.round(a + (b - a) / 2), d = Math.round(d / 2);
                a = g - d;
                b = g + d
            }
            var h = this.chartData, g = this.categoryAxis;
            if (e.ifArray(h) && (a != this.startTime || b != this.endTime)) {
                var f = g.minDuration(),
                    d = this.firstTime, k = this.lastTime;
                a || (a = d, isNaN(c) || (a = k - c));
                b || (b = k);
                a > k && (a = k);
                b < d && (b = d);
                a < d && (a = d);
                b > k && (b = k);
                b < a && (b = a + f);
                b - a < f / 5 && (b < k ? b = a + f / 5 : a = b - f / 5);
                this.startTime = a;
                this.endTime = b;
                c = h.length - 1;
                f = this.getClosestIndex(h, "time", a, !0, 0, c);
                h = this.getClosestIndex(h, "time", b, !1, f, c);
                g.timeZoom(a, b);
                g.zoom(f, h);
                this.start = e.fitToBounds(f, 0, c);
                this.end = e.fitToBounds(h, 0, c);
                this.zoomAxesAndGraphs();
                this.zoomScrollbar();
                a != d || b != k ? this.showZB(!0) : this.showZB(!1);
                this.updateColumnsDepth();
                this.dispatchTimeZoomEvent()
            }
        }, updateAfterValueZoom: function () {
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            this.updateColumnsDepth()
        }, indexZoom: function (a, b) {
            var c = this.maxSelectedSeries;
            isNaN(c) || (b != this.end && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.start && b - a > c && (b = a + c, this.updateScrollbar = !0));
            if (a != this.start || b != this.end) {
                var d = this.chartData.length - 1;
                isNaN(a) && (a = 0, isNaN(c) || (a = d - c));
                isNaN(b) && (b = d);
                b < a && (b = a);
                b > d && (b = d);
                a > d && (a = d - 1);
                0 > a && (a = 0);
                this.start = a;
                this.end = b;
                this.categoryAxis.zoom(a, b);
                this.zoomAxesAndGraphs();
                this.zoomScrollbar();
                0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);
                this.updateColumnsDepth();
                this.dispatchIndexZoomEvent()
            }
        }, updateGraphs: function () {
            e.AmSerialChart.base.updateGraphs.call(this);
            var a = this.graphs, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.columnWidthReal = this.columnWidth;
                c.categoryAxis = this.categoryAxis;
                e.isString(c.fillToGraph) && (c.fillToGraph = this.getGraphById(c.fillToGraph))
            }
        }, updateColumnsDepth: function () {
            var a, b = this.graphs, c;
            e.remove(this.columnsSet);
            this.columnsArray = [];
            for (a = 0; a < b.length; a++) {
                c = b[a];
                var d = c.columnsArray;
                if (d) {
                    var g;
                    for (g = 0; g < d.length; g++)this.columnsArray.push(d[g])
                }
            }
            this.columnsArray.sort(this.compareDepth);
            if (0 < this.columnsArray.length) {
                b = this.container.set();
                this.columnSet.push(b);
                for (a = 0; a < this.columnsArray.length; a++)b.push(this.columnsArray[a].column.set);
                c && b.translate(c.x, c.y);
                this.columnsSet = b
            }
        }, compareDepth: function (a, b) {
            return a.depth > b.depth ? 1 : -1
        }, zoomScrollbar: function () {
            var a = this.chartScrollbar, b = this.categoryAxis;
            a && this.updateScrollbar && a.enabled && a.dragger && (a.dragger.stop(), b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
        }, updateTrendLines: function () {
            var a = this.trendLines, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b], c = e.processObject(c, e.TrendLine, this.theme);
                a[b] = c;
                c.chart = this;
                c.id || (c.id = "trendLineAuto" + b + "_" + (new Date).getTime());
                e.isString(c.valueAxis) && (c.valueAxis = this.getValueAxisById(c.valueAxis));
                c.valueAxis || (c.valueAxis = this.valueAxes[0]);
                c.categoryAxis = this.categoryAxis
            }
        }, zoomAxesAndGraphs: function () {
            if (!this.scrollbarOnly) {
                var a = this.valueAxes, b;
                for (b = 0; b < a.length; b++)a[b].zoom(this.start, this.end);
                a = this.graphs;
                for (b = 0; b < a.length; b++)a[b].zoom(this.start, this.end);
                this.zoomTrendLines();
                (b = this.chartCursor) && b.zoom && b.zoom(this.start, this.end, this.startTime, this.endTime)
            }
        }, countColumns: function () {
            var a = 0, b = this.valueAxes.length, c = this.graphs.length, d, e, h = !1, f, k;
            for (k = 0; k < b; k++) {
                e = this.valueAxes[k];
                var m = e.stackType;
                if ("100%" == m || "regular" == m)for (h = !1, f = 0; f < c; f++)d = this.graphs[f], d.tcc = 1, d.valueAxis == e && "column" == d.type && (!h && d.stackable && (a++, h = !0), (!d.stackable && d.clustered || d.newStack) && a++, d.columnIndex = a - 1, d.clustered || (d.columnIndex = 0));
                if ("none" == m || "3d" == m) {
                    h = !1;
                    for (f = 0; f < c; f++)d = this.graphs[f], d.valueAxis == e && "column" == d.type && (d.clustered ? (d.tcc = 1, d.newStack && (a = 0), d.hidden || (d.columnIndex = a, a++)) : d.hidden || (h = !0, d.tcc = 1, d.columnIndex = 0));
                    h && 0 === a && (a = 1)
                }
                if ("3d" == m) {
                    e = 1;
                    for (k = 0; k < c; k++)d = this.graphs[k], d.newStack && e++, d.depthCount = e, d.tcc = a;
                    a = e
                }
            }
            return a
        }, parseData: function () {
            e.AmSerialChart.base.parseData.call(this);
            this.parseSerialData(this.dataProvider)
        }, getCategoryIndexByValue: function (a) {
            var b = this.chartData, c, d;
            for (d = 0; d < b.length; d++)b[d].category == a && (c = d);
            return c
        }, handleCursorChange: function (a) {
            this.updateLegendValues(a.index)
        }, handleCursorZoom: function (a) {
            this.updateScrollbar = !0;
            this.zoom(a.start, a.end)
        }, handleScrollbarZoom: function (a) {
            this.updateScrollbar = !1;
            this.zoom(a.start, a.end)
        }, dispatchTimeZoomEvent: function () {
            if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
                var a = {type: "zoomed"};
                a.startDate = new Date(this.startTime);
                a.endDate = new Date(this.endTime);
                a.startIndex = this.start;
                a.endIndex = this.end;
                this.startIndex = this.start;
                this.endIndex = this.end;
                this.startDate = a.startDate;
                this.endDate = a.endDate;
                this.prevStartTime = this.startTime;
                this.prevEndTime = this.endTime;
                var b = this.categoryAxis, c = e.extractPeriod(b.minPeriod).period, b = b.dateFormatsObject[c];
                a.startValue = e.formatDate(a.startDate, b, this);
                a.endValue = e.formatDate(a.endDate, b, this);
                a.chart = this;
                a.target = this;
                this.fire(a.type, a)
            }
        }, dispatchIndexZoomEvent: function () {
            if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
                this.startIndex = this.start;
                this.endIndex = this.end;
                var a = this.chartData;
                if (e.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                    var b = {chart: this, target: this, type: "zoomed"};
                    b.startIndex = this.start;
                    b.endIndex = this.end;
                    b.startValue = a[this.start].category;
                    b.endValue = a[this.end].category;
                    this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
                    this.prevStartIndex = this.start;
                    this.prevEndIndex = this.end;
                    this.fire(b.type, b)
                }
            }
        }, updateLegendValues: function (a) {
            var b = this.graphs, c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                isNaN(a) ? d.currentDataItem = void 0 : d.currentDataItem = this.chartData[a].axes[d.valueAxis.id].graphs[d.id]
            }
            this.legend && this.legend.updateValues()
        }, getClosestIndex: function (a, b, c, d, e, h) {
            0 > e && (e = 0);
            h > a.length - 1 && (h = a.length - 1);
            var f = e + Math.round((h -
                    e) / 2), k = a[f][b];
            if (c == k)return f;
            if (1 >= h - e) {
                if (d)return e;
                d = a[h][b];
                return Math.abs(a[e][b] - c) < Math.abs(d - c) ? e : h
            }
            return c == k ? f : c < k ? this.getClosestIndex(a, b, c, d, e, f) : this.getClosestIndex(a, b, c, d, f, h)
        }, zoomToIndexes: function (a, b) {
            this.updateScrollbar = !0;
            var c = this.chartData;
            if (c) {
                var d = c.length;
                0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time, this.getEndTime(c[b].time)) : this.zoom(a, b))
            }
        }, zoomToDates: function (a, b) {
            this.updateScrollbar = !0;
            var c = this.chartData;
            if (this.categoryAxis.equalSpacing) {
                var d = this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length);
                b = e.resetDateToMin(b, this.categoryAxis.minPeriod, 1);
                c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length);
                this.zoom(d, c)
            } else this.zoom(a.getTime(), b.getTime())
        }, zoomToCategoryValues: function (a, b) {
            this.updateScrollbar = !0;
            this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
        }, formatPeriodString: function (a, b) {
            if (b) {
                var c = ["value", "open", "low", "high", "close"], d = "value open low high close average sum count".split(" "), g = b.valueAxis, h = this.chartData, f = b.numberFormatter;
                f || (f = this.nf);
                for (var k = 0; k < c.length; k++) {
                    for (var m = c[k], l = 0, p = 0, q, t, x, u, r, n = 0, A = 0, y, z, v, E, H, I = this.start; I <= this.end; I++) {
                        var w = h[I];
                        if (w && (w = w.axes[g.id].graphs[b.id])) {
                            if (w.values) {
                                var B = w.values[m];
                                if (this.rotate) {
                                    if (0 > w.x || w.x > w.graph.height)B = NaN
                                } else if (0 > w.x || w.x > w.graph.width)B = NaN;
                                if (!isNaN(B)) {
                                    isNaN(q) && (q = B);
                                    t = B;
                                    if (isNaN(x) || x > B)x = B;
                                    if (isNaN(u) || u < B)u = B;
                                    r = e.getDecimals(l);
                                    var D = e.getDecimals(B), l = l + B, l = e.roundTo(l, Math.max(r, D));
                                    p++;
                                    r = l / p
                                }
                            }
                            if (w.percents && (w = w.percents[m], !isNaN(w))) {
                                isNaN(y) && (y = w);
                                z = w;
                                if (isNaN(v) || v > w)v = w;
                                if (isNaN(E) || E < w)E = w;
                                H = e.getDecimals(n);
                                B = e.getDecimals(w);
                                n += w;
                                n = e.roundTo(n, Math.max(H, B));
                                A++;
                                H = n / A
                            }
                        }
                    }
                    n = {open: y, close: z, high: E, low: v, average: H, sum: n, count: A};
                    a = e.formatValue(a, {
                        open: q,
                        close: t,
                        high: u,
                        low: x,
                        average: r,
                        sum: l,
                        count: p
                    }, d, f, m + "\\.", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
                    a = e.formatValue(a, n, d, this.pf, "percents\\." + m + "\\.")
                }
            }
            return a = e.cleanFromEmpty(a)
        }, formatString: function (a, b, c) {
            var d = b.graph;
            if (-1 != a.indexOf("[[category]]")) {
                var g = b.serialDataItem.category;
                if (this.categoryAxis.parseDates) {
                    var h = this.balloonDateFormat, f = this.chartCursor;
                    f && (h = f.categoryBalloonDateFormat);
                    -1 != a.indexOf("[[category]]") && (h = e.formatDate(g, h, this), -1 != h.indexOf("fff") && (h = e.formatMilliseconds(h, g)), g = h)
                }
                a = a.replace(/\[\[category\]\]/g, String(g))
            }
            g = d.numberFormatter;
            g || (g = this.nf);
            h = b.graph.valueAxis;
            (f = h.duration) && !isNaN(b.values.value) && (f = e.formatDuration(b.values.value, f, "", h.durationUnits, h.maxInterval, g), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), f));
            "date" == h.type && (h = e.formatDate(new Date(b.values.value), d.dateFormat, this), f = RegExp("\\[\\[value\\]\\]", "g"), a = a.replace(f, h), h = e.formatDate(new Date(b.values.open), d.dateFormat, this), f = RegExp("\\[\\[open\\]\\]", "g"), a = a.replace(f, h));
            d = "value open low high close total".split(" ");
            h = this.pf;
            a = e.formatValue(a, b.percents, d, h, "percents\\.");
            a = e.formatValue(a, b.values, d, g, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
            a = e.formatValue(a, b.values, ["percents"], h);
            -1 != a.indexOf("[[") && (a = e.formatDataContextValue(a, b.dataContext));
            -1 != a.indexOf("[[") && b.graph.customData && (a = e.formatDataContextValue(a, b.graph.customData));
            return a = e.AmSerialChart.base.formatString.call(this, a, b, c)
        }, addChartScrollbar: function (a) {
            e.callMethod("destroy", [this.chartScrollbar]);
            a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
            this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
            this.chartScrollbar = a
        }, removeChartScrollbar: function () {
            e.callMethod("destroy", [this.chartScrollbar]);
            this.chartScrollbar = null
        }, handleReleaseOutside: function (a) {
            e.AmSerialChart.base.handleReleaseOutside.call(this, a);
            e.callMethod("handleReleaseOutside", [this.chartScrollbar])
        }, update: function () {
            e.AmSerialChart.base.update.call(this);
            this.chartScrollbar && this.chartScrollbar.update && this.chartScrollbar.update()
        }
    })
})();
(function () {
    var e = window.AmCharts;
    e.Cuboid = e.Class({
        construct: function (a, b, c, d, e, h, f, k, m, l, p, q, t, x, u, r, n) {
            this.set = a.set();
            this.container = a;
            this.h = Math.round(c);
            this.w = Math.round(b);
            this.dx = d;
            this.dy = e;
            this.colors = h;
            this.alpha = f;
            this.bwidth = k;
            this.bcolor = m;
            this.balpha = l;
            this.dashLength = x;
            this.topRadius = r;
            this.pattern = u;
            this.rotate = t;
            this.bcn = n;
            t ? 0 > b && 0 === p && (p = 180) : 0 > c && 270 == p && (p = 90);
            this.gradientRotation = p;
            0 === d && 0 === e && (this.cornerRadius = q);
            this.draw()
        }, draw: function () {
            var a = this.set;
            a.clear();
            var b = this.container, c = b.chart, d = this.w, g = this.h, h = this.dx, f = this.dy, k = this.colors, m = this.alpha, l = this.bwidth, p = this.bcolor, q = this.balpha, t = this.gradientRotation, x = this.cornerRadius, u = this.dashLength, r = this.pattern, n = this.topRadius, A = this.bcn, y = k, z = k;
            "object" == typeof k && (y = k[0], z = k[k.length - 1]);
            var v, E, H, I, w, B, D, L, M, Q = m;
            r && (m = 0);
            var C, F, G, J, K = this.rotate;
            if (0 < Math.abs(h) || 0 < Math.abs(f))if (isNaN(n))D = z, z = e.adjustLuminosity(y, -.2), z = e.adjustLuminosity(y, -.2), v = e.polygon(b, [0, h, d + h, d, 0], [0, f, f, 0, 0], z, m, 1, p, 0, t), 0 < q && (M = e.line(b, [0, h, d + h], [0, f, f], p, q, l, u)), E = e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], z, m, 1, p, 0, t), E.translate(h, f), 0 < q && (H = e.line(b, [h, h], [f, f + g], p, q, l, u)), I = e.polygon(b, [0, 0, h, h, 0], [0, g, g + f, f, 0], z, m, 1, p, 0, t), w = e.polygon(b, [d, d, d + h, d + h, d], [0, g, g + f, f, 0], z, m, 1, p, 0, t), 0 < q && (B = e.line(b, [d, d + h, d + h, d], [0, f, g + f, g], p, q, l, u)), z = e.adjustLuminosity(D, .2), D = e.polygon(b, [0, h, d + h, d, 0], [g, g + f, g + f, g, g], z, m, 1, p, 0, t), 0 < q && (L = e.line(b, [0, h, d + h], [g, g + f, g + f], p, q, l, u)); else {
                var N, O, P;
                K ? (N = g / 2, z = h / 2, P = g / 2, O = d + h / 2, F = Math.abs(g / 2), C = Math.abs(h / 2)) : (z = d / 2, N = f / 2, O = d / 2, P = g + f / 2 + 1, C = Math.abs(d / 2), F = Math.abs(f / 2));
                G = C * n;
                J = F * n;
                .1 < C && .1 < C && (v = e.circle(b, C, y, m, l, p, q, !1, F), v.translate(z, N));
                .1 < G && .1 < G && (D = e.circle(b, G, e.adjustLuminosity(y, .5), m, l, p, q, !1, J), D.translate(O, P))
            }
            m = Q;
            1 > Math.abs(g) && (g = 0);
            1 > Math.abs(d) && (d = 0);
            !isNaN(n) && (0 < Math.abs(h) || 0 < Math.abs(f)) ? (k = [y], k = {
                fill: k,
                stroke: p,
                "stroke-width": l,
                "stroke-opacity": q,
                "fill-opacity": m
            }, K ? (m = "M0,0 L" + d + "," + (g / 2 - g / 2 * n), l = " B", 0 < d && (l = " A"), e.VML ? (m += l + Math.round(d -
                    G) + "," + Math.round(g / 2 - J) + "," + Math.round(d + G) + "," + Math.round(g / 2 + J) + "," + d + ",0," + d + "," + g, m = m + (" L0," + g) + (l + Math.round(-C) + "," + Math.round(g / 2 - F) + "," + Math.round(C) + "," + Math.round(g / 2 + F) + ",0," + g + ",0,0")) : (m += "A" + G + "," + J + ",0,0,0," + d + "," + (g - g / 2 * (1 - n)) + "L0," + g, m += "A" + C + "," + F + ",0,0,1,0,0"), C = 90) : (l = d / 2 - d / 2 * n, m = "M0,0 L" + l + "," + g, e.VML ? (m = "M0,0 L" + l + "," + g, l = " B", 0 > g && (l = " A"), m += l + Math.round(d / 2 - G) + "," + Math.round(g - J) + "," + Math.round(d / 2 + G) + "," + Math.round(g + J) + ",0," + g + "," + d + "," + g, m += " L" + d + ",0", m += l + Math.round(d /
                    2 + C) + "," + Math.round(F) + "," + Math.round(d / 2 - C) + "," + Math.round(-F) + "," + d + ",0,0,0") : (m += "A" + G + "," + J + ",0,0,0," + (d - d / 2 * (1 - n)) + "," + g + "L" + d + ",0", m += "A" + C + "," + F + ",0,0,1,0,0"), C = 180), b = b.path(m).attr(k), b.gradient("linearGradient", [y, e.adjustLuminosity(y, -.3), e.adjustLuminosity(y, -.3), y], C), K ? b.translate(h / 2, 0) : b.translate(0, f / 2)) : b = 0 === g ? e.line(b, [0, d], [0, 0], p, q, l, u) : 0 === d ? e.line(b, [0, 0], [0, g], p, q, l, u) : 0 < x ? e.rect(b, d, g, k, m, l, p, q, x, t, u) : e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], k, m, l, p, q, t, !1, u);
            d = isNaN(n) ? 0 > g ? [v, M, E, H, I, w, B, D, L, b] : [D, L, E, H, I, w, v, M, B, b] : K ? 0 < d ? [v, b, D] : [D, b, v] : 0 > g ? [v, b, D] : [D, b, v];
            e.setCN(c, b, A + "front");
            e.setCN(c, E, A + "back");
            e.setCN(c, D, A + "top");
            e.setCN(c, v, A + "bottom");
            e.setCN(c, I, A + "left");
            e.setCN(c, w, A + "right");
            for (v = 0; v < d.length; v++)if (E = d[v])a.push(E), e.setCN(c, E, A + "element");
            r && b.pattern(r, NaN, c.path)
        }, width: function (a) {
            isNaN(a) && (a = 0);
            this.w = Math.round(a);
            this.draw()
        }, height: function (a) {
            isNaN(a) && (a = 0);
            this.h = Math.round(a);
            this.draw()
        }, animateHeight: function (a, b) {
            var c = this;
            c.easing = b;
            c.totalFrames = Math.round(1E3 * a / e.updateRate);
            c.rh = c.h;
            c.frame = 0;
            c.height(1);
            setTimeout(function () {
                c.updateHeight.call(c)
            }, e.updateRate)
        }, updateHeight: function () {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), setTimeout(function () {
                a.updateHeight.call(a)
            }, e.updateRate))
        }, animateWidth: function (a, b) {
            var c = this;
            c.easing = b;
            c.totalFrames = Math.round(1E3 * a / e.updateRate);
            c.rw = c.w;
            c.frame = 0;
            c.width(1);
            setTimeout(function () {
                c.updateWidth.call(c)
            }, e.updateRate)
        }, updateWidth: function () {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b && (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function () {
                a.updateWidth.call(a)
            }, e.updateRate))
        }
    })
})();
(function () {
    var e = window.AmCharts;
    e.CategoryAxis = e.Class({
        inherits: e.AxisBase, construct: function (a) {
            this.cname = "CategoryAxis";
            e.CategoryAxis.base.construct.call(this, a);
            this.minPeriod = "DD";
            this.equalSpacing = this.parseDates = !1;
            this.position = "bottom";
            this.startOnAxis = !1;
            this.firstDayOfWeek = 1;
            this.gridPosition = "middle";
            this.markPeriodChange = this.boldPeriodBeginning = !0;
            this.safeDistance = 30;
            this.centerLabelOnFullPeriod = !0;
            e.applyTheme(this, a, this.cname)
        }, draw: function () {
            e.CategoryAxis.base.draw.call(this);
            this.generateDFObject();
            var a = this.chart.chartData;
            this.data = a;
            this.labelRotationR = this.labelRotation;
            if (e.ifArray(a)) {
                var b, c = this.chart;
                "scrollbar" != this.id ? (e.setCN(c, this.set, "category-axis"), e.setCN(c, this.labelsSet, "category-axis"), e.setCN(c, this.axisLine.axisSet, "category-axis")) : this.bcn = this.id + "-";
                var d = this.start, g = this.labelFrequency, h = 0, f = this.end - d + 1, k = this.gridCountR, m = this.showFirstLabel, l = this.showLastLabel, p, q = "", q = e.extractPeriod(this.minPeriod), t = e.getPeriodDuration(q.period, q.count), x, u, r, n;
                x = this.rotate;
                b = this.firstDayOfWeek;
                p = this.boldPeriodBeginning;
                n = e.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * t), this.minPeriod, 1, b).getTime();
                this.firstTime = c.firstTime;
                this.endTime > n && (this.endTime = n);
                n = this.minorGridEnabled;
                var A = this.gridAlpha;
                if (this.parseDates && !this.equalSpacing)this.lastTime = a[a.length - 1].time, this.maxTime = e.resetDateToMin(new Date(this.lastTime + 1.05 * t), this.minPeriod, 1, b).getTime(), this.timeDifference = this.endTime - this.startTime, this.parseDatesDraw(); else if (!this.parseDates) {
                    if (this.cellWidth = this.getStepWidth(f), f < k && (k = f), h += this.start, this.stepWidth = this.getStepWidth(f), 0 < k) {
                        k = Math.floor(f / k);
                        t = this.chooseMinorFrequency(k);
                        f = h;
                        f / 2 == Math.round(f / 2) && f--;
                        0 > f && (f = 0);
                        var y = 0;
                        this.end - f + 1 >= this.autoRotateCount && (this.labelRotationR = this.autoRotateAngle);
                        for (b = f; b <= this.end + 2; b++) {
                            p = !1;
                            0 <= b && b < this.data.length ? (u = this.data[b], q = u.category, p = u.forceShow) : q = "";
                            if (n && !isNaN(t))if (b / t == Math.round(b / t) || p)b / k == Math.round(b / k) || p || (this.gridAlpha = this.minorGridAlpha, q = void 0); else continue; else if (b /
                                k != Math.round(b / k) && !p)continue;
                            f = this.getCoordinate(b - h);
                            r = 0;
                            "start" == this.gridPosition && (f -= this.cellWidth / 2, r = this.cellWidth / 2);
                            p = !0;
                            var z = r;
                            "start" == this.tickPosition && (z = 0, p = !1, r = 0);
                            if (b == d && !m || b == this.end && !l)q = void 0;
                            Math.round(y / g) != y / g && (q = void 0);
                            y++;
                            var v = this.cellWidth;
                            x && (v = NaN, this.ignoreAxisWidth || !c.autoMargins) && (v = "right" == this.position ? c.marginRight : c.marginLeft, v -= this.tickLength + 10);
                            this.labelFunction && u && (q = this.labelFunction(q, u, this));
                            q = e.fixBrakes(q);
                            a = !1;
                            this.boldLabels && (a = !0);
                            b > this.end && "start" == this.tickPosition && (q = " ");
                            this.rotate && this.inside && (r = -2);
                            r = new this.axisItemRenderer(this, f, q, p, v, r, void 0, a, z, !1, u.labelColor, u.className);
                            r.serialDataItem = u;
                            this.pushAxisItem(r);
                            this.gridAlpha = A
                        }
                    }
                } else if (this.parseDates && this.equalSpacing) {
                    h = this.start;
                    this.startTime = this.data[this.start].time;
                    this.endTime = this.data[this.end].time;
                    this.timeDifference = this.endTime - this.startTime;
                    d = this.choosePeriod(0);
                    g = d.period;
                    x = d.count;
                    a = e.getPeriodDuration(g, x);
                    a < t && (g = q.period, x = q.count, a = t);
                    u = g;
                    "WW" == u && (u = "DD");
                    this.stepWidth = this.getStepWidth(f);
                    k = Math.ceil(this.timeDifference / a) + 1;
                    q = e.resetDateToMin(new Date(this.startTime - a), g, x, b).getTime();
                    this.cellWidth = this.getStepWidth(f);
                    f = Math.round(q / a);
                    d = -1;
                    f / 2 == Math.round(f / 2) && (d = -2, q -= a);
                    f = this.start;
                    f / 2 == Math.round(f / 2) && f--;
                    0 > f && (f = 0);
                    A = this.end + 2;
                    A >= this.data.length && (A = this.data.length);
                    y = !1;
                    y = !m;
                    this.previousPos = -1E3;
                    20 < this.labelRotationR && (this.safeDistance = 5);
                    z = f;
                    if (this.data[f].time != e.resetDateToMin(new Date(this.data[f].time), g, x, b).getTime())for (a = 0, v = q, b = f; b < A; b++)t = this.data[b].time, this.checkPeriodChange(g, x, t, v) && (a++, 2 <= a && (z = b, b = A), v = t);
                    n && 1 < x && (t = this.chooseMinorFrequency(x), e.getPeriodDuration(g, t));
                    if (0 < this.gridCountR)for (b = f; b < A; b++)if (t = this.data[b].time, this.checkPeriodChange(g, x, t, q) && b >= z) {
                        f = this.getCoordinate(b - this.start);
                        n = !1;
                        this.nextPeriod[u] && (n = this.checkPeriodChange(this.nextPeriod[u], 1, t, q, u));
                        a = !1;
                        n && this.markPeriodChange ? (n = this.dateFormatsObject[this.nextPeriod[u]], a = !0) : n = this.dateFormatsObject[u];
                        q = e.formatDate(new Date(t), n, c);
                        if (b == d && !m || b == k && !l)q = " ";
                        y ? y = !1 : (p || (a = !1), f - this.previousPos > this.safeDistance * Math.cos(this.labelRotationR * Math.PI / 180) && (this.labelFunction && (q = this.labelFunction(q, new Date(t), this, g, x, r)), this.boldLabels && (a = !0), r = new this.axisItemRenderer(this, f, q, void 0, void 0, void 0, void 0, a), n = r.graphics(), this.pushAxisItem(r), n = n.getBBox().width, e.isModern || (n -= f), this.previousPos = f + n));
                        r = q = t
                    }
                }
                for (b = 0; b < this.data.length; b++)if (m = this.data[b])l = this.parseDates && !this.equalSpacing ? Math.round((m.time - this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(b - h), m.x[this.id] = l;
                m = this.guides.length;
                for (b = 0; b < m; b++)l = this.guides[b], p = r = r = k = n = NaN, d = l.above, l.toCategory && (r = c.getCategoryIndexByValue(l.toCategory), isNaN(r) || (n = this.getCoordinate(r - h), l.expand && (n += this.cellWidth / 2), r = new this.axisItemRenderer(this, n, "", !0, NaN, NaN, l), this.pushAxisItem(r, d))), l.category && (p = c.getCategoryIndexByValue(l.category), isNaN(p) || (k = this.getCoordinate(p - h), l.expand && (k -= this.cellWidth /
                    2), r = (n - k) / 2, r = new this.axisItemRenderer(this, k, l.label, !0, NaN, r, l), this.pushAxisItem(r, d))), p = c.dataDateFormat, l.toDate && (l.toDate = e.getDate(l.toDate, p, this.minPeriod), this.equalSpacing ? (r = c.getClosestIndex(this.data, "time", l.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(r) || (n = this.getCoordinate(r - h))) : n = (l.toDate.getTime() - this.startTime) * this.stepWidth, r = new this.axisItemRenderer(this, n, "", !0, NaN, NaN, l), this.pushAxisItem(r, d)), l.date && (l.date = e.getDate(l.date, p, this.minPeriod), this.equalSpacing ?
                    (p = c.getClosestIndex(this.data, "time", l.date.getTime(), !1, 0, this.data.length - 1), isNaN(p) || (k = this.getCoordinate(p - h))) : k = (l.date.getTime() - this.startTime) * this.stepWidth, r = (n - k) / 2, p = !0, l.toDate && (p = !1), r = "H" == this.orientation ? new this.axisItemRenderer(this, k, l.label, p, 2 * r, NaN, l) : new this.axisItemRenderer(this, k, l.label, !1, NaN, r, l), this.pushAxisItem(r, d)), (0 < n || 0 < k) && (n < this.width || k < this.width) && (n = new this.guideFillRenderer(this, k, n, l), p = n.graphics(), this.pushAxisItem(n, d), l.graphics = p, p.index = b,
                l.balloonText && this.addEventListeners(p, l))
            }
            this.axisCreated = !0;
            c = this.x;
            h = this.y;
            this.set.translate(c, h);
            this.labelsSet.translate(c, h);
            this.labelsSet.show();
            this.positionTitle();
            (c = this.axisLine.set) && c.toFront();
            c = this.getBBox().height;
            2 < c - this.previousHeight && this.autoWrap && !this.parseDates && (this.axisCreated = this.chart.marginsUpdated = !1);
            this.previousHeight = c
        }, xToIndex: function (a) {
            var b = this.data, c = this.chart, d = c.rotate, g = this.stepWidth;
            this.parseDates && !this.equalSpacing ? (a = this.startTime + Math.round(a /
                    g) - this.minDuration() / 2, c = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= g / 2), c = this.start + Math.round(a / g));
            var c = e.fitToBounds(c, 0, b.length - 1), h;
            b[c] && (h = b[c].x[this.id]);
            d ? h > this.height + 1 && c-- : h > this.width + 1 && c--;
            0 > h && c++;
            return c = e.fitToBounds(c, 0, b.length - 1)
        }, dateToCoordinate: function (a) {
            return this.parseDates && !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(),
                !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
        }, categoryToCoordinate: function (a) {
            return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
        }, coordinateToDate: function (a) {
            return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
        }, getCoordinate: function (a) {
            a *= this.stepWidth;
            this.startOnAxis || (a += this.stepWidth / 2);
            return Math.round(a)
        }
    })
})();