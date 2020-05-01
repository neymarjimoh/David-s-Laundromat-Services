module.exports = {
    JWT_SECRET : process.env.JWT_SECRET,
    dbUrl: "mongodb+srv://" +process.env.MONGO_USER+ ":" +process.env.MONGO_PASS+ "@cluster0-ndzbs.mongodb.net/test?retryWrites=true&w=majority"
}