const express = require('express');

//import custom routes
const colorRouter = require('./routes/colorRoutes');

const app = express();

//add middleware so we can read data from req body
app.use(express.json());

const PORT = 3010;

app.get('/', (req, res) => {
  res.send('hello world!');
});

//use colorRouter instead of app directly
app.use('/colors', colorRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
