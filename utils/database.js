import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected!');
  }

  try {
    mongoose.connect(process.env.MONGOOSE_URI, {
      dbName: 'share_prompt',
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB Connected!');
  } catch (error) {
    console.log(error);
  }
};
