import express, { urlencoded } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './DB/connectionDB.js';
import internRoute from './Routes/internRoutes.js';
import cors from 'cors'
import cleanupTempFolder from "./Controllers/cleanTempFolder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8080;
const app = express();

// Call the connection function
connection('test');  // This should trigger the connection logs

cleanupTempFolder();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/v1', internRoute);

app.use('/Documents', express.static(path.join(__dirname, 'Documents')));

app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});

app.use((req,res)=>{
  console.log("request received");
});
