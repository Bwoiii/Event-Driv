import React from 'react';



const Stock_List = ({ products }) => {
  return (
    <div>
      <br></br>
      <h5 className='text-muted'>Stock List</h5>
      <table class='table text-center container-fluid'>
        <thead class='thead-dark'>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>
        <br></br>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>
                {/* Display the image */}
                {product.image && (
                  <img
                    src={product.image} // Use the 'image' property directly
                    alt={product.name}
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <br></br>
      </table>
    </div>
    
  );
};

export default Stock_List;