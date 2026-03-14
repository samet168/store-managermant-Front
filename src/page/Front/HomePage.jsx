import React from 'react';
import '../../style/Front/HomePage.css';

const featuredProducts = [
  { name: 'Earbud Y168A', price: '$270.00 USD', img: '/images/earbud.png' },
  { name: 'Headphones Pro X168A', price: '$250.00 USD', img: '/images/headphones.png' },
  { name: 'Speaker P168A', price: '$240.00 USD', img: '/images/speaker.png' },
];

const categories = [
  { name: 'Speaker', img: '/images/speaker.png', link: '/category/speaker' },
  { name: 'Accessories', img: '/images/accessory.png', link: '/category/accessories' },
  { name: 'Wireless Charger', img: '/images/charger.png', link: '/category/wireless-charger' },
];

const benefits = [
  { title: 'Free Delivery', icon: '🚚', desc: 'Free shipping on orders over $100' },
  { title: 'Self Pickup', icon: '🏪', desc: 'Pickup from store at your convenience' },
  { title: 'Warranty', icon: '🛡️', desc: '1-year warranty for all products' },
];

const HomePage = () => {
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    alert(`Proceed to buy ${product.name}!`);
  };

  const handleViewDetail = (product) => {
    // Redirect to product detail page (replace spaces with dash)
    const slug = product.name.replace(/\s+/g, '-').toLowerCase();
    window.location.href = `/product/${slug}`;
  };

  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elevate Your Audio Journey</h1>
          <p>Discover the best audio devices with premium sound quality. Explore earbuds, headphones, speakers, and more.</p>
          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="learn-btn">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-audio.png" alt="Hero Audio" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <button className="see-all-btn">See All Products</button>
        </div>
        <div className="products-grid">
          {featuredProducts.map((prod, index) => (
            <div key={index} className="product-card">
              <img src={prod.img} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p className="price">{prod.price}</p>
              
              {/* Buttons shown on hover */}
              <div className="product-buttons">
                <button onClick={() => handleAddToCart(prod)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(prod)}>Buy Now</button>
                <button onClick={() => handleViewDetail(prod)}>View Details</button>
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
              <a href={cat.link} className="view-btn">View Accessories</a>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
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