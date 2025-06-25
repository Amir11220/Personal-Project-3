"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Customer_1 = require("../entities/Customer");
const router = express_1.default.Router();
router.get('/customers', async (_req, res) => {
    try {
        const custRep = (0, typeorm_1.getRepository)(Customer_1.Customer);
        const customers = await custRep.find({});
        return res.status(200).json(customers);
    }
    catch (error) {
        return res.send(error);
    }
});
router.post('/customer', async (req, res) => {
    try {
        const { username, email, password, firstname, lastname, card_number } = req.body;
        console.log(req.body);
        const customer = Customer_1.Customer.create({
            username,
            email,
            password,
            firstname,
            lastname,
            card_number,
        });
        await customer.save();
        return res.status(200).json(customer);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.default = router;
//# sourceMappingURL=Customer.js.map
