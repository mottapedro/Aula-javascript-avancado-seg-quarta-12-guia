const Task = require('../models/Task')

const getAllTasks = async (req, res) => {//modulo criado 
    try {
        const taskList = await Task.find();
        return res.render("index", { taskList, task: null });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        return res.redirect("/");
    }



    try {
        await Task.create(task)
        return res.redirect("/")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getById = async (req, res) => {
    //enviar o id como parametro da rota
    try {
        const task = await Task.findOne({ _id: req.params.id });
        const taskList = await Task.find();
        res.render("index", { task, taskList });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {//os parametros da requisição , precisão estar na ordem correta
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");//redireciona para página da lista de tarefas
        return console.log("Tarefa atualizada com sucesso!")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,//necessário a virgula no ultima função
};