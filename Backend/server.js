import Express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import connectDB from './config/db.js';
import path from 'path';
import InvoiceRouter from './routes/InvoiceRouter.js';
import BusinessProfileRouter from './routes/BusinessProfileRouter.js';



// Connect to the database (await so server doesn't start on DB failure)
try {
  await connectDB();
} catch (err) {
  console.error("Fatal: could not connect to DB. Exiting.", err);
  // exit with failure so process managers know startup failed
  process.exit(1);
}

const app = Express();
const PORT = 4000;

/*-----Middleware-----*/
app.use(clerkMiddleware())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(Express.json({limit: '20mb'}));
app.use(Express.urlencoded({limit: '20mb', extended: true }));


/* ------ Routes------*/
app.use('/uploads', Express.static(path.join(process.cwd(), '/uploads')));
app.use('/api/ai-invoice', (await import('./routes/aiInvoiceRouter.js')).default);

// Alias routes to match frontend expectations (some frontend code uses singular or camelCase paths)
app.use('/api/invoice', InvoiceRouter);
app.use('/api/businessProfile', BusinessProfileRouter);



app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});