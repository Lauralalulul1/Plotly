// Sources: https://www.d3-graph-gallery.com/graph/barplot_horizontal.htm, Class Activities, Slack

function getPlots(id) {

//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)

// Set variable and slice the sampleValues and "flip it and reverse it"- Missy Elliott
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

// Set label variable and slice the top 10 labels and "flip it and reverse it" M.E.
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

// get the top 10 OTU's and "flip it and reverse it" M.E 
        var top10 = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();

// Use the map method and get top 10 OTU's in this guy's belly button
        var OTU_id = top10.map(d => "OTU" + d);
        console.log(`OTU IDS: ${OTU_id}`)

//Create the trace    
        var trace = {
            y: OTU_id,
            x: sampleValues,
            text: OTU_labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
      
// Create the data array for our plot
        var data = [trace];

// Define the plot layout
        var layout = {
            title: "Belly Button Diversity: Top 10 species in  his bellybutton",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 40
            }
        };

// Plot the chart to the div tag with id "bar"
    Plotly.newPlot("bar", data, layout);



// Creating the trace for the bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

// Define the bubble plot layout
        var layout1 = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1000
        };

//Create the data array for our plot 
        var data1 = [trace1];

// Plot the chart to the div tag with id "bubble"
    Plotly.newPlot("bubble", data1, layout1); 
    
    });
} 


//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.


    function getDemoInfo(id) {
// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
    d3.json("samples.json").then((data)=> {

// grab and set the metadata and check the console
    var metadata = data.metadata;
    console.log(metadata)

//Use filter() to pass the function as its argument
    var result = metadata.filter(meta => meta.id.toString() === id)[0];

// Function called by DOM changes
    var Demographic_Info= d3.select("#sample-metadata");
        
// empty the demographic info panel each time before getting new id info
    Demographic_Info.html("");

//get the demographic info and append
        Object.entries(result).forEach((key) => {   
            Demographic_Info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
//cal the function and id index.html line 25 on change
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// initiate the function
function init() {

 // Assign the value of the dropdown menu option to a variable saved 10.26 
    var dropdown = d3.select("#selDataset");

// read the json
    d3.json("samples.json").then((data)=> {
        console.log(data)

 //get each each name to append to drop down box
        data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
        });

// display and update the data and the plots to the page
        Plots(data.names[0]);
        DemoInfo(data.names[0]);
    });
}

init();
