// const sampleCart = [
//     {
//         productID: "PROD001",
//         name: "sample product 01",
//         price: 1000,
//         labelledPrice: 1000,
//         quantity: 1,
//         image: "https://www.ikea.com/us/en/images/products/ikea-alex-desk-black__0734034_pe731300_s5.jpg?f=s"
//     },
//     {
//         productID: "PROD002",
//         name: "sample product 02",
//         price: 1000,
//         labelledPrice: 1000,
//         quantity: 1,
//         image: "https://www.ikea.com/us/en/images/products/ikea-alex-desk-black__0734034_pe731300_s5.jpg?f=s"
//     }
// ]

import toast from "react-hot-toast";

export function getCart() {
    const cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", "[]")
        return []
    } else {
        const cart = JSON.parse(cartString);
        return cart;
    }

}

export function addToCart(product, quantity) {
    const cart = getCart()

    //check if product is already in cart
    const index = cart.findIndex(
        (item) => {
            return item.productID == product.productID
        }
    )
    if (index == -1) {
        cart.push(
            {
                productID: product.productID,
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                quantity: quantity,
                image: product.images?.[0] || product.image
            }
        )
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-sm w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl pointer-events-auto flex ring-1 ring-black/5 overflow-hidden border border-secondary/5`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <img
                                className="h-14 w-14 rounded-xl object-cover shadow-sm bg-gray-50"
                                src={product.images?.[0] || product.image}
                                alt=""
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-secondary">
                                Added to Cart!
                            </p>
                            <p className="text-xs text-secondary/60 line-clamp-1 mt-0.5">
                                {product.name}
                            </p>
                            <p className="text-xs font-medium text-accent mt-1">
                                Rs. {product.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    } else {
        const newQty = cart[index].quantity + quantity

        if (newQty <= 0) {
            cart.splice(index, 1)
            toast.success("Removed from cart");
        } else {
            cart[index].quantity = newQty;
            cart[index].quantity = newQty;
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-sm w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl pointer-events-auto flex ring-1 ring-black/5 overflow-hidden border border-secondary/5`}
                >
                    <div className="flex-1 p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-14 w-14 rounded-xl object-cover shadow-sm bg-gray-50"
                                    src={product.images?.[0] || product.image || cart[index].image}
                                    alt=""
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-secondary">
                                    Cart Updated!
                                </p>
                                <p className="text-xs text-secondary/60 line-clamp-1 mt-0.5">
                                    {product.name}
                                </p>
                                <p className="text-xs font-medium text-accent mt-1">
                                    Quantity: {newQty}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
    }
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}



export function emptyCart() {
    localStorage.setItem("cart", "[]")
}

export function getCartTotal() {
    let total = 0
    const cart = getCart()

    cart.forEach(
        (item) => {
            total += item.price * item.quantity
        }
    )
    return total
}