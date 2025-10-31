import express from 'express'
import cors from 'cors'
import connectDb from './src/config/db.js';
import userRouter from './src/routes/userRoutes.js';
import resultRouter from './src/routes/resultRoutes.js';



const app = express();


//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//db
connectDb();

//routes

app.use('/api/auth', userRouter);
app.use('/api/results',resultRouter);



app.get('/',(req,res)=>{
    res.send('api working')
});

app.listen(4000,()=>{
        console.log("server is running on port 4000")
})