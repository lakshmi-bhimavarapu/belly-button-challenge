// link to samples.json file 
const url = 'data/samples.json';

// Fetch data from json file
d3.json(url).then((data) => {
    // Grab values from the response json object
    var data = data[0];
    let subjectIDs = data.names;
  
    // Add subject IDs as select options
    subjectIDs.forEach(subject => {
      let options = d3.select("#selDataset").append("option");
      options.attr("value", subject).text(subject);
    });

    // Initial dashboard build with the first subject ID
    buildDashboard(data, subjectIDs[0], init = true)
    console.log(subjectIDs[0]);
  
    // On change to the DOM, call optionChanged()
    d3.selectAll("#selDataset").on("change", optionChanged);
  
    // Function called by DOM changes
    function optionChanged() {
      let dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      let subject = dropdownMenu.property("value");
      // Build dashboard for a selected subject
      buildDashboard(data, subject);
    }
  });

  // Building Dashboard
function buildDashboard(data, subject, init = false) {
    // Grab the values needed to build plots
    // Create arrays for metadata and samples for the selected subject
    let metadata = data.metadata.filter(m => m.id === parseInt(subject));
    let samples = data.samples.filter(s => s.id === subject);
  
    // Create arrays for sample values and OTU ids and labels
    // Used for bubble chart
    let sample_values = samples.map(s => s.sample_values);
    let otu_ids = samples.map(s => s.otu_ids);
    let otu_labels = samples.map(s => s.otu_labels);
  
    // Create arrays for top 10 sample values and OTU ids and labels
    // Used for bar chart
    let sample_values_10 = sample_values[0].slice(0, 10).reverse();
    let otu_ids_10 = otu_ids[0].slice(0, 10).reverse().map(id => `OTU ${id}`);
    let otu_labels_10 = otu_labels[0].slice(0, 10).reverse();

    // Metadata Panel
    let panel = d3.select("#sample-metadata");
    let mdString = "";
    Object.entries(metadata[0]).forEach(([key, value]) => {
      mdString += `<p>${key}: ${value}</p>`
    });
    panel.html(mdString);

// Building Charts

// Horizontal bar chart
  let hBarData = {
    type: 'bar',
    x: sample_values_10,
    y: otu_ids_10,
    text: otu_labels_10,
    orientation: 'h',
    marker: {
      color: "orangered",
    },
    width: 0.9
  };

  let hBarLayout = {
    width: 480,
    height: 420,
    title: '<b>Top 10 Bacteria Cultures </b>',
    margin: {
      t: 0,
      b: 20
    }
  };
// Bubble Chart
  let bubbleData = {
    x: otu_ids[0],
    y: sample_values[0],
    text: otu_labels[0],
    mode: 'markers',
    marker: {
      color: otu_ids[0],
      size: sample_values[0],
      colorscale: 'Earth'
    }
  };

  let bubbleLayout = {
    showlegend: false,
    hovermode: 'closest',
    title: '<b>Bacteria Cultures</b>',
    xaxis: { title: "OTU ID" },
    height: 600
  };

// Guage Chart
  var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      type: 'indicator',
      mode: 'gauge+number',
      title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
      value: metadata[0].wfreq,
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "gray" },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 1,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
        ],
      }
    }];


  let gaugeLayout = { 
    width: 500,
    height: 450,
    margin: { l: 25, r: 25, t: 0, b: 0 },
    font: {color: "blue"}
  };

  // ======= Initial plotting of all charts =============
  if (init) {
  Plotly.newPlot('bar', [hBarData], hBarLayout);
  Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
  Plotly.newPlot('gauge', gaugeData, gaugeLayout);
            }

// ============ Plotting after selection ================
  else {
  // Horizontal bar chart
  let hBarStyle = {
    x: [sample_values_10],
    y: [otu_ids_10],
    text: [otu_labels_10]
  };

  Plotly.restyle('bar', hBarStyle);

  // Bubble Chart
  let bubbleStyle = {
    x: [otu_ids[0]],
    y: [sample_values[0]],
    text: [otu_labels[0]],
    marker: [{
      color: otu_ids[0],
      size: sample_values[0],
      colorscale: "Earth"
    }]
  };

  Plotly.restyle('bubble', bubbleStyle);

  // Gauge chart
  let gaugeStyle = {
    value: [metadata[0].wfreq]
  };

  Plotly.restyle('gauge', gaugeStyle);

  }
}
