import { Router } from 'express';
import { v1Router } from './versions/v1/router';

const router = Router();

router.use('/v1', v1Router);

export { router };
