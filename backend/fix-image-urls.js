// One-time script: DB mein "http://localhost:4000/images/..." ko "/images/..." bana deta hai
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const col = mongoose.connection.collection("products");
    const res = await col.updateMany(
      { image: { $regex: "^http://localhost:4000" } },
      [
        {
          $set: {
            image: {
              $replaceOne: { input: "$image", find: "http://localhost:4000", replacement: "" },
            },
          },
        },
      ]
    );
    console.log("Updated products:", res.modifiedCount);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
