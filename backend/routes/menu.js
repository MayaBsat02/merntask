const router = require('express').Router();
const menuController = require('../controllers/menu');


router.get('/items', menuController.getItems);
router.get('/getItemsByCategory/:categorieId', menuController.getItemsByCategorie);
router.get('/categories', menuController.getCategories);
router.get('/getCategorie/:categorieId', menuController.getCategorie);
router.get('/getCategoriesItems', menuController.getCategoriesItems);

module.exports = router;