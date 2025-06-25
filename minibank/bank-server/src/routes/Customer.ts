import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { Transaction, TransactionType } from '../entities/Transaction';

const router = Router();

router.get('/customers', (req: Request, res: Response) => {
    const customerRepo = getRepository(Customer);
    customerRepo
        .createQueryBuilder('customer')
        .select(['customer.id', 'customer.firstname', 'customer.lastname'])
        .leftJoinAndSelect('customer.transactions', 'transactions')
        .where('customer.balance >= :minBalance AND customer.balance >= :maxBalance', { minBalance: 2000, maxBalance: 150000 })
        .getMany()
        .then(customers => res.status(200).json(customers))
        .catch(error => res.status(500).send(error));
});

router.post('/customer', (req: Request, res: Response) => {
    const { username, email, password, firstname, lastname, card_number } = req.body;
    const custRep = getRepository(Customer);
    const customer = custRep.create({
        username,
        email,
        password,
        firstname,
        lastname,
        card_number,
    });

    custRep.save(customer)
        .then(savedCustomer => res.status(201).json(savedCustomer))
        .catch(error => res.status(500).send(error));
});

router.post('/customer/:customerId/transaction', (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { type, amount } = req.body;

    const customerRepo = getRepository(Customer);
    const transactionRepo = getRepository(Transaction);

    customerRepo.findOne({ where: { id: Number(customerId) } })
        .then(customer => {
            if (!customer) {
                res.status(404).json({ msg: 'customer not found...' });
                return Promise.reject(); // Stop the chain
            }
            const transaction = transactionRepo.create({
                type,
                amount,
                Customer: customer,
            });
            return transactionRepo.save(transaction);
        })
        .then(savedTransaction => {
            if (savedTransaction) {
                res.status(201).json(savedTransaction);
            }
        })
        .catch(error => {
            if (error) res.status(500).send(error);
        });
});

export default router;
