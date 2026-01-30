const express = require('express');
const path = require('path');

const app = express();
const PORT = 1337;
const ROOT = path.join(__dirname);

app.use(express.static(ROOT, { index: 'index.html' }));

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
