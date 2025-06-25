import express, { Request, Response } from 'express';
import { Banker } from '../entities/Banker';
import { getRepository } from 'typeorm';

const router = express.Router();

router.get('/bankers', (req: Request, res: Response) => {
    getRepository(Banker)
        .find()
        .then(bankers => res.status(200).json(bankers))
        .catch(error => res.send(error));
});

router.post('/banker', (req: Request, res: Response) => {
    const { username, email, password, firstname, lastname, card_number, employee_number } = req.body;
    const banker = Banker.create({
        username,
        email,
        password,
        firstname,
        lastname,
        card_number,
        employee_number,
    });

    banker.save()
        .then(savedBanker => res.status(200).json(savedBanker))
        .catch(error => res.send(error));
});

export default router;
