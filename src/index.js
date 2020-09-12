const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//meu banco de dados, agora vai iniciar como um array vazio
const teams = [
    /*{
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
    }*/
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

app.post('/teams', (request, response) => {
    //pego os dados la do Frontend agora com o request.body
    const {  
        name, 
        logo,
        president,
        director,
        techical_manager,
        engine,
        tyres
    } = request.body;

    // crio uma nova equipe de F1
    const newTeam = { 
        id: uuid(), 
        name, 
        logo,
        president,
        director,
        techical_manager,
        engine,
        tyres
    };

    //adiciono essa nova equipe ao Banco de Dados
    teams.push(newTeam);

    // retorno com uma mensagem e a nova equipe
    return response.json({newTeam, message: "New Teams Create Sucess!" });
});

app.put('/teams/:id', (request, response) => {
    //capturo a ID para saber qual registro vou atualizar
    const { id } = request.params;

    //pego os novos dados la do frontend
    const {  
        name, 
        logo,
        president,
        director,
        techical_manager,
        engine,
        tyres
    } = request.body;

    //procurar a equipe na lista "teams"
    const teamIndex = teams.findIndex(team => team.id == id);

    //verifico se a equipe(team) foi ou não encontrada
    if(teamIndex < 0){
        //caso não exita uma equipe retorno um erro
        return response.status(400).json({ error: "Teams not found!" });
    }

    //crio uma variavel com os dados da equipe que vão ser atualizados
    const teamForUpdate = { 
        id, //squi vem do request.params
        name, 
        logo,
        president,
        director,
        techical_manager,
        engine,
        tyres
    };

    //seleciono a equipe na lista e atualizo seus dados
    teams[teamIndex] = teamForUpdate; 

    //retorno a equipe atualizada junto com uma mensagem de sucesso
    return response.json({teamForUpdate, message: "Teams Update Sucess!" });
});

app.delete('/teams/:id', (request, response) => {
    const { id } = request.params;

    //procura na lista de TEAMS o index do team que vai ser apagado
    const teamIndex = teams.findIndex(team => team.id == id);

    //verifico se o Team foi ou não encontrado
    if(teamIndex < 0){
        //se o team não foi encontrado retorno um erro com STATUS 400
        return response.status(400).json({ error: "Teams not found!" });
    }

    //removo o team da lista de temas
    teams.splice(teamIndex, 1);

    //retorno uma mensagem vazia com STATUS 204
    return response.status(204).send();
});


//Pilotos
app.get('/drivres', (request, response) => {
    return response.json({drives: 'Pilotos'});
});

app.listen(3333, () => {
    console.warn(`🚀 Backend started 🏁 API F1 🏁`)
});