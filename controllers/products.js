const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({ msg: "Some data" });
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
};

const getAllProductsStatic = async (req, res) => {
  try {
    res.status(200).json({ msg: "Some static data" });
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
};

module.exports = { getAllProducts, getAllProductsStatic };
