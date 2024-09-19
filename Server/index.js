import express, { urlencoded } from "express";
import connection from './DB/connectionDB.js';
import adminRoute from './Routes/admin.route.js';
import internRoute from './Routes/internRoutes.js'
import downloadDocuments from './Routes/download.route.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url';
import cleanupTempFolder from "./Controllers/cleanTempFolder.js";
import certificateRoute from './Routes/certificate.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: process.env.FRONTEND_URL || 'https://www.docqinternportal.live',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   credentials: true  
}));

connection();  
//cleanupTempFolder();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1', internRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', downloadDocuments);
app.use('/api/v1', certificateRoute);


app.use('/Documents', express.static(path.join(__dirname, 'Documents')));

app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});

app.use((req,res)=>{
  console.log("request received");
});

export default app;


