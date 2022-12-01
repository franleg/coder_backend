import mongoose from 'mongoose';
import { usersService } from '../services/index.js';

const getUsers = async (req, res) => {
    let users = await usersService.getUsers();
    res.send({status: 'success', payload: users});
}

const getUserById = async (req, res) => {
    const { idUser } = req.params;
    if(!mongoose.Types.ObjectId.isValid(idUser)) return res.status(400).send({status: 'error', error: `Formato de id incorrecto`});
    const user = await usersService.getUserById(idUser);
    if (!user) return res.status(404).send({status: 'error', error: 'Usuario no encontrado'})
    res.send({status: 'success', payload: user});
}

export default {
    getUsers,
    getUserById,
}