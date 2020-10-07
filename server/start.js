const app = require('./server');
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`HEY WESAM!! Server is listening on port ${port}`);
});
