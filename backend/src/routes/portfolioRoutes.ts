import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolioController';

const router = Router();

// GET /api/portfolios - Get all portfolios
router.get('/', PortfolioController.getAllPortfolios);

// GET /api/portfolios/search?q=searchTerm - Search portfolios
router.get('/search', PortfolioController.searchPortfolios);

// GET /api/portfolios/categories - Get all categories
router.get('/categories', PortfolioController.getCategories);

// GET /api/portfolios/category/:category - Get portfolios by category
router.get('/category/:category', PortfolioController.getPortfoliosByCategory);

// GET /api/portfolios/:id - Get portfolio by ID
router.get('/:id', PortfolioController.getPortfolioById);

// POST /api/portfolios - Create new portfolio
router.post('/', PortfolioController.createPortfolio);

// PUT /api/portfolios/:id - Update portfolio
router.put('/:id', PortfolioController.updatePortfolio);

// DELETE /api/portfolios/:id - Delete portfolio
router.delete('/:id', PortfolioController.deletePortfolio);

export default router;
