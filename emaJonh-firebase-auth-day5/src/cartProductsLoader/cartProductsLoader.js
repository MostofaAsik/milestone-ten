// const cartProductsLoader = async () => {
//     const loadedProducts = await fetch('produtcs.json')
//     const products = await loadedProducts.json();
//     console.log(products);
//     return products;
// }
// export default cartProductsLoader;

import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json();

    //if cart data in database ,you have to used async await
    const storedCart = getShoppingCart()
    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
        if (addedProduct) {
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you need  send two things
    // return [products,savedCart]

    // another option 
    // return { products, savedCart }

    return savedCart;
}

export default cartProductsLoader;