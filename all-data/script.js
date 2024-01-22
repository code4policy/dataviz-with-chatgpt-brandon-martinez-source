// extended_script.js

const margin = { top: 20, right: 20, bottom: 80, left: 50 }; // Increased bottom margin
const width = 800 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;


d3.csv("../boston_311_2023_by_reason.csv").then(function(data) {
    // Your D3.js code for extended bar chart
    // Use the entire dataset (data) instead of top 10

   // Sort data by Count in descending order
    data.sort((a, b) => b.Count - a.Count);

    // This is a simple example, and you can customize it based on your needs
const svg = d3.select("#extendedVisualization")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.reason))
        .range([0, height])
        .padding(0.1);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Count) * 6.3])
        .range([0, width]);

    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d.reason))
        .attr("x", 0)
        .attr("width", d => xScale(d.Count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue");

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "-0.15em")
        .attr("transform", "rotate(-45)");

    // Add x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em") // Adjusted dx for better spacing
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Reasons");

    // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("Number of Calls");
});
