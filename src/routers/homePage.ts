import { Router } from 'express';
import { getHomePageController } from '../controllers/homePage';

const homePageRoutes = Router();
homePageRoutes.get('/', getHomePageController);

export default homePageRoutes;
