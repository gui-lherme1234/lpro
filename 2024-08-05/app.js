const express = require('express');

const app = express();

const users = [
    { id: 1, name: 'Alice', status: 'Disponível'},
    { id: 2, name: 'Bob', status: 'Ocupado'},
    { id: 3, name: 'Charlie', status: 'Ausente'}
]

app.get('/api/users', (req, res) => {
    console.log(req.query);
    const status = req.query.status;

    if(status) {
        return res.status(200).json(users.filter(user => user.status === status));
    }

    return res.status(200).json(users);
});


app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'O "id" do usuário deve ser um número.'})
    }

    const user = users.find(user => user.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado'});
    
    }
        return res.status(200).json(user);
 
});



app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000....");
});