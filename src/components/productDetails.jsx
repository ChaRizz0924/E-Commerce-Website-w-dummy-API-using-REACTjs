import React from 'react';
import { ShoppingCartIcon } from "lucide-react";

export default function productDetails({ product, onClose, addToCart }) {
    if (!product) return null;
// If user clicked Cart button, product may be {openCart:true}
    if (product.openCart) return null;


return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
        <div className="bg-white w-[90%] md:w-3/4 lg:w-2/3 rounded p-6 relative">
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-red-600">✕</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-gray-50">
            <img src={product.images?.[0] || product.thumbnail} alt="" className="max-h-96 object-contain" />
        </div>
        <div>
            <h2 className="text-5xl font-bold">{product.title}</h2>
            <div className="text-sm text-gray-500">{product.brand} • {product.category}</div>
            <div className="mt-3 text-lg">{product.description}</div>
            <div className="mt-4 text-5xl text-red-700 font-bold">₱{product.price}</div>
            <div className="mt-2 text-sm text-gray-600">Rating: {product.rating} • Stock: {product.stock}</div>
            <div className="mt-4 flex gap-2">
                <button onClick={()=>{addToCart(product); alert('Added to cart.')}} className="flex items-center gap-2 bg-gray-600 hover:bg-blue-950 text-white px-4 py-2 rounded">
                    <ShoppingCartIcon size={18} className="text-white" />
                    Add to cart</button>
                <button onClick={onClose} className="px-4 py-2 border rounded transform transition-all duration-300 hover:bg-red-700 hover:text-white">Close</button>
            </div>
            </div>
            </div>
        </div>
    </div>
);
}