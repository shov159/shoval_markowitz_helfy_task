import express from 'express';
import taskRoutes from './routes/taskRoutes';
import { addMiddlewares } from './middlewares/middleware';

const app = express();
const port = Number(process.env.PORT || 4000);

addMiddlewares(app);

app.get('/health', (_, res) => {
    res.status(200).send('alive');
});

app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
