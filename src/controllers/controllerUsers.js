const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { encrypt } = require('../utils/handleBcrypt')
const jwt = require('jsonwebtoken')


function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const getUsers = async (req, res) => {
    try {
        const data = await prisma.users.findMany({
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
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const data = await prisma.users.findUnique({
            where: {
                user_id: req.body.user_id
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
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

const getUserByState = async (req, res) => {
    try {
        const data = await prisma.users.findUnique({
            where: {
                user_state: req.body.user_state
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
            message: "Ocurrió un error al momento obtener los usuarios por estado"
        })
        console.log(error)
    }
}

const createUsers = async (req, res) => {
    try {
        const user = await prisma.users.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_password: await encrypt(req.body.user_password),
                user_state: req.body.user_state,
                manager_id: req.body.manager_id
            }
        })

        res.send({
            message: "Usuario creado con éxito"
        });
    } catch (error) {
        res.status(400).send({
            message: "Ocurrió el error al momento de crear el usuario"
        });
        console.log(error)
    }

}


const updateUsers = async (req, res) => {

    try {
        const user = await prisma.users.update({
            where: {
                user_id: req.body.user_id
            },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_state: req.body.user_state,
                manager_id: req.body.manager_id
            }
        })
        console.log("Se actualizo la persona con el id " + user.user_id)
        res.send({
            message: "Persona actualizada con éxito."
        });
    } catch (error) {
        if (error.code === undefined) {
            res.status(400).send({
                message: "Ocurrió un error al actualizar al usuario"
            })
        } else {
            res.status(400).send({
                message: "Ocurrió un error al actualizar al usuario"
            })
        }
        console.log(error)
    }


}

const deleteUser = async (req, res) => {
    try {
        const user = await prisma.users.update({
            where: {
                user_id: req.body.user_id
            },
            data: {
                user_state: "I",
            }
        })
        console.log("Se eliminó la persona con el id " + user.user_id)
        res.send({
            message: "Persona borrada con éxito."
        });
    } catch (error) {
        if (error.code === undefined) {
            res.status(400).send({
                message: "Ocurrió un error al eliminar el usuario"
            })
        } else {
            res.status(400).send({
                message: "Ocurrió un error al eliminar el usuario"
            })
        }
        console.log(error)
    }

}

const getUserTasks = async (req, res) => {
    try {
        const data = await prisma.users.findMany({
            where: {
                user_id: req.body.user_id
            },
            include: {
                history_tasks: {
                    orderBy: {
                        change_date: 'desc',
                    },
                    distinct: ['task_id']
                }
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
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

const getUserTasksByState = async (req, res) => {
    try {
        const data = await prisma.users.findMany({
            where: {
                user_id: req.body.user_id
            },
            include: {
                history_tasks: {
                    where:{
                        state_id: req.body.state_id
                    },
                    orderBy: {
                        change_date: 'desc',
                    },
                    distinct: ['task_id']
                }
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
            message: "Ocurrió un error al momento obtener los usuarios"
        })
        console.log(error)
    }
}

module.exports = {
    getUsers, createUsers, getUserById,
    updateUsers, deleteUser, getUserByState, getUserTasks,
    getUserTasksByState
}