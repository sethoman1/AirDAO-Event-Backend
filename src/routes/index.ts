import { Router } from "express";

import authRouter from "./auth/auth.router";
import speakersRouter from "./speakers/speakers.router";
import eventsRouter from "./events/events.router";
import sponsorsRouter from "./sponsors/sponsors.router";
import benefitsRouter from "./benefits/benefits.router";

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/speakers', speakersRouter)
appRouter.use('/sponsors', sponsorsRouter)
appRouter.use('/events', eventsRouter)
appRouter.use('/benefits', benefitsRouter)

export default appRouter