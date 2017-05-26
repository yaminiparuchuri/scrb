$(document).ready(function() {
  AmCharts.theme = AmCharts.themes.black;
  var obj = {};
  obj.year = 2016;
  obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  obj.district = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  if ($('.navbar-nav').find('li.active a').attr('href') == "/dashboard") {
    $.ajax({
      type: "post",
      url: '/distrcts/getReports',
      dataType: 'json',
      data: obj,
      success: function(details) {
        var titleObj = {};
        titleObj.title1 = "COGNIZABLE CRIME TRENDING";
        titleObj.title2 = "TOTAL COGNIZABLE CRIME";
        titleObj.title3 = "PROPERTY CRIMES";
        titleObj.title4 = "BODILY OFFENCES";
        titleObj.title5 = "OFFENCE AGAINST WOMEN";
        titleObj.title6 = "FACTION CRIMES";
        titleObj.title7 = "ROAD ACCIDENTS";
        titleObj.title8 = "WHITE COLLOR CRIMES";
        details.titleObj = titleObj;
        dashboardReports(details);
      }
    });

  }

  function dashboardReports(details) {
    console.log(details.totalCrimesReported);
    if(details.endDateOfReports === undefined){

    }else{
      $('#enddatemonth').html(details.endDateOfReports[0].report_date);
    }
    if (details.totalCrimesReported === undefined) {
      $('#js-total-crimes-report').html('No Data');
      $('#js-total-crimes-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
    } else {
      var total = 0;
      for (var i in details.totalCrimesReported) {
        total = total + parseInt(details.totalCrimesReported[i].rm_tru);
      }
      $('#js-total-crimes-table tbody').html('<tr><td>JAN</td><td>' + details.totalCrimesReported[0].rm_tru + '</td></tr><tr><td>FEB</td><td>' + details.totalCrimesReported[1].rm_tru + '</td></tr><tr><td>MAR</td><td>' + details.totalCrimesReported[2].rm_tru + '</td></tr><tr><td>APR</td><td>' + details.totalCrimesReported[3].rm_tru + '</td></tr><tr><td>MAY</td><td>' + details.totalCrimesReported[4].rm_tru + '</td></tr><tr><td>JUN</td><td>' + details.totalCrimesReported[5].rm_tru + '</td></tr><tr><td>JUL</td><td>' + details.totalCrimesReported[6].rm_tru + '</td></tr><tr><td>AUG</td><td>' + details.totalCrimesReported[7].rm_tru + '</td></tr><tr><td>SEP</td><td>' + details.totalCrimesReported[8].rm_tru + '</td></tr><tr><td>OCT</td><td>' + details.totalCrimesReported[9].rm_tru + '</td></tr><tr><td>NOV</td><td>' + details.totalCrimesReported[10].rm_tru + '</td></tr><tr><td>DEC</td><td>' + details.totalCrimesReported[11].rm_tru + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>');
      var chart = AmCharts.makeChart("js-total-crimes-report", {
        "type": "serial",
        "addClassNames": true,

        "titles": [{
          "text": details.titleObj.title1+" _ "+total,
          "size": 15
        }],
        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": details.totalCrimesReported,
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "Cases",
          "type": "column",
          "valueField": "rm_tru",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "month",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (!details.totalCrimesByMonthAndYear && !details.totalCrimesByMonthAndYear[0].property_crime && !details.totalCrimesByMonthAndYear[0].bodly_offences && !details.totalCrimesByMonthAndYear[0].white_collar_crime && !details.totalCrimesByMonthAndYear[0].accidents && !details.totalCrimesByMonthAndYear[0].other_ipc) {
      $('#js-congnizable-report').html('No Data');
      $('#js-congnizable-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
    } else {
      console.log(details.totalCrimesByMonthAndYear);
      var total = details.totalCrimesByMonthAndYear[0].property_crime + details.totalCrimesByMonthAndYear[0].bodly_offences + details.totalCrimesByMonthAndYear[0].white_collar_crime + details.totalCrimesByMonthAndYear[0].accidents + details.totalCrimesByMonthAndYear[0].other_ipc;
      $('#js-congnizable-table tbody').html('<tr><td>PROPERTY CRIME</td><td>' + details.totalCrimesByMonthAndYear[0].property_crime + '</td></tr><tr><td>BODILY OFFENCES</td><td>' + details.totalCrimesByMonthAndYear[0].bodly_offences + '</td></tr><tr><td>WHITE COLLAR CRIME</td><td>' + details.totalCrimesByMonthAndYear[0].white_collar_crime + '</td></tr><tr><td>ACCIDENTS</td><td>' + details.totalCrimesByMonthAndYear[0].accidents + '</td></tr><tr><td>OTHER IPC CASES</td><td>' + details.totalCrimesByMonthAndYear[0].other_ipc + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>');
      var chart = AmCharts.makeChart("js-congnizable-report", {
        "type": "pie",

        "minRadius": 120,
        "dataProvider": [{
          "group": "PROPERTY CRIME",
          "count": details.totalCrimesByMonthAndYear[0].property_crime
        }, {
          "group": "BODILY OFFENCES",
          "count": details.totalCrimesByMonthAndYear[0].bodly_offences
        }, {
          "group": "WHITE COLLAR CRIME",
          "count": details.totalCrimesByMonthAndYear[0].white_collar_crime
        }, {
          "group": "ACCIDENTS",
          "count": details.totalCrimesByMonthAndYear[0].accidents
        }, {
          "group": "OTHER IPC CASES",
          "count": details.totalCrimesByMonthAndYear[0].other_ipc
        }],
        "valueField": "count",
        "titleField": "group",
        "titles": [{
          "text": details.titleObj.title2+" - "+total,
          "size": 15
        }],
        "labelRadius": -20,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "balloon": {
          "fixedPosition": true
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.propertyCrimesByMonthAndYear && details.propertyCrimesByMonthAndYear.length > 0) {
      var total = details.propertyCrimesByMonthAndYear[0]["dacoity"] + details.propertyCrimesByMonthAndYear[0]["hbsbyday"] + details.propertyCrimesByMonthAndYear[0]["hbsbynight"] + details.propertyCrimesByMonthAndYear[0]["murder_for_gain"] + details.propertyCrimesByMonthAndYear[0]["ordinary"] + details.propertyCrimesByMonthAndYear[0]["robbery"];
      var hbs = details.propertyCrimesByMonthAndYear[0]["hbsbyday"] + details.propertyCrimesByMonthAndYear[0]["hbsbynight"];
      $('#js-non-grave-table tbody').html('<tr><td>Dacoity</td><td>' + details.propertyCrimesByMonthAndYear[0]["dacoity"] + '</td></tr><tr><td>Burglary</td><td>' + hbs + '</td></tr><tr><td>Murder for gain</td><td>' + details.propertyCrimesByMonthAndYear[0]["murder_for_gain"] + '</td></tr><tr><td>Ordinary</td><td>' + details.propertyCrimesByMonthAndYear[0]["ordinary"] + '</td></tr><tr><td>Robbery</td><td>' + details.propertyCrimesByMonthAndYear[0]["robbery"] + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>')
      if ($('#js-month-selection-options li.active a').text() == 'ALL') {
        var month = $('#js-year-selection-options li.active a').data('val');
      } else {
        var month = $('#js-month-selection-options li.active a').text();
      }
      details.propertyCrimesByMonthAndYear[0]['hbs'] = hbs;
      var chart = AmCharts.makeChart("js-non-grave-report", {
        "type": "serial",

        "categoryField": "month",
        "startDuration": 1,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "Dacoity:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "DACOITY",
          "type": "column",
          "valueField": "dacoity",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Burglary:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "BURGLARY",
          "type": "column",
          "valueField": "hbs",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Murder for gain:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-5",
          "lineAlpha": 0.2,
          "title": "MURDER FOR GAIN",
          "type": "column",
          "valueField": "murder_for_gain",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Ordinary +:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-6",
          "lineAlpha": 0.2,
          "title": "ORIDINAR THEFT",
          "type": "column",
          "valueField": "ordinary",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Robbery:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-7",
          "lineAlpha": 0.2,
          "title": "ROBBERY",
          "type": "column",
          "valueField": "robbery",
          "labelText": "[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "titles": [{
          "text": details.titleObj.title3+" - "+total,
          "size": 15
        }],
        "allLabels": [],
        "balloon": {},
        "dataProvider": [{
          "month": month,
          "dacoity": details.propertyCrimesByMonthAndYear[0]['dacoity'],
          "hbs": details.propertyCrimesByMonthAndYear[0]['hbs'],
          "hbsbynight": details.propertyCrimesByMonthAndYear[0]['hbsbynight'],
          "murder_for_gain": details.propertyCrimesByMonthAndYear[0]['murder_for_gain'],
          "ordinary": details.propertyCrimesByMonthAndYear[0]['ordinary'],
          "robbery": details.propertyCrimesByMonthAndYear[0]['robbery']
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-non-grave-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
      $('#js-non-grave-report').html('No Data');
    }
    if (details.bodyOffencesCrimesByMonthAndYear && details.bodyOffencesCrimesByMonthAndYear.length > 0) {
      var total = details.bodyOffencesCrimesByMonthAndYear[0]["307_ipc"] + details.bodyOffencesCrimesByMonthAndYear[0]["c_homicides"] + details.bodyOffencesCrimesByMonthAndYear[0]["griev_hurts"] + details.bodyOffencesCrimesByMonthAndYear[0]["kidnappings"] + details.bodyOffencesCrimesByMonthAndYear[0]["murders"] + details.bodyOffencesCrimesByMonthAndYear[0]["rape"] + details.bodyOffencesCrimesByMonthAndYear[0]["riotings"] + details.bodyOffencesCrimesByMonthAndYear[0]["simple_hurts"];
      var hurts=details.bodyOffencesCrimesByMonthAndYear[0]["griev_hurts"]+details.bodyOffencesCrimesByMonthAndYear[0]["simple_hurts"];
      $('#js-property-table tbody').html('<tr><td>307 IPC</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["307_ipc"] + '</td></tr><tr><td>C.Homicides</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["c_homicides"] + '</td></tr><tr><td>Hurts</td><td>' + hurts + '</td></tr><tr><td>Kidnappings</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["kidnappings"] + '</td></tr><tr><td>Murders</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["murders"] + '</td></tr><tr><td>rape</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["rape"] + '</td></tr><tr><td>Riotings</td><td>' + details.bodyOffencesCrimesByMonthAndYear[0]["riotings"] + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>');
      details.bodyOffencesCrimesByMonthAndYear[0]["hurts"]=hurts;
      console.log("I have no clue");
      console.log(details.bodyOffencesCrimesByMonthAndYear[0].month);
      if ($('#js-month-selection-options li.active a').text() == 'ALL') {
        var month = $('#js-year-selection-options li.active a').data('val');
      } else {
        var month = $('#js-month-selection-options li.active a').text();
      }
      var chart = AmCharts.makeChart("js-property-report", {
        "type": "serial",

        "categoryField": "month",

        "startDuration": 1,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "307 IPC:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "307 IPC",
          "type": "column",
          "valueField": "307_ipc",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "C.Homicides:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "CUL.HOMICIDE",
          "type": "column",
          "valueField": "c_homicides",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Hurts:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "HURTS",
          "type": "column",
          "valueField": "hurts",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Kidnappings:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-5",
          "lineAlpha": 0.2,
          "title": "KIDNAPPINGS",
          "type": "column",
          "valueField": "kidnappings",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Murders:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-6",
          "lineAlpha": 0.2,
          "title": "MURDERS",
          "type": "column",
          "valueField": "murders",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Rape:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-7",
          "lineAlpha": 0.2,
          "title": "RAPE",
          "type": "column",
          "valueField": "rape",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Riotings:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-8",
          "lineAlpha": 0.2,
          "title": "RIOTINGS",
          "type": "column",
          "valueField": "riotings",
          "labelText": "[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title4+" - "+total,
          "size": 15
        }],
        "dataProvider": [{
          "month": month,
          "307_ipc": details.bodyOffencesCrimesByMonthAndYear[0]['307_ipc'],
          "c_homicides": details.bodyOffencesCrimesByMonthAndYear[0]['c_homicides'],
          "hurts": details.bodyOffencesCrimesByMonthAndYear[0]['hurts'],
          "kidnappings": details.bodyOffencesCrimesByMonthAndYear[0]['kidnappings'],
          "murders": details.bodyOffencesCrimesByMonthAndYear[0]['murders'],
          "rape": details.bodyOffencesCrimesByMonthAndYear[0]['rape'],
          "riotings": details.bodyOffencesCrimesByMonthAndYear[0]['riotings']
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-property-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
      $('#js-property-report').html('No Data');
    }
    if (details.accidentsByMonthAndYear && details.accidentsByMonthAndYear.length > 0) {
      var total = details.accidentsByMonthAndYear[0]["sum(total_no_of_accidents)"] + details.accidentsByMonthAndYear[0]["sum(total_no_of_deaths)"] + details.accidentsByMonthAndYear[0]["sum(total_no_of_injured)"];
      $('#js-grave-table tbody').html('<tr><td>NO.OF ACCIDENTS</td><td>' + details.accidentsByMonthAndYear[0]["sum(total_no_of_accidents)"] + '</td></tr><tr><td>NO.OF DEATHS</td><td>' + details.accidentsByMonthAndYear[0]["sum(total_no_of_deaths)"] + '</td></tr><tr><td>NO.OF INJURED</td><td>' + details.accidentsByMonthAndYear[0]["sum(total_no_of_injured)"] + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>');
      if ($('#js-month-selection-options li.active a').text() == 'ALL') {
        var month = $('#js-year-selection-options li.active a').data('val');
      } else {
        var month = $('#js-month-selection-options li.active a').text();
      }
      var chart = AmCharts.makeChart("js-grave-report", {
        "type": "serial",

        "categoryField": "month",
        "startDuration": 1,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "NO.OF ACCIDENTS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "NO.OF ACCIDENTS",
          "type": "column",
          "valueField": "sum(total_no_of_accidents)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "NO.OF DEATHS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "NO.OF DEATHS",
          "type": "column",
          "valueField": "sum(total_no_of_deaths)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "NO.OF INJURED:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "NO.OF INJURED",
          "type": "column",
          "valueField": "sum(total_no_of_injured)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title7+" - "+total,
          "size": 15
        }],
        "dataProvider": [{
          "month": month,
          "sum(total_no_of_accidents)": details.accidentsByMonthAndYear[0]['sum(total_no_of_accidents)'],
          "sum(total_no_of_deaths)": details.accidentsByMonthAndYear[0]['sum(total_no_of_deaths)'],
          "sum(total_no_of_injured)": details.accidentsByMonthAndYear[0]['sum(total_no_of_injured)']
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-grave-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
      $('#js-grave-report').html('No Data');
    }
    if (details.factionOffencesMurders && details.factionOffencesMurders.length > 0) {
      var chart = AmCharts.makeChart("js-faction-offence", {
        "type": "serial",

        "colors": ["#6499de"],
        "categoryField": "faction_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "faction_name:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "faction_name",
          "type": "column",
          "valueField": "rm_tru",
          "labelText": "[[value]]"
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title6,
          "size": 15
        }],
        "dataProvider": [{
          "faction_name": "Murders",
          "rm_tru": details.factionOffencesMurders[0].faction_murders
        }, {
          "faction_name": "Riotings",
          "rm_tru": details.factionOffencesRiotings[0].faction_riotings
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-faction-offence').html('No Data');
    }
    if (details.offenceAgainstWomen && details.offenceAgainstWomen.length > 0) {
      var chart = AmCharts.makeChart("js-offence-againest-women", {
        "type": "serial",

        "colors": ["#6499de"],
        "categoryField": "faction_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "faction_name:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "faction_name",
          "type": "column",
          "valueField": "rm_tru",
          "labelText": "[[value]]"
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title5,
          "size": 15
        }],
        "dataProvider": [{
          "faction_name": "Abetment to Suicide",
          "rm_tru": details.offenceAgainstWomen[0].abtmnt_suicide
        }, {
          "faction_name": "Bigamy",
          "rm_tru": details.offenceAgainstWomen[0].bigomy_494_497_ipc
        }, {
          "faction_name": "D.P. Act ",
          "rm_tru": details.offenceAgainstWomen[0].dp_act_3_4_6
        }, {
          "faction_name": "Dowry Deaths",
          "rm_tru": details.offenceAgainstWomen[0].dwry_deaths
        }, {
          "faction_name": "Dowry Murders",
          "rm_tru": details.offenceAgainstWomen[0].dwry_mrdr
        }, {
          "faction_name": "Harassment",
          "rm_tru": details.offenceAgainstWomen[0].harassment
        }, {
          "faction_name": "Kidnapping",
          "rm_tru": details.offenceAgainstWomen[0].kidnp_363_369_ipc
        }, {
          "faction_name": "Other Crimes",
          "rm_tru": details.offenceAgainstWomen[0].other_crimes
        }, {
          "faction_name": "Outraging women",
          "rm_tru": details.offenceAgainstWomen[0].outraging_mdsy_354_ipc
        }, {
          "faction_name": "Rape",
          "rm_tru": details.offenceAgainstWomen[0].rape
        }, {
          "faction_name": "Women Murder",
          "rm_tru": details.offenceAgainstWomen[0].women_mrdr
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-offence-againest-women').html('No Data');
    }
    if (details.accidentsByMonthAndYear.length > 0) {
      if ($('#js-month-selection-options li.active a').text() == 'ALL') {
        var month = $('#js-year-selection-options li.active a').data('val');
      } else {
        var month = $('#js-month-selection-options li.active a').text();
      }
      var chart = AmCharts.makeChart("js-grave-report", {
        "type": "serial",

        "categoryField": "month",
        "startDuration": 1,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "NO.OF ACCIDENTS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "NO.OF ACCIDENTS",
          "type": "column",
          "valueField": "sum(total_no_of_accidents)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "NO.OF DEATHS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "NO.OF DEATHS",
          "type": "column",
          "valueField": "sum(total_no_of_deaths)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "NO.OF INJURED:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "NO.OF INJURED",
          "type": "column",
          "valueField": "sum(total_no_of_injured)",
          "labelText": "[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title7+" - "+total,
          "size": 15
        }],
        "dataProvider": [{
          "month": month,
          "sum(total_no_of_accidents)": details.accidentsByMonthAndYear[0]['sum(total_no_of_accidents)'],
          "sum(total_no_of_deaths)": details.accidentsByMonthAndYear[0]['sum(total_no_of_deaths)'],
          "sum(total_no_of_injured)": details.accidentsByMonthAndYear[0]['sum(total_no_of_injured)']
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-grave-report').html('');
    }
    if (details.whiteCollarCrimeByMonthAndYear && details.whiteCollarCrimeByMonthAndYear.length > 0) {
      var total = details.whiteCollarCrimeByMonthAndYear[0]["cb_of_trust"] + details.whiteCollarCrimeByMonthAndYear[0]["cf_currency"] + details.whiteCollarCrimeByMonthAndYear[0]["cheatings"] + details.whiteCollarCrimeByMonthAndYear[0]["sdrugs"];
      $('#js-body-table tbody').html('<tr><td>C.B.of Trust</td><td>' + details.whiteCollarCrimeByMonthAndYear[0]["cb_of_trust"] + '</td></tr><tr><td>C.F.Currency</td><td>' + details.whiteCollarCrimeByMonthAndYear[0]["cf_currency"] + '</td></tr><tr><td>Cheatings</td><td>' + details.whiteCollarCrimeByMonthAndYear[0]["cheatings"] + '</td></tr><tr><td>S.Drugs</td><td>' + details.whiteCollarCrimeByMonthAndYear[0]["sdrugs"] + '</td></tr><tr><td><b>Total</b></td><td>' + total + '</td></tr>');
      if ($('#js-month-selection-options li.active a').text() == 'ALL') {
        var month = $('#js-year-selection-options li.active a').data('val');
      } else {
        var month = $('#js-month-selection-options li.active a').text();
      }
      var chart = AmCharts.makeChart("js-body-report", {
        "type": "serial",

        "categoryField": "month",
        "startDuration": 1,
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "C.B.of Trust:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "CR.BR. OF TRUST",
          "type": "column",
          "valueField": "cb_of_trust",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "C.F.Currency:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "COUNTERFEIT CURRENCY",
          "type": "column",
          "valueField": "cf_currency",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "Cheatings:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "CHEATINGS",
          "type": "column",
          "valueField": "cheatings",
          "labelText": "[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "S.Drugs:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-5",
          "lineAlpha": 0.2,
          "title": "STUPEFYING DRUGS",
          "type": "column",
          "valueField": "sdrugs",
          "labelText": "[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "axisAlpha": 0,
          "minimum": 0
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [{
          "text": details.titleObj.title8+" _ "+total,
          "size": 15
        }],
        "dataProvider": [{
          "month": month,
          "cb_of_trust": details.whiteCollarCrimeByMonthAndYear[0]['cb_of_trust'],
          "cf_currency": details.whiteCollarCrimeByMonthAndYear[0]['cf_currency'],
          "cheatings": details.whiteCollarCrimeByMonthAndYear[0]['cheatings'],
          "sdrugs": details.whiteCollarCrimeByMonthAndYear[0]['sdrugs']
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else {
      $('#js-body-table tbody').html('<tr><td colspan="2">No Data</td></tr>');
      $('#js-body-report').html('');
    }
  }
  if ($('.navbar-nav').find('li.active a').attr('href') == "/distrcts") {
    var obj = {};
    obj.year = 2016;
    obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    obj.ranges = [11, 12, 13, 14, 15, 16, 17];
    obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });
  }

  function distrctsReport(details) {
    console.log(details);
    if (details.singleRangesTotlaIPC) {
      var array = [];
      var dataObject = {};
      dataObject.range_name = $('.js-ranges-groups').parent('li.active').find('a').text();
      var property_crime = 0;
      var bodly_offences = 0;
      var white_collar_crime = 0;
      var accidents = 0;
      var other_ipc = 0;
      for (var i in details.singleRangesTotlaIPC) {
        property_crime = property_crime + details.singleRangesTotlaIPC[i].property_crime;
        bodly_offences = bodly_offences + details.singleRangesTotlaIPC[i].bodly_offences;
        white_collar_crime = white_collar_crime + details.singleRangesTotlaIPC[i].white_collar_crime;
        accidents = accidents + details.singleRangesTotlaIPC[i].accidents;
        other_ipc = other_ipc + details.singleRangesTotlaIPC[i].other_ipc;
      }
      dataObject.property_crime = property_crime;
      dataObject.bodly_offences = bodly_offences;
      dataObject.white_collar_crime = white_collar_crime;
      dataObject.accidents = accidents;
      dataObject.other_ipc = other_ipc;
      array.push(dataObject);
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",

        "categoryField": "range_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 0,
          "labelsEnabled": true,
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "PROPERTY CRIME:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "PROPERTY CRIME",
          "type": "column",
          "valueField": "property_crime",
          "labelText": "PROPERTY CRIME:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "BODLY OFFENCESE:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "BODLY OFFENCESE",
          "type": "column",
          "valueField": "bodly_offences",
          "labelText": "BODLY OFFENCESE:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "WHITE COLLAR CRIME:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "WHITE COLLAR CRIME",
          "type": "column",
          "valueField": "white_collar_crime",
          "labelText": "WHITE COLLAR CRIME:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "ACCIDENTS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "ACCIDENTS",
          "type": "column",
          "valueField": "accidents",
          "labelText": "ACCIDENTS:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "OTHER IPC:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-5",
          "lineAlpha": 0.2,
          "title": "OTHER IPC",
          "type": "column",
          "valueField": "other_ipc",
          "labelText": "OTHER IPC:[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0,
          "position": "left"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": array,
        "fontSize": 13,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.allCompatisionsData) {
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",
        "addClassNames": true,

        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": details.allCompatisionsData,
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>Total IPC CRIMES in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "range_name",
          "type": "column",
          "valueField": "rm_tru",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[value]]",
          "labelRotation": -45,
          "fontSize": 13
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>Total IPC CRIMES in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "range_name",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.allRangesSingleGroup) {
      var head = "";
      var array = [];
      for (var i in details.allRangesSingleGroup) {
        if (head === details.allRangesSingleGroup[i].head_name) {
          obj = array.pop();
          obj[details.allRangesSingleGroup[i].range_name] = details.allRangesSingleGroup[i].rm_tru;
          array.push(obj);
        } else {
          head = details.allRangesSingleGroup[i].head_name;
          var obj = {};
          obj.head_name = details.allRangesSingleGroup[i].head_name;
          obj[details.allRangesSingleGroup[i].range_name] = details.allRangesSingleGroup[i].rm_tru;
          array.push(obj);
        }
      }
      array[0].head_name = $('.js-crime-groups').parent('li.active').find('a').text();
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",

        "categoryField": "head_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 0,
          "labelsEnabled": true,
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
            "balloonText": "Kurnool Range:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-1",
            "lineAlpha": 0.2,
            "title": "Kurnool",
            "type": "column",
            "valueField": "Kurnool",
            "labelText": "Kurnool Range:[[value]]",
            "labelRotation": -45
          }, {
            "balloonText": "Anantapur Range:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-2",
            "lineAlpha": 0.2,
            "title": "Anantapur",
            "type": "column",
            "valueField": "Anantapur",
            "labelText": "Anantapur Range:[[value]]",
            "labelRotation": -45
          }, {
            "balloonText": "Guntur Range:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-3",
            "lineAlpha": 0.2,
            "title": "Guntur",
            "type": "column",
            "valueField": "Guntur",
            "labelText": "Guntur Range:[[value]]",
            "labelRotation": -45
          }, {
            "balloonText": "Eluru Range:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-4",
            "lineAlpha": 0.2,
            "title": "Eluru",
            "type": "column",
            "valueField": "Eluru",
            "labelText": "Eluru Range:[[value]]",
            "labelRotation": -45
          }, {
            "balloonText": "Vizag Range:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-5",
            "lineAlpha": 0.2,
            "title": "Vizag",
            "type": "column",
            "valueField": "Vizag",
            "labelText": "Vizag Range:[[value]]",
            "labelRotation": -45
          }
          /*, {
                    "balloonText": "Commissionerate Range:[[value]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-6",
                    "lineAlpha": 0.2,
                    "title": "Commissionerate",
                    "type": "column",
                    "valueField": "Commissionerate",
                    "labelText": "Commissionerate Range:[[value]]"
                  }, {
                    "balloonText": "Railway Units:[[value]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-7",
                    "lineAlpha": 0.2,
                    "title": "Railway Units",
                    "type": "column",
                    "valueField": "Railway Units",
                    "labelText": "Railway Units:[[value]]"
                  }*/
        ],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "top",
          "minimum": 0,
          "axisAlpha": 0,
          "position": "left"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "fontSize": 13,
        "dataProvider": array,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }

      });
    }

    if (details.singleRangesSingleGroup) {
      console.log(details.singleRangesSingleGroup);
      var head = "";
      var array = [];
      for (var i in details.singleRangesSingleGroup) {
        if (head === details.singleRangesSingleGroup[i].head_name) {
          obj = array.pop();
          obj[details.singleRangesSingleGroup[i].district_name] = details.singleRangesSingleGroup[i].rm_tru;
          array.push(obj);
        } else {
          head = details.singleRangesSingleGroup[i].head_name;
          var obj = {};
          obj.head_name = details.singleRangesSingleGroup[i].head_name;
          obj[details.singleRangesSingleGroup[i].district_name] = details.singleRangesSingleGroup[i].rm_tru;
          array.push(obj);
        }
      }
      var graphArray = [];
      var count = 1
      for (property in array[0]) {
        if (property != 'head_name') {
          var graphObj = {
            "balloonText": '[[head_name]] in ' + property + ': [[value]]',
            "fillAlphas": 0.8,
            "id": "AmGraph-" + count,
            "lineAlpha": 0.2,
            "title": property,
            "type": "column",
            "valueField": property,
            "labelText": '[[value]]',
            "labelRotation": -45,
            "fontSize": 13
          }
          count = count + 1;
          graphArray.push(graphObj);
        }
      }

      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",

        "categoryField": "head_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "position": "left"
        },
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "trendLines": [],
        "graphs": graphArray,
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "top",
          "minimum": 0,
          "axisAlpha": 0,
          "position": "left"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": array,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });

    }
    if (details.allRangescrimeOnWomen) {
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",
        "addClassNames": true,

        //"titles": [{
        //  "text": details.titleObj.title1,
        //  "size": 12
        //}],
        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": details.allRangescrimeOnWomen,
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "district_name",
          "type": "column",
          "valueField": "dd",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[district_name]]:[[value]]",
          "labelRotation": -45
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "district_name",
        "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.allZonesAndCrimeHeads) {
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",
        "addClassNames": true,

        //"titles": [{
        //  "text": details.titleObj.title1,
        //  "size": 12
        //}],
        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": details.allZonesAndCrimeHeads,
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "TOTAL IPC CRIMES",
          "type": "column",
          "valueField": "rm_tru",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[zone_name]]:[[value]]",
          "labelRotation": -45
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "zone_name",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 0,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.allRangesFaction) {
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",
        "addClassNames": true,

        //"titles": [{
        //  "text": details.titleObj.title1,
        //  "size": 12
        //}],
        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": [{
          "zone_name": "MURDERS",
          "value": details.allRangesFaction[0].faction_murders
        }, {
          "zone_name": "RIOTING",
          "value": details.allRangesFaction[0].faction_riotings
        }],
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "zone_name",
          "type": "column",
          "valueField": "value",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[zone_name]]:[[value]]"
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "zone_name",
        "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    /*  var chart = AmCharts.makeChart("js-crime-by-distrct", {
        "type": "serial",

        "colors": ["#6499de"],
        "categoryField": "district_name",
        "rotate": true,
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "district_name:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "district_name",
          "type": "column",
          "valueField": "rm_tru",
          "labelText": "[[value]]"
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "top",
          "axisAlpha": 0,
          minimum: 0,
          "title": "DISTRICT WISE - ALL CRIMES"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": details.crimesByDistrcts,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG", "CSV"]
            }]
          }]
        }
      });
      var chart = AmCharts.makeChart("js-crime-by-category", {
        "type": "serial",

        "categoryField": "head_name",
        "rotate": true,
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "head_name:[[value]]",
          "fillColorsField": ["#6ab7da", "#fd9d28", "#b2da6e", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"],
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "head_name",
          "type": "column",
          "valueField": "rm_tru",
          "labelText": "[[value]]"
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "top",
          "axisAlpha": 0,
          minimum: 0,
          "title": "CRIME HEAD WISE"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": details.crimesByCategory,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG", "CSV"]
            }]
          }]
        }
      });
      if (details.allCrimesAllDistricts[0] && details.allCrimesAllDistricts[0].curnt_mnth) {
        var text1 = "NOV 2015"
        var value1 = details.allCrimesAllDistricts[0].curnt_mnth
      } else {
        var text1 = "JAN-NOV 2013"
        var value1 = details.allCrimesAllDistricts[0].upto_nov_2013
      }
      if (details.allCrimesAllDistricts[0] && details.allCrimesAllDistricts[0].prvus_mnth) {
        var text2 = "OCT 2015"
        var value2 = details.allCrimesAllDistricts[0].prvus_mnth
      } else {
        var text2 = "JAN-NOV 2014"
        var value2 = details.allCrimesAllDistricts[0].upto_nov_2014
      }
      if (details.allCrimesAllDistricts[0] && details.allCrimesAllDistricts[0].crspnd_mnth_last_year) {
        var text3 = "NOV 2014"
        var value3 = details.allCrimesAllDistricts[0].crspnd_mnth_last_year
      } else {
        var text3 = "JAN-NOV 2015"
        var value3 = details.allCrimesAllDistricts[0].upto_nov_2015
      }
      var chart = AmCharts.makeChart("js-month-range", {
        "type": "serial",

        "titles": [{
          "text": "COGNIZABLE CRIME CCOMPARISION",
          "size": 12
        }],
        "dataProvider": [{
          "country": text1,
          "visits": value1
        }, {
          "country": text2,
          "visits": value2
        }, {
          "country": text3,
          "visits": value3
        }],
        "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": "visits",
          "labelText": "[[value]]"
        }],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "tickPosition": "start",
          "tickLength": 20
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG", "CSV"]
            }]
          }]
        }
      });*/

    if (details.singleZoneAndTotalIPC) {
      //alert("Yureka i Nailed it" + details.singleZoneAndTotalIPC[0].zone_name);
      var array = [];
      var dataObject = {};
      dataObject.range_name = details.singleZoneAndTotalIPC[0].zone_name;
      var property_crime = 0;
      var bodly_offences = 0;
      var white_collar_crime = 0;
      var accidents = 0;
      var other_ipc = 0;
      // for (var i in details.singleRangesTotlaIPC) {
      //   property_crime = property_crime + details.singleRangesTotlaIPC[i].property_crime;
      //   bodly_offences = bodly_offences + details.singleRangesTotlaIPC[i].bodly_offences;
      //   white_collar_crime = white_collar_crime + details.singleRangesTotlaIPC[i].white_collar_crime;
      //   accidents = accidents + details.singleRangesTotlaIPC[i].accidents;
      //   other_ipc = other_ipc + details.singleRangesTotlaIPC[i].other_ipc;
      // }
      dataObject.property_crime = details.singleZoneAndTotalIPC[0].property_crime;
      dataObject.bodly_offences = details.singleZoneAndTotalIPC[0].bodly_offences;
      dataObject.white_collar_crime = details.singleZoneAndTotalIPC[0].white_collar_crime;
      dataObject.accidents = details.singleZoneAndTotalIPC[0].accidents;
      dataObject.other_ipc = details.singleZoneAndTotalIPC[0].other_ipc;
      array.push(dataObject);
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",

        "categoryField": "range_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 0,
          "labelsEnabled": true,
          "position": "left"
        },
        "trendLines": [],
        "graphs": [{
          "balloonText": "PROPERTY CRIME:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "title": "PROPERTY CRIME",
          "type": "column",
          "valueField": "property_crime",
          "labelText": "PROPERTY CRIME:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "BODLY OFFENCESE:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "title": "BODLY OFFENCESE",
          "type": "column",
          "valueField": "bodly_offences",
          "labelText": "BODLY OFFENCESE:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "WHITE COLLAR CRIME:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          "title": "WHITE COLLAR CRIME",
          "type": "column",
          "valueField": "white_collar_crime",
          "labelText": "WHITE COLLAR CRIME:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "ACCIDENTS:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-4",
          "lineAlpha": 0.2,
          "title": "ACCIDENTS",
          "type": "column",
          "valueField": "accidents",
          "labelText": "ACCIDENTS:[[value]]",
          "labelRotation": -45
        }, {
          "balloonText": "OTHER IPC:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-5",
          "lineAlpha": 0.2,
          "title": "OTHER IPC",
          "type": "column",
          "valueField": "other_ipc",
          "labelText": "OTHER IPC:[[value]]",
          "labelRotation": -45
        }],
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0,
          "position": "left"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": array,
        "fontSize": 13,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
    if (details.singleZoneAndSingleGroup) {
      console.log(details.singleZoneAndSingleGroup);
      var head = "";
      var array = [];
      for (var i in details.singleZoneAndSingleGroup) {
        if (head === details.singleZoneAndSingleGroup[i].head_name) {
          obj = array.pop();
          obj[details.singleZoneAndSingleGroup[i].range_name + " Range"] = details.singleZoneAndSingleGroup[i].rm_tru;
          array.push(obj);
        } else {
          head = details.singleZoneAndSingleGroup[i].head_name;
          var obj = {};
          obj.head_name = details.singleZoneAndSingleGroup[i].head_name;
          obj[details.singleZoneAndSingleGroup[i].range_name + " Range"] = details.singleZoneAndSingleGroup[i].rm_tru;
          array.push(obj);
        }
      }
      var graphArray = [];
      var count = 1
      for (property in array[0]) {
        if (property != 'head_name') {
          var graphObj = {
            "balloonText": '[[head_name]] in ' + property + ': [[value]]',
            "fillAlphas": 0.8,
            "id": "AmGraph-" + count,
            "lineAlpha": 0.2,
            "title": property,
            "type": "column",
            "valueField": property,
            "labelText": '[[value]]',
            "labelRotation": -45,
            "fontSize": 13
          }
          count = count + 1;
          graphArray.push(graphObj);
        }
      }

      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",

        "categoryField": "head_name",
        "startDuration": 1,
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "position": "left"
        },
        "legend": {
          "fontSize": 11,
          "align": "center",
          "useGraphSettings": false,
          "markerSize": 5,
          "valueWidth": 0,
          "verticalGap": 0
        },
        "trendLines": [],
        "graphs": graphArray,
        "guides": [],
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "top",
          "minimum": 0,
          "axisAlpha": 0,
          "position": "left"
        }],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": array,
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });

    }
    if (details.allZonesAndSingleGroup) {
      var chart = AmCharts.makeChart("js-comparision", {
        "type": "serial",
        "addClassNames": true,

        //"titles": [{
        //  "text": details.titleObj.title1,
        //  "size": 12
        //}],
        "autoMargins": true,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },

        "dataProvider": details.allZonesAndSingleGroup,
        "valueAxes": [{
          "axisAlpha": 0,
          "minimum": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": $('.js-crime-groups').parent('li.active').find('a').text(),
          "type": "column",
          "valueField": "rm_tru",
          "dashLengthField": "dashLengthColumn",
          "labelText": "[[zone_name]]:[[value]]",
          "labelRotation": -45
        }, {
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "Expenses",
          "valueField": "expenses"
        }],
        "categoryField": "zone_name",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 0,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
  }

  function reportComparision(details) {
    console.log(details);
    $('#js-report-top5-table tbody').html('<tr><td>' + details.gettop5crimes[0].district_name + '</td><td>' + details.gettop5crimes[0].count + '</td></tr><tr><td>' + details.gettop5crimes[1].district_name + '</td><td>' + details.gettop5crimes[1].count + '</td></tr><tr><td>' + details.gettop5crimes[2].district_name + '</td><td>' + details.gettop5crimes[2].count + '</td></tr><tr><td>' + details.gettop5crimes[3].district_name + '</td><td>' + details.gettop5crimes[3].count + '</td></tr><tr><td>' + details.gettop5crimes[4].district_name + '</td><td>' + details.gettop5crimes[4].count + '</td></tr>')
    var chart = AmCharts.makeChart("js-report-comparision-top5", {
      "type": "serial",

      "categoryField": "district_name",
      "startDuration": 1,
      "categoryAxis": {
        "gridPosition": "start",
        "autoWrap": true,
        "boldLabels": true,
        "fontSize": 12,
        "labelRotation": 45,
        "labelsEnabled": true,
        "position": "left"
      },
      "trendLines": [],
      "graphs": [{
        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "id": "AmGraph-1",
        "lineAlpha": 0.2,
        "title": "district_name",
        "type": "column",
        "valueField": "count",
        "labelText": "[[value]]",
        "labelRotation": -45,
        "fontSize": 13
      }],
      "guides": [],
      "valueAxes": [{
        "id": "ValueAxis-1",
        "position": "left",
        "minimum": 0,
        "axisAlpha": 0
      }],
      "allLabels": [],
      "balloon": {},
      "titles": [{
        "text": "HIGHEST CRIME RATE - " + $('#js-top-bottom-options li.active a').text(),
        "size": 20
      }],
      "dataProvider": details.gettop5crimes,
      "export": {
        "enabled": true,
        "menu": [{
          "class": "export-main",
          "menu": [{
            "label": "Download",
            "menu": ["PNG", "JPG"]
          }]
        }]
      }
    });
    $('#js-report-bottom5-table tbody').html('<tr><td>' + details.getbottom5crimes[0].district_name + '</td><td>' + details.getbottom5crimes[0].count + '</td></tr><tr><td>' + details.getbottom5crimes[1].district_name + '</td><td>' + details.getbottom5crimes[1].count + '</td></tr><tr><td>' + details.getbottom5crimes[2].district_name + '</td><td>' + details.getbottom5crimes[2].count + '</td></tr><tr><td>' + details.getbottom5crimes[3].district_name + '</td><td>' + details.getbottom5crimes[3].count + '</td></tr><tr><td>' + details.getbottom5crimes[4].district_name + '</td><td>' + details.getbottom5crimes[4].count + '</td></tr>');
    var chart = AmCharts.makeChart("js-report-comparision-bottom5", {
      "type": "serial",

      "categoryField": "district_name",
      "startDuration": 1,
      "categoryAxis": {
        "gridPosition": "start",
        "autoWrap": true,
        "boldLabels": true,
        "fontSize": 12,
        "labelRotation": 45,
        "labelsEnabled": true,
        "position": "left"
      },
      "trendLines": [],
      "graphs": [{
        "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "id": "AmGraph-1",
        "lineAlpha": 0.2,
        "title": "district_name",
        "type": "column",
        "valueField": "count",
        "labelText": "[[value]]",
        "labelRotation": -45,
        "fontSize": 13
      }],
      "guides": [],
      "valueAxes": [{
        "id": "ValueAxis-1",
        "position": "left",
        "minimum": 0,
        "axisAlpha": 0
      }],
      "allLabels": [],
      "balloon": {},
      "titles": [{
        "text": "LOWEST CRIME RATE - " + $('#js-top-bottom-options li.active a').text(),
        "size": 20
      }],
      "dataProvider": details.getbottom5crimes,
      "export": {
        "enabled": true,
        "menu": [{
          "class": "export-main",
          "menu": [{
            "label": "Download",
            "menu": ["PNG", "JPG"]
          }]
        }]
      }
    });
  }
  if ($('.navbar-nav').find('li.active a').attr('href') == "/crimes") {
    //reportComparision();
    var obj = {};
    obj.year = "2016";
    obj.head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    $.ajax({
      type: "post",
      url: '/crimes/gettop5bottom5',
      dataType: 'json',
      data: obj,
      success: function(details) {
        console.log(details);
        reportComparision(details);
      }
    });
  }
  if ($('.navbar-nav').find('li.active a').attr('href') == "/trendline") {
    //reportTrendline();
    var obj = {};
    obj.units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    obj.year = 2016;
    obj.month = 12
    $.ajax({
      type: "post",
      url: '/trendline/getreports',
      dataType: 'json',
      data: obj,
      success: function(details) {
        console.log(details);
        reporttrendlineComparision(details);
      }
    });
  }

  function reporttrendlineComparision(details) {
    if (details && details.gettrendlineReport) {
      var newData = details.gettrendlineReport;
      var lastElement = newData.pop();
      lastElement.head_name = "Total";
      newData.slice(0, -1);
      newData.push(lastElement);
      var array = [];
      // if ($('.js-distrcts-trendline').parent('li.active').find('a').data('val') == "all" && $('.js-trendline-groups').parent('li.active').find('a').data('val') == "all") {
      //   newData[0].district_name = "State Wise";
      //   newData[0].head_name = "Total IPC";
      //   var year = parseInt($('.js-year-topbottom').parent('li.active').find('a').data('val'));
      //   var chart = AmCharts.makeChart("js-report-trendline", {
      //     "type": "serial",
      //
      //     "legend": {
      //       "useGraphSettings": true
      //     },
      //     "dataProvider": [{
      //       "year": year,
      //       "TotalIpc": newData[0].cy_0
      //     }, {
      //       "year": year-1,
      //       "TotalIpc": newData[0].cy_1
      //     }, {
      //       "year": year-2,
      //       "TotalIpc": newData[0].cy_2
      //     }, {
      //       "year":year-3,
      //       "TotalIpc": newData[0].cy_3
      //     }, {
      //       "year": year-4,
      //       "TotalIpc": newData[0].cy_4
      //     }],
      //     "valueAxes": [{
      //       "integersOnly": true,
      //       "minimum": 1,
      //       "reversed": true,
      //       "axisAlpha": 0,
      //       "dashLength": 5,
      //       "gridCount": 10,
      //       "position": "left"
      //     /*  "title": "Place taken"*/
      //     }],
      //     "startDuration": 0.5,
      //     "graphs": [{
      //       "balloonText": "Tital IPC in [[category]]: [[value]]",
      //       "bullet": "round",
      //       "title": "Tital IPC",
      //       "valueField": "TotalIpc",
      //       "fillAlphas": 0
      //     }],
      //     "chartCursor": {
      //       "cursorAlpha": 0,
      //       "zoomable": false
      //     },
      //     "categoryField": "year",
      //     "categoryAxis": {
      //       "gridPosition": "start",
      //       "axisAlpha": 0,
      //       "fillAlpha": 0.05,
      //       "fillColor": "#000000",
      //       "gridAlpha": 0,
      //       "position": "top"
      //     },
      //     "export": {
      //       "enabled": true,
      //       "position": "bottom-right"
      //     }
      //   });
      // } else {
      var obj_list = [];
      var graphTitles = [];
      var year = $('#js-year-trendline-options-years li.active a').data("val");
      for (j = 0; j < 5; j++) {
        var temp_obj = {};
        temp_obj.year = year - j;
        for (i = 0; i < newData.length; i++) {
          if (j == 0) {
            var graph_obj = {};
            graph_obj.balloonText = newData[i].head_name + "in [[category]]: [[value]]";
            graph_obj.bullet = "round";
            graph_obj.hidden = true;
            graph_obj.title = newData[i].head_name;
            graph_obj.valueField = newData[i].head_name;
            graph_obj.fillAlphas = 0;
            graph_obj.labelText = "[[value]]";
            graph_obj.labelRotation = -45;
            graphTitles.push(graph_obj);
          }
          var valueField = newData[i].head_name;
          temp_obj[valueField] = newData[i]["cy_" + j];
        }
        obj_list.push(temp_obj);
      }
      //console.log("i am success");
      //console.log(obj_list);
      //console.log(graphTitles);
      var chart = AmCharts.makeChart("js-report-trendline", {
        "type": "serial",

        "legend": {
          "fontSize": 11,
          "align": "center",
          "divId": "js-report-trendline-legend",
          "useGraphSettings": false
        },
        "dataProvider": obj_list,
        "startDuration": 0.5,
        "graphs": graphTitles,
        "chartCursor": {
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "fillAlpha": 0.05,
          "fillColor": "#000000",
          "gridAlpha": 0,
          "position": "top"
        },
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
      //}
    } else if (details && details.trendlineCrimeAgainstWomen) {
      var newData = details.trendlineCrimeAgainstWomen;
      var lastElement = newData.pop();
      lastElement.head_name = "Total";
      newData.slice(0, -1);
      newData.push(lastElement);
      var array = [];
      var obj_list = [];
      var graphTitles = [];
      var year = $('#js-year-trendline-options-years li.active a').data("val");
      for (j = 0; j < 5; j++) {
        var temp_obj = {};
        temp_obj.year = year - j;
        for (i = 0; i < newData.length; i++) {
          if (j == 0) {
            var graph_obj = {};
            graph_obj.balloonText = newData[i].head_name + "in [[category]]: [[value]]";
            graph_obj.bullet = "round";
            graph_obj.hidden = true;
            graph_obj.title = newData[i].head_name;
            graph_obj.valueField = newData[i].head_name;
            graph_obj.fillAlphas = 0;
            graph_obj.labelText = "[[value]]";
            graph_obj.labelRotation = -45;
            graphTitles.push(graph_obj);
          }
          var valueField = newData[i].head_name;
          temp_obj[valueField] = newData[i]["cy_" + j];
        }
        obj_list.push(temp_obj);
      }
      //console.log("i am success");
      //console.log(obj_list);
      //console.log(graphTitles);
      var chart = AmCharts.makeChart("js-report-trendline", {
        "type": "serial",

        "legend": {
          "fontSize": 11,
          "align": "center",
          "divId": "js-report-trendline-legend",
          "useGraphSettings": false
        },
        "dataProvider": obj_list,
        "startDuration": 0.5,
        "graphs": graphTitles,
        "chartCursor": {
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "fillAlpha": 0.05,
          "fillColor": "#000000",
          "gridAlpha": 0,
          "position": "top"
        },
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    } else if (details && details.trendlineCrimeAgainstSCST) {
      var newData = details.trendlineCrimeAgainstSCST;
      var lastElement = newData.pop();
      lastElement.head_name = "Total";
      newData.slice(0, -1);
      newData.push(lastElement);
      var array = [];
      var obj_list = [];
      var graphTitles = [];
      var year = $('#js-year-trendline-options-years li.active a').data("val");
      for (j = 0; j < 5; j++) {
        var temp_obj = {};
        temp_obj.year = year - j;
        for (i = 0; i < newData.length; i++) {
          if (j == 0) {
            var graph_obj = {};
            graph_obj.balloonText = newData[i].head_name + "in [[category]]: [[value]]";
            graph_obj.bullet = "round";
            graph_obj.hidden = true;
            graph_obj.title = newData[i].head_name;
            graph_obj.valueField = newData[i].head_name;
            graph_obj.fillAlphas = 0;
            graph_obj.labelText = "[[value]]";
            graph_obj.labelRotation = -45;
            graphTitles.push(graph_obj);
          }
          var valueField = newData[i].head_name;
          temp_obj[valueField] = newData[i]["cy_" + j];
        }
        obj_list.push(temp_obj);
      }
      //console.log("i am success");
      //console.log(obj_list);
      //console.log(graphTitles);
      var chart = AmCharts.makeChart("js-report-trendline", {
        "type": "serial",

        "legend": {
          "fontSize": 11,
          "align": "center",
          "divId": "js-report-trendline-legend",
          "useGraphSettings": false
        },
        "dataProvider": obj_list,
        "startDuration": 0.5,
        "graphs": graphTitles,
        "chartCursor": {
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "fillAlpha": 0.05,
          "fillColor": "#000000",
          "gridAlpha": 0,
          "position": "top"
        },
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }else if(details && details.trendlineroadaccidents){
      var newData = details.trendlineroadaccidents;
      var lastElement = newData.pop();
      lastElement.head_name = "Total";
      newData.slice(0, -1);
      newData.push(lastElement);
      var array = [];
      var obj_list = [];
      var graphTitles = [];
      var year = $('#js-year-trendline-options-years li.active a').data("val");
      for (j = 0; j < 5; j++) {
        var temp_obj = {};
        temp_obj.year = year - j;
        for (i = 0; i < newData.length; i++) {
          if (j == 0) {
            var graph_obj = {};
            graph_obj.balloonText = newData[i].head_name + "in [[category]]: [[value]]";
            graph_obj.bullet = "round";
            graph_obj.hidden = true;
            graph_obj.title = newData[i].head_name;
            graph_obj.valueField = newData[i].head_name;
            graph_obj.fillAlphas = 0;
            graph_obj.labelText = "[[value]]";
            graph_obj.labelRotation = -45;
            graphTitles.push(graph_obj);
          }
          var valueField = newData[i].head_name;
          temp_obj[valueField] = newData[i]["cy_" + j];
        }
        obj_list.push(temp_obj);
      }
      //console.log("i am success");
      //console.log(obj_list);
      //console.log(graphTitles);
      var chart = AmCharts.makeChart("js-report-trendline", {
        "type": "serial",

        "legend": {
          "fontSize": 11,
          "align": "center",
          "divId": "js-report-trendline-legend",
          "useGraphSettings": false
        },
        "dataProvider": obj_list,
        "startDuration": 0.5,
        "graphs": graphTitles,
        "chartCursor": {
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
          "gridPosition": "start",
          "autoWrap": true,
          "boldLabels": true,
          "fontSize": 12,
          "labelRotation": 45,
          "labelsEnabled": true,
          "axisAlpha": 0,
          "fillAlpha": 0.05,
          "fillColor": "#000000",
          "gridAlpha": 0,
          "position": "top"
        },
        "valueAxes": [{
          "id": "ValueAxis-1",
          "position": "left",
          "minimum": 0,
          "axisAlpha": 0
        }],
        "export": {
          "enabled": true,
          "menu": [{
            "class": "export-main",
            "menu": [{
              "label": "Download",
              "menu": ["PNG", "JPG"]
            }]
          }]
        }
      });
    }
  }

  // generate some random data, quite different range

  function generateChartData(details) {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);

    // we create date objects here. In your data, you can have date strings
    // and then set format of your dates using chart.dataDateFormat property,
    // however when possible, use date objects, as this will speed up chart rendering.
    var newData = details.gettrendlineReport
    var murders = newData[0].cy_0;
    var Dacoity = newData[1].cy_0;
    var HBsbyDay = newData[2].cy_0;
    var HBsbyNight = newData[3].cy_0;
    var Ordinary = newData[4].cy_0;
    var Robbery = newData[5].cy_0;

    chartData.push({
      date: "2016",
      murders: murders,
      Dacoity: Dacoity,
      HBsbyDay: HBsbyDay,
      HBsbyNight: HBsbyNight,
      Ordinary: Ordinary,
      Robbery: Robbery
    });
    var newData = details.gettrendlineReport
    var murders = newData[0].cy_1;
    var Dacoity = newData[1].cy_1;
    var HBsbyDay = newData[2].cy_1;
    var HBsbyNight = newData[3].cy_1;
    var Ordinary = newData[4].cy_1;
    var Robbery = newData[5].cy_1;

    chartData.push({
      date: "2014",
      murders: murders,
      Dacoity: Dacoity,
      HBsbyDay: HBsbyDay,
      HBsbyNight: HBsbyNight,
      Ordinary: Ordinary,
      Robbery: Robbery
    });
    var newData = details.gettrendlineReport
    var murders = newData[0].cy_2;
    var Dacoity = newData[1].cy_2;
    var HBsbyDay = newData[2].cy_2;
    var HBsbyNight = newData[3].cy_2;
    var Ordinary = newData[4].cy_2;
    var Robbery = newData[5].cy_2;

    chartData.push({
      date: "2013",
      murders: murders,
      Dacoity: Dacoity,
      HBsbyDay: HBsbyDay,
      HBsbyNight: HBsbyNight,
      Ordinary: Ordinary,
      Robbery: Robbery
    });
    var newData = details.gettrendlineReport
    var murders = newData[0].cy_3;
    var Dacoity = newData[1].cy_3;
    var HBsbyDay = newData[2].cy_3;
    var HBsbyNight = newData[3].cy_3;
    var Ordinary = newData[4].cy_3;
    var Robbery = newData[5].cy_3;

    chartData.push({
      date: "2012",
      murders: murders,
      Dacoity: Dacoity,
      HBsbyDay: HBsbyDay,
      HBsbyNight: HBsbyNight,
      Ordinary: Ordinary,
      Robbery: Robbery
    });
    var newData = details.gettrendlineReport
    var murders = newData[0].cy_4;
    var Dacoity = newData[1].cy_4;
    var HBsbyDay = newData[2].cy_4;
    var HBsbyNight = newData[3].cy_4;
    var Ordinary = newData[4].cy_4;
    var Robbery = newData[5].cy_4;

    chartData.push({
      date: "2011",
      murders: murders,
      Dacoity: Dacoity,
      HBsbyDay: HBsbyDay,
      HBsbyNight: HBsbyNight,
      Ordinary: Ordinary,
      Robbery: Robbery
    });
    return chartData;
  }
  $('.js-crime-groups').on('click', function(ev) {

    var obj = {};
    $('.js-crime-groups').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('#js-crimes-selection').text($(this).text());
    obj.year = $('.js-range-year').parent('li.active').find('a').data('range');
    if ($('.js-range').parent('li.active').find('a').data('range') == 'all') {
      obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      obj.month = [$('.js-range').parent('li.active').find('a').data('range')];
    }
    if ($('#js-rangesAndZones').find('li.active a').hasClass('js-ranges-groups')) {
      if ($('.js-ranges-groups').parent('li.active').find('a').data('distrct') == "all") {
        obj.ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.rangeId = $('.js-ranges-groups').parent('li.active').find('a').data('distrct');
      }
      if ($(this).data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else if ($(this).data('crime') == "women") {
        obj.groupId = "women"
      } else if ($(this).data('crime') == "faction") {
        obj.groupId = "faction"
      } else if ($(this).data('crime') == "cyber") {
        obj.groupId = "cyber"
      } else {
        obj.groupId = $(this).data('crime');
      }
    } else {
      if ($('.js-Zone-wise').parent('li.active').find('a').data('distrct') == "all") {
        obj.zoneId = [111, 112, 113];
      } else {
        obj.zoneId = [$('.js-Zone-wise').parent('li.active').find('a').data('distrct')];
      }

      if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.group = $('.js-crime-groups').parent('li.active').find('a').data('crime');
      }
    }

    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });

  });
  $('.js-Zone-wise').on('click', function(ev) {
    $('.js-Zone-wise').parent('li').removeClass('active');
    $('.js-ranges-groups').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('#js-district-selection').text($(this).text());
    var obj = {};
    obj.year = $('.js-range-year').parent('li.active').find('a').data('range');
    if ($('.js-range').parent('li.active').find('a').data('range') == 'all') {
      obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      //$('.js-range').parent('li.active').find('a').data('range')
      obj.month = [$('.js-range').parent('li.active').find('a').data('range')];
    }
    if ($(this).data('distrct') == "all") {
      obj.zoneId = [111, 112, 113];
    } else {
      obj.zoneId = [$(this).data('distrct')];
      //obj.singleZoneId = [1];
    }
    if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
      obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    } else {
      obj.group = $('.js-crime-groups').parent('li.active').find('a').data('crime');
    }
    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });
  })
  $('.js-ranges-groups').on('click', function(ev) {

    var obj = {};
    $('.js-ranges-groups').parent('li').removeClass('active');
    $('.js-Zone-wise').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('#js-district-selection').text($(this).text());
    obj.year = $('.js-range-year').parent('li.active').find('a').data('range');
    if ($('.js-range').parent('li.active').find('a').data('range') == 'all') {
      obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      obj.month = [$('.js-range').parent('li.active').find('a').data('range')];
    }
    if ($(this).data('distrct') == "all") {
      obj.ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    } else {
      obj.rangeId = $(this).data('distrct');
    }
    if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
      obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    } else {
      obj.groupId = $('.js-crime-groups').parent('li.active').find('a').data('crime');
    }
    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });
  });
  $('.js-range').on('click', function(ev) {

    $('.js-range').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('#js-range-month-selection').html($(this).html() + ' <span class="caret pull-right"></span>');
    var obj = {};
    if ($(this).data('range') == 'all') {
      obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      obj.month = [$(this).data('range')];
    }
    obj.year = $('.js-range-year').parent('li.active').find('a').data('range');

    if ($('#js-rangesAndZones').find('li.active a').hasClass('js-ranges-groups')) {
      if ($('.js-ranges-groups').parent('li.active').find('a').data('distrct') == "all") {
        obj.ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.rangeId = $('.js-ranges-groups').parent('li.active').find('a').data('distrct');
      }
      if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.groupId = $('.js-crime-groups').parent('li.active').find('a').data('crime');
      }
    } else {
      if ($('.js-Zone-wise').parent('li.active').find('a').data('distrct') == "all") {
        obj.zoneId = [111, 112, 113];
      } else {
        obj.zoneId = [$('.js-Zone-wise').parent('li.active').find('a').data('distrct')];
      }

      if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.group = $('.js-crime-groups').parent('li.active').find('a').data('crime');
      }
    }

    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });

  });

  $('.js-range-year').on('click', function(ev) {
    $('.js-range-year').parent('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $('#js-range-year-selection').html($(this).html() + ' <span class="caret pull-right"></span>');
    var obj = {};
    if ($('.js-range').parent('li.active').find('a').data('range') == 'all') {
      obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      obj.month = [$('.js-range').parent('li.active').find('a').data('range')];
    }
    obj.year = $(this).parent('li.active').find('a').data('range');


    if ($('#js-rangesAndZones').find('li.active a').hasClass('js-ranges-groups')) {
      if ($('.js-ranges-groups').parent('li.active').find('a').data('distrct') == "all") {
        obj.ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.rangeId = $('.js-ranges-groups').parent('li.active').find('a').data('distrct');
      }
      if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.groupId = $('.js-crime-groups').parent('li.active').find('a').data('crime');
      }
    } else {
      if ($('.js-Zone-wise').parent('li.active').find('a').data('distrct') == "all") {
        obj.zoneId = [111, 112, 113];
      } else {
        obj.zoneId = [$('.js-Zone-wise').parent('li.active').find('a').data('distrct')];
      }

      if ($('.js-crime-groups').parent('li.active').find('a').data('crime') == "all") {
        obj.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.group = $('.js-crime-groups').parent('li.active').find('a').data('crime');
      }
    }

    $.ajax({
      type: "post",
      url: '/reports/getDistrctsWise',
      dataType: 'json',
      data: obj,
      success: function(details) {
        distrctsReport(details);
      }
    });

  });

  $('.js-crimes').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-crimes').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('#js-crimes-selection').html($(this).html() + ' <span class="caret pull-right"></span>');
      var crimeId = $(this).data('crime');
      var obj = {};
      if ($(this).data('crime') === "all") {
        if ($('.js-distrcts-2').parent('li.active').find('a').data('distrct') === "all") {
          $('#js-crime-by-category').show();
          obj.headId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        } else {
          $('#js-crime-by-category').show();
          $('#js-crime-by-distrct').hide();
        }
      } else {
        obj.headId = crimeId;
        $('#js-crime-by-category').hide();
      }
      if ($('.js-distrcts-2').parent('li.active').find('a').data('distrct') === "all") {
        obj.districtId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.districtId = $('.js-distrcts-2').parent('li.active').find('a').data('distrct');
      }
      obj.year = 2016;
      obj.month = 11;
      $.ajax({
        type: "post",
        url: '/reports/getDistrctsWise',
        dataType: 'json',
        data: obj,
        success: function(details) {
          distrctsReport(details);
        }
      });
    }
  });
  $('.js-distrcts-2').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-distrcts-2').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-distrcts-2').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('#js-district-selection').html($(this).html() + ' <span class="caret pull-right"></span>');
      var distrctVal = $(this).data('distrct')
      var obj = {};
      if ($(this).data('distrct') === "all") {
        $('#js-crime-by-distrct').show();
        obj.districtId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.districtId = distrctVal;
        $('#js-crime-by-distrct').hide();
      }
      obj.month = 11;
      if ($('.js-crimes').parent('li.active').find('a').data('crime') === "all") {
        obj.headId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        obj.headId = $('.js-crimes').parent('li.active').find('a').data('crime');
      }
      obj.year = 2016;
      $.ajax({
        type: "post",
        url: '/reports/getDistrctsWise',
        dataType: 'json',
        data: obj,
        success: function(details) {
          distrctsReport(details);
        }
      });
    }
  });
  $('.js-dash-options').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-dash-options').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-dash-options').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('#js-district-selection').html($(this).html() + ' <span class="caret pull-right"></span>');
      var distrctVal = $(this).data('distrct')
      var obj = {};
      obj.district = distrctVal;
      var month = 11;
      obj.month = month;
      obj.year = 2016;
      $.ajax({
        type: "post",
        url: '/distrcts/getReports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          var titleObj = {};
          titleObj.title1 = "COGNIZABLE CRIME TRENDING";
          titleObj.title2 = "TOTAL COGNIZABLE CRIME";
          titleObj.title3 = "PROPERTY CRIMES";
          titleObj.title4 = "BODILY OFFENCES";
          titleObj.title5 = "OFFENCE AGAINST WOMEN";
          titleObj.title6 = "FACTION CRIMES";
          titleObj.title7 = "ROAD ACCIDENTS";
          titleObj.title8 = "WHITE COLLOR CRIMES";
          details.titleObj = titleObj;
          dashboardReports(details);
        }
      });
    }
  });
  $('.js-distrcts').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-distrcts').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-distrcts').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-unit-selection').html(text + ' <span class="caret pull-right"></span>');
      $('#js-month-selection').html($('#js-month-selection-options').find('li.active').find('a').text() + ' <span class="caret pull-right"></span>');
      $('#js-year-selection').html($('#js-year-selection-options').find('li.active').find('a').text() + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($(this).data('val') == 0) {
        obj.district = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.district = $(this).data('val');
      }
      if ($('.js-months').parent('li.active').find('a').data('val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$('.js-months').parent('li.active').find('a').data('val')];
      }
      obj.year = $('.js-year').parent('li.active').find('a').data('val');
      $.ajax({
        type: "post",
        url: '/distrcts/getReports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          var titleObj = {};
          if ($('#js-unit-selection-options').find('li.active').find('a').val() == "0") {
            var district = '';
          } else {
            var district = $('#js-unit-selection-options').find('li.active').find('a').html();
          }
          titleObj.title1 = "COGNIZABLE CRIME TRENDING -" + district;
          titleObj.title2 = "TOTAL COGNIZABLE CRIME -" + district;
          titleObj.title3 = "PROPERTY CRIMES -" + district;
          titleObj.title4 = "BODILY OFFENCES -" + district;
          titleObj.title5 = "OFFENCE AGAINST WOMEN -" + district;
          titleObj.title6 = "FACTION CRIMES -" + district;
          titleObj.title7 = "ROAD ACCIDENTS -" + district;
          titleObj.title8 = "WHITE COLLOR CRIMES -" + district;
          details.titleObj = titleObj;
          dashboardReports(details);
        }
      });
    }
  });
  $('.js-months').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-months').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-months').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-month-selection').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('.js-distrcts').parent('li.active').find('a').data('val') == 0) {
        obj.district = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.district = $('.js-distrcts').parent('li.active').find('a').data('val');
      }
      if ($(this).data('val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$(this).data('val')];
      }
      obj.year = $('.js-year').parent('li.active').find('a').data('val');
      $.ajax({
        type: "post",
        url: '/distrcts/getReports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          var titleObj = {};
          if ($('#js-unit-selection-options').find('li.active').find('a').val() == "0") {
            var district = '';
          } else {
            var district = $('#js-unit-selection-options').find('li.active').find('a').html();
          }
          titleObj.title1 = "COGNIZABLE CRIME TRENDING -" + district;
          titleObj.title2 = "TOTAL COGNIZABLE CRIME -" + district;
          titleObj.title3 = "PROPERTY CRIMES -" + district;
          titleObj.title4 = "BODILY OFFENCES -" + district;
          titleObj.title5 = "OFFENCE AGAINST WOMEN -" + district;
          titleObj.title6 = "FACTION CRIMES -" + district;
          titleObj.title7 = "ROAD ACCIDENTS -" + district;
          titleObj.title8 = "WHITE COLLOR CRIMES -" + district;
          details.titleObj = titleObj;
          dashboardReports(details);
        }
      });
    }
  });
  $('.js-year').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-year').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-year').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-year-selection').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      var obj = {};
      if ($('.js-distrcts').parent().parent().find('li.active').find('a').attr('data-val') == 0) {
        $('#js-crime-by-distrct').show();
        obj.district = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.district = parseInt($('.js-distrcts').parent().parent().find('li.active').find('a').attr('data-val'));
        $('#js-crime-by-distrct').hide();
      }
      if ($('.js-months').parent().parent().find('li.active').find('a').attr('data-val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$('.js-months').parent().parent().find('li.active').find('a').attr('data-val')]
      }
      obj.year = $(this).data('val');
      $.ajax({
        type: "post",
        url: '/distrcts/getReports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          var titleObj = {};
          if ($('#js-unit-selection-options').find('li.active').find('a').val() == "0") {
            var district = '';
          } else {
            var district = $('#js-unit-selection-options').find('li.active').find('a').html();
          }
          titleObj.title1 = "COGNIZABLE CRIME TRENDING -" + district;
          titleObj.title2 = "TOTAL COGNIZABLE CRIME -" + district;
          titleObj.title3 = "PROPERTY CRIMES -" + district;
          titleObj.title4 = "BODILY OFFENCES -" + district;
          titleObj.title5 = "OFFENCE AGAINST WOMEN -" + district;
          titleObj.title6 = "FACTION CRIMES -" + district;
          titleObj.title7 = "ROAD ACCIDENTS -" + district;
          titleObj.title8 = "WHITE COLLOR CRIMES -" + district;
          details.titleObj = titleObj;
          dashboardReports(details);
        }
      });
    }
  });
  $('.js-topbottom-heads').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-topbottom-heads').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-topbottom-heads').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-top-bottom-selection').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($(this).data('val') == 'all') {
        obj.head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      } else {
        obj.head = $(this).data('val');
      }
      if ($('.js-months-topbottom').parent('li.active').find('a').data('val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$('.js-months-topbottom').parent('li.active').find('a').data('val')];
      }
      obj.year = $('.js-year-topbottom').parent('li.active').find('a').data('val');
      $.ajax({
        type: "post",
        url: '/crimes/gettop5bottom5',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          reportComparision(details);
        }
      });
    }
  });
  $('.js-year-topbottom').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      $('.js-year-topbottom').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('.js-year-topbottom').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-year-top-bottom').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('.js-topbottom-heads').parent('li.active').find('a').data('val') == 'all') {
        obj.head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      } else {
        obj.head = $('.js-topbottom-heads').parent('li.active').find('a').data('val');
      }
      if ($('.js-months-topbottom').parent('li.active').find('a').data('val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$('.js-months-topbottom').parent('li.active').find('a').data('val')];
      }
      obj.year = $(this).data('val');
      $.ajax({
        type: "post",
        url: '/crimes/gettop5bottom5',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          reportComparision(details);
        }
      });
    }
  });
  $('.js-months-topbottom').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      //$('.js-months-topbottom').parent('li').removeClass('active');
      //$(this).parent('li').addClass('active');
      $('.js-months-topbottom').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-month-top-bottom').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('.js-topbottom-heads').parent('li.active').find('a').data('val') == 'all') {
        obj.head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      } else {
        obj.head = $('.js-topbottom-heads').parent('li.active').find('a').data('val');
      }
      if ($(this).data('val') == 'all') {
        obj.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        obj.month = [$(this).data('val')];
      }
      obj.year = $('.js-year-topbottom').parent('li.active').find('a').data("val");
      $.ajax({
        type: "post",
        url: '/crimes/gettop5bottom5',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          reportComparision(details);
        }
      });
    }
  });

  $('.js-distrcts-trendline').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      //$('.js-months-topbottom').parent('li').removeClass('active');
      //$(this).parent('li').addClass('active');
      $('.js-distrcts-trendline').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-trendline-uinits-selection').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($(this).data('val') == 'all') {
        obj.units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.units = [$(this).data('val')];
      }
      if ($('#js-trendline-options-heads li.active a').data('val') == 'all') {
        obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        if ($('#js-trendline-options-heads li.active a').data('val') == 'women') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else if ($('#js-trendline-options-heads li.active a').data('val') == 'faction') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7];
        } else {
          obj.heads = $('#js-trendline-options-heads li.active a').data('val');
        }
      }
      obj.type=$('#js-trendline-options-heads li.active a').data('val');
      obj.year = $('#js-year-trendline-options-years li.active a').data('val');
      obj.month=$('#js-trendline-month-selection li.active a').data('val');
      $.ajax({
        type: "post",
        url: '/trendline/getreports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          console.log("hellowd world");
          reporttrendlineComparision(details);
        }
      });
    }
  });

  $('.js-trenline-month').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {
      //$('.js-months-topbottom').parent('li').removeClass('active');
      //$(this).parent('li').addClass('active');
      $('.js-trenline-month').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-trenline-month-button').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('#js-trendline-options-units li.active a').data('val') == 'all') {
        obj.units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.units = [$('#js-trendline-options-units li.active a').data('val')];
      }
      if ($('#js-trendline-options-heads li.active a').data('val') == 'all') {
        obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        if ($('#js-trendline-options-heads li.active a').data('val') == 'women') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else if ($('#js-trendline-options-heads li.active a').data('val') == 'faction') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7];
        } else {
          obj.heads = $('#js-trendline-options-heads li.active a').data('val');
        }
      }
      obj.type=$('#js-trendline-options-heads li.active a').data('val');
      obj.year = $('#js-year-trendline-options-years li.active a').data('val');
      obj.month=$(this).data('val');
      $.ajax({
        type: "post",
        url: '/trendline/getreports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          console.log("hellowd world");
          reporttrendlineComparision(details);
        }
      });
    }
  });

  $('.js-trendline-groups').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {

      //$('.js-months-topbottom').parent('li').removeClass('active');
      //$(this).parent('li').addClass('active');
      $('.js-trendline-groups').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-trendline-selection').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('#js-trendline-options-units li.active a').data('val') == 'all') {
        obj.units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.units = [$('#js-trendline-options-units li.active a').data('val')];
      }
      if ($(this).data('val') == 'all') {
        obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        if ($(this).data('val') == 'women') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        } else if ($(this).data('val') == 'faction') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7]
        } else {
          obj.heads = $(this).data('val');
        }

      }
      obj.type=$(this).data('type');
      obj.year = $('#js-year-trendline-options-years li.active a').data('val');
      obj.month=$('#js-trendline-month-selection li.active a').data('val');
      $.ajax({
        type: "post",
        url: '/trendline/getreports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          console.log(details);
          console.log("hellowd world");
          reporttrendlineComparision(details);
        }
      });
    }
  });

  $('.js-year-trendline').on('click', function(ev) {
    if ($(this).parent('li').hasClass('active')) {

    } else {

      //$('.js-months-topbottom').parent('li').removeClass('active');
      //$(this).parent('li').addClass('active');
      $('.js-year-trendline').parent('li').removeClass('active');
      $(this).parent('li').addClass('active');
      var text = $(this).text();
      $('#js-year-trendline-button').html(text + ' <span class="caret pull-right"></span>');
      var obj = {};
      if ($('#js-trendline-options-units li.active a').data('val') == 'all') {
        obj.units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      } else {
        obj.units = [$('#js-trendline-options-units li.active a').data('val')];
      }
      if ($('#js-trendline-options-heads li.active a').data('val') == 'all') {
        obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      } else {
        if ($('#js-trendline-options-heads li.active a').data('val') == 'women') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        } else if ($('#js-trendline-options-heads li.active a').data('val') == 'faction') {
          obj.heads = [1, 2, 3, 4, 5, 6, 7];
        } else {
          obj.heads = $('#js-trendline-options-heads li.active a').data('val');
        }
      }
      obj.type=$('#js-trendline-options-heads li.active a').data('val');
      obj.year = $(this).data('val');
      obj.month=$('#js-trendline-month-selection li.active a').data('val');
      $.ajax({
        type: "post",
        url: '/trendline/getreports',
        dataType: 'json',
        data: obj,
        success: function(details) {
          //console.log("hellowd world");
          //console.log(details);
          reporttrendlineComparision(details);
        }
      });
    }
  });
});
