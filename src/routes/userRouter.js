import express from "express";
import routes from '../global/routes';

import {postSignup} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.signup, postSignup);

export default userRouter;