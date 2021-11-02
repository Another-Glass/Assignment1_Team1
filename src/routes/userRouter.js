import express from "express";
import routes from '../global/routes';

import { postSignup, postSignin } from '../controllers/userController';

const userRouter = express.Router();

//유저생성
userRouter.post(routes.signup, postSignup);
//토큰생성
userRouter.post(routes.signin, postSignin);

export default userRouter;