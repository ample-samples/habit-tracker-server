import express from 'express'
import 'dotenv/config'
const app = express();

import cors from 'cors'
import morgan from 'morgan'

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tell express to use your routers here

// '/habits' endpoint
import habitsRouter from './routers/habits.js'
app.use('/habits', habitsRouter);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: {
      resource: 'Sorry, your resource was not found'
    }
  })
})

export default app
