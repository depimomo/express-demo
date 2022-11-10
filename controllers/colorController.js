const fs = require('fs');

const colorsFile = `${__dirname}/../data/colors.json`;

//sample database
const colors = JSON.parse(fs.readFileSync(colorsFile));

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

//create new color
//sample request:
// {
//   "name": "white",
//   "year": 2000,
//   "color": "#ffffff",
//   "pantone_value": "12345"
// },
const createColor = (req, res) => {
  //create new color with new id
  const newId = colors.length + 1;
  const newColor = Object.assign({ id: newId }, req.body);

  colors.push(newColor);

  //write new color to file
  fs.writeFile(colorsFile, JSON.stringify(colors), (err) => {
    if (err) {
      res.status(500).json({
        status: 'fail',
        data: {
          message: err.message,
        },
      });
    }

    //return the newly created color
    res.status(201).json({
      status: 'created',
      data: { color: newColor },
    });
  });
};

module.exports = { getAllColors, getColorById, createColor };
