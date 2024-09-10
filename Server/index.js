import express, { urlencoded } from "express";
import connection from './DB/connectionDB.js';
import internRoute from './Routes/intern.route.js';
import cors from 'cors'

const port = 8080;
const app = express();

// Call the connection function
connection();  // This should trigger the connection logs

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/v1', internRoute);

app.listen(port, () => {
  console.log(`Server is connected to port ${port}`);
});
