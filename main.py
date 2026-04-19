from fastapi import FastAPI
from models import Products

app=FastAPI()
@app.get("/")
def greek():
    return "Welcome srinadh"
products=[
    Products(id=1,name="Phone",description="Ganme",price=9999,quantity=10),
    Products(id=2,name="gaming Phone",description="personal",price=20000,quantity=12),
    Products(id=10,name="laptop",description="home",price=91999,quantity=1),
    Products(id=9,name="car",description="sports",price=9999444,quantity=1) 
    
]
@app.get("/products")
def get_all_products():
    return products
@app.get("/product/{id}")
def get_one_product(id:int):
    for product in products:
        if product.id==id:
            return product
    
    return "Product not found"
@app.post("/product")
def add_product(product:Products):
    products.append(product)
    return "Product added successfully"
@app.put("/product")
def update_the_products(id:int, product:Products):
    for i in range(len(products)):
        if products[i].id==id:
            products[i]=product
            return "Update successfully!!!"
    return "No data found"
@app.delete("/product")
def delete_product(id:int, product:Products):
    for i in range(len(products)):
        if products[i].id==id:
            del products[i]
            return "delete successfully!!!"
    return "No data found"