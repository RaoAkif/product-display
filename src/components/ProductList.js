import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { supabase } from '../supabaseClient';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const { error } = await supabase.from('cart').insert([{ product_id: product.id, quantity: 1 }]);
    if (error) console.error('Error adding to cart:', error);
    else alert('Product added to cart!');
  };

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} span={8}>
          <Card
            cover={<img alt={product.name} src={product.image_url} />}
            actions={[
              <Button type="primary" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>,
            ]}
          >
            <Card.Meta title={product.name} description={`$${product.price}`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
