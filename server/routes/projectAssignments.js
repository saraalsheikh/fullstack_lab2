const express = require('express');
const router = express.Router();
const ProjectAssignment = require('../models/ProjectAssignment.js');

router.post('/', async (req, res) => {
    try {
        const { employee_id, project_code, start_date } = req.body;
        const assignment = new ProjectAssignment({
            employee_id,
            project_code,
            start_date: new Date(start_date),
        });
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
            .populate('employee_id')
            .populate('project_code')
            .sort({ _id: -1 }) // HÄR: Senaste tillagda i databasen
            .limit(5);         // BARA 5 senaste
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
