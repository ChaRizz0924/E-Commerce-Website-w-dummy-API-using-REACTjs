import React from 'react';

export default function filtersBar({
    query, setQuery, categories, category, setCategory, sort, setSort, priceRange, setPriceRange, page, setPage, limit
}) 
{
    return (
        <div className="bg-gray-200 p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <input
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="flex gap-2 items-center">
                <select value={category} onChange={e=>{setCategory(e.target.value); setPage(1);}} className="border rounded px-3 py-2">
                        <option value="all">All categories</option>
                    {categories.map(c=> 
                        <option key={c.slug} value={c.slung}>{c.name}</option>)}
                </select>

                <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded px-3 py-2">
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating-desc">Top Rated</option>
                </select>
            </div>


            <div className="flex gap-2 items-center justify-end">
                <label className="text-sm text-gray-600">Price</label>
                    <input
                    type="number"
                    value={priceRange[0]}
                    onChange={e=>setPriceRange([Number(e.target.value||0), priceRange[1]])}
                    className="w-20 border rounded px-2 py-1"
                    />
            <span>-</span>
                    <input
                    type="number"
                    value={priceRange[1]}
                    onChange={e=>setPriceRange([priceRange[0], Number(e.target.value||2000)])}
                    className="w-20 border rounded px-2 py-1"
                    />
            </div>
        </div>
        </div>
    );
}