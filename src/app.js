import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {userRoutes} from './routes/userRoutes.js';
import { healthCheck } from './config/db.js';
import { productsRoutes } from './routes/productsRoutes.js';
import { ordersRoutes } from './routes/ordersRoutes.js';
import {orderItemsRoutes} from './routes/orderItemsRoutes.js';
import { fridgeRoutes } from './routes/fridgeRoutes.js';
import { alertRoutes } from './routes/alertRoutes.js';
import { viewRoutes } from './routes/viewRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';


dotenv.config();

export const app = express();

app.set("view engine", "ejs");
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/css', express.static('./css'));

app.get('/', (req,res) => {
    res.render('index', {
        title: 'FridgeTracker API',
        message: 'Welcome to the Fridge Tracker API',
        port: process.env.PORT || 4000,
        env: process.env.NODE_ENV || 'development'
    });
});
app.get('/health', async(req, res)=>{
    try{
        res.json({ok: await healthCheck()})
    }catch(e){
        res.status(500).json({ok: false})
    }
});
// View routes (frontend pages)
app.use('/', viewRoutes);

// API routes
app.use('/api/user',userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/orderItems', orderItemsRoutes);
app.use('/api/fridges', fridgeRoutes);
app.use('/api/alerts', alertRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

