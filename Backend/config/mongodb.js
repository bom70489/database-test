import mongoose from 'mongoose'

const mongodb = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("CB Connected");
        });
        mongoose.connection.on('error', (err) => {
            console.log(`Database error : ${err}`);
        });

    } catch (error) {
        console.log("Error" ,error);
    }

    await mongoose.connect(`${process.env.MONGODB_URL}/test`)
}

export default mongodb