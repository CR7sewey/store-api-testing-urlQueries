const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // GAMBIARRA - alterar dps!!!
  //console.log(queriesPoss);
  const { name, featured, rating, company, sort, fields, numericFilters } =
    req.query;
  let queryObj = {};
  if (name) {
    queryObj.name = { $regex: name, $options: "i" }; //regex
  }
  if (featured) {
    queryObj.featured = featured;
  }
  if (rating) {
    queryObj.rating = rating;
  }
  if (company) {
    queryObj.company = company;
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    //const listNumericFilters = numericFilters.split(",");
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((value) => {
      const new_value = value.split("-");
      if (options.includes(new_value[0])) {
        queryObj[new_value[0]] = { [new_value[1]]: Number(new_value[2]) };
      }
    });

    console.log(filters);
  }

  console.log(queryObj);
  let result = Product.find(queryObj);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort({ rating: -1, price: -1 });
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  const nbHits = products.length;
  //order: [["rating", "DESC"]],
  res.status(200).json({ products, nbHits });
  //} catch (e) {
  //  return res.status(500).json({ msg: e });
  ////}
};

const getAllProductsStatic = async (req, res) => {
  const { name } = req.query;
  const products = await Product.find({
    price: { $gt: 30 }, // gt - greater than, lt - lesser than
  }).sort({ price: 1 });
  const nbHits = products.length;
  //order: [["rating", "DESC"]],
  res.status(200).json({ products, nbHits });
  //} catch (e) {
  // return res.status(500).json({ msg: e });
  //}
};

module.exports = { getAllProducts, getAllProductsStatic };
