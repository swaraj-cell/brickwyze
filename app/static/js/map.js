// Initialize map
var map = L.map('map').setView([40.75, -73.98], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Fetch GeoJSON data from Flask
fetch("/data")
    .then(response => response.json())
    .then(data => {

        L.geoJSON(data, {

            // Style based on score
            style: function(feature) {
                let score = feature.properties.score;

                return {
                    color: "white",
                    weight: 2,
                    fillColor:
                        score > 85 ? "green" :
                        score > 75 ? "yellow" :
                        "red",
                    fillOpacity: 0.6
                };
            },

            // Popup info
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    `<b>${feature.properties.name}</b><br>Score: ${feature.properties.score}`
                );
            }

        }).addTo(map);

    })
    .catch(err => console.error("Error loading GeoJSON:", err));