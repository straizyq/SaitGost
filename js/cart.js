class ProductCart{constructor(){this.key='techstore_cyber_v3';this.items=this._load()||[]}
_load(){try{return JSON.parse(localStorage.getItem(this.key))}catch(e){return[]}}
_save(){localStorage.setItem(this.key,JSON.stringify(this.items))}
addProduct(product){const found=this.items.find(i=>i.id===product.id);if(found)found.qty++;else this.items.push({id:product.id,name:product.name,price:product.price,qty:1});this._save()}
removeProduct(id){this.items=this.items.filter(i=>i.id!==id);this._save()}
increase(id){const it=this.items.find(i=>i.id===id);if(it){it.qty++;this._save()}}
decrease(id){const it=this.items.find(i=>i.id===id);if(!it)return;if(it.qty>1)it.qty--;else this.removeProduct(id);this._save()}
clear(){this.items=[];this._save()}
total(){return this.items.reduce((s,i)=>s+i.price*i.qty,0)}
count(){return this.items.reduce((s,i)=>s+i.qty,0)}}
window.__CART__=new ProductCart()