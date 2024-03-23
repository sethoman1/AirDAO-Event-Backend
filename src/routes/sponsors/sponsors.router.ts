import { Router } from "express";
import { registerAsASpeaker } from "../speakers/speakers.controller";
import { addSponsorshipProof } from "./sponsors.controller";

const sponsorsRouter = Router()
sponsorsRouter.get('/new', registerAsASpeaker)
sponsorsRouter.put(':/sponsorId/add-proof', addSponsorshipProof)

export default sponsorsRouter