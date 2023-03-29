const mongoose = require("mongoose");
const conectToDb = () => {
    mongoose.connect(process.env.DB_URI,

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    ).then(() => {
        console.log("Mongo db conectado com sucesso!");
    }).catch((err) => console.log(err));
};


module.exports = conectToDb;