import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { ProductList } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { useCart } from "../../hooks/useCart";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { cart, addProduct } = useCart();

  const array1 = [1, 2, 3, 4];
  const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
  // 1 + 2 + 3 + 4
  console.log(array1.reduce(reducer));

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   const newSumAmount = { ...sumAmount };
  //   newSumAmount[product.id] = product.amount;
  //   return newSumAmount;
  // }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>("products");

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);

      // await api.get<Product[]>("products")
      // .then((response) => {
      //   setProducts([...response.data.map((product) => ({
      //     ...product,
      //     priceFormatted: formatPrice(product.price)
      //   }))]);
      // });
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
    // TODO: alert! product was added?
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {/* {cartItemsAmount[product.id] || 0} */}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
