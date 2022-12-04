const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin');

//categories routes
router.post('/add-category',adminController.addCategorie);
router.get('/categories',adminController.getCategories);
router.get('/getCategorie/:categorieId',adminController.getCategorie);
router.put('/updateCategorie/:categorieId',adminController.updateCategorie);
router.delete('/deleteCategorie/:categorieId',adminController.deleteCategorie);
router.post('/insertCategories',adminController.insertCategories);
//items routes
router.post('/add-item',adminController.addItem);
router.get('/items',adminController.getItems);
router.get('/getItemById/:itemId',adminController.getItemById);
router.get('/getItemsByCategorie/:categorieId',adminController.getItemsByCategorie);
router.put('/updateItem/:itemId',adminController.updateItem);
router.delete('/deleteItem/:itemId',adminController.deleteItem);



module.exports=router;