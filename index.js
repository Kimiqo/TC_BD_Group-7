import express from "express";
import pollsRoutes from "./src/routes/polls.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/polls', pollsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/', (req, res) => {
    res.send("Welcome to the Poll API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
