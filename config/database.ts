import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Database connect successfuly");
  } catch (error) {
    console.log("Database connnect faild");
    console.log(error);
  }
};

export default connect;
