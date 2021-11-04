import express from "express";
import routes from '../globals/routes.js';

import { postSignup, postSignin } from '../controllers/userController.js';

const userRouter = express.Router();

//유저생성
userRouter.post(routes.signup, postSignup);
//토큰생성
userRouter.post(routes.signin, postSignin);

export default userRouter;