import express, { urlencoded } from "express";
import connection from './DB/connectionDB.js';
import adminRoute from './Routes/admin.route.js';
import internRoute from './Routes/internRoutes.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url';
import cleanupTempFolder from "./Controllers/cleanTempFolder.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true  
}));



connection('test');  
cleanupTempFolder();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1', internRoute);
app.use('/api/v1', adminRoute);


app.use('/Documents', express.static(path.join(__dirname, 'Documents')));

app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});

app.use((req,res)=>{
  console.log("request received");
});