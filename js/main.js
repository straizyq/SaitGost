const PRODUCTS=[{id:1,name:'Смартфон X1',price:29990,desc:'Современный смартфон с отличной камерой.',img:'https://straizyq.github.io/SaitGost/images/5463155318151313536.jpg'},{id:2,name:'Ноутбук Pro 15',price:89990,desc:'Мощный ноутбук для работы и творчества.',img:'images/5463155318151313536.jpg'},{id:3,name:'Планшет Tab 10',price:19990,desc:'Лёгкий планшет для чтения и видео.',img:'../images/5463155318151313536.jpg'},{id:4,name:'Наушники TWS',price:4990,desc:'Беспроводные наушники с чистым звуком.',img:'../images/5463155318151313536.jpg'},{id:5,name:'Умные часы S3',price:7990,desc:'Трекер здоровья и уведомлений.',img:'../images/5463155318151313536.jpg'},{id:6,name:'Камера Action 4K',price:45990,desc:'Экшн-камера для ярких снимков.',img:'../images/5463155318151313536.jpg'}];const productsEl=document.getElementById('products');const qInput=document.getElementById('q');const cartCountEl=document.getElementById('cart-count');const cartAside=document.getElementById('cart');const cartItemsEl=document.getElementById('cart-items');const cartTotalEl=document.getElementById('cart-total');const openCartBtn=document.getElementById('open-cart');const closeCartBtn=document.getElementById('close-cart');const checkoutBtn=document.getElementById('checkout');const clearCartBtn=document.getElementById('clear-cart');function numberWithSpaces(x){return String(x).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]))}
function renderProducts(list){productsEl.innerHTML='';list.forEach(p=>{const card=document.createElement('article');card.className='card';card.innerHTML=`
      <div class="card-media"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
      <h3 class="card-title">${escapeHtml(p.name)}</h3>
      <p class="card-desc">${escapeHtml(p.desc)}</p>
      <div class="card-row">
        <div class="price">${numberWithSpaces(p.price)} ₽</div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn-sm add" data-id="${p.id}">В корзину</button>
        </div>
      </div>
    `;productsEl.appendChild(card)})}
function renderCart(){const cart=window.__CART__;cartItemsEl.innerHTML='';if(cart.items.length===0){cartItemsEl.innerHTML='<div class="center" style="padding:18px;color:var(--muted)">Корзина пуста</div>';cartTotalEl.textContent='0';cartCountEl.textContent='0';return}
cart.items.forEach(it=>{const el=document.createElement('div');el.className='cart-item';el.innerHTML=`
      <div class="meta">
        <div style="font-weight:700">${escapeHtml(it.name)}</div>
        <div style="font-size:13px;color:var(--muted)">${it.qty} × ${numberWithSpaces(it.price)} ₽</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <button class="btn btn-ghost dec" data-id="${it.id}">−</button>
        <button class="btn btn-ghost inc" data-id="${it.id}">+</button>
        <button class="btn btn-ghost rem" data-id="${it.id}">×</button>
      </div>
    `;cartItemsEl.appendChild(el)});cartTotalEl.textContent=numberWithSpaces(cart.total());cartCountEl.textContent=cart.count()}
document.addEventListener('click',e=>{const add=e.target.closest('.add');if(add){const id=+add.dataset.id;const p=PRODUCTS.find(x=>x.id===id);if(p){window.__CART__.addProduct(p);renderCart();toast('Добавлено в корзину')}}
const rem=e.target.closest('.rem');if(rem){window.__CART__.removeProduct(+rem.dataset.id);renderCart()}
const inc=e.target.closest('.inc');if(inc){window.__CART__.increase(+inc.dataset.id);renderCart()}
const dec=e.target.closest('.dec');if(dec){window.__CART__.decrease(+dec.dataset.id);renderCart()}});qInput.addEventListener('input',()=>{const q=qInput.value.trim().toLowerCase();if(!q){renderProducts(PRODUCTS);return}
const res=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q));renderProducts(res)});openCartBtn.addEventListener('click',(ev)=>{ev.stopPropagation();const hidden=cartAside.hasAttribute('hidden');if(hidden){cartAside.removeAttribute('hidden');openCartBtn.setAttribute('aria-expanded','!0')}
else{cartAside.setAttribute('hidden','');openCartBtn.setAttribute('aria-expanded','!1')}});closeCartBtn.addEventListener('click',()=>{cartAside.setAttribute('hidden','');openCartBtn.setAttribute('aria-expanded','!1')});document.addEventListener('click',(e)=>{const isClickInside=cartAside.contains(e.target)||openCartBtn.contains(e.target);if(!isClickInside&&!cartAside.hasAttribute('hidden')){cartAside.setAttribute('hidden','');openCartBtn.setAttribute('aria-expanded','!1')}});document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&!cartAside.hasAttribute('hidden')){cartAside.setAttribute('hidden','');openCartBtn.setAttribute('aria-expanded','!1')}});checkoutBtn.addEventListener('click',()=>{if(window.__CART__.items.length===0){toast('Корзина пуста');return}
alert('Демо:оформление заказа.Всего:'+numberWithSpaces(window.__CART__.total())+' ₽');window.__CART__.clear();renderCart()});clearCartBtn.addEventListener('click',()=>{window.__CART__.clear();renderCart()});function toast(msg){const el=document.createElement('div');el.textContent=msg;el.style.position='fixed';el.style.left='50%';el.style.bottom='22px';el.style.transform='translateX(-50%)';el.style.background='linear-gradient(90deg,rgba(43,231,224,0.12),rgba(155,92,255,0.12))';el.style.color='white';el.style.padding='8px 12px';el.style.borderRadius='8px';el.style.zIndex='9999';document.body.appendChild(el);setTimeout(()=>el.remove(),1200)}
renderProducts(PRODUCTS);renderCart()
