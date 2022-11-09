const express = require('express');
const fs = require('fs');

//sample database
const colors = JSON.parse(fs.readFileSync(`${__dirname}/data/colors.json`));

//refactor into separate function
const getAllColors = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: colors.length,
    data: { colors },
  });
};

const getColorById = (req, res) => {
  //convert id from string to int
  const id = req.params.id * 1;

  //if id invalid (this is an over simplistic solution)
  if (id > colors.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }

  //find color
  const color = colors.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    data: { color },
  });
};

const colorRouter = express.Router();

//change to route so later you can add more method (post, delete, patch, etc)
//because /colors already defined when using colorRouter, you can omit it
colorRouter.route('/').get(getAllColors);
colorRouter.route('/:id').get(getColorById);

module.exports = colorRouter;
