
var computedPoints = 0;
var classes = ["Stock", "Street", "Modified", "Unlimited"];
var classMap = {"Stock":0,"Street":1,"Modified":2,"Unlimited":3}
var maxPointsPerClass = [0.5, 6.0, 9.0, 1000]
var computedClass = classes[0];

var classMainColors = ['#cce6ff','#ecffb3','#ffdd99','#ffcccc'];
var classBorderColors = ['#005cb3', '#608000','#e67300','#990000'];

var mods =
{
    "1. Chassis":[
    {
        "name":"Generation",
        "options":[
            {
                "name":"2012-2020 Scion FR-S / Toyota 86 / Subaru BRZ",
                "points":"0.000"
            },
            {
                "name":"2022+ Toyota 86 GR / Subaru BRZ (can compete in Stock Class with time handicap and modifications whitelist, see rulebook)",
                "points":"1.875"
            }
        ]
    }],
   "2. Power, Engine, and Drivetrain":[
      {
         "name":"Intake",
         "options":[
            {
               "name":"Any year OEM intake box (updating or backdating invididual OEM components OK)",
               "points":"0.000"
            },
            {
               "name":"Aftermarket intake or modification to OEM intake system box (sound generator delete OK, intake elbow modification [single radius only] OK), including replacing system as mandated by Forced Induction",
               "points":"0.125",
               "minClass":"Street"
            },
            {
               "name":"Individual throttle bodies (ITBs) -- NOTE: This item is subject to mid-year point value alteration as more data becomes available",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Exhaust Manifold (header)",
         "options":[
            {
               "name":"OEM 2013-2016 exhaust manifold",
               "points":"0.000",
               "default":true
            },
            {
               "name":"OEM 2017-2020 exhaust manifold",
               "points":"0.125"
            },
            {
                "name":"OEM 2022+ exhaust manifold",
                "points":"0.125"
             },
            {
               "name":"Aftermarket exhaust manifold with built-in catalytic converter (not allowed in Stock Class)",
               "points":"0.125",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket exhaust manifold without built-in catalytic converter (not allowed in Stock Class)",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Front Pipe",
         "options":[
            {
               "name":"OEM front pipe",
               "points":"0.000",
               "default":true
            },
            {
               "name":"Aftermarket front pipe with a catalytic converter",
               "points":"0.125",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket front pipe without a catalytic converter",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Cat-back or Axle-back Exhaust",
         "options":[
            {
               "name":"OEM cat-back exhaust",
               "points":"0.000",
               "default":true
            },
            {
               "name":"Aftermarket cat-back exhaust",
               "points":"0.000",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Engine Types",
         "options":[
            {
               "name":"Any year OEM, unmodified FA20/FA24 engine with all factory parts",
               "points":"0.000",
               "default":true
            },
            {
               "name": " Any stock K24 Engine Swap (if you have a 2022+ GR86/BRZ, take the 0 point option in Section 1), regardless of chassis you must take points individually for modifications non-OEM to that specific engine or the original chassis, e.g. headers, intake, etc. ",
               "points": "1.875",
            },
            {
               "name":"Engine swap (can be ANY engine, must take points individually for modifications non-OEM to that specific engine or the original chassis, e.g. headers, intake, etc.)",
               "points":"4.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"FA20/FA24 internals",
         "options":[
            {
               "name":"Internal engine modifications (pistons, rods, crank, etc.)",
               "points":"1.000",
               "minClass":"Street"
            }]
      },
      {
      "name":"FA20/FA24 cylinder head",
      "options":[
            {
               "name":"Built head or aftermarket head (cams, valve springs, valves, etc.)",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"ECU programming",
         "options":[
            {
               "name":"Re-programming of OEM ECU with an updated or backdated OEM ECU map",
               "points":"0.000",
               "default":true
            },
            {
               "name":"Aftermarket ECU, or re-programming of OEM ECU with a custom ECU map (not allowed in Stock Class)",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Forced Induction",
         "options":[
            {
               "name":"Any forced induction kit (turbo, supercharger, ESC, etc). Must take separate penalties for ECU, intake and/or header as applicable (not allowed in Stock Class)",
               "points":"1.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Fuels",
         "options":[
            {
               "name":"Use of E85 gas - without Forced Induction (not allowed in Stock Class)",
               "points":"0.250",
               "minClass":"Street"
            },
            {
               "name":"Use of E85 gas - with Forced Induction (not allowed in Stock Class)",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Clutch, Flywheel and Pressure Plate",
         "options":[
            {
               "name":"OEM or OEM-like clutch, flywheel and pressure plate",
               "points":"0.000"
            },
            {
               "name":"Aftermarket performance clutch, flywheel or pressure plate",
               "points":"0.000",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Transmission",
         "options":[
            {
               "name":"OEM transmission",
               "points":"0.000"
            },
            {
               "name":"Aftermarket transmission or modified OEM transmission internals",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Driveshaft",
         "options":[
            {
               "name":"OEM driveshaft",
               "points":"0.000"
            },
            {
               "name":"Aftermarket driveshaft",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Differential",
         "options":[
            {
               "name":"OEM limited slip differential - OEM or aftermarket covers OK",
               "points":"0.000"
            },
            {
               "name":"Aftermarket limited slip differential",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Final Drive",
         "options":[
            {
               "name":"Any year OEM final drive (4.1/4.3 6MT, 4.1 Auto)",
               "points":"0.000"
            },
            {
               "name":"Aftermarket final drive",
               "points":"0.000",
               "minClass":"Street"
            }
         ]
      }
   ],
   "3. Wheels and Tires":[
      {
         "name":"Tire Compound",
         "options":[
            {
               "name":"GT Radial SX2/HPY, OEM sized Michelin Primacy and OEM sized Michelin PS4",
               "points":"-1.000",
               "default":true
            },
            {
               "name":"Treadwear rating of 220 or higher",
               "points":"0.000",
               "minClass":"Street"
            },
            {
               "name":"Endurance 200tw tires",
               "points":"1.000",
               "minClass":"Street"
            },
            {
               "name":"Super 200tw & Endurance 100tw tires",
               "points":"2.500",
               "minClass":"Street"
            },
            {
               "name":"Street Legal Track tires",
               "points":"4.500",
               "minClass":"Street"
            },
            {
               "name":"R comps/ Non DOT slicks",
               "points":"6.000",
               "minClass":"Unlimited"
            }
         ],
      },
     {
         "name":"Tire Width",
         "options":[
            {
               "name":"225 width or narrower",
               "points":"0.000"
            },
            {
               "name":"235 width or wider (not allowed in Stock Class)",
               "points":"0.000",
               "minClass":"Street"
            }
		 ]
      },
      {
         "name":"Wheels",
         "options":[
            {
              "name":"7\" OEM wheels",
              "points":"0.000"
          },
            {
               "name":"7.5\" OEM wheels (BRZ Performance Package, STI, TRD)",
               "points":"0.250"
            },
            {
               "name":"7\"-7.5\" aftermarket wheels",
               "points":"0.500"
            },
            {
               "name":"8\" aftermarket wheels",
               "points":"0.750"
            },
            {
               "name":"8.5\" aftermarket wheels",
               "points":"1.000",
               "minClass":"Street"
            },
            {
               "name":"9\" aftermarket wheels",
               "points":"1.250",
               "minClass":"Street"
            },
            {
               "name":"9.5\"+ aftermarket wheels",
               "points":"1.500",
               "minClass":"Street"
            }
         ]
      }
   ],
   "4. Aerodynamics":[
      {
         "name":"Main Front Aero",
         "options":[
            {
               "name":"Level 1 Front Aero: aftermarket front bumper or aftermarket lip, including TRD and STi (must not have splitter built-in)",
               "points":"0.250",
               "minClass":"Street"
            },
            {
               "name":"Level 2 Front Aero: full front aero package -- anything more than a simple lip or bumper; may include spats/fender skirts, canards/dive planes, splitters, etc. (not allowed in Stock Class)",
               "points":"0.750",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Canards",
         "options":[
            {
               "name":"Each pair of bumper canards / dive planes, when not combined with L2 front aero package",
               "points":"0.125",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Spats",
         "options":[
            {
               "name":"Each pair of spats / fender skirts, when not combined with L2 front aero package",
               "points":"0.125",
               "minClass":"Street"
            },
            {
               "name":"OEM STI rear spats",
               "points":"0.000",
               "minClass":"Street"
            }

         ]
      },
      {
         "name":"Rear Diffuser",
         "options":[
            {
               "name":"Level 1 Rear Aero: rear diffuser that starts behind rear axles (not allowed in Stock Class)",
               "points":"0.250",
               "minClass":"Street"
            },
            {
               "name":"Level 2 Rear Aero: rear diffuser that starts in front of rear axles (not allowed in Stock Class)",
               "points":"0.500",
               "minClass":"Street"
            },
            {
               "name":"OEM STI Rear Faux Diffuser Add On",
               "points":"0.000"
            }
         ]
      },
      {
         "name":"Aftermarket hood",
         "options":[
            {
               "name":"Aftermarket vented hood, or OEM hood with aftermarket vents",
               "points":"0.250",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Fenders",
         "options":[
            {
               "name":"Rolled OEM fenders",
               "points":"0.000"
            },
            {
               "name":"Aftermarket vented or wider front fenders",
               "points":"0.125",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Rear bumper",
         "options":[
            {
               "name":"Aftermarket or modified/cut OEM rear bumper",
               "points":"0.125",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Vortex generators",
         "options":[
            {
               "name":"Vortex generators",
               "points":"0.125",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"OEM Rear Spoilers",
         "options":[
            {
               "name":"Any year OEM rear spoiler (incl. 2017+)",
               "points":"0.000"
            }
         ]
      },
      {
         "name":"Aftermarket Rear Spoilers",
         "options":[
            {
               "name":"OEM rear spoiler or duck tail (TRD)",
               "points":"0.0"
            },
            {
               "name":"Aftermarket rear spoiler or duck tail without trunk rod supports (e.g. 5-axis, duckbill-style trunk, STI gurney flap, etc)",
               "points":"0.250",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket rear spoiler or duck tail with trunk rod supports (Supermiata style)",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Rear Wing",
         "options":[
            {
               "name":"Level 1 Wing: SARD LSR, BRZ tS wing, or aftermarket wing up to 1400mm width, max stand height of 200mm (not allowed in Stock Class)",
               "points":"1.000",
               "minClass":"Street"
            },
            {
               "name":"Level 2 Wing: APR GTC-200, Voltex Type 12, Voltex Type 1S or any wing up to 1460mm wide, max stand height of 245mm (not allowed in Stock Class)",
               "points":"1.500",
               "minClass":"Street"
            },
            {
               "name":"Level 3 Wing: Any non L1/L2 rear wing (not allowed in Stock Class)",
               "points":"1.750",
               "minClass":"Street"
            }
         ]
      },
      {
         "name":"Underbody Panels",
         "options":[
            {
               "name":"OEM underbody panels (2013-2016 special editions and 2017+)",
               "points":"0.000"
            }
         ]
      }
   ],
   "5. Suspension":[
      {
         "name":"Shock Absorbers and Springs",
         "options":[
            {
               "name":"Any year OEM shock absorbers and springs",
               "points":"0.000"
            },
            {
              "name":"OEM Sachs shock absorbers (BRZ Performance Package)",
              "points":"0.250"
           },
            {
               "name":"Aftermarket springs with any year OEM shock absorbers",
               "points":"0.500",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket shock absorbers with any year OEM springs",
               "points":"0.500",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket off-the-shelf* non-adjustable** shock absorbers with aftermarket springs. *'Off-the-shelf' means same feature set and valving spec as offered to the public. **'Non-adjustable' means lack of user controls for compression and/or rebound adjustment.",
               "points":"1.000",
               "minClass":"Street"
            },
            {
               "name":"Aftermarket shock absorbers with aftermarket springs (if using camber plates, take extra points separately)",
               "points":"2.000",
               "minClass":"Street"
            }
         ]
      },

      {"name":"Active Dampers", "options":[
        {"name":"Any active or semi-active damping adjustment including Tein EDFC Active", "points": "1.500", "minClass":"Street"}
      ]},

      {"name":"Anti Roll Bars", "options":[
        {"name":"Any OEM (2012-2020) anti roll bar", "points": "0.000"},
        {"name":"Any aftermarket passive anti roll bar (not allowed in Stock Class)", "points": "0.000", "minClass":"Street"}
      ]},

      {
         "name":"Front Suspension Adjustment",
         "options":[
           {
              "name":"OEM shock absorber top hats / mounts",
              "points":"0.000"
           },
            {
               "name":"Aftermarket top hats / shock absorber mounts (e.g. solid or spherical) / camber plates, and/or Aftermarket front lower control arms (FLCA)",
               "points":"0.375"
            }
         ]
      },

      {"name":"Rear Suspension Adjustment", "options":[
        {"name":"Any rear lower control (camber) arms",
        "points": "0.125"}
      ]},

      {"name":"Camber Bolts", "options":[
         {"name":"Any camber bolts",
         "points": "0.000"}
      ]},

      {
         "name":"Altered supension mounting points",
         "options":[
            {
               "name":"Any altered suspension mounting points, including offset mounts and/or offset spring perches",
               "points":"0.500",
               "minClass":"Street"
            }
         ]
      }
   ],
   "6. Free modifications":[
      {
         "name":"Any in-cabin safety equipment",
         "points":"0.000"
      },
      {
         "name":"Any replacement drop-in air filter for OEM intake",
         "points":"0.000"
      },
      {
         "name":"Aftermarket radiator",
         "points":"0.000"
      },
      {
         "name":"Any oil-cooler",
         "points":"0.000"
      },
      {
         "name":"Any brake pads",
         "points":"0.000"
      },
      {
         "name":"Aftermarket calipers, rotors or brake ducting",
         "points":"0.000"
      },
      {
         "name":"Any interior removal as needed to accommodate safety equipment",
         "points":"0.000"
      },
      {
         "name":"Any alignment, and camber bolt/kit, bump steer kit, tie rod end, roll center adjuster, but not camber plates or top hats",
         "points":"0.000"
      },
      {
         "name":"Any bolt-on chassis bracing",
         "points":"0.000"
      },
      {
         "name":"Aftermarket steering wheel: only if R/H/S are installed for driver (otherwise prohibited)",
         "points":"0.000"
      },
      {
         "name":"Any oil-catch can, oil baffle pan",
         "points":"0.000"
      },
      {
         "name":"Any lightweight battery (not allowed in Stock Class)",
         "points":"0.000",
         "minClass":"Street"
      },
      {
         "name":"Any spherical bushings including strut top mounts",
         "points":"0.000"
      }
   ]
};

function parseMods(mods) {

  var html = "";

  $.each(mods, function(category, groups) {

    html += "<p class='calculator-category-title'>" + category + "</p>";

    $.each(groups, function(group, options) {

      var options = groups[group]["options"];

      if (!$.isArray(options)) {
          html += "<table class='calculator-table calculator-wrapper'>";
          html += "<tr class='calculator-item unselected-item'>";
          html += "<td class='calculator-points-column'>" + groups[group]["points"] + "</td>";
          html += "<td class='calculator-name-column'>" + groups[group]["name"] + "</td>";
          html += "<td class='calculator-check-column'>" + "" + "</td>";
          html += "<td class='calculator-minclass-column'>" + groups[group]["minClass"] + "</td>";
          html += "</tr>";
          html += "</table>";

      } else {

        html += "<div class='calculator-wrapper-header'>";
        html += "<p class='calculator-option-group-title'>" + groups[group]["name"] + "</p>";
        html += "</div>";
        html += "<div class='calculator-group-wrapper'>";
        html += "<table class='calculator-table'>";

        $.each(options, function(option, attrs) {
          html += "<tr class='calculator-item unselected-item'>";
          html += "<td class='calculator-points-column'>" + attrs["points"] + "</td>";
          html += "<td class='calculator-name-column'>" + attrs["name"] + "</td>";
          html += "<td class='calculator-check-column'>" + "" + "</td>";
          html += "<td class='calculator-minclass-column'>" + attrs["minClass"] + "</td>";
          html += "</tr>";
        });
        html += "</table></div>";
      }

    });



  });

  return html;
}



function toggleClasses(target, c1, c2) {
  $(target).toggleClass(c1);
  $(target).toggleClass(c2);
}

function getPointsFromRow(tr) {

  var points = 0;

  points = parseFloat($(tr).find(".calculator-points-column").html());

  if (isNaN(points)) {
    points = 0;
  }

  return parseFloat(points);
}

function getItemNameFromRow(tr) {
  var name = "";
  name = $(tr).find(".calculator-name-column").html();
  return name;
}

function getMinClassFromRow(tr) {
  var minClass = "";
  minClass = $(tr).find(".calculator-minclass-column").html();
  return minClass;
}

function refreshComputedPoints() {

  var selectedItems = $(document).find('.selected-item');

  computedPoints = 0;
  var computedItemsList = "";
  var computedMinClass = "";

  $.each(selectedItems, function(key, value) {
    var itemPoints = getPointsFromRow(value);
    var itemName = getItemNameFromRow(value);
    var itemMinClass = getMinClassFromRow(value);
    computedPoints += itemPoints;
    computedItemsList += "<li><strong>" + itemPoints +  "</strong> - " +  itemName + "</li>";
    computedMinClass += "," + itemMinClass;
  });

  $('#computed-points').html(computedPoints);
  $('#computed-item-list').html(computedItemsList);

  var i = classes.length-1;
  do {
      computedClass = classes[i];
      i--;
  } while (computedPoints <= maxPointsPerClass[i] && i >=0);

  //min class
  var arrayMinClass = computedMinClass.split(",");

  for (var i = 0; i < arrayMinClass.length; i++) {
   var minClass = arrayMinClass[i];

   if (minClass != "") {
      if (classMap[computedClass] < classMap[minClass]) {
         computedClass = minClass;
      }
   }
  }

  $('#computed-class').html(computedClass);

  var classIndex = classMap[computedClass];
  $('.points-tally-wrapper').css('background-color',classMainColors[classIndex]);
  $('.points-tally-wrapper').css('border-color',classBorderColors[classIndex]);
}

$(document).ready(function(){

  var h = parseMods(mods);
  $('#calc').html(h);

  $("#toggle-tally-view-button").click(function() {
    $("#points-tally").toggleClass('points-tally-wrapper-collapsed');
    toggleClasses("#toggle-tally-view-button-icon", "up", "down");
  });

  $(".calculator-item").click(function(row) {

      var itemRow = row.currentTarget;

      toggleClasses(itemRow, 'unselected-item', 'selected-item');

      getPointsFromRow(itemRow);

      for (var i = 0; i < itemRow.parentNode.childNodes.length; i++) {

          var child = itemRow.parentNode.childNodes[i];

          if (child != itemRow) {
            $(child).removeClass('selected-item');
            $(child).addClass('unselected-item');
          }

      };

      refreshComputedPoints()
  });

  refreshComputedPoints()


});
