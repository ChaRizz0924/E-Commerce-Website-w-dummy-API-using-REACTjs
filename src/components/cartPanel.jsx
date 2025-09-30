import React from 'react';

export default function cartPanel({ open, items, onClose, updateCart, removeFromCart, onCheckout }) {
    if (!open) return null;

    const subtotal = items.reduce((s,i)=>s + i.product.price * i.qty, 0);

    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end md:items-center justify-center">
        <div className="bg-white w-full md:w-2/3 max-h-[80vh] overflow-auto rounded-t-lg md:rounded p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cart</h3>
                <button onClick={onClose} className="text-gray-600">Close</button>
            </div>

        {items.length === 0 ? <div className="text-gray-500">Your cart is empty.</div> : (
            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 border p-3 rounded">
                        <img src={item.product.thumbnail||item.product.images?.[0]} alt="" className="w-20 h-20 object-contain" />
                    <div className="flex-1">
                        <div className="font-medium">{item.product.title}</div>
                        <div className="text-sm text-gray-500">₱{item.product.price}</div>
                    <div className="mt-2 flex items-center gap-2">
                        <input type="number" min={1} value={item.qty} onChange={e=>updateCart(item.id, Math.max(1, Number(e.target.value)||1))} className="w-20 border rounded px-2 py-1" />
                        <button onClick={()=>removeFromCart(item.id)} className="text-red-500 text-sm">Remove</button>
                    </div>
                    </div>
            </div>
        ))}

        <div className="text-right">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-xl font-bold">₱{subtotal}</div>
            <button onClick={onCheckout} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
        </div>
        </div>
        )}
        </div>
        </div>
    );
}