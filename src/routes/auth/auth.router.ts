import { Router } from "express";
import { createAdmin, loginAdmin, resetPassword, setPassword } from "./auth.controller";

const authRouter = Router()

authRouter.post('/admin/login', loginAdmin)
authRouter.get('/admin/create', createAdmin)
authRouter.post('/admin/reset-password', resetPassword)
authRouter.put('/admin/set-password', setPassword)

export default authRouter