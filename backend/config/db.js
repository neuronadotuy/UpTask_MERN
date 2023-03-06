import mongoose from "mongoose";

const connectDB = async (req, res) => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const url = `${connection.connection.host}:${connection.connection.port}`;
		console.log(`MongoDB connected in: ${url}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

export default connectDB;