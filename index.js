const fs = require('fs');

class ProductManager {
    constructor(path){
        this.products = fs.readFileSync(path)? JSON.parse(fs.readFileSync(path)) : [];
        this.path = path;
    }

    addProduct(product){
        const exist = this.products.find(prod => prod.code === product.code);

        if(exist){
            console.log("existing product")
        }else{
            const uid = Date.now();
            this.products = [...this.products, {id: uid, ...product}]
            console.log("added product")
            this.saveData();
        }
    }

    saveData(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts(){
        return this.products;
    }

    getProductById(code){
        const findOne = this.products.find(prod => prod.code === code);

        if(findOne){
            return findOne;
        }else{
            return {
                ok: false,
                msg: "Not found"
            }
        }
    }

    updateProduct(id, body){
        let product = this.products.find(prod => prod.id === id);
        const productsUpdate = this.products.filter((product) => product.id !== id)
        product = {...product, ...body}
        this.products = [...productsUpdate, product]
        this.saveData();
        console.log("update product")
    }

    deleteProduct(id){
        const remove = this.products.filter((product) => product.id !== id)
        this.products = remove;
        this.saveData();
        console.log("removed product")
    }
}

class Product {
    constructor(title, description, price, thumbnail = "Sin imagen", code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


//proceso de testing

const pm = new ProductManager("data/products.json");

const product1 = new Product("producto prueba 1", "Este es un producto prueba", "200", undefined,"prod1", 25);
const product2 = new Product("producto prueba 2", "Este es un producto prueba", "300", undefined,"prod2", 25);
const product3 = new Product("producto prueba 3", "Este es un producto prueba", "400", undefined,"prod3", 25);
const product4 = new Product("producto prueba 4", "Este es un producto prueba", "500", undefined,"prod4", 25);
pm.addProduct(product1)
pm.addProduct(product2)
pm.addProduct(product3)
pm.addProduct(product4)
const products = pm.getProducts();
console.log("products", products);

// pm.deleteProduct(1670122531546);
pm.updateProduct(1670122531545, {
    title: "producto modificado",
    price: 10000
})