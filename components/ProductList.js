import React from 'react';
import Product from "./Product";

const ProductList = ({products}) => {
    return (
        <div className='products-container'>
            {products?.map(product => <Product product={product} key={product._id}/>)}
        </div>
    );
};

export default ProductList;
