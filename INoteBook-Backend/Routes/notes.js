const express = require('express')
const router = express.Router();
const Notes = require("../Models/Notes");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1 : Fetch the Notes of user by token using Get request
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.findById( req.user.id)
        res.json(notes);    
    } catch (error) {
        console.error(error.message)
        res.status('500').send('Internal Server Error')
    }
})

// Route 2: Add Notes to Server
router.post('/addnotes', fetchuser, [
    body('title', 'Enter your title').notEmpty(),
    body('description', 'Enter your Description').notEmpty()
],
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savednotes = await note.save();
            res.send(savednotes)
        } catch (error) {
            console.error(error.message)
            res.status('500').send('Internal Server Error')
        }
    })
// Route 3 : update an existing Note  using put request
router.put('/updatenotes/:id', fetchuser,
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            // Create a new Note Object
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find the note to be update
            let note = await Notes.findById(req.params.id);
            if (!note) {
                res.status(404).send('Not Found')
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send('Not Allowed')
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            // new true ka mtlb h kuch nva content ata h to save hojega
            res.json(note)
        } catch (error) {
            console.error(error.message)
            res.status('500').send('Internal Server Error')
        }
    })

// Route 4 : Delete an existing Note  using Delete request
router.delete('/deletenotes/:id', fetchuser,
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        try {
            // Find the note to be delete
            let note = await Notes.findById(req.params.id);
            if (!note) {
                res.status(404).send('Not Found')
            }
            // Check the owner of the notes
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send('Not Allowed')
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Successfully": "Notes have been deleted", note: note });
        } catch (error) {
            console.error(error.message)
            res.status('500').send('Internal Server Error')
        }
    })
module.exports = router;