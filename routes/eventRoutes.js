const express = require("express")
const { getEvents, createEvents, updateEvents, deleteEvents } = require("../controllers/eventController") 

const router = express.Router()

router.route('/').get(getEvents).post(createEvents)
router.route('/:id').put(updateEvents).delete(deleteEvents)

module.exports = router 