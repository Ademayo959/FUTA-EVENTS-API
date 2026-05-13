const express = require("express")
const { getEvents, getOneEvent, createEvents, updateEvents, deleteEvents } = require("../controllers/eventController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.route('/').get(getEvents).post(protect, createEvents)
router.route('/:id').put(protect, updateEvents).delete(protect, deleteEvents).get(getOneEvent)

module.exports = router 