const router = require('express').Router();
const adminRoutes = require('./admin');
const menuRoutes = require('./menu');

router.use('/admin', adminRoutes);
router.use("/menu",menuRoutes);

exports.ApiRoutes = (app)=>{
    app.use("/api",router);
}