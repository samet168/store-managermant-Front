import React from 'react';
import '../../style/Front/HomePage.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

// const categories = [
//   { name: 'Speaker', img: '/images/speaker.png', link: '/category/speaker' },
//   { name: 'Accessories', img: '/images/accessory.png', link: '/category/accessories' },
//   { name: 'Wireless Charger', img: '/images/charger.png', link: '/category/wireless-charger' },
// ];


const benefits = [
  { title: 'Free Delivery', icon: '🚚', desc: 'Free shipping on orders over $100' },
  { title: 'Self Pickup', icon: '🏪', desc: 'Pickup from store at your convenience' },
  { title: 'Warranty', icon: '🛡️', desc: '1-year warranty for all products' },
];

const HomePage = () => {

  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);


const [products, setProducts] = React.useState([]);

React.useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');

      setProducts(response.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);

  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    alert(`Proceed to buy ${product.name}!`);
  };

const handleViewDetail = (product) => {
  navigate(`/product/${product.id}`);
};

  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elevate Your Audio Journey</h1>
          <p>
            Discover the best audio devices with premium sound quality.
            Explore earbuds, headphones, speakers, and more.
          </p>
          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="learn-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="https://i.pinimg.com/1200x/19/28/7c/19287c8799f8c0ce38103cfe7a240bea.jpg" alt="Hero Audio" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <button className="see-all-btn">See All Products</button>
        </div>

        <div className="products-grid">
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className="product-card">

              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p className="price">${product.price}</p>

              <div className="product-buttons">
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>

                <button onClick={() => handleBuyNow(product)}>
                  Buy Now
                </button>

                <button onClick={() => handleViewDetail(product)}>
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Shop By Category */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
              <a href={cat.link} className="view-btn">
                View Accessories
              </a>
            </div>
          ))}
        </div>

      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="benefits-grid">
          {benefits.map((b, index) => (
            <div key={index} className="benefit-card">
              <div className="icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;