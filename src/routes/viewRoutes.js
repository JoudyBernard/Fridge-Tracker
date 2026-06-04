import {Router} from 'express';
import {ProductsRepository} from '../domain/repositories/ProductsRepository.js';
import {ProductsService} from '../services/ProductsService.js';
import {FridgeRepository} from '../domain/repositories/FridgeRepository.js';
import {FridgeService} from '../services/FridgeService.js';
import {AlertsRepository} from '../domain/repositories/AlertsRepository.js';
import {AlertsService} from '../services/AlertsService.js';
import {OrdersRepository} from '../domain/repositories/OrdersRepository.js';
import {OrdersService} from '../services/OrdersService.js';
import {UserRepository} from '../domain/repositories/UserRepository.js';
import {UserService} from '../services/UserService.js';

const productsRepo = new ProductsRepository();
const productsService = new ProductsService(productsRepo);
const fridgeRepo = new FridgeRepository();
const fridgeService = new FridgeService(fridgeRepo);
const alertsRepo = new AlertsRepository();
const alertsService = new AlertsService(alertsRepo);
const ordersRepo = new OrdersRepository();
const ordersService = new OrdersService(ordersRepo);
const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export const viewRoutes = Router();

// Auth routes
viewRoutes.get('/login', (req, res) => {
    res.render('auth/login', {title: 'Login - FridgeTracker'});
});

viewRoutes.get('/register', (req, res) => {
    res.render('auth/register', {title: 'Register - FridgeTracker'});
});

viewRoutes.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userService.authenticateUser(email, password);
        if (user) {
            // In a real app, you'd set a session here
            res.redirect('/dashboard');
        } else {
            res.render('auth/login', {title: 'Login - FridgeTracker', error: 'Invalid credentials'});
        }
    } catch (error) {
        res.render('auth/login', {title: 'Login - FridgeTracker', error: error.message});
    }
});

viewRoutes.post('/register', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.redirect('/login');
    } catch (error) {
        res.render('auth/register', {title: 'Register - FridgeTracker', error: error.message});
    }
});

viewRoutes.get('/logout', (req, res) => {
    // In a real app, you'd destroy the session here
    res.redirect('/');
});

// Dashboard
viewRoutes.get('/dashboard', (req, res) => {
    res.render('dashboard', {title: 'Dashboard - FridgeTracker'});
});

// Products routes
viewRoutes.get('/products', async (req, res) => {
    try {
        const fridgeDetails = await fridgeService.getFridgeWithDetails();
        const products = fridgeDetails || [];
        res.render('products/list', {title: 'Products - FridgeTracker', products});
    } catch (error) {
        res.render('products/list', {title: 'Products - FridgeTracker', products: [], error: error.message});
    }
});

viewRoutes.get('/products/new', (req, res) => {
    res.render('products/form', {title: 'New Product - FridgeTracker', product: null});
});

viewRoutes.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await productsService.getProduct(req.params.id);
        res.render('products/form', {title: 'Edit Product - FridgeTracker', product});
    } catch (error) {
        res.redirect('/products');
    }
});

viewRoutes.post('/products', async (req, res) => {
    try {
        if (req.query._method === 'PUT' && req.body.prod_id) {
            // Update existing product
            const product = await productsService.updateProduct(req.body.prod_id, req.body);
            res.redirect('/products');
        } else {
            // Create new product
            await productsService.createProduct(req.body);
            res.redirect('/products');
        }
    } catch (error) {
        res.render('products/form', {title: 'New Product - FridgeTracker', product: null, error: error.message});
    }
});

// Fridge routes
viewRoutes.get('/fridge', async (req, res) => {
    try {
        const fridgeDetails = await fridgeService.getFridgeWithDetails();
        const products = fridgeDetails || [];
        res.render('products/manage', {title: 'Fridge Management - FridgeTracker', products});
    } catch (error) {
        res.render('products/manage', {title: 'Fridge Management - FridgeTracker', products: [], error: error.message});
    }
});

viewRoutes.get('/fridges', async (req, res) => {
    try {
        const fridges = await fridgeService.listFridges();
        res.render('fridge/list', {title: 'Fridges - FridgeTracker', fridges});
    } catch (error) {
        res.render('fridge/list', {title: 'Fridges - FridgeTracker', fridges: [], error: error.message});
    }
});

viewRoutes.get('/fridges/new', (req, res) => {
    res.render('fridge/form', {title: 'New Fridge - FridgeTracker', fridge: null});
});

viewRoutes.get('/fridges/:id', async (req, res) => {
    try {
        const fridge = await fridgeService.getFridge(req.params.id);
        const fridgeDetails = await fridgeService.getFridgeWithDetails();
        const items = fridgeDetails ? fridgeDetails.filter(f => f.f_id == req.params.id) : [];
        res.render('fridge/manage', {title: 'Manage Fridge - FridgeTracker', fridge, items});
    } catch (error) {
        res.redirect('/fridges');
    }
});

viewRoutes.get('/fridges/:id/edit', async (req, res) => {
    try {
        const fridge = await fridgeService.getFridge(req.params.id);
        res.render('fridge/form', {title: 'Edit Fridge - FridgeTracker', fridge});
    } catch (error) {
        res.redirect('/fridges');
    }
});

viewRoutes.post('/fridges', async (req, res) => {
    try {
        if (req.query._method === 'PUT' && req.body.f_id) {
            // Update existing fridge
            await fridgeService.updateFridge(req.body.f_id, req.body);
            res.redirect('/fridges');
        } else {
            // Create new fridge
            await fridgeService.createFridge(req.body);
            res.redirect('/fridges');
        }
    } catch (error) {
        res.render('fridge/form', {title: 'New Fridge - FridgeTracker', fridge: null, error: error.message});
    }
});

viewRoutes.post('/fridges/:id', async (req, res) => {
    try {
        if (req.query._method === 'DELETE') {
            await fridgeService.deleteFridge(req.params.id);
        }
        res.redirect('/fridges');
    } catch (error) {
        res.redirect('/fridges');
    }
});

viewRoutes.post('/orders', async (req, res) => {
    try {
        // Create order and order item
        const order = await ordersService.createOrder({user_id: req.body.user_id});
        // Note: OrderItems creation would need to be handled separately
        res.redirect('/orders/history');
    } catch (error) {
        const products = await productsService.listProducts();
        res.render('orders/create', {title: 'Create Order - FridgeTracker', products, error: error.message});
    }
});

// Alerts routes
viewRoutes.get('/alerts', async (req, res) => {
    try {
        const alerts = await alertsService.listAlerts();
        res.render('alerts/list', {title: 'Alerts - FridgeTracker', alerts, errors: null});
    } catch (error) {
        res.render('alerts/list', {title: 'Alerts - FridgeTracker', alerts: [], errors: error.message});
    }
});

// Orders routes
viewRoutes.get('/orders/new', async (req, res) => {
    try {
        const products = await productsService.listProducts();
        res.render('orders/create', {title: 'Create Order - FridgeTracker', products});
    } catch (error) {
        res.render('orders/create', {title: 'Create Order - FridgeTracker', products: [], error: error.message});
    }
});

viewRoutes.get('/orders/history', async (req, res) => {
    try {
        const orders = await ordersService.getOrderWithDetails();
        res.render('orders/history', {title: 'Order History - FridgeTracker', orders: orders || []});
    } catch (error) {
        res.render('orders/history', {title: 'Order History - FridgeTracker', orders: [], error: error.message});
    }
});

