const Event = require("../models/eventModel")

async function getEvents(req, res) {
    try {
        const events = await Event.find();
        res.json(events)
    } catch (err) {
        console.log("Error detected", err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function getOneEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event)
    } catch (err) {
        console.log("Error detected", err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function createEvents(req, res) {
    try {
        //getting the fields
        const { title, description, date, location, host, phoneNumber, guests, registrationLink } = req.body
        //getting the user id 
        const userId = req.user.id
        //creating a new event
        const newEvent = new Event({
            title: title,
            description: description,
            date: date,
            location: location,
            host: host,
            phoneNumber: phoneNumber,
            guests: guests,
            createdBy: userId,
            registrationLink: registrationLink
        })
        //save it to the db
        const savedEvent = await newEvent.save();
        res.json(savedEvent)
    } catch (err) {
        console.log("Error detected:", err)
        res.status(500).json({ message: "Something went wrong" })
    }


}

async function updateEvents(req, res) {
    try {
        const exactEvent = await Event.findById(req.params.id)
        //Check if user already exists with that email
        if (!exactEvent) {
            res.json({ message: "Event doesn't exists" })
            return;
        }
        //check if the user actually created the event
        if (exactEvent.createdBy == req.user.id) {
            const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json({ message: "Event updated", updatedEvent })
        } else {
            res.json({ "message": "You didn't create this events 🙂"})
        }
    } catch (err) {
        console.log("Error detected", err)
        res.status(500).json({ message: "Something went wrong" })
    }
}


async function deleteEvents(req, res) {
    try {
        const exactEvent = await Event.findById(req.params.id)
        //Check if user already exists with that email
        if (!exactEvent) {
            res.json({ message: "Event doesn't exists" })
            return;
        }
        //check if the user actually created the event
        if (exactEvent.createdBy == req.user.id) {
            const deletedEvent = await Event.findByIdAndDelete(req.params.id)
            res.json({ message: "Event deleted", deletedEvent })
        } else {
            res.json({ "message": "You didn't create this events 🙂"})
        }
    } catch (err) {
        console.log("Error detected", err)
        res.status(500).json({ message: "Something went wrong" })
    }
}


module.exports = { getEvents, getOneEvent, createEvents, updateEvents, deleteEvents }