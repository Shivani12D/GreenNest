/* script.js - shared logic for GreenNest (client-only demo)
   - stores data in localStorage
   - products array (20 plants), search, categories, cart, signup/login, orders
*/

const PRODUCTS = [
  // Indoor (5)
  { id:1, category:'Indoor', name:'ZZ Plant', price:350, img:'https://vader-prod.s3.amazonaws.com/1684789715-the_sill-variant-white_gloss-zz_plant.jpg', desc:'Low-maintenance glossy foliage, great for low light.' },
  { id:2, category:'Indoor', name:'Snake Plant', price:420, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQ4qYmW0wzJmij6s4uWX2aHFVWeMPTDIYyA&s', desc:'Tough, upright leaves; excellent air purifier.' },
  { id:3, category:'Indoor', name:'Mini Plant', price:250, img:'https://www.ugaoo.com/cdn/shop/products/GroPot_87e3e981-500e-4df2-bff3-d618431f96c9.jpg?v=1758698875&width=1000', desc:'Trailing vine; forgiving and fast-growing.' },
  { id:4, category:'Indoor', name:'Peace Lily', price:380, img:'https://www.ugaoo.com/cdn/shop/products/GroPot.jpg?v=1758694505&width=1000', desc:'Elegant white blooms, likes moderate indirect light.' },
  { id:5, category:'Indoor', name:'Rubber Plant', price:600, img:'https://www.ugaoo.com/cdn/shop/products/GroPot_997d008c-0bd8-4ec4-8540-498d4c9338f3.jpg?v=1706609471&width=1000', desc:'Bold glossy leaves — showstopper for interiors.' },

  // Outdoor (5)
  { id:6, category:'Outdoor', name:'Bougainvillea', price:450, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTBlUOTduvNiNbU1rctpsls46MKitIBpbDUaE2xIxSHHlDGiVP2GCz06PNbnR9K3rxUig&usqp=CAU', desc:'Vibrant climber, loves sun and warmth.' },
  { id:7, category:'Outdoor', name:'Jasmine', price:300, img:'https://media.istockphoto.com/id/492629029/photo/jasmine-room-plant-on-windowsill.jpg?s=612x612&w=0&k=20&c=LRDeNzHk39neZvqZLLTKoXs0o9uYTQaSPg407um0ypM=', desc:'Fragrant white blooms — perfect for balconies.' },
  { id:8, category:'Outdoor', name:'Hibiscus', price:500, img:'https://nurserylive.com/cdn/shop/products/nurserylive-g-hibiscus-gudhal-flower-red-plant-213118_600x600.jpg?v=1751707084', desc:'Large colorful flowers — sun-lover.' },
  { id:9, category:'Outdoor', name:'Oleander', price:420, img:'https://dms.mydukaan.io/original/jpeg/730950/570a0a01-8039-4174-b518-9bf54edfe5fb/nerium-red-e1436228141207-bf6a2848-aedf-4323-868b-df20b9d21b3d.jpg', desc:'Hardy shrub for fences and borders.' },
  { id:10, category:'Outdoor', name:'Frangipani', price:650, img:'https://plantsguru.com/cdn/shop/files/plants-guru-annual-flowering-plants-plumeria-pink.jpg?v=1735616599&width=1100', desc:'Tropical tree with fragrant flowers.' },

  // Herbs (5)
  { id:11, category:'Herbs', name:'Basil', price:120, img:'https://plantsguru.com/cdn/shop/files/kkrishna-tulsi-plant.jpg?v=1737049132&width=1100', desc:'Fresh culinary herb — great for sauces.' },
  { id:12, category:'Herbs', name:'Mint', price:90, img:'https://plantsguru.com/cdn/shop/files/mint.jpg?v=1735618137&width=1100', desc:'Fragrant leaves; invasive — keep in pot.' },
  { id:13, category:'Herbs', name:'Rosemary', price:200, img:'https://plantsguru.com/cdn/shop/files/rosemary-herb-plant.jpg?v=1735618139&width=1100', desc:'Woody herb great for grilling & roasting.' },
  { id:14, category:'Herbs', name:'Coriander', price:80, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxMIqFn396iu2CvMz1JdYassUvv2RbZ-lYQ&s', desc:'Cilantro / coriander — quick-growing.' },
  { id:15, category:'Herbs', name:'Thyme', price:140, img:'https://plantsguru.com/cdn/shop/files/thyme-herb-plant.jpg?v=1735617514&width=1100', desc:'Small leaves; aromatic and drought-tolerant.' },

  // Flowers (5)
  { id:16, category:'Flowers', name:'Marigold', price:70, img:'https://plantsguru.com/cdn/shop/files/Plantsguru-marigold-yellow_ae963621-63dc-48db-978f-31fb5faa4a31.jpg?v=1735618748&width=1100', desc:'Bright, season-long blooms.' },
  { id:17, category:'Flowers', name:'Petunia', price:95, img:'https://plantsguru.com/cdn/shop/files/plants-guru-flowering-seeds-Petunia-Grandiflora-Purple-Seeds.jpg?v=1735618274&width=1100', desc:'Colorful bedding flowers for containers.' },
  { id:18, category:'Flowers', name:'Sunflower', price:180, img:'https://creativefarmer.in/cdn/shop/products/23554_1024x1024_a26c0d9c-9a75-4edc-b0c6-1d85c5bcf9aa.jpg?v=1616308984', desc:'Tall summer centerpiece with large heads.' },
  { id:19, category:'Flowers', name:'Lavender', price:320, img:'https://m.media-amazon.com/images/I/81euKzQpXjL._UF1000,1000_QL80_.jpg', desc:'Fragrant purple spikes; attracts pollinators.' },
  { id:20, category:'Flowers', name:'Geranium', price:160, img:'https://plantsguru.com/cdn/shop/files/Geranium_Red_Plant.jpg?v=1745430584&width=1100', desc:'Easy-care annual with bold clusters.' }
];

/* ---------- localStorage helpers ---------- */
function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users || [])); }
function loadUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
function setCurrentUser(username){
  if(username) localStorage.setItem('currentUser', username);
  else localStorage.removeItem('currentUser');
}
function getCurrentUser(){ return localStorage.getItem('currentUser'); }
function getCartKey(){
  const u = getCurrentUser();
  return u ? `cart_${u}` : 'cart_guest';
}
function loadCart(){
  return JSON.parse(localStorage.getItem(getCartKey() ) || '[]');
}
function saveCart(items){
  localStorage.setItem(getCartKey(), JSON.stringify(items||[]));
}
function clearCart(){ localStorage.removeItem(getCartKey()); }

/* ---------- UI helpers ---------- */
function formatRs(n){ return '₹' + Number(n).toFixed(0); }
function findProductById(id){ return PRODUCTS.find(p=>p.id===Number(id)); }

/* ---------- Startup: render header pieces (used on every page) ---------- */
function renderHeader() {
  // header elements if present
  const brandEl = document.querySelector('.brand h1');
  if(brandEl) brandEl.innerText = 'GreenNest';

  const cartBadge = document.querySelector('#cart-count');
  if(cartBadge){
    const count = loadCart().reduce((s,i)=>s+i.qty,0);
    cartBadge.innerText = count;
  }

  const authBtn = document.querySelector('#auth-btn');
  if(authBtn){
    const curr = getCurrentUser();
    authBtn.innerText = curr ? `Logout (${curr})` : 'Login';
    authBtn.onclick = ()=> {
      if(curr){
        setCurrentUser(null);
        alert('Logged out');
        location.reload();
      } else {
        location.href = 'login.html';
      }
    }
  }
}
  const cartIcon = document.getElementById('cart-icon');
  if(cartIcon){
    cartIcon.onclick = ()=> location.href = 'cart.html';
  }

/* ---------- Main page rendering ---------- */
function initIndexPage(){
  renderHeader();
  const productsContainer = document.querySelector('#products-grid');
  const stats = { category: 'All', q: '' };

  function renderGrid(list){
    productsContainer.innerHTML = '';
    list.forEach(p=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" data-id="${p.id}">
        <div class="name">${p.name}</div>
        <div class="muted">${p.category}</div>
        <div class="price">${formatRs(p.price)}</div>
        <div class="add">
          <div class="muted">Qty: <input type="number" min="1" value="1" style="width:60px;border-radius:6px;padding:6px;border:1px solid #e4efe4;"></div>
          <button class="btn add-to-cart" data-id="${p.id}">Add to cart</button>
        </div>
      `;
      productsContainer.appendChild(card);
    });
    // attach events
    productsContainer.querySelectorAll('img').forEach(img=>{
      img.onclick = (e)=> { location.href = `product.html?id=${img.dataset.id}`; };
    });
    productsContainer.querySelectorAll('.add-to-cart').forEach(btn=>{
      btn.onclick = (e)=>{
        const id = Number(btn.dataset.id);
        const qty = Number(btn.parentElement.querySelector('input').value || 1);
        addToCart(id, qty);
      };
    });
  }

  function loadAndFilter(){
    const q = document.querySelector('#search-input')?.value.trim().toLowerCase() || '';
    const cat = document.querySelector('.cat-btn.active')?.dataset?.cat || 'All';
    let list = PRODUCTS.filter(p => (cat==='All' || p.category===cat));
    if(q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    renderGrid(list);
    const gridCount = document.querySelector('#grid-count'); if(gridCount) gridCount.innerText = `${list.length} plants`;
    renderHeader();
  }

  // category buttons
  document.querySelectorAll('.cat-btn').forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll('.cat-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      loadAndFilter();
    };
  });
  // search
  document.querySelector('#search-input')?.addEventListener('input', loadAndFilter);

  // initial render
  renderGrid(PRODUCTS);
}

/* ---------- Add to cart ---------- */
function addToCart(productId, qty=1){
  const cart = loadCart();
  const found = cart.find(i=>i.id===productId);
  if(found) found.qty += qty;
  else cart.push({ id: productId, qty });
  saveCart(cart);
  alert('Added to cart');
  renderHeader();
}

/* ---------- Product page ---------- */
function initProductPage(){
  renderHeader();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id){ document.querySelector('#product-root').innerText='Product not found'; return; }
  const p = findProductById(id);
  if(!p){ document.querySelector('#product-root').innerText='Product not found'; return; }
  const root = document.querySelector('#product-root');
  root.innerHTML = `
    <div style="display:flex;gap:22px;flex-wrap:wrap;">
      <img src="${p.img}" alt="${p.name}" style="width:320px;height:320px;object-fit:cover;border-radius:12px;box-shadow:0 8px 20px rgba(10,30,10,0.06)">
      <div style="flex:1;min-width:220px;">
        <h2 style="margin-bottom:8px">${p.name}</h2>
        <div class="muted" style="margin-bottom:10px">${p.category}</div>
        <div style="font-weight:800;font-size:20px;color:#2d7a3e;margin-bottom:10px">${formatRs(p.price)}</div>
        <p class="muted" style="margin-bottom:12px">${p.desc}</p>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="prod-qty" type="number" min="1" value="1" style="width:80px;border-radius:8px;padding:8px;border:1px solid #e6efe6;">
          <button class="btn" id="prod-add">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  document.querySelector('#prod-add').onclick = ()=>{
    const qty = Number(document.querySelector('#prod-qty').value||1);
    addToCart(p.id, qty);
  };
}

/* ---------- Cart page ---------- */
function initCartPage(){
  renderHeader();
  const root = document.querySelector('#cart-root');
  function render(){
    const cart = loadCart();
    root.innerHTML = '';
    if(cart.length===0){ root.innerHTML = '<div class="center muted">Your cart is empty</div>'; return; }
    const table = document.createElement('div');
    table.style.display='grid';
    table.style.gap='12px';
    cart.forEach(item=>{
      const p = findProductById(item.id);
      const row = document.createElement('div'); row.className='card';
      row.innerHTML = `
        <div style="display:flex;gap:12px;align-items:center">
          <img src="${p.img}" style="width:100px;height:80px;object-fit:cover;border-radius:8px">
          <div style="flex:1">
            <div style="font-weight:800">${p.name}</div>
            <div class="muted">${p.category}</div>
            <div style="margin-top:8px">${formatRs(p.price)} x <input type="number" value="${item.qty}" min="1" data-id="${p.id}" style="width:70px;border-radius:6px;padding:6px;border:1px solid #e6efe6"></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <div style="font-weight:800">${formatRs(p.price * item.qty)}</div>
            <button class="btn remove" data-id="${p.id}" style="background:#e35d6a">Remove</button>
          </div>
        </div>
      `;
      table.appendChild(row);
    });
    // totals & pay
    const subtotal = cart.reduce((s,i)=> s + findProductById(i.id).price * i.qty, 0);
    const foot = document.createElement('div');
    foot.className='card';
    foot.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:800">Subtotal</div>
          <div class="muted">${formatRs(subtotal)}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn" id="checkout-btn">Proceed to Payment</button>
        </div>
      </div>
    `;
    root.appendChild(table);
    root.appendChild(foot);

    // events
    root.querySelectorAll('input[type=number]').forEach(inp=>{
      inp.addEventListener('change', ()=>{
        const id = Number(inp.dataset.id);
        const qty = Number(inp.value||1);
        const c = loadCart();
        const it = c.find(x=>x.id===id); if(it) it.qty = qty;
        saveCart(c);
        render();
        renderHeader();
      });
    });
    root.querySelectorAll('.remove').forEach(b=>{
      b.onclick = ()=> {
        const id = Number(b.dataset.id);
        let c = loadCart();
        c = c.filter(x=>x.id!==id);
        saveCart(c);
        render();
        renderHeader();
      }
    });

    document.getElementById('checkout-btn').onclick = ()=>{
      const curr = getCurrentUser();
      if(!curr){
        alert('Please login/signup before Ordering.');
        return location.href = 'login.html';
      }
      // open payment drawer
      openPaymentDrawer(subtotal);
    };
  }
  render();
}

/* Payment drawer (simple simulated) */
function openPaymentDrawer(amount){
  // create drawer element
  const drawer = document.createElement('div');
  drawer.style.position='fixed';
  drawer.style.right='20px';
  drawer.style.bottom='20px';
  drawer.style.width='380px';
  drawer.style.maxWidth='calc(100% - 40px)';
  drawer.style.background='white';
  drawer.style.borderRadius='12px';
  drawer.style.boxShadow='0 12px 40px rgba(10,30,10,0.1)';
  drawer.style.zIndex=9999;
  drawer.style.padding='16px';
  drawer.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div><strong>Payment</strong><div class="muted" style="font-size:13px">Amount: ${formatRs(amount)}</div></div>
      <button id="close-drawer" style="background:transparent;border:0;font-weight:700;cursor:pointer">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <label><input type="radio" name="pay" value="cod" checked> Cash on Delivery</label>
      <div id="cod-block" style="padding:8px;border-radius:8px;border:1px solid #eef7ee">
        <div class="muted">Deliver to saved address or add a new one.</div>
        <div style="margin-top:8px"><input id="cod-address" placeholder="Enter delivery address" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ddd"></div>
      </div>

      <label><input type="radio" name="pay" value="online"> Online Payment</label>
      <div id="online-block" style="display:none;padding:8px;border-radius:8px;border:1px solid #eef7ee">
        <div class="muted">Choose method</div>
        <select id="online-method" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ddd;margin-top:8px">
          <option value="upi">UPI</option>
          <option value="card">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
        <div id="online-form" style="margin-top:8px"></div>
      </div>

      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
        <button id="place-order" class="btn">Place Order</button>
      </div>
    </div>
  `;
  document.body.appendChild(drawer);
  document.getElementById('close-drawer').onclick = ()=> drawer.remove();

  // toggle blocks
  document.querySelectorAll('input[name=pay]').forEach(r=>{
    r.onchange = ()=> {
      const v = document.querySelector('input[name=pay]:checked').value;
      document.getElementById('cod-block').style.display = v==='cod' ? 'block' : 'none';
      document.getElementById('online-block').style.display = v==='online' ? 'block' : 'none';
    };
  });

  document.getElementById('online-method').onchange = (e)=>{
    const v = e.target.value; const f = document.getElementById('online-form');
    if(v==='upi'){
      f.innerHTML = `<input placeholder="Enter UPI ID (example@bank)" id="upi-id" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ddd">`;
    } else {
      f.innerHTML = `
        <input placeholder="Card number" id="card-no" style="width:100%;padding:8px;border-radius:8px;border:1px solid #ddd;margin-bottom:8px">
        <div style="display:flex;gap:8px">
          <input placeholder="MM/YY" id="card-exp" style="flex:1;padding:8px;border-radius:8px;border:1px solid #ddd">
          <input placeholder="CVV" id="card-cvv" style="width:90px;padding:8px;border-radius:8px;border:1px solid #ddd">
        </div>`;
    }
  };

  document.getElementById('place-order').onclick = ()=> {
    const method = document.querySelector('input[name=pay]:checked').value;
    const curr = getCurrentUser();
    if(!curr){ alert('Please login/signup before Ordering.'); drawer.remove(); return location.href='login.html'; }
    if(method==='cod'){
      const addr = document.getElementById('cod-address').value.trim();
      if(!addr){ alert('Please enter delivery address'); return; }
      finalizeOrder(curr, amount, 'COD', {address:addr});
    } else {
      // simple validation
      const om = document.getElementById('online-method').value;
      if(om==='upi'){
        const upi = document.getElementById('upi-id').value.trim();
        if(!upi){ alert('Enter UPI ID'); return; }
        finalizeOrder(curr, amount, 'Online-'+om, {upi});
      } else {
        const no = document.getElementById('card-no').value.trim();
        const exp = document.getElementById('card-exp').value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();
        if(!no||!exp||!cvv){ alert('Enter card details'); return; }
        finalizeOrder(curr, amount, 'Online-'+om, {card:no.slice(-4)});
      }
    }
    drawer.remove();
  };
}

function finalizeOrder(username, amount, method, meta){
  const cart = loadCart();
  if(cart.length===0){ alert('Cart is empty'); return; }

  const orders = JSON.parse(localStorage.getItem(`orders_${username}`) || '[]');
  const id = 'ORD' + Date.now();
  const items = cart.map(i=> ({...i, product:findProductById(i.id)}));

  const order = {
    id,
    user: username,
    items,
    amount,
    method,
    meta,
    date: new Date().toISOString()
  };

  orders.push(order);
  localStorage.setItem(`orders_${username}`, JSON.stringify(orders));

  clearCart();
  renderHeader();

  // Instead of redirecting immediately, show a temporary alert
  alert(`🎉 Order placed successfully!\nOrder ID: ${id}\nYou can view your receipt on the My Orders page.`);

  // Then redirect to orders page
  location.href = 'orders.html';
}

/* ---------- Signup / login logic ---------- */
function initSignupPage(){
  renderHeader();
  const form = document.getElementById('signup-form');
  form.onsubmit = (e)=>{
    e.preventDefault();
    const email = form.email.value.trim();
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const mobile = form.mobile.value.trim();
    const address = form.address.value.trim();
    if(!email||!username||!password){ alert('Please fill email, username and password'); return; }
    const users = loadUsers();
    if(users.some(u=>u.username===username)){ alert('Username already taken'); return; }
    users.push({ email, username, password, mobile, address });
    saveUsers(users);
    setCurrentUser(username);
    alert('Signup successful. Logged in as ' + username);
    location.href = 'index.html';
  };
}

function initLoginPage(){
  renderHeader();
  const form = document.getElementById('login-form');
  form.onsubmit = (e)=>{
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const users = loadUsers();
    const u = users.find(x=>x.username===username && x.password===password);
    if(!u){ alert('Invalid credentials'); return; }
    setCurrentUser(username);
    alert('Logged in');
    // merge guest cart -> user cart
    const guestCart = JSON.parse(localStorage.getItem('cart_guest')||'[]');
    const userCart = JSON.parse(localStorage.getItem(`cart_${username}`)||'[]');
    // merge quantities
    guestCart.forEach(g=>{
      const found = userCart.find(u=>u.id===g.id);
      if(found) found.qty += g.qty; else userCart.push(g);
    });
    localStorage.setItem(`cart_${username}`, JSON.stringify(userCart));
    localStorage.removeItem('cart_guest');
    location.href = 'index.html';
  };
}

/* ---------- Account page ---------- */
function initAccountPage(){
  renderHeader();
  const curr = getCurrentUser();
  if(!curr){ alert('Please login to view account'); return location.href='login.html'; }
  const users = loadUsers();
  const u = users.find(x=>x.username===curr);
  if(!u){ alert('User not found'); setCurrentUser(null); return location.href='login.html'; }
  // populate
  document.getElementById('acc-username').innerText = u.username;
  document.getElementById('acc-email').innerText = u.email;
  document.getElementById('acc-mobile').innerText = u.mobile || '-';
  document.getElementById('acc-address').innerText = u.address || '-';
}

function initOrdersPage() {
  const ordersRoot = document.getElementById("orders-root");
  if (!ordersRoot) return;

  const curr = getCurrentUser();
  if (!curr) {
    ordersRoot.innerHTML = "<p>Please login to see your orders.</p>";
    return;
  }

  const orders = JSON.parse(localStorage.getItem(`orders_${curr}`) || "[]");
  if (orders.length === 0) {
    ordersRoot.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  ordersRoot.innerHTML = orders.map(order => `
    <div class="order-card" style="border:1px solid #ccc; padding:15px; margin-bottom:15px; border-radius:10px; background:#f9f9f9;">
      <h3>Order #${order.id}</h3>
      <p><b>Date:</b> ${new Date(order.date).toLocaleString()}</p>
      <p><b>Payment Method:</b> ${order.method}</p>
      ${order.meta?.address ? `<p><b>Address:</b> ${order.meta.address}</p>` : ""}
      <div style="margin-top:10px;">
        <b>Items:</b>
        <ul>
          ${order.items.map(it => `<li>${it.product.name} x ${it.qty} - ₹${it.product.price * it.qty}</li>`).join("")}
        </ul>
      </div>
      <h4>Total: ₹${order.amount}</h4>
    </div>
  `).join("");
}
/* ---------- About page ---------- */
function initAboutPage(){
  renderHeader();
  const el = document.getElementById('about-root');
  el.innerHTML = `
    <div class="card">
      <h2>About GreenNest</h2>
      <p class="muted" style="margin-top:8px">
        GreenNest is a demo Smart Plant Management System combining a plant shop,
        care tips, and an easy-to-use ordering workflow. This is a client-side
        prototype using localStorage for demo purposes.
      </p>
      <h3 style="margin-top:12px">Features</h3>
      <ul class="muted">
        <li>Browse plants by category and search</li>
        <li>Add to cart and place orders (COD / Online simulated)</li>
        <li>Signup and Login (client-side demo)</li>
        <li>Order receipts and account details</li>
      </ul>
    </div>
  `;
}

/* ---------- Sidebar (hamburger) ---------- */
function initSidebar(){
  const ham = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  if(!ham || !sidebar) return;
  ham.onclick = ()=> sidebar.classList.toggle('open');
  // close when clicking outside
  window.addEventListener('click', (e)=>{
    if(!sidebar.contains(e.target) && !ham.contains(e.target)) sidebar.classList.remove('open');
  });
}

/* ---------- Utility: called by each page to init appropriate handlers ---------- */
function globalInit() {
  initSidebar();
  renderHeader();
  // set default brand logo text if present
  document.querySelectorAll('.brand .logo').forEach(el=> el.innerText = '🌱');
  // cart icon to cart page
  const cartIcon = document.querySelector('#cart-icon');
  if(cartIcon) cartIcon.onclick = ()=> location.href = 'cart.html';
  // go to home on brand click
  document.querySelectorAll('.brand').forEach(b=> b.onclick = ()=> location.href='index.html');
}

/* ---------- Expose functions for pages ---------- */
window.GreenNest = {
  globalInit, initIndexPage, initProductPage, initCartPage,
  initSignupPage, initLoginPage, initAccountPage, initOrdersPage, initAboutPage
};

