const connection = require('./connection');


//get All Tasks from Table Tasks from BD=============================================
const getAll= async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};


//Create a new task:==============================================================
const createTask = async (task)=> {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?,?,?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
    return {insertId: createdTask.insertId};
}


//Delete one task:=============================================
const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;

};

//Update one task:=============================================
const  updateTask = async (id, task) => {
    const {title, status} = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?'
    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;

};
//Exports=====================================================
module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};