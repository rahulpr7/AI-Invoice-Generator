import express from 'express';
import multer from 'multer';
import path from 'path';
import { clerkMiddleware } from '@clerk/express';
import { createBusinessProfile, getBusinessProfile, updateBusinessProfile } from '../controllers/BusinessProfileController.js';

const BusinessProfileRouter = express.Router();

BusinessProfileRouter.use(clerkMiddleware());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {   
    cb(null, path.join(process.cwd(), '/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// Routes for creating and updating business profiles with file uploads 
BusinessProfileRouter.post('/', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'stamp', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), createBusinessProfile);


BusinessProfileRouter.put('/:id', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'stamp', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), updateBusinessProfile);

BusinessProfileRouter.get('/me', getBusinessProfile);


export default BusinessProfileRouter;


