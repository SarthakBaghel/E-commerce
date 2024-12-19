const mongoose = require('mongoose')

const Product = require('./models/product');



const products = [
    {
        name:"Iphone 14 pro",
        img:"https://images.unsplash.com/photo-1663408466313-2d4e7edaf172?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZSUyMDE0JTIwcHJvfGVufDB8fDB8fHww",
        price:130000,
        desc:"newest iphone we have ever made with 120hz display and stunning cameras and long lasting batteries"
    },
    {
        name:"Macbook air M1",
        img:"https://images.unsplash.com/photo-1657770295015-79b98a3e37ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hY2Jvb2slMjBhaXIlMjBtMXxlbnwwfHwwfHx8MA%3D%3D",
        price:100000,
        desc:"long lasting battery powerful performace slim design"
    },
    {
        name:"iPad Pro",
        img:"https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price:129000,
        desc:"iPad Pro is the ultimate iPad experience in an impossibly thin and light design. Featuring the breakthrough Ultra Retina XDR display, outrageous performance from the M4 chip, superfast wireless connectivity and compatibility with Apple Pencil Pro. Plus powerful productivity features in iPadOS."
    },
    {
        name:"Apple Watch Series 10",
        img:"https://images.unsplash.com/photo-1579811216948-6f57c19376a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        price:53000,
        desc:"Bigger display with up to 30% more screen area. A thinner, lighter and more comfortable design."
    },
    {
        name:"Apple AirPods 4",
        img:"https://images.unsplash.com/photo-1588940086836-36c7d89611a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBhaXJwb2RzfGVufDB8fDB8fHww",
        price:20000,
        desc:"Apple-designed dynamic driver provides high-fidelity audio. Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences."
    },
]

async function seedDB(){
    await Product.insertMany(products)
    console.log("data seeded successfully");
}


module.exports = seedDB
