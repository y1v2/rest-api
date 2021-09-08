const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vaccine", { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if (err) {
        console.log("covid connection failed");
    } else {
        console.log("database connection successful!")
    }
})