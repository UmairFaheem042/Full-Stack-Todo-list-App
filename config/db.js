const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("DB Connection Error: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
