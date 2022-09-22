import mongoose from "mongoose"
class DbInit {
    connectDb = (url: string) => {
        mongoose.connect(url)
            .then(() => {
                console.log('DB connected successfully');
            })
            .catch((err) => {
                console.log(`An error ocurred while trying connect to db, error: ${err}`);
            })
    }
}
export default new DbInit();