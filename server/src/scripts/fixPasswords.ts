import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const run = async () => {
  await mongoose.connect('mongodb+srv://vashishtsandhu_db_user:TJ8jxQgCdpg9fWZ6@cluster0.ixwtbna.mongodb.net/ctu_competition_hub?retryWrites=true&w=majority');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('ctu@12345', salt);
  const result = await mongoose.connection.collection('users').updateMany({}, { $set: { password: hash } });
  console.log(`✅ Successfully updated ${result.modifiedCount} users to password 'ctu@12345'!`);
  await mongoose.disconnect();
  process.exit(0);
};

run();
