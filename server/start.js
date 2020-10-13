const app = require('./server');
const PORT = process.env.PORT || 3001;
const db = require('./db.js');

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`HEY WESAM!! Server is listening on port ${PORT}`);
  });
};

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await startListening();
}

bootApp();
