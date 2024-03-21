import { Router } from "express";
import { createANewPlan, createNewEvent, editAnEvent, getAllEvents, getPlans, markEventCompleted } from "./events.controller";

const eventsRouter = Router()
eventsRouter.post('/new', createNewEvent)
eventsRouter.get('/all', getAllEvents)
eventsRouter.post('/:eventId/plans/new', createANewPlan)
eventsRouter.get('/:eventId/plans', getPlans)
eventsRouter.put('/:eventId/mark-as-completed', markEventCompleted)
eventsRouter.put('/:slugname', editAnEvent)


export default eventsRouter