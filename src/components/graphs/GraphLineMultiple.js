import { h } from "hyperapp"
import * as d3 from 'd3'
import ResizeManager from "../../service/ResizeManager.js"


const GraphLineMultiple=(id)=>el=>{

  // 2. Use the margin convention practice
  var margin = {top: 20, right: 20, bottom: 20, left: 24},
      initWidth = 410,  // graph initial width
      width = 410,      // graph initial width
      maxWidth = 692,   // graph maximum width
      height = 80;      // graph height

  const tooltipDecimals = 2;

  // The number of datapoints
  var n = 21;

  // Random Dataset 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  var dataset = d3.range(n).map( (d)=>{ return {"y": d3.randomUniform(1)() } })
  var dataset2 = d3.range(n).map( (d)=>{ return {"y": d3.randomUniform(1)() } })


  // Builds D3 Graph
  function buildGraph() {

    // Remove graph if exists
    if(d3.select(el)) d3.select(el).select("svg").remove()

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input
        .range([height, 0]); // output

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
        .curve(d3.curveLinear) // apply smoothing to the line

    // Tooltip
    var tip = d3.select(el).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("color", "#B0BAC9")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .attr("color", "#B0BAC9")
        .call(d3.axisLeft(yScale).ticks(3)) // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return height; }) // set the y values for the line generator
            .curve(d3.curveLinear) )
        .transition()
        .duration(1250)
        .ease(d3.easeExp)
        .delay( (d, i)=>{
                return 30
              })
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
            .curve(d3.curveLinear) ); // 11. Calls the line generator


    // 9. Append the path, bind the data, and call the line generator
    svg.append("path")
        .datum(dataset2) // 10. Binds data to the line
        .attr("class", "line2") // Assign a class for styling
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return height; }) // set the y values for the line generator
            .curve(d3.curveLinear) )
        .transition()
        .duration(1250)
        .ease(d3.easeExp)
        .delay( (d, i)=>{
                return 170
              })
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
            .curve(d3.curveLinear) ); // 11. Calls the line generator





    }



    // On Screen Resize
    function onResize (entry) {
      if (entry.contentRect) {

        let screenWidth = entry.contentRect.width

        if (screenWidth < maxWidth) {
            width = screenWidth - 35
            buildGraph()
        }
        else
            width = initWidth
            buildGraph()
        }
    }

    // Resize Observer Callback
    el.parentElement.onresize = onResize;
    // Instantiate Resize Observer
    let resizeObserver = ResizeManager;
    resizeObserver.observe(el.parentElement);

    buildGraph()
}


export default GraphLineMultiple
