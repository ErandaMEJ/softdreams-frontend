import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineCloudUpload } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState("Bedsheets");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    async function addProduct() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in as an admin.");
            navigate("/login");
            return;
        }

        if (!productID || !name || !description || !category || !brand || !model) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setUploading(true);
        const imagePromises = [];

        for (let i = 0; i < files.length; i++) {
            imagePromises.push(uploadFile(files[i]));
        }

        try {
            const images = await Promise.all(imagePromises);
            const altNamesArray = altNames.split(",").map(s => s.trim()).filter(s => s);

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/products/", {
                productID,
                name,
                altNames: altNamesArray,
                description,
                price,
                labelledPrice,
                images,
                category,
                brand,
                model,
                stock,
                isAvailable
            }, {
                headers: { Authorization: "Bearer " + token }
            });

            toast.success("Product added successfully!");
            navigate("/admin/products");

        } catch (err) {
            toast.error("Error adding product. Please try again.");
            console.error(err);
        } finally {
            setUploading(false);
        }
    }

    const inputClass = "w-full rounded-xl border border-secondary/20 bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";
    const labelClass = "block text-sm font-semibold text-secondary mb-2";

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-10">
            <h1 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-3">
                <span className="p-2 bg-accent/10 rounded-xl text-accent"><HiOutlinePlus /></span>
                Add New Product
            </h1>

            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className={labelClass}>Product ID</label>
                        <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} className={inputClass} placeholder="e.g., P-001" />
                        <p className="text-xs text-secondary/50 mt-1">Must be unique.</p>
                    </div>

                    <div>
                        <label className={labelClass}>Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g., Luxury Cotton Sheet" />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Alternative Names (Comma separated)</label>
                        <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className={inputClass} placeholder="e.g., bedsheet, sheet, cotton sheet" />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Description</label>
                        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} placeholder="Detailed product description..." />
                    </div>

                    <div>
                        <label className={labelClass}>Price (LKR)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Labelled Price (LKR)</label>
                        <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className={inputClass} />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Product Images</label>
                        <div className="relative border-2 border-dashed border-secondary/20 rounded-xl p-8 hover:bg-secondary/5 transition text-center cursor-pointer">
                            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <HiOutlineCloudUpload className="mx-auto text-4xl text-secondary/30 mb-2" />
                            <p className="text-secondary/60 text-sm">{files.length > 0 ? `${files.length} files selected` : "Drag & drop or click to upload images"}</p>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                            <option value="Bedsheets">Bedsheets</option>
                            <option value="Pillows">Pillows</option>
                            <option value="Duvets">Duvets</option>
                            <option value="Comforters">Comforters</option>
                            <option value="Mattress Protectors">Mattress Protectors</option>
                            <option value="Cushions">Cushions</option>
                            <option value="Throws">Throws</option>
                            <option value="Towels">Towels</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass} placeholder="e.g., SoftDreams" />
                    </div>

                    <div>
                        <label className={labelClass}>Model</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className={inputClass} placeholder="e.g., SD-2024" />
                    </div>

                    <div>
                        <label className={labelClass}>Stock Quantity</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Availability</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className={inputClass}>
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>

                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-secondary/10">
                    <Link to="/admin/products" className="flex-1 py-3 rounded-xl border border-secondary/20 text-secondary font-semibold hover:bg-secondary/5 text-center transition">
                        Cancel
                    </Link>
                    <button
                        onClick={addProduct}
                        disabled={uploading}
                        className="flex-1 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 shadow-lg shadow-accent/20 hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? "Uploading..." : "Add Product"}
                    </button>
                </div>

            </div>
        </div>
    )
}