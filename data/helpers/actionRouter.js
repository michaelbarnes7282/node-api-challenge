const express = require("express");

const act = require("./actionModel.js");

const router = express.Router();

router.get('/', (req, res) => {
    act.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error retrieving the projects."})
        })
})

router.get('/:id', validateActionID, (req, res) => {
    const id = req.params.id;
    act.get(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error retrieving the action." })
        })
});

router.put('/:id', validateActionID, validateAction, (req, res) => {
    const id = req.params.id;
    const updateAct = req.body;
    act.update(id, updateAct)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error updating the action." });
        })
});

router.delete('/:id', validateActionID, (req, res) => {
    const id = req.params.id;
    act.remove(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error deleting the project." });
        })
})

function validateActionID(req, res, next) {
    let id = req.params.id;
    act.get(id)
        .then(data => {
            if (!data) {
                res.status(400).json({ message: "Invalid action id." })
            }
            else {
                next();
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error" })
        })
}

function validateAction(req, res, next) {
    const newAct = req.body;
    if (Object.keys(newAct).length === 0) {
        res.status(400).json({ message: "Missing project data." });
    } else if (!newAct.description) {
        res.status(400).json({ message: "Missing Action description." });
    } else if (!newAct.notes) {
        res.status(400).json({ message: "Missing Action Notes." });
    } else { next(); }
}

module.exports = router;