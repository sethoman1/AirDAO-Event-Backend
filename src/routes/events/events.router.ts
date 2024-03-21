import { Router } from "express";
import { createNewEvent, editAnEvent, getAllEvents } from "./events.controller";

const eventsRouter = Router()
eventsRouter.post('/new', createNewEvent)
eventsRouter.get('/all', getAllEvents)
eventsRouter.put('/:slugname', editAnEvent)



export default eventsRouter