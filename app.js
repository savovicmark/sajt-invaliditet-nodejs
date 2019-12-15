
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
//=======================================routers==================================
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoutes');
const commentRouter = require('./routes/commentsRoutes');
const imageRouter = require('./routes/imageRoutes');
//=============================CORS===================================================
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
//=================================================================================


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//==========================ROUTES================================================
//app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/image', imageRouter);

module.exports = app;
