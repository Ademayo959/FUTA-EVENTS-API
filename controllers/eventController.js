const getEvents = (req, res) => {
    res.json({ "message": "getting all events"})
}

const createEvents = (req, res) => {
    res.json({"message": "creating an event"})
}

const updateEvents = (req, res) => {
    res.json({"message": "updating an event"})
}

const deleteEvents = (req, res) => {
    res.json({"message": "deleting an event"})
}


module.exports = { getEvents, createEvents, updateEvents, deleteEvents }