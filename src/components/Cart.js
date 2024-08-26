import React, { useEffect, useState } from 'react';
import { List, Button, Typography } from 'antd';
import { supabase } from '../supabaseClient';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data, error } = await supabase
        .from('cart')
        .select('id, product_id, quantity, products(name, price)')
        .eq('quantity', 1);

      if (error) console.error('Error fetching cart items:', error);
      else {
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
        setTotalPrice(total);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.products.name}
              description={`$${item.products.price} x ${item.quantity}`}
            />
          </List.Item>
        )}
      />
      <Typography.Title level={4}>Total: ${totalPrice}</Typography.Title>
      <Button type="primary" style={{ marginTop: '16px' }}>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
