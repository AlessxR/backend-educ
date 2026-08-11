const express = require("express");

// call application
const app = express();

// default port for this server
const port = 3000;

// when we going to url '/', we got 'Hello World' in the page
app.get("/", (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send("OK!");
    } else {
        res.send("Hello World!");
    }
});

app.get("/users", (req, res) => {
    res.send("Hello users!");
});

app.post("/users", (req, res) => {
    res.send("We created the user!");
});

// when we started this app, we got this message in the console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
