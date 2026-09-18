const products=[
 {id:1,name:"Urban Runner X1",cat:"Running",price:1899,old:2299,img:"images/shoe1.jpg"},
 {id:2,name:"Classic Street",cat:"Sneakers",price:1599,old:1999,img:"images/shoe2.jpg"},
 {id:3,name:"Court Pro",cat:"Sports",price:2199,old:2499,img:"images/shoe3.jpg"},
 {id:4,name:"Executive Leather",cat:"Formal",price:2499,old:0,img:"images/shoe4.jpg"},
 {id:5,name:"Daily Comfort",cat:"Sneakers",price:1299,old:0,img:"images/shoe5.jpg"},
 {id:6,name:"Active Sprint",cat:"Running",price:1799,old:2099,img:"images/shoe6.jpg"},
 {id:7,name:"Weekend Sandal",cat:"Sandals",price:799,old:999,img:"images/shoe7.jpg"},
 {id:8,name:"Elite Sport",cat:"Sports",price:2899,old:3299,img:"images/shoe8.jpg"}
];
let activeCat="All",cart=[];
const fallback="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80";
function money(n){return "K"+n.toLocaleString("en-ZM")}
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase(), sort=document.getElementById("sort").value;
 let list=products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&p.name.toLowerCase().includes(q));
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-img"><img src="${p.img}" alt="${p.name}" onerror="this.src='${fallback}'"></div><div class="product-info"><p class="eyebrow">${p.cat}</p><h3>${p.name}</h3><div class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</div><p>⭐ 4.8 · Sizes 38–44</p><div class="product-actions"><button class="small-btn" onclick="addCart(${p.id})">Add to Cart</button><button class="small-btn dark" onclick="buyNow(${p.id})">Buy Now</button></div></div></article>`).join("")||"<p>No shoes found.</p>";
}
function filterProducts(cat){activeCat=cat;document.getElementById("shop").scrollIntoView();renderProducts()}
function addCart(id){const p=products.find(x=>x.id===id);cart.push(p);document.getElementById("cartCount").textContent=cart.length}
function openCart(){renderCart();document.getElementById("cartModal").classList.add("open")}
function closeCart(){document.getElementById("cartModal").classList.remove("open")}
function renderCart(){const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><strong>${money(p.price)} <button onclick="removeCart(${i})">×</button></strong></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function removeCart(i){cart.splice(i,1);document.getElementById("cartCount").textContent=cart.length;renderCart()}
function buyNow(id){addCart(id);openCart()}
function checkout(){if(!cart.length)return alert("Your cart is empty.");alert("Checkout is ready for payment gateway integration. Payment options planned: MTN MoMo, Airtel Money, Zamtel Money, Visa and Mastercard.")}
function submitForm(e,msg){e.preventDefault();alert(msg);e.target.reset()}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function findShoe(){activeCat=document.getElementById("findType").value;const budget=Number(document.getElementById("findBudget").value);document.getElementById("search").value="";document.getElementById("sort").value="featured";document.getElementById("shop").scrollIntoView();renderProducts()}
renderProducts();
