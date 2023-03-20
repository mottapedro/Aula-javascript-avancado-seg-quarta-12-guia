const mongoose = require("mongoose");
const conectToDb = () => {
    mongoose.connect(`mongodb+srv://pedro_motta:pJVTegetGCZHj6aB@aula-node-exemplo-clust.wkgj8dp.mongodb.net/?retryWrites=true&w=majority`,

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    ).then(() => {
        console.log("Mongo db conectado com sucesso!");
    }).catch((err) => console.log(err));
};


module.exports = conectToDb;