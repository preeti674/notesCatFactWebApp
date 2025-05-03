const express = require('express');
const axios = require('axios');
const Note = require('../models/Notes');

const router = express.Router();


router.post('/', async(req, res)=>{
    try{
        const {title, content} = req.body;
        const catFactResponse = await axios.get('https://catfact.ninja/fact');
        console.log(catFactResponse);
        const catFact = catFactResponse.data.fact;

        const newNote = new Note({title, content, catFact})

        const savedNote= await newNote.save();
        res.status(201).json(savedNote)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

router.get('/', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  router.delete('/:id', async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.json({ message: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/search/:query', async (req, res) => {
    try {
      const query = req.params.query;
      const result = await Note.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { content: new RegExp(query, 'i') },
          { catfact: new RegExp(query, 'i') }
        ]
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;