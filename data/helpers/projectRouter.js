const express = require('express');

const proj = require("./projectModel.js")
const act = require("./actionModel.js")

const router = express.Router();

router.get('/', (req, res) => {
    proj.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error retrieving the projects." });
        })
});

router.post('/',  validateProject, (req, res) => {
    const newProj = req.body;
    proj.insert(newProj)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error posting the project." });
        })
});

router.get('/:id', validateProjectID, (req, res) => {
    let id = req.params.id;
    proj.get(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error retrieving the project." });
        })
});

router.put('/:id', validateProjectID, validateProject, (req, res) => {
    let id = req.params.id;
    let updateProj = req.body;
    proj.update(id, updateProj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error updating the project." });
        })
});

router.delete('/:id', validateProjectID, (req, res) => {
    const id = req.params.id;
    proj.remove(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error deleting the project." });
        })
});

router.get('/:id/actions', validateProjectID, (req, res) => {
    const id = req.params.id;
    proj.getProjectActions(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error retrieving the actions." });
        })
});

router.post('/:id/actions', validateProjectID, validateAction, (req, res) => {
    const id = req.params.id;
    const newAct = req.body;
    newAct.project_id = id;

    act.insert(newAct)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error posting the action." });
        })
});


// middleware
function validateProjectID(req, res, next) {
    let id = req.params.id;
    proj.get(id)
        .then(data => {
            if (!data) {
                res.status(400).json({ message: "Invalid project id" });
            }
            else {
                req.project = data;
                next();
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error." });
        })
}


function validateProject(req, res, next) {
    const newProj = req.body;
    if (Object.keys(newProj).length === 0) {
        res.status(400).json({ message: "Missing project data." });
    } else if (!newProj.name) {
        res.status(400).json({ message: "Missing Project name." });
    } else if (!newProj.description) {
        res.status(400).json({ message: "Missing Project description." });
    } else { next(); }
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
