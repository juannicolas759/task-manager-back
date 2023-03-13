const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const getHisTasksByUser = async (req, res) => {
    try {
        const data = await prisma.history_tasks.findMany({
            where: {
                user_id: req.body.user_id
            }
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
            message: "Ocurrió un error al momento obtener las tareas del usuario"
        })
        console.log(error)
    }
}

const getHistoryTasks = async (req, res) => {
    try {
        const data = await prisma.history_tasks.findMany({
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
            message: "Ocurrió un error al momento obtener todo el historial de las tareas"
        })
        console.log(error)
    }
}

const assignHistoryTask = async (req, res) => {
    try {
        const data = await prisma.history_tasks.create({
            data: {
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                state_id: req.body.state_id,
                change_date: new Date(req.body.change_date)
            }
        })

        res.send({
            message: "tarea asinganada con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al asignar una tarea"
        });
        console.log(error)
    }
}

const registerHistoryTask = async (req, res) => {
    try {
        const data = await prisma.history_tasks.create({
            data: {
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                state_id: req.body.state_id,
                change_date: new Date(req.body.change_date)
            }
        })

        res.send({
            message: "historial de tarea creada con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear una registro en el historial de tarea"
        });
        console.log(error)
    }
}

//TO-DO
const getLastPositionTask = async (req, res) => {
    try {
        const data = await prisma.history_tasks.findMany({
            where: {
                user_id: req.body.task_id,
                task_id: req.body.task_id
            },
            orderBy: {
                change_date: 'desc'
            }
        })
        if (data === null) {
            res.status(400).send({
                message: "No se encuentra los datos solicitados"
            })
        } else {
            res.json(data[0])
        }
    } catch (error) {
        res.send({
            message: "Ocurrió un error al momento obtener las tareas"
        })
        console.log(error)
    }
}

// filtrouserfecha





module.exports = { getHisTasksByUser, getLastPositionTask,
                    getHisTasksByUser, getHistoryTasks, assignHistoryTask,
                     registerHistoryTask }