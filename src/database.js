const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(db => console.log("Our DB is now connected"))
    .catch(err => console.error(err));