import express, { urlencoded } from "express";
import connection from './DB/connectionDB.js';
import internRoute from './Routes/intern.route.js';
import adminRoute from './Routes/admin.route.js';
import cors from 'cors';
import cookieParser from "cookie-parser";


const port = 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true  
}));


// Call the connection function
connection();  // This should trigger the connection logs

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1', internRoute);
app.use('/api/v1', adminRoute);

app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});