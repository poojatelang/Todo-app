const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const todoRouter = require('./router');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://todoapp:4YZQLMAD@cluster0.0xkevjd.mongodb.net/')
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.log(e));

const app = express();
app.use(cors());
app.use(express.json());

// Route all /api/todos requests to todoRouter
app.use('/api/todos', todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
