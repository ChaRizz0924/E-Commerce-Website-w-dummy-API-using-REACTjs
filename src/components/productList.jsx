import React from 'react';
import ProductCard from './productCard';

export default function productList({ products, onSelect, addToCart, page, setPage, limit, total }) {
const pages = Math.max(1, Math.ceil((total || products.length) / limit));


return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
                <ProductCard key={p.id} product={p} onSelect={()=>onSelect(p)} addToCart={()=>addToCart(p)} />
            ))}
        </div>


        <div className="mt-6 flex items-center justify-center gap-2">
            <button disabled={page<=1} onClick={()=>setPage(page-1)} className="px-3 py-1 border rounded duration-300 ease-in-out hover:bg-blue-900 hover:text-white">Prev</button>
                <span className="px-3 py-1">Page {page} / {pages}</span>
            <button disabled={page>=pages} onClick={()=>setPage(page+1)} className="px-3 py-1 border rounded duration-300 ease-in-out hover:bg-blue-900 hover:text-white">Next</button>
        </div>
    </div>
);
}