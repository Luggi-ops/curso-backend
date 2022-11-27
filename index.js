

class ProductManager {
    constructor(products = [], ){
        this.products = products;
    }

    addProduct(product){
        
        const exist = this.products.find(prod => prod.code === product.code);

        if(exist){
            console.log("existing product")
        }else{
            const uid = Date.now();
            this.products = [...this.products, {id: `PROD-${uid}`, ...product}]
            console.log("added product")
        }
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

const pm = new ProductManager();

const product = new Product("producto prueba", "Este es un producto prueba", "200", undefined,"abc123", 25);
pm.addProduct(product)
pm.addProduct(product)
const products = pm.getProducts();
console.log("products", products);

const findProduct = pm.getProductById("abc123")
console.log("findProduct", findProduct)