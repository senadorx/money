const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddlewares');
const router = express.Router();

//tvm Routes:
router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',
    tasksMiddleware.validateFieldTitle,
    tasksMiddleware.validateFieldStatus,
    tasksController.updateTask,
);

//exports functions:
module.exports = router;