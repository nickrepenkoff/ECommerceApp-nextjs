import {toast} from 'react-hot-toast'
import {createContext, useContext, useState} from "react";

const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct, productIndex;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice(prev => prev + product.price * quantity)
        setTotalQty(prev => prev + quantity)

        if(checkProductInCart){
            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        }else{
            product.quantity = quantity

            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} has been added to the cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id)
        const copyCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity)
        setTotalQty(prev => prev - foundProduct.quantity)
        setCartItems(copyCartItems)
    }

    const toggleCartItemQty = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        productIndex = cartItems.findIndex(product => product._id === id)
        const copyCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc'){
            setCartItems([...copyCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQty(prev => prev + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...copyCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQty(prev => prev - 1)
            }
        }
    }

    const increaseQty = () => {
        setQty(prev => prev + 1 )
    }
    const decreaseQty = () => {
        setQty(prev => {
            if(prev - 1 < 1) return 1

            return prev - 1
        } )
    }


    return(
        <Context.Provider value={
            {
                showCart,
                cartItems,
                totalPrice,
                totalQty,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                setShowCart,
                toggleCartItemQty,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQty
            }
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)