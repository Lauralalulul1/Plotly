// Horizontal Bar Chart ref Slack

// Sources: https://www.d3-graph-gallery.com/graph/barplot_horizontal.htm, Class Activities, Slack

function getPlots(id) {

//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
 })

// Bars
    svg.selectAll('rect')
        .data(booksReadThisYear)
        .enter()
        .append("rect")
        .attr("height", 50)
        .attr("width", function (data) {
         return data * 10;
     })
        .attr("y", function (data, index) {
         return index * (50 + 10)
     })

 
// Slice the first sampleValues and "flip it and reverse it"- Missy Elliott
    var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

// Slice the top 10 labels and "flip it and reverse it" M.E.
    var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

// get the top 10 OTU's and "flip it and reverse it" M.E.
    var top10 = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        console.log(top10)

 // Use the map method with the arrow function to the top 10 OTU's in this guy's belly button
     var OTU_ids = top10.map(d => "OTU " + d);

//Create the trace
    trace = {
        y: otu_ids.map(e => e.otu_ids),
        x: sampleValues.map(e => e.sampleValues)
        type: "bar",
        orientation: 'h',
        marker: {"blue"},
};

// Create the data array for our plot
    var data = [trace];

// Define the plot layout
    var layout = {
        title: "Belly Button Diversity - Top 10 OTUs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 40
    }
};

// Plot the chart to the div tag with id "plot"
    Plotly.newPlot("plot", data, layout)