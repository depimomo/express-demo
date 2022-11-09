const express = require('express');

//import custom routes
const colorRouter = require('./routes/colorRoutes');

const app = express();
const PORT = 3010;

app.get('/', (req, res) => {
  res.send('hello world!');
});

//use colorRouter instead of app directly
app.use('/colors', colorRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
