const express = require('express');
const app = express();
const path = require('path');
const estudanteRoutes = require('./routes/estudante.routes');


app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'views')))
app.get('/', (res, req) => {
  req.render('index')
})
app.use('/api', estudanteRoutes);

const PORT = process.env.PORT || 333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});