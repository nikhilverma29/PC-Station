import express from 'express';
import {
  getBuilds,
  createBuild,
  updateBuild,
  deleteBuild,
} from '../controllers/builds.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// All build routes require authentication
router.use(verifyToken);

router.get('/', getBuilds);
router.post('/', createBuild);
router.put('/:id', updateBuild);
router.delete('/:id', deleteBuild);

export default router;
