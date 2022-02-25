'use strict';

const db = require('../server/db');
const { Product } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const products = await Promise.all([
    Product.create({
      name: 'H.O.T Cocoa',
      description: 'Hot Oil Treatment designed for Hair and Beard.',
      price: 25.0,
      inventory: 100,
      category: 'Hair',
      imgUrl:
        'https://cdn.pixabay.com/photo/2018/07/16/05/42/skincare-3541261_960_720.png',
    }),
    Product.create({
      name: 'Moisturizer',
      description: 'Healing, all natural moisturizer for hands and body.',
      price: 25.0,
      inventory: 100,
      category: 'Skin',
      imgUrl:
        'https://cdn.pixabay.com/photo/2018/07/16/05/42/skincare-3541261_960_720.png',
    }),
    Product.create({
      name: 'Shampoo',
      description: 'Healing, all natural shampoo designed for all hair.',
      price: 25.0,
      inventory: 100,
      category: 'Hair',
      imgUrl:
        'https://cdn.pixabay.com/photo/2018/07/16/05/42/skincare-3541261_960_720.png',
    }),
  ]);

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
