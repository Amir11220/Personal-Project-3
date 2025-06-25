import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';

const router = express.Router();

router.get('/transaction', (req: Request, res: Response) => {
    getRepository(Transaction)
        .find()
        .then(transactions => res.status(200).json(transactions))
        .catch(error => res.status(500).send(error));
});

router.post('/transaction', (req: Request, res: Response) => {
    const { type, amount } = req.body;
    const transactionRepo = getRepository(Transaction);
    const transaction = transactionRepo.create({ type, amount });
    transactionRepo.save(transaction)
        .then(saved => res.status(201).json(saved))
        .catch(error => res.status(500).send(error));
});

export default router;  
