// src/server.ts
import app from './app';
const PORT = 3200;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
