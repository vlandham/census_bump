
var years = ["1890","1880","1870","1860", "1850", "1840", "1830", "1820", "1810", "1800", "1790"];
var censuses = ["11th census.", "10th census.", "9th census.", "8th census.", "7th census.", "6th census.", "5th census.", "4th census.", "3rd census.", "2nd census.", "1st census."];

var sideEnds = {
  "1790":0,
  "1800":13,
  "1810":22,
  "1820":29,
  "1830":41,
  "1840":49
};

var chart = function() {

  var pillTypes = [
    {func:oneColor, opts: {colors:["#A8B2A5"]}, id:"ny", name:"new york"},
    {func:oneColor, opts: {colors:["#D4AB80"]}, id:"chi", name:"chicago"},
    {func:twoColor, opts: {colors:["#E9D19E","#C0B295"]}, id:"phi", name:"philadelphia"},
    {func:twoColor, opts: {colors:["#B7AA8B","#807F5B"]}, id:"bro", name:"brooklyn"},
    {func:twoColorVert, opts: {colors:["#A6906D","#D5A97C"]}, id:"stl", name:"st. louis"},
    {func:oneColor, opts: {colors:["#D5AC92"]}, id:"bos", name:"boston"},
    {func:oneColor, opts: {colors:["#A6906D"]}, id:"bal", name:"baltimore"},
    {func:twoColorDiag, opts: {colors:["#D6AA7D","#C0B395"]}, id:"san", name:"san francisco"},
    {func:oneColor, opts: {colors:["#AAB5A7"]}, id:"cin", name:"cincinnati"},
    {func:midStripe, opts: {colors:["#E7CE98","#D5AD94"], width:0.5}, id:"cle", name:"cleveland"},
    {func:midStripe, opts: {colors:["#787658","#C28D5E"], width:0.3}, id:"chr", name:"charleston"},
    {func:twoColor, opts: {colors:["#A6AEA3","#C79063"]}, id:"buf", name:"buffalo"},
    {func:oneColor, opts: {colors:["#7A7957"]}, id:"nwo", name:"new orleans"},
    {func:littleSquares, opts: {colors:["#C09364", "#7E949A"]}, id:"pit", name:"pittsburg"},
    {func:oneColor, opts: {colors:["#9D9385"]}, id:"was", name:"washington"},
    {func:longStripe, opts: {colors:["#A8906B", "#ACB4A1"], width:0.6, edge:false}, id:"spg", name:"spring garden"},
    {func:bigTri, opts: {colors:["#BFB395", "#E2CB8D"]}, id:"det", name:"detroit"},
    {func:twoColorVert, opts: {colors:["#D6B094", "#A48D6D"]}, id:"mil", name:"milwaukee"},
    {func:midFlag, opts: {colors:["#ABB5A5", "#E5C98F"], width:0.25, skew:6}, id:"new", name:"newark"},
    {func:twoColor, opts: {colors:["#82815C","#C99562"]}, id:"min", name:"minneapolis"},
    {func:twoColorVert, opts: {colors:["#D1A577","#A7916E"]}, id:"jer", name:"jersey city"},
    {func:oneColor, opts: {colors:["#C1B496"]}, id:"lou", name:"louisville"},
    {func:twoColor, opts: {colors:["#AA9570","#D3AE99"]}, id:"nlib", name:"northern liberties"},
    {func:twoColorVert, opts: {colors:["#D5A87B","#BAAD91"]}, id:"npor", name:"newport"},
    {func:oneColor, opts: {colors:["#E6CC90"]}, id:"pro", name:"providence"},
    {func:oneColor, opts: {colors:["#D6AB90"]}, id:"nor", name:"norfolk"},
    {func:twoColorDiag, opts: {colors:["#9C9385","#D6AA7A"]}, id:"nbp", name:"newburyport"},
    {func:doubleStripe, opts: {colors:["#D1A575","#A8AD86"], width:0.08, dist:0.08}, id:"oma", name:"omaha"},
    {func:bigTriInverted, opts: {colors:["#A7B2A4", "#E7C991"]}, id:"roc", name:"rochester"},
    {func:twoColorDiag, opts: {colors:["#A6A87E","#998F82"]}, id:"stp", name:"st. paul"},
    {func:twoHooks, opts: {colors:["#C3B79B","#A78659"], width:0.1}, id:"kci", name:"kansas city"},
    {func:midStripe, opts: {colors:["#D2A375","#A3AEA0"], width:0.5}, id:"den", name:"denver"},
    {func:midStripe, opts: {colors:["#D7AB97","#A0AB9D"], width:0.2, offset:8}, id:"ind", name:"indianapolis"},
    {func:bigTri, opts: {colors:["#808F7B", "#D4AC92"]}, id:"all", name:"allegheny"},
    {func:oneColor, opts: {colors:["#BAAD8F"]}, id:"alb", name:"albany"},
    {func:doubleStripe, opts: {colors:["#E3C78D","#D2A98F"], width:0.15, dist:0.0}, id:"col", name:"columbus"},
    {func:midStripe, opts: {colors:["#B7AA8C","#A2A67E"], width:0.3} , id:"syr", name:"syracuse"},
    {func:midFlag, opts: {colors:["#E4C88D", "#928C7D"], width:0.27, skew:6}, id:"wor", name:"worcester"},
    {func:doubleFlag, opts: {colors:["#948E81", "#D6A772"], width:0.08, dist:0.3}, id:"tol", name:"toledo"},
    {func:twoColorVert, opts: {colors:["#A8B4A7","#D6AA8F"]}, id:"ric", name:"richmond"},
    {func:oneColor, opts: {colors:["#E6CA90"]}, id:"nhv", name:"new haven"},
    {func:doubleStripe, opts: {colors:["#A38D6A","#9FADA0"], width:0.15, dist:-0.07}, id:"pat", name:"paterson"},
    {func:oneColor, opts: {colors:["#7C7B5A"]}, id:"low", name:"lowell"},
    {func:doubleStripe, opts: {colors:["#948E81","#E0C68C"], width:0.15, dist:0.2}, id:"nas", name:"nashville"},
    {func:candyStripe, opts: {colors:["#A0ADA0","#948E81"], width:0.20, dist:0.2}, id:"scr", name:"scranton"}, //TODO
    {func:twoColor, opts: {colors:["#BAB28E","#C3905F"]}, id:"fal", name:"fall river"},
    {func:oneColor, opts: {colors:["#A89270"]}, id:"cam", name:"cambridge"},
    {func:twoColorDiag, opts: {colors:["#D2AC91","#D3A878"]}, id:"atl", name:"atlanta"},
    {func:midStripe, opts: {colors:["#9DA89A","#6A828A"], width:0.18, offset:0}, id:"mem", name:"memphis"},
    {func:midFlag, opts: {colors:["#CFA675", "#A3A67E"], width:0.24, skew:6}, id:"wil", name:"wilmington"},
    {func:oneColor, opts: {colors:["#C2B69A"]}, id:"day", name:"dayton"},
    {func:oneColor, opts: {colors:["#807F5B"]}, id:"tro", name:"troy"},
    {func:twoColorDiagRev, opts: {colors:["#A3A679","#CFA773"]}, id:"grd", name:"grand rapids"},
    {func:oneColor, opts: {colors:["#938C7D"]}, id:"red", name:"reading"},
    {func:midStripe, opts: {colors:["#DCC387","#A3A378"], width:0.5, offset:0}, id:"cdn", name:"camden"},
    {func:bigTri, opts: {colors:["#948D7D", "#BCB195"]}, id:"tre", name:"trenton"},
    {func:twoHooks, opts: {colors:["#A4B0A0","#D7A892"], width:0.26}, id:"mar", name:"marblehead"},
    {func:twoHooks, opts: {colors:["#A58F6C","#9FAE9C"], width:0.15}, id:"chr2", name:"charleston"},
    {func:twoColorVert, opts: {colors:["#CABFA0","#BF8A5A"]}, id:"law", name:"lawrence"},
    {func:midStripe, opts: {colors:["#A1A99D","#D2AA76"], width:0.8, offset:0}, id:"lyn", name:"lynn"},
    {func:midStripe, opts: {colors:["#BFB496","#D5AE93"], width:0.5, offset:0}, id:"hrt", name:"hartford"},
    {func:bigTri, opts: {colors:["#D5A78D", "#BFB294"]}, id:"bri", name:"bridgewater"},
    {func:bigX, opts: {colors:["#A4AFA1", "#D7AC93"], width:1.0}, id:"pet", name:"petersburg"},
    {func:bigX, opts: {colors:["#D1A577", "#928D82"], width:1.0}, id:"sot", name:"southwark"},
    {func:theTeeth, opts: {colors:["#A0ADA3", "#D4AD94", "#B9AC90"], width:1.0}, id:"sal", name:"salem"},
    {func:theTeeth, opts: {colors:["#D9B094", "#A2B0A6"], width:1.0}, id:"nan", name:"nantucket"},
    {func:bigX, opts: {colors:["#EACE95", "#C1B29B"], width:1.0}, id:"por", name:"portsmouth"},
    {func:theTeeth, opts: {colors:["#C2B598", "#C48F5E"], width:1.0}, id:"glo", name:"gloucester"},
    {func:midStripe, opts: {colors:["#E6CC8D","#D7A98F"], width:0.5} , id:"sav", name:"savannah"},
    {func:twoColorVert, opts: {colors:["#A1ADA0","#797957"], skew:12}, id:"sch", name:"schenectady"},
    {func:twoColorVert, opts: {colors:["#A99370","#82835E"]} , id:"nbed", name:"new bedford"},
    {func:midStripe, opts: {colors:["#7E7F5C","#AA9570"], width:0.5, offset:0}, id:"ptl", name:"portland"},
    {func:twoColorDiag, opts: {colors:["#7E7D59","#BDB293"]}, id:"uti", name:"utica"},
    {func:twoColorDiag, opts: {colors:["#989180","#D1A772"]} , id:"nbur", name:"newburyport"},
    {func:twoColor, opts: {colors:["#D6B094","#C89566"]}, id:"pou", name:"poughkeepsie"},
    {func:bigX, opts: {colors:["#E0C68A", "#968D82"], width:0.4}, id:"moy", name:"moyamensing"},
    {func:midFlag, opts: {colors:["#A3AE9C", "#D0A471"], width:0.25, skew:-6}, id:"mob", name:"mobile"},
    {func:twoHooks, opts: {colors:["#A1AC9B","#D6AA77"], width:0.25}, id:"mem2", name:"memphis"},
    {func:longStripe, opts: {colors:["#A2AE9F","#B8AF8C"], width:0.2, edge:true}, id:"rox", name:"roxbury"},
    {func:longStripe, opts: {colors:["#BBB08D","#7E7D58"], width:0.6, rev:true, edge:false}, id:"alx", name:"alexandria"},
    {func:midFlag, opts: {colors:["#CDC0A2", "#A1AA99"], width:0.6, skew:20}, id:"ban", name:"bangor"},
    {func:doubleStripeIn, opts: {colors:["#D7A771","#BAAE8C"], width:0.1}, id:"lan", name:"lancaster"},
    {func:doubleStripe, opts: {colors:["#A19887","#AAB2A0", "#AAAD85"], width:0.30, dist:0.04}, id:"ken", name:"kensington"},
    {func:doubleStripe, opts: {colors:["#C08B5C","#C1B395"], width:0.2, dist:0.08}, id:"man", name:"manchester"},
    {func:midFlag, opts: {colors:["#D4AA8F", "#7D96A1"], width:0.6, skew:20}, id:"wib", name:"williamsburg"},
    {func:midFlag, opts: {colors:["#D3A673", "#9E8468"], width:0.6, skew:20}, id:"spr", name:"springfield"},
    {func:twoColorVert, opts: {colors:["#D4B193","#A7916F"], skew:-12}, id:"tan", name:"taunton"},
    {func:midStripe, opts: {colors:["#E2C689","#D8B096"], width:0.5, offset:0}, id:"lex", name:"lexington"},
    {func:twoColor, opts: {colors:["#E3C78C","#BCB091"]}, id:"hud", name:"hudson"},
    {func:bigTri, opts: {colors:["#7D7C58", "#A28C68"]}, id:"grg", name:"georgetown"},
  ];

  var pillMap = d3.map(pillTypes, function(d) { return d.id; });
  var pillWidth = 100;
  var pillHeight = pillWidth / 7;
  var pillSpace = 10;
  var yearSpace = 60;
  var data = [];
  var margin = {top: 80, right: 100, bottom: 20, left: 100};
  var g = null;
  var defs = null;

  function pillPath(width, height, padding) {

    var edge = width / 10;
    var halfHeight = height / 2;

    var path = "M 0," + halfHeight;
    path += " l " + edge + "," + (-1 * halfHeight);
    path += " l " + (width - (edge * 2)) + ",0";
    path += " l " + edge + "," + halfHeight;
    path += " l " + (-1 * edge) + "," + halfHeight;
    path += " l " + (-1 * (width - (edge * 2))) + ",0";
    path += " Z";

    return path;
  }

  function oneColor(selection, width, height, opts) {
    selection.selectAll("rect")
      .data([opts.colors[0]]).enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", function(d) { return d; });
  }

  function twoColor(selection, width, height, opts) {
    selection.selectAll("rect")
      .data(opts.colors).enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d,i) { return (i * height / 2); })
      .attr("width", width)
      .attr("height", height / 2)
      .attr("fill", function(d) { return d; });
  }

  function twoColorVert(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var skew = opts.skew || 0;

    selection
      .append("path")
      .attr("d", function() {
        var path = "M " + ((width / 2) - (skew / 2)) + "," + 0;
        path += " l" + ((width / 2) + (skew / 2)) + "," + 0;
        path += " l" + 0 + "," + height;
        path += " l" + (-1 * ((width / 2) - (skew / 2))) + "," + 0;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function twoColorDiag(selection, width, height, opts) {
    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + ",0";
        path += " l " + (-1 * width) + "," + height;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[0]);

    selection.append("path")
      .attr("d", function() {
        var path = "M 0," + height;
        path += " l " + width + ",0";
        path += " l " + 0 + "," + (-1 * height);
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function twoColorDiagRev(selection, width, height, opts) {
    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + "," + height;
        path += " l " + (-1 * width) + ",0";
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[0]);

    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + ",0";
        path += " l " + 0 + "," + height;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function midStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;
    var offset = 0;
    if(opts.offset) {
      offset = opts.offset;
    }

    selection.append("rect")
      .attr("x", ((width / 2) - offset) - (stripeWidth / 2))
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
  }

  function doubleStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;
    var halfWidth = width / 2;

    if(opts.colors.length > 2) {
      selection.append("rect")
        .attr("x", ((halfWidth / 2) + (halfWidth * opts.dist)))
        .attr("y", 0)
        .attr("width", stripeWidth * 2)
        .attr("height", height)
        .attr("fill", opts.colors[2]);
    }

    selection.selectAll(".stripe")
      .data([0,1]).enter()
      .append("rect")
      .attr("class", "stripe")
      .attr("x", function(d,i) {
        var dist = i === 0 ? (halfWidth * opts.dist) : (halfWidth * opts.dist * -1);
        return (((halfWidth / 2) + dist) - (stripeWidth / 2)) + (halfWidth * i);
      })
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
  }

  function candyStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * 0.34;
    var skew = 10;
    var edge = width / 10;

    // var stripeWidth = width * opts.width;
    var halfWidth = width / 2;

    selection.selectAll(".stripe")
      .data([0,1]).enter()
      .append("path")
      .attr("class", "stripe")
      .attr("d", function(d,i) {
        var startX = (i === 0) ? edge : edge + (stripeWidth * 2);
        var path = "M " + startX + "," + 0;
        path += " l" + stripeWidth + "," + 0;
        path += " l" + skew + "," + height;
        path += " l" + (-1 * stripeWidth) + "," + 0;
        path += " z";

        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function longStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;

    var edge = opts.edge ?  width / 10 : -40;
    var offset = opts.offset || 0;

    selection
      .append("path")
      .attr("d", function(d,i) {
        var path = "M " + (edge) + "," + height ;
        path += " l" + (width - (((edge) * 2) + stripeWidth)) + "," + (-1 * height);
        path += " l" + stripeWidth + "," + 0;
        path += " l" + (-1 * (width - (((edge) * 2) + stripeWidth))) + "," + (height);
        path += " z";

        return path;
      })
      .attr("transform", opts.rev ? "translate(100, 0) scale(-1, 1)" : "")
      .attr("fill", opts.colors[1]);
  }

  function doubleStripeIn(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;

    var edge = width / 10;

    selection.selectAll(".flag")
      .data([0,1]).enter()
      .append("path")
      .attr("d", function(d,i) {
        var path = "M " + edge + "," + height ;
        path += " l" + ((width / 2) - ((edge * 2) + stripeWidth)) + "," + (-1 * height);
        path += " l" + stripeWidth + "," + 0;
        path += " l" + (-1 * ((width / 2) - ((edge * 2) + stripeWidth))) + "," + (height);
        path += " z";

        return path;
      })
      .attr("transform", function(d,i) {  return i == 1 ? "translate(100, 0) scale(-1, 1)" : ""; })
      .attr("fill", opts.colors[1]);
  }

  function doubleFlag(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var flagWidth = width * opts.width;
    var halfWidth = width / 2;
    var skew = 6;

    selection.selectAll(".flag")
      .data([0,1]).enter()
      .append("path")
      .attr("class", "flag")
      .attr("fill", opts.colors[1])
      .attr("d", function(d,i) {
        var dist = i === 0 ? (halfWidth * opts.dist) : (halfWidth * opts.dist * -1);
        var path = "M " + ((((halfWidth / 2) + dist ) - ((flagWidth / 2) + (skew / 2))) + (halfWidth * i)) + "," + height;
        path += " l " + (skew) + "," + (-1 * height);
        path += " l " + flagWidth  + "," + 0;
        path += " l " + (-1 * skew)  + "," + ( height);
        path += " z";
        return path;
      });
  }

  function bigTri(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + height;
        path += " l " + ((width / 2) - edge) + "," + (-1 * height);
        path += " l " + ((width / 2) - edge)  + "," + height;
        path += " z";
        return path;
      });
  }

  function theTeeth(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 8;
    var toothWidth = (width - (edge * 2)) / 2;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + 0;
        path += " l " + (toothWidth / 2) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " z";
        return path;
      });

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + toothWidth) + "," + 0;
        path += " l " + (toothWidth / 2) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " z";
        return path;
      });

    var lastCol = opts.colors.length > 2 ? opts.colors[2] : opts.colors[0];

    selection.append("path")
      .attr("fill", lastCol)
      .attr("d", function() {
        var path = "M " + (edge + (toothWidth / 2)) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " l " + (toothWidth / 2) + "," + (height);
        path += " z";
        return path;
      });
  }

  function bigX(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;
    var xWidth = width * opts.width;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + (width - xWidth)) + "," + 0;
        path += " l " + ((width / 2) - (edge + (width - xWidth) )) + "," + (height / 2);
        path += " l " + ((width / 2) - ((width - xWidth) + edge)) + "," + (-1 * (height / 2));
        path += " z";
        return path;
      });

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + (width - xWidth)) + "," + height;
        path += " l " + ((width / 2) - (edge + (width - xWidth))) + "," + (-1 * (height / 2));
        path += " l " + ((width / 2) - ((width - xWidth) + edge)) + "," + ((height / 2));
        path += " z";
        return path;
      });
  }

  function bigTriInverted(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + 0;
        path += " l " + ((width / 2) - edge) + "," + (height);
        path += " l " + ((width / 2) - edge)  + "," + (-1 * height);
        path += " z";
        return path;
      });
  }

  function littleSquares(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);
    var squares = [true,false,true,false,true];
    var squarePad = width / 10;
    var squareWidth = (width - (squarePad * 2)) / squares.length;
    var squareHeight = height / 2;
    selection.selectAll(".little-square")
      .data(squares).enter()
      .append("rect")
      .attr("class", "little-square")
      .attr("fill", opts.colors[1])
      .attr("width", squareWidth)
      .attr("height", squareHeight)
      .attr("x", function(d,i) { return squarePad + (squareWidth * i); })
      .attr("y", function(d,i) { return d ? squareHeight : 0; });
  }

  function midFlag(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var flagWidth = width * opts.width;
    var skew = opts.skew;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + ((width / 2) - ((flagWidth / 2) + (skew / 2))) + "," + height;
        path += " l " + (skew) + "," + (-1 * height);
        path += " l " + flagWidth  + "," + 0;
        path += " l " + (-1 * skew)  + "," + ( height);
        path += " z";
        return path;
      });
  }

  function twoHooks(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var hookEdge = width * opts.width;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + hookEdge + "," + 0;
        path += " l " + 0 + "," + height / 2;
        path += " l " + (width - (hookEdge * 2)) + "," + 0;
        path += " l " + 0 + "," + height / 2;
        path += " l " + hookEdge + "," + 0;
        path += " l " + 0 + "," + (-1 * height);
        path += " z";
        return path;
      });
  }

  function prepareData(rawData) {
    rawData.forEach(function(d) {
      years.forEach(function(y) {
        d[y] = +d[y];
      });
    });

    return rawData;
  }

  function createLinks(data) {
    var links = [];
    data.forEach(function(d) {
      for(var i = 1; i < years.length; i++) {
        links.push({id:d.id, start:d[years[i-1]], end:d[years[i]], gap:i});
      }
    });

    return links.filter(function(l) { return l.start > 0 && l.end > 0; });
  }

  function getCityTitles(data) {
    endYears = [];
    data.forEach(function(d) {
      var started = false;
      for(var i = 0; i < years.length; i++) {
        if((started) && (isNaN(d[years[i]]) || d[years[i]] == -1)) {
          if(i > 1) {
            var yr = {
              id:d.id,
              year:years[i - 1],
              pos:d[years[i - 1]],
              name:pillMap.get(d.id).name,
              index:i - 1
            };
            endYears.push(yr);
          }
          if((d.id === "nbed") && (i === 7)) { //TODO fix bad hack
            continue;
          } else {
            break;
          }
        } else if(i + 1 === years.length) {
          endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
        } else if(!(isNaN(d[years[i]])) && (d[years[i]] !== -1)) {
          if(i > 0 && !started) {
            endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
          } else if(d[years[i]] > sideEnds[years[i]]) {
            endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
          }
          if((d.id === "pet") && (i === 3)) { //TODO fix bad hack
            started = false;
          } else {
            started = true;
          }
        }
      }
    });

    return endYears;
  }

  function getStartCities(data) {
    var startIds = data
    .filter(function(d) { return d[years[0]] > 0; })
    .map(function(d) { return d.id; });
    var cities = startIds.map(function(d) { return pillMap.get(d).name; });
    return cities;
  }

  var chart = function(selection) {
    selection.each(function(rawData) {
      data = prepareData(rawData);
      var links = createLinks(data);
      var cityTitles = getCityTitles(data);
      var cities = getStartCities(data);

      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");

      var width = (pillWidth + yearSpace) * years.length;
      var height = (pillHeight + pillSpace) * 52;

      svg.attr("width", width + margin.left + margin.right );
      svg.attr("height", height + margin.top + margin.bottom );

      defs = svg.append("defs");

      var pill = defs.append("clipPath")
        .attr("id", "pill")
        .append("path")
        .attr("d", pillPath(pillWidth, pillHeight));

      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll(".city-title")
        .data(cities).enter()
        .append("text")
        .attr("class", "title city-title")
        .attr("x", 0)
        .attr("dx", -100)
        .attr("dy", pillHeight )
        .attr("y", function(d,i) { return (pillHeight + pillSpace) * i; })
        .text(function(d) { return d; });

      var defpills = defs.selectAll("pill")
        .data(pillTypes)
        .enter()
        .append("g")
        .attr("id", function(d) { return d.id; })
        .attr("class", "pill");

      defpills.append("g").attr("clip-path", "url(#pill)")
        .each(function(d,i) {
          d3.select(this).call(d.func, pillWidth, pillHeight, d.opts);
        });

      defpills.append("path")
        .attr("class", "pill-outline")
        .attr("d", pillPath(pillWidth, pillHeight));

      g.selectAll("links").data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", function(d,i) { return ((pillWidth + yearSpace) * d.gap) - (yearSpace ); })
        .attr("y1", function(d,i) { return (pillHeight + pillSpace) * (d.start - 1) + (pillHeight / 2); })
        .attr("x2", function(d,i) { return ((pillWidth + yearSpace) * d.gap); })
        .attr("y2", function(d,i) { return (pillHeight + pillSpace) * (d.end - 1) + (pillHeight / 2); });

      var year = g.selectAll("year").data(years)
        .enter()
        .append("g")
        .attr("class", "year")
        .attr("transform", function(d,i) { return "translate(" + ((pillWidth + yearSpace) * i) + ",0)";  });

      year.append("text")
        .attr("class", "title year-title")
        .attr("text-anchor", "middle")
        .attr("x", pillWidth / 2)
        .attr("dy", -15)
        .text(function(d) { return d; });

      year.append("text")
        .attr("class", "title year-title")
        .attr("text-anchor", "middle")
        .attr("x", pillWidth / 2)
        .attr("dy", -30)
        .text(function(d,i) { return censuses[i]; });

      year.selectAll("pill-use")
        .data(function(y) {
          return data.map(function(d) {
            return {"id":d.id, "value":d[y]};
          }).filter(function(d) { return d.value > 0; });
        })
        .enter()
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.id;})
        .attr("class", "pill-use")
        .attr("transform", function(d,i) {
          return "translate(0," + (d.value - 1) * (pillHeight + pillSpace) + ")";
        })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

      g.selectAll("end-title")
        .data(cityTitles)
        .enter()
        .append("text")
        .attr("class", "title end-title")
        .attr("transform", function(d,i) {
          var x = ((pillWidth + yearSpace) * d.index);
          var y = (d.pos ) * (pillHeight + pillSpace);
          return "translate(" + x + "," + y + ")";
        })
        .attr("text-anchor", function(d) { return d.pos > sideEnds[d.year] ? "left" : "middle"; })
        .attr("dx", function(d) { return d.pos > sideEnds[d.year] ? pillWidth + 5 : pillWidth / 2;})
        .attr("dy", -1 * (pillHeight - 1))
        .text(function(d) { return d.name; });
    });
  };

  function mouseover(d,i) {
    defs.selectAll(".pill")
      .classed("highlight", function() {return d3.select(this).attr("id") === d.id;});
    g.selectAll(".link")
      .classed("highlight", function(e) {return e.id === d.id; });
  }

  function mouseout(d,i) {
    defs.selectAll(".pill").classed("highlight", false);
    g.selectAll(".link").classed("highlight", false);
  }

  return chart;
};

$(document).ready(function() {
  var plot = chart();

  function display(error, data) {
    d3.select("#vis").datum(data).call(plot);
  }

  queue()
    .defer(d3.csv, "data/pops.csv")
    .await(display);
});
