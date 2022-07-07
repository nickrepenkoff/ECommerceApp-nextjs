import {useRef} from 'react';
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'

import {urlFor} from "../lib/client";
import {useStateContext} from "../context/StateContext";

const Cart = () => {
    const cartRef = useRef(null)
    const {totalPrice, totalQty, cartItems, setShowCart, toggleCartItemQty,onRemove} = useStateContext()
    

    

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft/>
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>{totalQty} items</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150}/>
                        <h3>Your shopping bag is empty</h3>
                        <Link href='/'>
                            <button type='button' onClick={() => setShowCart(false)} className='btn'>
                                Continue shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className='product-container'>
                    {cartItems.length >=1 && cartItems.map((item) => (
                        <div className='product' key={item._id}>
                            <img src={urlFor(item?.image[0])} alt="img" className='cart-product-image'/>
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>{item.price}UAH</h4>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className='quantity-desc'>
                                            <span className='minus' onClick={() => toggleCartItemQty(item._id, 'dec')}><AiOutlineMinus/></span>
                                            <span className='num'>{item.quantity}</span>
                                            <span className='plus' onClick={() => toggleCartItemQty(item._id, 'inc')}><AiOutlinePlus/></span>
                                        </p>
                                    </div>
                                    <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                                        <TiDeleteOutline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal:</h3>
                            <h3>{totalPrice}UAH</h3>
                        </div>
                        <div className='btn-container'>
                            <Link href='/success'>
                                <button type='button' className='btn' onClick={() => setShowCart(false)}>
                                    Click to pay
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
