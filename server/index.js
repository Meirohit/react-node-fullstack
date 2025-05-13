import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { questionRoutes, answerRoutes } from './routes/index.js';
import {errorHandler} from './middleware/errorHandler.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/api/questions', questionRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
