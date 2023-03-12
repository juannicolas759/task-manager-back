const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const getStates = async (req, res) => {
    try {
        const data = await prisma.states.findMany({
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
            message: "Ocurrió un error al momento obtener los estados"
        })
        console.log(error)
    }
}

const getActiveStates = async (req, res) => {
    try {
        const data = await prisma.states.findMany({
            where: {
                is_active: true
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
            message: "Ocurrió un error al momento obtener los estados"
        })
        console.log(error)
    }
}

const getStateById = async (req, res) => {
    try {
        const data = await prisma.states.findUnique({
            where: {
                state_id: req.body.state_id
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
            message: "Ocurrió un error al momento obtener los estados"
        })
        console.log(error)
    }
}

const createState = async (req, res) => {
    try {
        const state = await prisma.states.create({
            data: {
                state_name: req.body.state_name,
                is_active: true,
            }
        })
        res.send({
            message: "estado creado con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear un estado"
        });
        console.log(error)
    }
 }

const updateState = async (req, res) => {
    try {
        const task = await prisma.states.create({
            data: {
                state_id: req.body.state_id,
                state_name: req.body.state_name,
                is_active: req.body.is_active,
            }
        })
        res.send({
            message: "estado actualizado con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear un estado"
        });
        console.log(error)
    }
 }

const deleteState = async (req, res) => {
    try {
        const state = await prisma.states.update({
            where: {
                state_id: req.body.state_id
            },
            data: {
                is_active: false,
            }
        })
        console.log("Se eliminó el estado con el id " + state.state_id)
        res.send({
            message: "estado borrada con éxito."
        });
    } catch (error) {
        if (error.code === undefined) {
            res.status(400).send({
                message: "Ocurrió un error al eliminar el estado"
            })
        } else {
            res.status(400).send({
                message: "Ocurrió un error al eliminar el estado"
            })
        }
        console.log(error)
    }
 }

module.exports = { getStateById, createState, getStates, updateState, deleteState, getActiveStates }