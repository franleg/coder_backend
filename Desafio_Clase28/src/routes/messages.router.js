import { Router } from 'express';
import { normalize, schema, denormalize } from 'normalizr';
import { objectTransform } from '../utils.js';
import messagesService from '../models/Messages.js';

const router = Router();

router.get('/', async(req, res)=>{
    try{
        let messages = await messagesService.find();
        let messagesAux = objectTransform(messages);

        // Object data
        let chat = {
            id: 1000,
            messages: messagesAux
        }

        //Entities
        const authorSchema = new schema.Entity('authors');
        const messageSchema = new schema.Entity('messages',{
            author: authorSchema
        })
        const chatSchema = new schema.Entity('chats',{
            messages: [messageSchema]
        });

        // Normalized data
        const normalizedData = normalize(chat, chatSchema);
        console.log('Normalize data:'+'\n', JSON.stringify(normalizedData, null, '\t'));

        // Denormalized data
        const denormalizedData = denormalize(normalizedData.result, chatSchema, normalizedData.entities);
        console.log('Denormalize data:'+'\n', JSON.stringify(denormalizedData, null, '\t'));

        // Data length
        const dataLength = JSON.stringify(chat).length
        console.log('Data length: ', dataLength)

        // Normalize data length
        const NormalizedLength = JSON.stringify(normalizedData).length
        console.log('Normalize data length: ', NormalizedLength)

        // Denormalize data length
        const DenormalizedLength = JSON.stringify(denormalizedData).length
        console.log('Denormalize data length: ', DenormalizedLength)

        // Percent of compresion
        const percentCompresion = (NormalizedLength * 100) / dataLength
        console.log('Porcentaje de compresión: ', percentCompresion.toFixed(2) + '%')

        res.status(200).send(normalizedData);

    }catch(error){
        res.status(500).send('Cannot get messages');
    }
});

export default router;