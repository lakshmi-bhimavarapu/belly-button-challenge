# belly-button-challenge

The link to the dashboard: https: https://lakshmi.bhimavarapu.github.io/Belly-Button-Biodiversity-Dashboard/

***data/sample.json*** is the input file in a json format.

## Objective
The purpose of this project is to build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Plotly
Plotly was used to plot all charts.

The D3 library was used to read in the input file samples.json.

The elements of the dashboard:

A **dropdown menu** to select a sample.<br>
A **horizontal bar chart** to display the top 10 OTUs found in the selected individual.<br>
A **bubble chart** that displays each sample.<br>
An **individual's demographic information**. Each key-value pair from the metadata JSON object is displayed.<br>
The **Gauge Chart** from https://plot.ly/javascript/gauge-charts/ was adapted to plot the weekly washing frequency of the individual.<br>
All of the plots are updated any time that a new sample is selected.

**Tools / Techniques Used:**<br>
JavaScript<br>
D3.js<br>
Plotly<br>
HTML/CSS<br>
Bootstrap
