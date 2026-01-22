import express from 'express';
import { createInvoice, deleteInvoice, updateInvoice, getInvoices, getInvoiceById } from '../controllers/InvoiceController.js';
import { clerkMiddleware} from '@clerk/express';

const InvoiceRouter = express.Router();

InvoiceRouter.use(clerkMiddleware());


InvoiceRouter.get('/', getInvoices);
InvoiceRouter.get('/:id', getInvoiceById);
InvoiceRouter.post('/', createInvoice);
InvoiceRouter.put('/:id', updateInvoice);
InvoiceRouter.delete('/:id', deleteInvoice);

export default InvoiceRouter;
