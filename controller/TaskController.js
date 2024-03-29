const Task = require('../models/Task');
let message = "";
let type = "";



const getAllTasks = async (req, res) => {//modulo criado 
    try {
        setTimeout(() => { message = "" }, 2000);
        const taskList = await Task.find();
        console.log(taskList);
        return res.render("index", {
            taskList,
            task: null,
            taskDelete: null,
            message,
            type
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        message = "insrira um texto , antes de adicionar a tarefa!";
        type = "danger";
        return res.redirect("/");
    }

    try {
        await Task.create(task);
        message = "Tarefa criada com sucesso!";
        type = "success";
        return res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getById = async (req, res) => {
    //enviar o id como parametro da rota
    try {

        const taskList = await Task.find();

        if (req.params.method == "update") {
            const task = await Task.findOne({ _id: req.params.id });
            res.render("index", { task, taskDelete: null, taskList, message, type });
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", { task: null, taskDelete, taskList, message, type });
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {//os parametros da requisição , precisão estar na ordem correta
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        message = "Tarefa atualizada com sucesso!";
        type = "success";
        res.redirect("/");//redireciona para página da lista de tarefas
        return console.log("Tarefa atualizada com sucesso!")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const deleteOneTask = async (req, res) => {
    try {

        await Task.deleteOne({ _id: req.params.id });
        message = "Tarefa apagada com sucesso!";
        type = "success";
        res.redirect("/");//redireciona para página da lista de tarefas
        return console.log("Tarefa excluida com sucesso!");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });

        task.check ? task.check = false : task.check = true;

        /*  if (task.check) {
              task.check = false;
  
          } else {
              task.check = true;
          }
  */
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");
    } catch (error) {
        res.status(500).send({ error: err.message });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,//necessário a virgula no ultima função
    deleteOneTask,
    taskCheck,
};