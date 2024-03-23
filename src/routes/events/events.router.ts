import { Router } from "express";
import { createANewPlan, createNewEvent, editAnEvent, getAllEvents, getCurrentEvent, getPlans, markEventCompleted, registerAsASpeakerForEvent } from "./events.controller";
import sponsorsRouter from "../sponsors/sponsors.router";

const eventsRouter = Router()
eventsRouter.post('/new', createNewEvent)
eventsRouter.get('/all', getAllEvents)
eventsRouter.get('/current', getCurrentEvent)
eventsRouter.post('/:eventId/plans/new', createANewPlan)
eventsRouter.post('/:eventId/speakers/new', registerAsASpeakerForEvent)
eventsRouter.get('/:eventId/plans', getPlans)
eventsRouter.put('/:eventId/mark-as-completed', markEventCompleted)
eventsRouter.put('/:slugname', editAnEvent)

eventsRouter.use('/:eventId/sponsors', sponsorsRouter)


export default eventsRouter