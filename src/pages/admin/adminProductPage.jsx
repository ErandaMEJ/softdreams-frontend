import axios from "axios";
import { useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";
import { HiOutlineSearch, HiOutlinePencil } from "react-icons/hi";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [loaded]);

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.productID.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col relative text-secondary">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-secondary">
          Products
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-xl border border-secondary/20 bg-white/50 focus:bg-white focus:border-accent outline-none transition w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            to="/admin/add-product"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl font-semibold shadow-lg shadow-accent/20 hover:bg-accent/90 transition hover:-translate-y-0.5"
          >
            <PiPlus className="text-lg" />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        </div>
      </div>

      <div className="w-full overflow-hidden bg-white/60 backdrop-blur-md shadow-sm rounded-2xl border border-white/40">
        {loaded ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/5 text-secondary/70 text-xs uppercase tracking-wider border-b border-secondary/10">
                  <th className="py-4 px-6 font-semibold">Product</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Price</th>
                  <th className="py-4 px-6 font-semibold">Stock</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.images[0]}
                            className="w-12 h-12 rounded-lg object-cover border border-secondary/10 shadow-sm"
                          />
                          <div>
                            <p className="font-semibold text-secondary">{item.name}</p>
                            <p className="text-xs text-secondary/50">#{item.productID}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-secondary/80">{item.category}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-accent">LKR. {item.price.toLocaleString()}</span>
                          {item.labelledPrice > item.price && (
                            <span className="text-xs text-secondary/40 line-through">LKR. {item.labelledPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">{item.stock}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                         `}>
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate("/admin/update-product", { state: item })}
                            className="p-2 rounded-lg text-secondary/70 hover:bg-secondary/5 hover:text-accent transition"
                            title="Edit Product"
                          >
                            <HiOutlinePencil className="text-lg" />
                          </button>
                          <div className="scale-90">
                            <ProductDeleteButton productID={item.productID} reload={() => setLoaded(false)} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-secondary/50">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
