import p1 from '../assets/products/p1.png';
import p2 from '../assets/products/p2.png';
import p3 from '../assets/products/p3.png';
import p4 from '../assets/products/p4.png';
import p5 from '../assets/products/p5.png';
import p6 from '../assets/products/p6.png';
import p7 from '../assets/products/p7.png';
import p8 from '../assets/products/p8.png';
import p9 from '../assets/products/p9.png';
import p10 from '../assets/products/p10.png';


export const initialProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro, 256G",
      price: 999.00,
      category: "Mobile",
      image: p1,
      description: "The latest iPhone with Titanium design and A17 Pro chip.",
      stock: 15
    },
    {
      id: 2,
      name: "MacBook Air M2, 13-inch",
      price: 1099.00,
      category: "Laptop",
      image: p2,
      description: "Strikingly thin and fast so you can work, play, or create anywhere.",
      stock: 8
    },
    {
      id: 3,
      name: "Apple Watch Series 9",
      price: 399.00,
      category: "Watch",
      image: p3,
      description: "Smarter, brighter, mightier. A magic way to use your watch.",
      stock: 0 // 🌟 设为 0 以测试 "Out of Stock" 标签
    },
    {
      id: 4,
      name: "AirPods Pro (2nd Gen)",
      price: 249.00,
      category: "Accessories",
      image: p4,
      description: "Up to 2x more Active Noise Cancellation for immersive sound.",
      stock: 25
    },
    {
      id: 5,
      name: "iPad Air M1, 64G",
      price: 599.00,
      category: "Tablet",
      image: p5,
      description: "Serious performance in a thin, light design.",
      stock: 12
    },
    {
      id: 6,
      name: "iMac 24-inch (M3 chip)",
      price: 1299.00,
      category: "Desktop",
      image: p6,
      description: "The world’s best all-in-one desktop, now supercharged by M3.",
      stock: 5
    },
    {
      id: 7,
      name: "Mac mini M4",
      price: 599.00,
      category: "Desktop",
      image: p7,
      description: "More muscle. More hustle. Mini does that.",
      stock: 20
    },
    {
      id: 8,
      name: "AirPods Max",
      price: 549.00,
      category: "Accessories",
      image: p8,
      description: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
      stock: 3
    },
    {
      id: 9,
      name: "iPhone 13, 128G",
      price: 599.00,
      category: "Mobile",
      image: p9,
      description: "A great choice for power and value.",
      stock: 0 
    },
    {
      id: 10,
      name: "iPad Pro 11-inch",
      price: 799.00,
      category: "Tablet",
      image: p10,
      description: "The ultimate iPad experience. Now with next-generation performance.",
      stock: 10
    }
  ];