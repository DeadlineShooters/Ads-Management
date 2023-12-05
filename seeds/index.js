import express from "express";
import mongoose from "mongoose";


const mongoURI = "mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/Cluster0?retryWrites=true&w=majority";

try {
  await mongoose.connect(mongoURI);
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database", error);
}

const random = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64c98bc75b28f8482abd1ecd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi sint quis fugit vitae cum? Dolores, corporis illum recusandae voluptatibus debitis quam dolorem ipsum quibusdam aspernatur quos quae architecto consectetur laborum?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dk6q93ryt/image/upload/v1696220787/YelpCamp/vhsbin4mjudsoixg5mxm.jpg',
                  filename: 'YelpCamp/vhsbin4mjudsoixg5mxm',
                },
                {
                  url: 'https://res.cloudinary.com/dk6q93ryt/image/upload/v1696220787/YelpCamp/ajainuunzmdzucw6te12.png',
                  filename: 'YelpCamp/ajainuunzmdzucw6te12',
                }
            ]
        })
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
});