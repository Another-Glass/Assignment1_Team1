import express from "express";
import routes from '../global/routes';

import { postSignup, postSignin } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.signup, postSignup);
userRouter.post(routes.signin, postSignin);

export default userRouter;