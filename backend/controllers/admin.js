const Categorie = require("../models/category");
const Item = require("../models/item");

exports.insertCategories = async (req, res, next) => {
  console.log(req.body);
  const { data } = req.body;
  try {
    const categories = await Categorie.insertMany(data);
    if (categories.length > 0) {
      return res.status(200).json({ message: "Data Inserted", categories });
    }
    return res.status(400).json({ message: "Data not Inserted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Data not Inserted" });
  }
};

exports.addCategorie = (req, res, next) => {
  const title = req.body.title;
  const icon = req.body.icon;
  const categorie = new Categorie({
    title: title,
    icon: icon,
  });
  categorie
    .save()
    .then((result) => {
      res.status(201).json({ message: "Categorie added", categorie: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

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

exports.updateCategorie = (req, res, next) => {
  const categorieId = req.params.categorieId;
  const title = req.body.title;
  const icon = req.body.icon;
  Categorie.findById(categorieId)
    .then((categorie) => {
      if (!categorie) {
        const error = new Error("Could not find categorie");
        error.statusCode = 404;
        throw error;
      }
      categorie.title = title;
      categorie.icon = icon;
      return categorie.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Categorie updated", categorie: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteCategorie = (req, res, next) => {
  const categorieId = req.params.categorieId;
  Categorie.findById(categorieId)
    .then((categorie) => {
      if (!categorie) {
        const error = new Error("Could not find categorie");
        error.statusCode = 404;
        throw error;
      }
      return Categorie.findByIdAndDelete(categorieId);
    })
    .then((result) => {
      res.status(200).json({ message: "Categorie deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Item Queries

exports.addItem = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const category = req.body.category;
  Categorie.findById(category)
    .then((categorie) => {
      if (!categorie) {
        const error = new Error("Could not find categorie");
        error.statusCode = 404;
        throw error;
      }
      const item = new Item({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        categorie: categorie,
      });
      categorie.items.push(item);
      return item.save(), categorie.save();
    })
    // .then((result) => {
    //   return Categorie.findById(categorieId);
    // })
    // .then((categorie) => {
    //   categorie.items.push(item);
    //   return categorie.save();
    // })
    .then((result) => {
      res.setHeaders("Access-Control-Allow-Origin", "*");
      res.setHeaders("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeaders("Access-Control-Allow-Headers", "Content-Type, Authorization,Accept,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers");
      res.status(201).json({ message: "Item added", item: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getItems = (req, res, next) => {
  //re order items by date
  Item.find().populate("category")
    .sort({ createdAt: -1 })
    .then((items) => {
      console.log(items);
      res.status(200).json({ message: "Items fetched", items: items });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get items by category
exports.getItemsByCategorie = (req, res, next) => {
  const categorieId = req.params.categorieId;
  Categorie.findById(categorieId)
    .populate("items")
    .then((categorie) => {
      if (!categorie) {
        const error = new Error("Could not find categorie");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Items fetched", items: categorie.items });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getItemById = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        const error = new Error("Could not find item");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ item: item });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateItem = (req, res, next) => {
  const itemId = req.params.itemId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const category = req.body.category;
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        const error = new Error("Could not find item");
        error.statusCode = 404;
        throw error;
      }
      item.title = title;
      item.price = price;
      item.description = description;
      item.imageUrl = imageUrl;
      item.category = category;
      return item.save();
    })
    .then((result) => {
      res.status(200).json({ item: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findByIdAndDelete(itemId)

    .then((result) => {
      res.header("Access-Control-Allow-Origin", "*");

      res.status(200).json({ message: "Item deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
