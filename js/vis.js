
var years = ["1890","1880","1870","1860"];
var censuses = ["11th census.", "10th census.", "9th census.", "8th census."];

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
    {func:midStripe, opts: {colors:["#E7CE98","#D5AD94"]}, id:"cle", name:"cleveland"},
    {func:twoColor, opts: {colors:["#A6AEA3","#C79063"]}, id:"buf", name:"buffalo"},
  ];

  var pillWidth = 100;
  var pillHeight = pillWidth / 7;
  var pillSpace = 10;
  var yearSpace = 60;
  var data = [];
  var margin = {top: 80, right: 20, bottom: 20, left: 100};
  var g = null;

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

    var stripeWidth = width / 2;

    selection.call(oneColor, width, height, opts);

    selection.append("rect")
      .attr("x", (width / 2) - (stripeWidth / 2))
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
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
        links.push({start:d[years[i-1]], end:d[years[i]], gap:i});
      }
    });

    return links;
  }

  var chart = function(selection) {
    selection.each(function(rawData) {
      data = prepareData(rawData);
      var links = createLinks(data);
      var cities = pillTypes.map(function(d) { return d.name; });

      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");

      var width = (pillWidth + yearSpace) * years.length;
      var height = (pillHeight + pillSpace) * 15;

      svg.attr("width", width + margin.left + margin.right );
      svg.attr("height", height + margin.top + margin.bottom );

      var defs = svg.append("defs");
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

      defpills = defs.selectAll("pill")
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

      year.selectAll("pill")
        .data(function(y) {
          return data.map(function(d) {
            return {"id":d.id, "value":d[y]};
          });
        })
        .each(function(d) { console.log(d); })
        .enter()
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.id;})
        .attr("class", "pill")
        .attr("transform", function(d,i) {
          return "translate(0," + (d.value - 1) * (pillHeight + pillSpace) + ")";
        });
    });
  };

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
