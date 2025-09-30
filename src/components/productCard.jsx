import React from 'react';
import { ShoppingCartIcon } from "lucide-react";

export default function productCard({ product, onSelect, addToCart }) {
    const discountPrice = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));

return (
    <div className="bg-white rounded shadow hover:shadow-md p-3 flex flex-col">
        <button onClick={onSelect} className="text-left flex-1">
            <div className="h-40 w-full bg-gray-100 rounded overflow-hidden mb-3 flex items-center justify-center">
                <img src={product.thumbnail || product.images?.[0]} alt="" className="object-contain h-full" />
            </div>
            <h3 className="font-medium">{product.title}</h3>
            <div className="text-sm text-gray-500 truncate">{product.brand} • {product.category}</div>
        </button>

        <div className="mt-3 flex items-center justify-between">

            <div>
                <div className="text-lg font-semibold">₱{discountPrice}</div>
                {product.discountPercentage ? (
                    <div className="text-xs text-red-500">{product.discountPercentage}% off</div>
                ) : null}
            </div>
            <div className="flex flex-col gap-2">
                <button
                    onClick={addToCart}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                        <ShoppingCartIcon size={18} className="text-white" />
                        <span>Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
);
}