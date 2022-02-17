import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://azizninja:aziz90aziz@nodejs.ngvkc.mongodb.net/memories?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database in connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;