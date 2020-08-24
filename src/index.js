const express = require('express');

const app = express();


app.get('/teams', (request, response) => {
    return response.send("apiF1 OK2")
});

//Pilotos
app.get('/drivres', (request, response) => {
    return response.json({drives: 'Pilotos'});
});

app.listen(3333, () => {
    console.warn(`🚀 Backend started 🏁 API F1 🏁`)
});