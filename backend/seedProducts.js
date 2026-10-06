require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    id: Number,
    name: String,
    image: String,
    category: String,
    description: String,
    new_price: Number,
    old_price: Number,
    available: Boolean
});

const products = [];

for (let i = 1; i <= 36; i++) {

    let category;

    if (i <= 12) {
        category = "women";
    } else if (i <= 24) {
        category = "men";
    } else {
        category = "kid";
    }

    products.push({
        id: i,

        name:
            category === "women"
                ? "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse"
                : category === "men"
                ? "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket"
                : "Boys Orange Colourblocked Hooded Sweatshirt",

        image: `/images/product_${i}.png`,

        category: category,

        description: "Premium quality clothing product",

        new_price: 85,

        old_price: 120,

        available: true
    });
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("✅ MongoDB Connected");

        let added = 0;
        let skipped = 0;

        for (const product of products) {

            const exists = await Product.findOne({ id: product.id });

            if (!exists) {

                await Product.create(product);

                console.log(`✅ Added Product ${product.id}`);

                added++;

            } else {

                console.log(`⏩ Product ${product.id} already exists`);

                skipped++;
            }
        }

        const total = await Product.countDocuments();

        console.log("\n==============================");
        console.log(`Added   : ${added}`);
        console.log(`Skipped : ${skipped}`);
        console.log(`Total Products in DB : ${total}`);
        console.log("==============================");

        process.exit(0);

    })
    .catch((err) => {
        console.error("❌ Error:", err);
        process.exit(1);
    });