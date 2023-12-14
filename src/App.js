import React, { useEffect, useState } from 'react';
import Product_Form from './components/Product_Form';
import Product_List from './components/Product_List';
import Category_Form from './components/Category_Form';
import Stock_Form from './components/Stock_Form';
import Stock_List from './components/Stock_List';
import TransactionManagement from './components/TransactionManagement';
import TransactionReport from './components/TransactionReport';
import Category_List from './components/Category_List';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import Chart from 'chart.js/auto';

const App = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [categories, setCategories] = useState(['Smartphones', 'Laptops', 'Computers', 'Wearables']);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showTransactionReport, setShowTransactionReport] = useState(false);

  const handlePaymentCompleted = (completedTransactions) => {
    setTransactions([...transactions, ...completedTransactions]);
    setShowTransactionReport(true);
  };

  useEffect(() => {
    if (showTransactionReport) {
      setActiveTab('reports');
    }
  }, [showTransactionReport]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const add_product = (product) => {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 'GZMGTZ-1000';
    const lastProductIdNumber = parseInt(lastProductId.match(/\d+/)[0]);
    const newProductId = `GZMGTZ-${lastProductIdNumber + 1}`;
    setProducts([...products, { ...product, id: newProductId }]);
  };

  const edit_product = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const delete_product = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    const updatedProductsIds = updatedProducts.map((product, index) => {
      return { ...product, id: `GZMGTZ-${index + 1001}` };
    });
    setProducts(updatedProductsIds);
  };

  const add_category = (category) => {
    setCategories([...categories, category]);
  };

  const delete_category = (category) => {
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
  };

  const update_category = (oldCategory, newCategory) => {
    const updatedCategories = categories.map((category) =>
      category === oldCategory ? newCategory : category
    );
    setCategories(updatedCategories);
  };

  const update_stock = (productId, newStock) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
      const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, stock: product.stock - 1 } : product
      );
      setProducts(updatedProducts);
    }
  };
  
  
  return (
    <div>
 <Navbar expand="lg" className="custom-navbar sticky-top">
        <Navbar.Brand href="#">Group 1</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setActiveTab('products')}>
              <i className="fas fa-tags"></i> Products
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab('stocks')}>
              <i className="fas fa-chart-bar"></i> Stocks
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab('transaction')}>
              <i className="fas fa-wallet"></i> Transaction
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab('reports')}>
              <i className="fas fa-chart-line"></i> Reports
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        {activeTab === 'products' && (
          <div>
            <h4>Product Management</h4>
            <Category_List
              categories={categories}
              onDelete={delete_category}
              onUpdate={update_category}
            />
             <Category_Form onSubmit={add_category} />
            &nbsp;  &nbsp;
             <Product_Form onSubmit={add_product} categories={categories} />
            
            <Product_List
              products={products}
              categories={categories}
              onUpdate={edit_product}
              onDelete={delete_product}
            />
          </div>
        )}

        {activeTab === 'stocks' && (
          <div>
            <h4>Stocks Management</h4>
            <Stock_Form products={products} onUpdateStock={update_stock} />
            <Stock_List products={products} />
          </div>
        )}

        {activeTab === 'transaction' && (
          <div>
            <h4>Transaction Management</h4>
            <TransactionManagement
              products={products}
              setProducts={setProducts}
              handleAddToCart={handleAddToCart}
              transactions={transactions}
              setTransactions={setTransactions}
              onPaymentCompleted={handlePaymentCompleted}
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h4>Transaction Report</h4>
            <TransactionReport transactions={transactions} products={products} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;