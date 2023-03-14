const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const getTasks = async (req, res) => { 
    try {
        const data = await prisma.tasks.findMany({
        })
        if (data[0] === undefined) {
            res.status(400).send({
                message: "No se encuentra los datos solicitados"
            })
        } else {
            res.json(data)
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener las tareas"
        })
        console.log(error)
    }
}

const getTaskById = async (req, res) => { 
    const { id } = req.params
    try {
        const data = await prisma.tasks.findUnique({
            where: {
                task_id: Number(req.params.id)
            }
        })
        console.log(data);
        if (data === null) {
            res.status(400).send({
                message: "No se encuentra los datos solicitados"
            })
        } else {
            res.json(data)
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener las tareas"
        })
        console.log(error)
    }
}

const createTask = async (req, res) => {
    try {
        const task = await prisma.tasks.create({
            data: {
                description_task: req.body.description_task,
                type_task: req.body.type_task,
                creation_date: new Date (req.body.creation_date),
                guess_end_date: new Date (req.body.guess_end_date)
            }
        })

        res.send({
            message: "tarea creada con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear una tarea"
        });
        console.log(error)
    }

}

const updateTask = async (req, res) => { 
    try {
        const task = await prisma.tasks.update({
            where: {
                task_id: req.body.task_id
            },
            data: {
                description_task: req.body.description_task,
                type_task: req.body.type_task,
                creation_date: new Date(req.body.creation_date),
                guess_end_date: new Date (req.body.guess_end_date)
            }
        })
        console.log("Se actualizo la tarea con el id " + task.task_id)
        res.send({
            message: "tarea actualizada con éxito."
        });
    } catch (error) {
        if (error.code === undefined) {
            res.status(400).send({
                message: "Ocurrió un error al actualizar la tarea"
            })
        } else {
            res.status(400).send({
                message: "Ocurrió un error al actualizar la tarea"
            })
        }
        console.log(error)
    }

}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await prisma.tasks.delete({
            where: {
                task_id: Number(req.params.id)
            },
        })
        console.log("Se eliminó la persona con el id " + task.task_id)
        res.send({
            message: "tarea borrada con éxito."
        });
    } catch (error) {
        if (error.code === undefined) {
            res.status(400).send({
                message: "Ocurrió un error al eliminar la tarea"
            })
        } else {
            res.status(400).send({
                message: "Ocurrió un error al eliminar la tarea"
            })
        }
        console.log(error)
    }
 }

module.exports = { getTaskById, createTask, getTasks, updateTask, deleteTask }