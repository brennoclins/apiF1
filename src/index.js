const express = require('express');
const { uuid } = require('uuidv4')

const app = express();

app.use(express.json());

const teams = [
    {
        "id": 1,
		"name":"Red Bull Racing",
		"logo":"https://media.api-sports.io/formula-1/teams/1.png",
		"president":"Dietrich Mateschitz",
		"director":"Christian Horner",
		"technical_manager": "Adrian Newey",
		"engine":"Honda V6 turbo hybride",
		"tyres":"Pirelli"
    },
    {
        "id": 2,
		"name":"McLaren Racing",
		"logo":"https://media.api-sports.io/formula-1/teams/2.png",
		"president":"Zak Brown",
		"director":"Andreas Seidl",
		"technical_manager": "James Key",
		"engine":"Renault V6 turbo hybride",
		"tyres":"Pirelli"
    },
    {
        "id": 5,
        "name":"Mercedes-AMG Petronas",
        "logo":"https://media.api-sports.io/formula-1/teams/5.png",
        "president":"Markus Schäfer",
        "director":"Toto Wolff",
        "technical_manager": "James Allison",
        "engine":"Mercedes V6 turbo hybride",
        "tyres":"Pirelli"
    }
];

app.get('/teams', (request, response) => {
    //usando desestruturação de código do javascript para pegar o NAME
    const { name } = request.query;

    //Criando um filtro que verifica se o nome do team exite na lista
    //se encontrar retona o que foi encontrado
    //se não retorna a lista completa
    const results = name
        ? teams.filter(team => team.name.includes(name))
        : teams

    //retornando o results
    return response.json(results);
});

//Pilotos
app.get('/drivres', (request, response) => {
    return response.json({drives: 'Pilotos'});
});

app.listen(3333, () => {
    console.warn(`🚀 Backend started 🏁 API F1 🏁`)
});