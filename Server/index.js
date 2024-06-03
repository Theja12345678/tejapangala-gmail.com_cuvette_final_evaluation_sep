const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const cookieParser=require("cookie-parser")


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const HOST= process.env.HOST||"localhost";
const PORT=process.env.PORT||3000;
mongoose.connect(process.env.MONGODB_URI)
.then(() =>console.log("Connected to DB"))
.catch(()=>console.log(" failed Connected to DB"))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/quiz', quizRoutes);

app.get('/',(req,res)=>{
  console.log("server call api call");
  res.json({
      service:"Api call", 
      active:true, 
      time:new Date})
})

app.listen(PORT,()=>{
  console.log(`server is up and running on port: http://${HOST}:${PORT}`);
})
