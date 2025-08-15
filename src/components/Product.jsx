import { useEffect, useState } from "react";
import { ToastContainer , toast } from 'react-toastify';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("/Api/product.json") // JSON should be inside /public/data/product.json
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    const addToCart = (product) => {
        toast("Item Added in the cart");
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id == product.id);
            if(existingItem){
                return prevCart.map((item) => item.id === product.id
                 ? {...item, quantity: item.quantity + 1}
                 : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }];
        })
    }

    const increaseQuantity = (id) => {
        setCart((prevCart) => 
            prevCart.map((item) => (
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            ))
        );
    }

    const decreaseQuantity = (id) => {
        setCart((prevCart) => 
            prevCart.map((item) => 
                item.id === id ? {...item, quantity: item.quantity - 1} : item
            ).filter((item) => item.quantity > 0)
        );
    }

    const removeItem = (id) =>{
        setCart((prevCart) => 
            prevCart.filter(item => item.id !== id)
        );
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (loading) {
        return <p className="text-gray-600">Loading products...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <>
        <ToastContainer theme="dark"/>
         <header
                className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 px-10 py-4 bg-white">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-3 text-gray-900">
                        <div className="size-6 text-gray-900">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                                    fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em]">ShoeHut</h2>
                    </div>
                    <nav className="flex items-center gap-8">
                        <a className="text-gray-600 hover:text-gray-900 text-base font-medium leading-normal"
                            href="#">Home</a>
                        <a className="text-gray-600 hover:text-gray-900 text-base font-medium leading-normal"
                            href="#">Men</a>
                        <a className="text-gray-600 hover:text-gray-900 text-base font-medium leading-normal"
                            href="#">Women</a>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end items-center gap-4">
                    <label className="relative flex-col min-w-48 max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                                </path>
                            </svg>
                        </div>
                        {/* <input className="form-input w-full rounded-full border-gray-300 bg-gray-100 h-10 placeholder:text-gray-500 pl-10 text-base font-normal leading-normal focus:bg-white focus:border-gray-900 focus:ring-gray-900" placeholder="Search shoes..." value="Search" type="text" /> */}
                    </label>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="relative flex items-center justify-center rounded-full h-10 w-10 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z">
                                </path>
                            </svg>
                            <div
                                className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
                                {totalItems}</div>
                        </button>
                    </div>
                </div>
            </header>
            <main className='flex-1'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='lg:col-span-2'>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Available Shoes</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden group"
                                    >
                                        <div className="relative">
                                            <div
                                                className="w-full h-64 bg-center bg-no-repeat bg-cover"
                                                style={{ backgroundImage: `url(${product.image})` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="bg-gray-900 text-white rounded-full px-6 py-3 font-bold hover:bg-gray-800 transition-colors" onClick={() => addToCart(product)}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                                            <p className="text-lg font-extrabold text-gray-900 mt-2">
                                                {product.currency} {product.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='lg:col-span-1'>
                          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Shopping Cart</h2>
                                <div className="space-y-4">
                                    {   cart.length === 0 ? (
                                        <p className="text-gray-500 text-center">Your cart is empty</p>
                                    )
                                        : (cart.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-16"  style={{ backgroundImage: `url(${item.image})` }}>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 font-semibold">{item.name}</p>
                                                    <p className="text-gray-500 text-sm">${item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="text-lg font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <span className="text-lg font-bold w-5 text-center">{item.quantity}</span>
                                                    <button
                                                        className="text-lg font-medium flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                                <button className="text-gray-500 hover:text-red-500 transition-colors" onClick={() => removeItem(item.id)}>
                                                    <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192Z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                        )
                                    }
                                    
                                </div>
                                <div className="border-t border-gray-200 my-6"></div>
                                {/* <div className="space-y-2">
                                    <div className="flex justify-between text-base font-medium text-gray-600">
                                        <p>Subtotal</p>
                                        <p>$355.00</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-600">
                                        <p>Shipping</p>
                                        <p>$10.00</p>
                                    </div>
                                </div> */}
                                <div className="border-t border-gray-200 my-6"></div>
                                <div className="flex justify-between text-xl font-extrabold text-gray-900">
                                    <p>Total</p>
                                    <p>${totalPrice}</p>
                                </div>
                                <button
                                    className="w-full bg-gray-900 text-white rounded-full py-3 mt-6 font-bold text-lg hover:bg-gray-800 transition-colors">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Product;
