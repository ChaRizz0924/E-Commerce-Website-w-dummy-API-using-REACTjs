import React, { useEffect, useState } from 'react';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import CartPanel from './components/cartPanel';
import FiltersBar from './components/filtersbar';


export default function App() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);


    // Query & filter state
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('relevance');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [total, setTotal] = useState(0);


    // Fetch categories
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => { 
                setCategories(data);
            })
            .catch(err => console.error(err));
    }, []);

    // Fetch products (uses server-side pagination via API)
    useEffect(() => {
        const controller = new AbortController();
        const skip = (page - 1) * limit;
        // Build query URL
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        // If search query is present use /search
        const doSearch = query && query.trim().length > 0;

        if (doSearch) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
        }

        // If category filter applied: endpoint becomes /category/{category}
        if (category && category !== 'all') {
            if (doSearch) {
                // The API doesn't support combined search+category; we fetch category and then client-filter
                url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=100`;
            } else {
                url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
            }
        }

        fetch(url, { signal: controller.signal })
        .then(r => r.json())
        .then(data => {
        // API returns {products, total, limit, skip} for list endpoints
        const fetched = data.products || (data && data.length ? data : []);
        // If we asked category with limit=100 for client-side search, filter by query and then paginate client-side
        let filtered = fetched;

        if (category !== 'all' && doSearch) {
            filtered = fetched.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
        }


        // Client-side price filter
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);


        // Sorting
        if (sort === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
        else if (sort === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
        else if (sort === 'rating-desc') filtered.sort((a,b)=>b.rating-b.rating);


        // If we used client-side filtered large fetch, compute pagination
        if (category !== 'all' && doSearch) {
            setTotal(filtered.length);
            const paged = filtered.slice(skip, skip + limit);
            setProducts(paged);
        } else {
            setTotal(data.total ?? filtered.length);
            setProducts(filtered);
        }
        })
        .catch(err => {
            if (err.name !== 'AbortError') console.error(err);
        });

        return () => controller.abort();
    }, [query, category, sort, priceRange, page, limit]);


    // Cart helpers
    function addToCart(product, qty = 1) {
        setCartItems(prev => {
            const found = prev.find(i => i.id === product.id);
            if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            return [...prev, { id: product.id, product, qty }];
        });
    }


    function updateCart(id, qty) {
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }

    function removeFromCart(id) {
        setCartItems(prev => prev.filter(i => i.id !== id));
    }

    function clearCart() { setCartItems([]); }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-5xl font-bold text-blue-950">shAPI</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">Products: {total}</div>
                        <button
                        onClick={() => setSelectedProduct({ openCart: true })}
                        className="bg-indigo-600 text-white px-3 py-1 rounded"
                        >Cart ({cartItems.length})</button>
                        </div>
                    </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <FiltersBar
                    query={query}
                    setQuery={setQuery}
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                />


                <ProductList
                    products={products}
                    onSelect={p => setSelectedProduct(p)}
                    addToCart={addToCart}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    total={total}
                />
            </main>

            <ProductDetails
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                addToCart={addToCart}
            />

            <CartPanel
                open={selectedProduct?.openCart}
                items={cartItems}
                onClose={() => setSelectedProduct(null)}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
                onCheckout={() => {
                    // naive checkout flow
                    alert('Checkout successful, Thank you!');
                    clearCart();
                    setSelectedProduct(null);
                }}
            />
        </div>
    );
}
