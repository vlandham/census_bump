
var years = ["1890","1880","1870","1860", "1850", "1840", "1830", "1820", "1810", "1800", "1790"];
var censuses = ["11th census.", "10th census.", "9th census.", "8th census.", "7th census.", "6th census.", "5th census.", "4th census.", "3rd census.", "2nd census.", "1st census."];

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
    {func:oneColor, opts: {colors:["#B29270"]}, id:"spg", name:"spring garden"},
    {func:bigTri, opts: {colors:["#BFB395", "#E2CB8D"]}, id:"det", name:"detroit"},
    {func:twoColorVert, opts: {colors:["#D6B094", "#A48D6D"]}, id:"mil", name:"milwaukee"},
    {func:midFlag, opts: {colors:["#ABB5A5", "#E5C98F"]}, id:"new", name:"newark"},
    {func:twoColor, opts: {colors:["#82815C","#C99562"]}, id:"min", name:"minneapolis"},
    {func:twoColorVert, opts: {colors:["#D1A577","#A7916E"]}, id:"jer", name:"jersey city"},
    {func:oneColor, opts: {colors:["#C1B496"]}, id:"lou", name:"louisville"},
    {func:twoColor, opts: {colors:["#AA9570","#D3AE99"]}, id:"nlib", name:"northern liberties"},
    {func:twoColorVert, opts: {colors:["#D5A87B","#BAAD91"]}, id:"npor", name:"newport"},
    {func:oneColor, opts: {colors:["#E6CC90"]}, id:"pro", name:"providence"},
    {func:oneColor, opts: {colors:["#D6AB90"]}, id:"nor", name:"norfolk"},
    {func:twoColorVert, opts: {colors:["#A8B4A7","#D6AA8F"]}, id:"ric", name:"richmond"},
    {func:twoColorDiag, opts: {colors:["#9C9385","#D6AA7A"]}, id:"nbp", name:"newburyport"},
  ];

  var pillWidth = 100;
  var pillHeight = pillWidth / 7;
  var pillSpace = 10;
  var yearSpace = 60;
  var data = [];
  var margin = {top: 80, right: 20, bottom: 20, left: 100};
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

    selection.selectAll("rect")
      .data(opts.colors).enter()
      .append("rect")
      .attr("x", function(d,i) { return (i * width / 2); })
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", height)
      .attr("fill", function(d) { return d; });
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

  function midStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;

    selection.append("rect")
      .attr("x", (width / 2) - (stripeWidth / 2))
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
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

    var flagWidth = width / 4;
    var skew = 6;

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

  var chart = function(selection) {
    selection.each(function(rawData) {
      data = prepareData(rawData);
      var links = createLinks(data);
      pillMap = d3.map(pillTypes, function(d) { return d.id; });
      var startIds = data
        .filter(function(d) { return d[years[0]] > 0; })
        .map(function(d) { return d.id; });
      var cities = startIds.map(function(d) { return pillMap.get(d).name; });

      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");

      var width = (pillWidth + yearSpace) * years.length;
      var height = (pillHeight + pillSpace) * 25;

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

      g.selectAll("links").data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", function(d,i) { return ((pillWidth + yearSpace) * d.gap) - (yearSpace + 2); })
        .attr("y1", function(d,i) { return (pillHeight + pillSpace) * (d.start - 1) + (pillHeight / 2); })
        .attr("x2", function(d,i) { return ((pillWidth + yearSpace) * d.gap) + 2; })
        .attr("y2", function(d,i) { return (pillHeight + pillSpace) * (d.end - 1) + (pillHeight / 2); });

      year.selectAll("pill-use")
        .data(function(y) {
          return data.map(function(d) {
            return {"id":d.id, "value":d[y]};
          }).filter(function(d) { return d.value > 0; });
        })
        .each(function(d) { console.log(d); })
        .enter()
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.id;})
        .attr("class", "pill-use")
        .attr("transform", function(d,i) {
          return "translate(0," + (d.value - 1) * (pillHeight + pillSpace) + ")";
        })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
    });
  };

  function mouseover(d,i) {
    console.log(d);
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



function plotData(selector, data, plot) {
  d3.select(selector)
    .datum(data)
    .call(plot);
}

$(document).ready(function() {
  var plot = chart();

  function display(error, data) {
    plotData("#vis", data, plot);
  }

  queue()
    .defer(d3.csv, "data/pops.csv")
    .await(display);
});
