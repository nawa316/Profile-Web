import { Router } from 'express';
import { ExperienceController } from '../controllers/experienceController';

const router = Router();

// GET /api/experiences - Get all experiences
router.get('/', ExperienceController.getAllExperiences);

// GET /api/experiences/current - Get current/ongoing experiences
router.get('/current', ExperienceController.getCurrentExperiences);

// GET /api/experiences/search?q=searchTerm - Search experiences
router.get('/search', ExperienceController.searchExperiences);

// GET /api/experiences/type/:type - Get experiences by type
router.get('/type/:type', ExperienceController.getExperiencesByType);

// GET /api/experiences/:id - Get experience by ID
router.get('/:id', ExperienceController.getExperienceById);

// POST /api/experiences - Create new experience
router.post('/', ExperienceController.createExperience);

// PUT /api/experiences/:id - Update experience
router.put('/:id', ExperienceController.updateExperience);

// DELETE /api/experiences/:id - Delete experience
router.delete('/:id', ExperienceController.deleteExperience);

export default router;
