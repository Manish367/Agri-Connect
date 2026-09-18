// One-off migration: copies every collection from the local MongoDB instance
// into the Atlas cluster, preserving _id values and references exactly.
// Run with: node scripts/migrateToAtlas.js
const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://127.0.0.1:27017/agriconnect';
const ATLAS_URI =
  'mongodb+srv://manishdas360_db_user:WTbW7VO8uLKbCgtD@cluster0.qcgdb25.mongodb.net/agriconnect?appName=Cluster0';

async function migrate() {
  console.log('Connecting to local MongoDB...');
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log('Connecting to Atlas...');
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();

  const collections = await localConn.db.listCollections().toArray();

  for (const { name } of collections) {
    const docs = await localConn.db.collection(name).find({}).toArray();
    if (docs.length === 0) {
      console.log(`${name}: 0 documents, skipping`);
      continue;
    }
    await atlasConn.db.collection(name).deleteMany({});
    await atlasConn.db.collection(name).insertMany(docs, { ordered: false });
    console.log(`${name}: migrated ${docs.length} document(s)`);
  }

  await localConn.close();
  await atlasConn.close();
  console.log('Migration complete.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
