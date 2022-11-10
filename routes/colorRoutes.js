const express = require('express');

//import controller
const {
  getAllColors,
  getColorById,
  createColor,
} = require('../controllers/colorController');

const colorRouter = express.Router();

//change to route so later you can add more method (post, delete, patch, etc)
//because /colors already defined when using colorRouter, you can omit it
colorRouter.route('/').get(getAllColors).post(createColor);
colorRouter.route('/:id').get(getColorById);

module.exports = colorRouter;
