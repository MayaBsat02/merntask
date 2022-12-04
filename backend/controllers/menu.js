const Categorie = require("../models/category");
const Item = require("../models/item");

exports.getCategories = (req, res, next) => {
    Categorie.find()
      .then((categories) => {
        res
          .status(200)
          .json({ message: "Categories fetched", categories: categories });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.getItems = (req, res, next) => {
    //re order items by date
  Item.find()
  //.sort({createdAt: -1})
    .then((items) => {
        console.log("items are",items)
      res.status(200).json({items: items });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get items by category
exports.getItemsByCategorie =async (req, res, next) => {
  const categorieId = req.params.categorieId;
  await Categorie.findById(categorieId).populate("items")
    .then((categorie) => {
      if (!categorie) {
        const error = new Error("Could not find categorie");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Items fetched", items: categorie.items });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCategorie = (req, res, next) => {
    const categorieId = req.params.categorieId;
    Categorie.findById(categorieId).populate("items")
      .then((categorie) => {
        if (!categorie) {
          const error = new Error("Could not find categorie");
          error.statusCode = 404;
          throw error;
        }
        res
          .status(200)
          .json({ message: "Categorie fetched", categorie: categorie });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.getCategoriesItems=(req,res,next)=>{
  Categorie.find().populate("items")
  .then((categories) => {
    res
      .status(200)
      .json({categories: categories });
  }
  )
  .catch((err) => {
    console.log(err);
  }
  );
}