const Task = require('../models/Task')

const getAllTasks = async (req, res) => {//modulo criado 
    try {
        const taskList = await Task.find();
        res.render("index", { taskList });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

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

module.exports = {
    getAllTasks,
    createTask
}