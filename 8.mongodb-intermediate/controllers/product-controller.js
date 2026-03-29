const Product = require("../models/Product");

const getProductStats = async (req, res) => {
  try {
    //aggregate() মানে হলো: 
    //অনেকগুলো stages দিয়ে data process করা

    //MongoDB এর aggregate() হলো data processing pipeline system
    //যেটা দিয়ে তুমি filter, group, calculate, transform, sort — সব advanced query করতে পারো।
   
    //Raw Data → Match → Group → Final Result
    const result = await Product.aggregate([
      //stage 1
      //👉 এটা filter stage
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      //stage 2 : group documents
      //👉 একই category এর products গুলো group করছে
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
        //👉 শুধু Electronics category এর product গুলো filter করছে
      {
        $match: {
          category: "Electronics",
        },
      },
      //stage 2 : group documents
      {
        $group: {
          _id: null, //👉 সব products কে এক group এ নিয়ে আসছে
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        //stage 3 : project fields
        //👉 এটা একটা projection stage, যেখানে আমরা output কে customize করছি
        $project: {
          _id: 0, //👉 _id field টা output থেকে hide করছে
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      succes: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { insertSampleProducts, getProductStats, getProductAnalysis };