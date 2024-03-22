import { Router } from "express";
import { editASpeaker, getEditValidationToken, getASpeakerById, listAllPendingSpeakers, registerAsASpeaker, moderateSpeakerRequest } from "./speakers.controller";
import user from "../../middlewares/user.middleware";

const speakersRouter = Router()

speakersRouter.post('/register', registerAsASpeaker)
speakersRouter.get('/pending', user, listAllPendingSpeakers)
speakersRouter.get('/:id/get-validation-token', getEditValidationToken)
speakersRouter.put("/:id/details", editASpeaker)
speakersRouter.put("/:id/moderate", moderateSpeakerRequest)
speakersRouter.get('/:id', getASpeakerById)

export default speakersRouter