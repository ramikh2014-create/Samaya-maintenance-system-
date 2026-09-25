const I18N = {
  en:{ title:"Hotel Maintenance Console", subtitle:"211 apartments · work order tracking",
    newOrder:"+ New order", tabDashboard:"Dashboard", tabOrders:"Work Orders", tabRooms:"Rooms", tabReport:"Daily Report", tabTypes:"Types Reference",
    priorityBreakdown:"Priority breakdown", recentActivity:"Recent work orders",
    searchPlaceholder:"Search by room, technician, note...", noOrders:"No work orders match your filters.",
    legendNone:"No open issues", legendProgress:"In progress", legendPending:"Pending",
    newOrderTitle:"New work order", editOrderTitle:"Edit work order",
    fRoom:"Apartment number", fDate:"Date reported", fCategory:"Category", fPriority:"Priority", fType:"Issue / maintenance type",
    fStatus:"Status", fCost:"Cost (AED)", fTech:"Technician", fCompleted:"Completion date", fNotes:"Notes",
    delete:"Delete", cancel:"Cancel", save:"Save order",
    storageHint:"Live and shared with everyone using this app.",
    storageHintSolo:"Can't reach the server right now — check the backend is running.",
    statTotal:"Total orders", statDone:"Completed", statProgress:"In progress", statPending:"Pending",
    high:"High priority", med:"Medium priority", low:"Low priority",
    colOrder:"#", colRoom:"Apt", colDate:"Date", colType:"Type", colCategory:"Category", colPriority:"Priority",
    colStatus:"Status", colTech:"Technician", colCost:"Cost", colActions:"",
    all:"All statuses", allP:"All priorities", allT:"All apartment types", statusPending:"Pending", statusProgress:"In progress", statusDone:"Completed",
    statusOnHold:"On hold", statusCancelled:"Cancelled", statOnHold:"On hold", statCancelled:"Cancelled",
    closeJob:"Close job", reopenJob:"Reopen",
    typeStudio:"Studio", type1BR:"One-Bedroom",
    roomType:"Apartment type", viewOrders:"View work orders",
    printReport:"Print / Save PDF", reportFor:"Work orders reported on", noOrdersDay:"No work orders were reported on this date.",
    reportTotal:"Requests today", reportCost:"Total cost", reportHigh:"High priority",
    syncLive:"Live · shared", syncSolo:"Offline", syncConnecting:"Connecting…",
    saveError:"Could not save. Please check your connection and try again."
  },
  ar:{ title:"نظام إدارة صيانة الفندق", subtitle:"٢١١ شقة · تتبع أوامر العمل",
    newOrder:"+ طلب جديد", tabDashboard:"لوحة التحكم", tabOrders:"سجل الأعمال", tabRooms:"الشقق", tabReport:"التقرير اليومي", tabTypes:"مرجع الأنواع",
    priorityBreakdown:"توزيع الأولويات", recentActivity:"أحدث أوامر العمل",
    searchPlaceholder:"ابحث برقم الشقة، الفني، الملاحظات...", noOrders:"لا توجد أوامر عمل مطابقة.",
    legendNone:"لا يوجد أعطال", legendProgress:"قيد التنفيذ", legendPending:"معلقة",
    newOrderTitle:"طلب عمل جديد", editOrderTitle:"تعديل طلب العمل",
    fRoom:"رقم الشقة", fDate:"تاريخ الإبلاغ", fCategory:"الفئة", fPriority:"الأولوية", fType:"نوع الصيانة",
    fStatus:"الحالة", fCost:"التكلفة (درهم)", fTech:"الفني المسؤول", fCompleted:"تاريخ الإنجاز", fNotes:"ملاحظات",
    delete:"حذف", cancel:"إلغاء", save:"حفظ الطلب",
    storageHint:"مباشر ومشترك مع كل من يستخدم هذا التطبيق.",
    storageHintSolo:"تعذر الوصول إلى الخادم الآن — تحقق من تشغيل الواجهة الخلفية.",
    statTotal:"إجمالي الطلبات", statDone:"منجزة", statProgress:"قيد التنفيذ", statPending:"معلقة",
    high:"أولوية عالية", med:"أولوية متوسطة", low:"أولوية منخفضة",
    colOrder:"#", colRoom:"الشقة", colDate:"التاريخ", colType:"النوع", colCategory:"الفئة", colPriority:"الأولوية",
    colStatus:"الحالة", colTech:"الفني", colCost:"التكلفة", colActions:"",
    all:"كل الحالات", allP:"كل الأولويات", allT:"كل أنواع الشقق", statusPending:"معلق", statusProgress:"جاري", statusDone:"مكتمل",
    statusOnHold:"معلّق مؤقتًا", statusCancelled:"ملغى", statOnHold:"معلّق مؤقتًا", statCancelled:"ملغاة",
    closeJob:"إغلاق المهمة", reopenJob:"إعادة فتح",
    typeStudio:"استوديو", type1BR:"غرفة نوم واحدة",
    roomType:"نوع الشقة", viewOrders:"عرض أوامر العمل",
    printReport:"طباعة / حفظ PDF", reportFor:"أوامر العمل المُبلغ عنها بتاريخ", noOrdersDay:"لا توجد أوامر عمل بهذا التاريخ.",
    reportTotal:"طلبات اليوم", reportCost:"إجمالي التكلفة", reportHigh:"أولوية عالية",
    syncLive:"مباشر · مشترك", syncSolo:"غير متصل", syncConnecting:"جارٍ الاتصال…",
    saveError:"تعذّر الحفظ. يرجى التحقق من الاتصال والمحاولة مرة أخرى."
  }
};
let lang = 'en';
function t(key){ return I18N[lang][key] || key; }
function typeLabel(code){ return code==='Studio'?t('typeStudio'):t('type1BR'); }

const TYPES = [
 {cat:"Electrical",catAr:"كهرباء",icon:"⚡",name:"Bulb Replacement",nameAr:"تغيير لمبة",cost:"50-100 AED",pri:"low"},
 {cat:"Electrical",catAr:"كهرباء",icon:"⚡",name:"Switch Repair",nameAr:"إصلاح مفتاح",cost:"80-150 AED",pri:"med"},
 {cat:"Electrical",catAr:"كهرباء",icon:"⚡",name:"Circuit Breaker Fix",nameAr:"إصلاح قاطع كهرباء",cost:"150-300 AED",pri:"high"},
 {cat:"Electrical",catAr:"كهرباء",icon:"⚡",name:"Outlet Installation",nameAr:"تركيب مخرج كهربائي",cost:"100-200 AED",pri:"med"},
 {cat:"Plumbing",catAr:"سباكة",icon:"🚿",name:"Water Leak Fix",nameAr:"إصلاح تسريب مياه",cost:"200-500 AED",pri:"high"},
 {cat:"Plumbing",catAr:"سباكة",icon:"🚿",name:"Faucet Repair",nameAr:"إصلاح صنبور",cost:"100-250 AED",pri:"med"},
 {cat:"Plumbing",catAr:"سباكة",icon:"🚿",name:"Mixer Replacement",nameAr:"استبدال خلاط",cost:"200-400 AED",pri:"med"},
 {cat:"AC/HVAC",catAr:"تكييف",icon:"❄️",name:"Filter Cleaning",nameAr:"تنظيف فلتر",cost:"50-100 AED",pri:"low"},
 {cat:"AC/HVAC",catAr:"تكييف",icon:"❄️",name:"Gas Refill",nameAr:"شحن غاز",cost:"150-300 AED",pri:"med"},
 {cat:"AC/HVAC",catAr:"تكييف",icon:"❄️",name:"Indoor Unit Repair",nameAr:"إصلاح وحدة داخلية",cost:"300-600 AED",pri:"high"},
 {cat:"Carpentry",catAr:"نجارة",icon:"🪵",name:"Door Repair",nameAr:"إصلاح باب",cost:"100-300 AED",pri:"med"},
 {cat:"Carpentry",catAr:"نجارة",icon:"🪵",name:"Lock Replacement",nameAr:"استبدال قفل",cost:"150-300 AED",pri:"med"},
 {cat:"Carpentry",catAr:"نجارة",icon:"🪵",name:"Furniture Repair",nameAr:"إصلاح أثاث",cost:"100-500 AED",pri:"low"},
 {cat:"Painting",catAr:"دهان",icon:"🖌️",name:"Wall Painting",nameAr:"دهان جدار",cost:"150-400 AED",pri:"low"},
 {cat:"Painting",catAr:"دهان",icon:"🖌️",name:"Scratch Touch-up",nameAr:"إصلاح خدش",cost:"50-150 AED",pri:"low"},
 {cat:"TV/Electronics",catAr:"تلفزيون",icon:"📺",name:"TV Repair",nameAr:"إصلاح تلفزيون",cost:"150-300 AED",pri:"med"},
 {cat:"TV/Electronics",catAr:"تلفزيون",icon:"📺",name:"Remote Replacement",nameAr:"استبدال ريموت",cost:"50-100 AED",pri:"low"},
 {cat:"TV/Electronics",catAr:"تلفزيون",icon:"📺",name:"IPTV Setup",nameAr:"إعداد IPTV",cost:"100-200 AED",pri:"med"},
 {cat:"Sanitary",catAr:"صحي",icon:"🚽",name:"Drain Cleaning",nameAr:"تنظيف صرف",cost:"100-200 AED",pri:"high"},
 {cat:"Sanitary",catAr:"صحي",icon:"🚽",name:"Toilet Repair",nameAr:"إصلاح مرحاض",cost:"150-350 AED",pri:"high"},
 {cat:"Sanitary",catAr:"صحي",icon:"🚽",name:"Shower Replacement",nameAr:"تغيير دش",cost:"200-500 AED",pri:"med"},
 {cat:"Other",catAr:"أخرى",icon:"🔧",name:"General Maintenance",nameAr:"صيانة عامة",cost:"100-300 AED",pri:"med"},
 {cat:"Other",catAr:"أخرى",icon:"🔧",name:"Deep Cleaning",nameAr:"تنظيف مكثف",cost:"200-500 AED",pri:"low"}
];
const CATEGORIES = [...new Set(TYPES.map(t=>t.cat))];

// ---------------- API layer ----------------
async function api(path, options={}){
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {'Content-Type':'application/json'},
    ...options
  });
  if(!res.ok){
    let msg = res.statusText;
    try{ const j = await res.json(); if(j.error) msg = j.error; }catch(e){}
    throw new Error(msg);
  }
  if(res.status === 204) return null;
  return res.json();
}
const Orders = {
  list: () => api('/api/orders'),
  create: (data) => api('/api/orders', {method:'POST', body:JSON.stringify(data)}),
  update: (id, data) => api(`/api/orders/${id}`, {method:'PATCH', body:JSON.stringify(data)}),
  close: (id) => api(`/api/orders/${id}/close`, {method:'POST'}),
  reopen: (id) => api(`/api/orders/${id}/reopen`, {method:'POST'}),
  remove: (id) => api(`/api/orders/${id}`, {method:'DELETE'}),
};
const Rooms = {
  list: () => api('/api/rooms'),
  setType: (number, type) => api(`/api/rooms/${number}`, {method:'PATCH', body:JSON.stringify({type})}),
};

let orders = [];
let rooms = [];
let pollTimer = null;
let modalIsOpen = false;

function updateSyncBadge(state){
  const el = document.getElementById('syncBadge');
  el.classList.remove('live','solo');
  if(state==='live'){ el.classList.add('live'); el.textContent = '● ' + t('syncLive'); }
  else if(state==='solo'){ el.classList.add('solo'); el.textContent = '● ' + t('syncSolo'); }
  else { el.textContent = '● ' + t('syncConnecting'); }
  const hint = document.querySelector('.hint');
  if(hint) hint.textContent = state==='live' ? t('storageHint') : t('storageHintSolo');
}

async function refreshAll(){
  try{
    const [o, r] = await Promise.all([Orders.list(), Rooms.list()]);
    orders = o;
    rooms = r;
    updateSyncBadge('live');
    if(!modalIsOpen) buildRoomSelect();
    render();
  }catch(err){
    console.error(err);
    updateSyncBadge('solo');
  }
}

function startPolling(){
  if(pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(()=>{ if(!modalIsOpen) refreshAll(); }, 8000);
}

async function initData(){
  document.getElementById('reportDate').value = new Date().toISOString().slice(0,10);
  updateSyncBadge('connecting');
  applyLang();
  await refreshAll();
  startPolling();
}

function applyLang(){
  document.body.setAttribute('dir', lang==='ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-t]').forEach(el=>{ el.textContent = t(el.getAttribute('data-t')); });
  document.querySelectorAll('[data-t-ph]').forEach(el=>{ el.placeholder = t(el.getAttribute('data-t-ph')); });
  document.getElementById('langBtn').textContent = lang==='ar' ? 'English' : 'العربية';
  buildFilters();
  buildCategorySelect();
  buildRoomSelect();
  render();
}

function priLabel(p){ return t(p); }
function priClass(p){ return p==='high'?'high':(p==='med'?'med':'low'); }
function statusLabel(s){
  if(s==='done') return t('statusDone');
  if(s==='progress') return t('statusProgress');
  if(s==='onhold') return t('statusOnHold');
  if(s==='cancelled') return t('statusCancelled');
  return t('statusPending');
}
function statusClass(s){
  if(s==='done') return 'done';
  if(s==='progress') return 'progress';
  if(s==='onhold') return 'onhold';
  if(s==='cancelled') return 'cancelled';
  return 'pending';
}
function fmtDate(d){ return d || '—'; }
function shortId(id){ return (id||'').toString().replace(/-/g,'').slice(-5).toUpperCase(); }

function buildFilters(){
  const sf = document.getElementById('statusFilter');
  const pf = document.getElementById('priorityFilter');
  const rf = document.getElementById('roomTypeFilter');
  sf.innerHTML = `<option value="">${t('all')}</option><option value="pending">${t('statusPending')}</option><option value="progress">${t('statusProgress')}</option><option value="onhold">${t('statusOnHold')}</option><option value="done">${t('statusDone')}</option><option value="cancelled">${t('statusCancelled')}</option>`;
  pf.innerHTML = `<option value="">${t('allP')}</option><option value="high">${t('high')}</option><option value="med">${t('med')}</option><option value="low">${t('low')}</option>`;
  rf.innerHTML = `<option value="">${t('allT')}</option><option value="Studio">${t('typeStudio')}</option><option value="1BR">${t('type1BR')}</option>`;
}
function buildCategorySelect(){
  document.getElementById('fCategory').innerHTML = CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('');
}
function buildRoomSelect(){
  const el = document.getElementById('fRoom');
  const prev = el.value;
  el.innerHTML = rooms.map(r=>`<option value="${r.number}">${r.number} — ${typeLabel(r.type)}</option>`).join('');
  if(prev) el.value = prev;
}

function roomStatus(roomNo){
  const ro = orders.filter(o=>o.room===roomNo && o.status!=='cancelled');
  if(ro.some(o=>o.status==='pending')) return 'pending';
  if(ro.some(o=>o.status==='onhold')) return 'pending';
  if(ro.some(o=>o.status==='progress')) return 'progress';
  if(ro.length) return 'done';
  return 'none';
}

function renderDashboard(){
  const total = orders.length;
  const done = orders.filter(o=>o.status==='done').length;
  const progress = orders.filter(o=>o.status==='progress').length;
  const pending = orders.filter(o=>o.status==='pending').length;
  const onhold = orders.filter(o=>o.status==='onhold').length;
  const cancelled = orders.filter(o=>o.status==='cancelled').length;
  document.getElementById('statCards').innerHTML = `
    <div class="card blue"><div class="n">${total}</div><div class="l">${t('statTotal')}</div></div>
    <div class="card teal"><div class="n">${done}</div><div class="l">${t('statDone')}</div></div>
    <div class="card amber"><div class="n">${progress}</div><div class="l">${t('statProgress')}</div></div>
    <div class="card red"><div class="n">${pending}</div><div class="l">${t('statPending')}</div></div>
    <div class="card blue"><div class="n">${onhold}</div><div class="l">${t('statOnHold')}</div></div>
    <div class="card grey"><div class="n">${cancelled}</div><div class="l">${t('statCancelled')}</div></div>`;

  const byPri = {high:0, med:0, low:0};
  orders.forEach(o=>{ byPri[o.priority] = (byPri[o.priority]||0)+1; });
  const maxP = Math.max(1, byPri.high, byPri.med, byPri.low);
  const colors = {high:'var(--red)', med:'var(--amber)', low:'var(--teal)'};
  document.getElementById('priorityRows').innerHTML = ['high','med','low'].map(p=>`
    <div class="pr-row">
      <span><span class="dot" style="background:${colors[p]}"></span>${priLabel(p)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(byPri[p]/maxP*100)}%;background:${colors[p]}"></div></div>
      <strong>${byPri[p]}</strong>
    </div>`).join('');

  const recent = orders.slice().sort((a,b)=> (b.date||'').localeCompare(a.date||'')).slice(0,6);
  document.getElementById('recentTable').innerHTML = ordersTableHTML(recent, false);
}

function ordersTableHTML(list, showActions){
  if(!list.length) return '';
  let head = `<tr>
    <th>${t('colOrder')}</th><th>${t('colRoom')}</th><th>${t('colDate')}</th><th>${t('colType')}</th>
    <th>${t('colCategory')}</th><th>${t('colPriority')}</th><th>${t('colStatus')}</th>
    <th>${t('colTech')}</th><th>${t('colCost')}</th>${showActions?'<th></th>':''}</tr>`;
  let rows = list.map(o=>{
    const isClosed = o.status==='done' || o.status==='cancelled';
    const quickBtn = isClosed
      ? `<button class="icon-btn qa-reopen" data-id="${o.id}" type="button" title="${t('reopenJob')}">↺</button>`
      : `<button class="icon-btn qa-close" data-id="${o.id}" type="button" title="${t('closeJob')}">✓</button>`;
    return `<tr ${showActions?`class="ord-row" data-id="${o.id}" style="cursor:pointer;"`:''}>
    <td>#${shortId(o.id)}</td>
    <td>${o.room}</td>
    <td>${fmtDate(o.date)}</td>
    <td>${o.issue_type||'—'}</td>
    <td>${o.category||'—'}</td>
    <td><span class="pill ${priClass(o.priority)}">${priLabel(o.priority)}</span></td>
    <td><span class="pill ${statusClass(o.status)}">${statusLabel(o.status)}</span></td>
    <td>${o.technician||'—'}</td>
    <td>${o.cost?o.cost+' AED':'—'}</td>
    ${showActions?`<td style="white-space:nowrap;"><span class="icon-btn">✎</span> ${quickBtn}</td>`:''}
  </tr>`;
  }).join('');
  return `<thead>${head}</thead><tbody>${rows}</tbody>`;
}

let activeStatusFilter = '', activePriorityFilter = '', activeSearch = '', activeRoomFilter = null, activeRoomTypeFilter = '';

function renderOrders(){
  let list = orders.slice();
  if(activeRoomFilter) list = list.filter(o=>o.room===activeRoomFilter);
  if(activeStatusFilter) list = list.filter(o=>o.status===activeStatusFilter);
  if(activePriorityFilter) list = list.filter(o=>o.priority===activePriorityFilter);
  if(activeSearch){
    const s = activeSearch.toLowerCase();
    list = list.filter(o => String(o.room).includes(s) || (o.technician||'').toLowerCase().includes(s) ||
      (o.notes||'').toLowerCase().includes(s) || (o.issue_type||'').toLowerCase().includes(s));
  }
  list.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
  document.getElementById('ordersTable').innerHTML = ordersTableHTML(list, true);
  document.getElementById('ordersEmpty').style.display = list.length? 'none':'block';
  document.querySelectorAll('.ord-row').forEach(row=>{
    row.addEventListener('click', ()=> openModal(row.getAttribute('data-id')));
  });
  document.querySelectorAll('.qa-close').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      e.stopPropagation();
      try{ await Orders.close(btn.getAttribute('data-id')); await refreshAll(); }
      catch(err){ alert(t('saveError')); }
    });
  });
  document.querySelectorAll('.qa-reopen').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      e.stopPropagation();
      try{ await Orders.reopen(btn.getAttribute('data-id')); await refreshAll(); }
      catch(err){ alert(t('saveError')); }
    });
  });
}

function renderRooms(){
  let list = rooms.slice();
  if(activeRoomTypeFilter) list = list.filter(r=>r.type===activeRoomTypeFilter);
  let html = '';
  list.forEach(r=>{
    const st = roomStatus(r.number);
    html += `<div class="room ${st==='none'?'':st}" data-room="${r.number}"><span>${r.number}</span><span class="rt">${typeLabel(r.type)}</span></div>`;
  });
  document.getElementById('roomsGrid').innerHTML = html;
  document.querySelectorAll('.room').forEach(el=>{
    el.addEventListener('click', ()=> openRoomModal(parseInt(el.getAttribute('data-room'))));
  });
}

function renderTypes(){
  let html = '';
  CATEGORIES.forEach(cat=>{
    const items = TYPES.filter(x=>x.cat===cat);
    html += `<div class="cat-group">${items[0].icon} ${cat} · ${items[0].catAr}</div>`;
    items.forEach(x=>{
      html += `<div class="type-card">
        <div><div class="tn">${lang==='ar'?x.nameAr:x.name}</div><div class="tc">${lang==='ar'?x.name:x.nameAr}</div></div>
        <div style="text-align:end;">
          <div class="pill ${priClass(x.pri)}">${priLabel(x.pri)}</div>
          <div class="tc" style="margin-top:4px;">${x.cost}</div>
        </div>
      </div>`;
    });
  });
  document.getElementById('typesList').innerHTML = html;
}

function renderReport(){
  const date = document.getElementById('reportDate').value;
  document.getElementById('reportDateLabel').textContent = `${t('reportFor')} ${date}`;
  const list = orders.filter(o=>o.date===date).sort((a,b)=>a.room-b.room);
  const totalCost = list.reduce((s,o)=>s+(Number(o.cost)||0),0);
  const highCount = list.filter(o=>o.priority==='high').length;
  document.getElementById('reportCards').innerHTML = `
    <div class="card blue"><div class="n">${list.length}</div><div class="l">${t('reportTotal')}</div></div>
    <div class="card red"><div class="n">${highCount}</div><div class="l">${t('reportHigh')}</div></div>
    <div class="card amber"><div class="n">${totalCost}</div><div class="l">${t('reportCost')} (AED)</div></div>`;
  document.getElementById('reportTable').innerHTML = ordersTableHTML(list, false);
  document.getElementById('reportEmpty').style.display = list.length ? 'none' : 'block';
  document.getElementById('reportEmpty').textContent = t('noOrdersDay');
}

function render(){
  renderDashboard();
  renderOrders();
  renderRooms();
  renderTypes();
  renderReport();
}

function switchView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.getAttribute('data-view')===name));
  if(name!=='orders') activeRoomFilter = null;
}

document.querySelectorAll('.tab-btn').forEach(b=>{
  b.addEventListener('click', ()=> switchView(b.getAttribute('data-view')));
});
document.getElementById('langBtn').addEventListener('click', ()=>{
  lang = lang==='en' ? 'ar' : 'en';
  applyLang();
});
document.getElementById('searchBox').addEventListener('input', (e)=>{ activeSearch = e.target.value; renderOrders(); });
document.getElementById('statusFilter').addEventListener('change', (e)=>{ activeStatusFilter = e.target.value; renderOrders(); });
document.getElementById('priorityFilter').addEventListener('change', (e)=>{ activePriorityFilter = e.target.value; renderOrders(); });
document.getElementById('roomTypeFilter').addEventListener('change', (e)=>{ activeRoomTypeFilter = e.target.value; renderRooms(); });
document.getElementById('reportDate').addEventListener('change', renderReport);
document.getElementById('printBtn').addEventListener('click', ()=> window.print());

const modalBg = document.getElementById('modalBg');
function openModal(id){
  modalIsOpen = true;
  const isEdit = !!id;
  document.getElementById('modalTitle').textContent = isEdit ? t('editOrderTitle') : t('newOrderTitle');
  document.getElementById('deleteBtn').style.display = isEdit ? 'inline-block' : 'none';
  if(isEdit){
    const o = orders.find(x=>x.id===id);
    if(!o){ modalIsOpen=false; return; }
    document.getElementById('editId').value = o.id;
    document.getElementById('fRoom').value = o.room;
    document.getElementById('fDate').value = o.date||'';
    document.getElementById('fCategory').value = o.category||CATEGORIES[0];
    document.getElementById('fPriority').value = o.priority||'med';
    document.getElementById('fType').value = o.issue_type||'';
    document.getElementById('fStatus').value = o.status||'pending';
    document.getElementById('fCost').value = o.cost||'';
    document.getElementById('fTech').value = o.technician||'';
    document.getElementById('fCompleted').value = o.completed_date||'';
    document.getElementById('fNotes').value = o.notes||'';
  }else{
    document.getElementById('editId').value = '';
    document.getElementById('fRoom').value = rooms.length ? rooms[0].number : '';
    document.getElementById('fDate').value = new Date().toISOString().slice(0,10);
    document.getElementById('fCategory').value = CATEGORIES[0];
    document.getElementById('fPriority').value = 'med';
    document.getElementById('fType').value = '';
    document.getElementById('fStatus').value = 'pending';
    document.getElementById('fCost').value = '';
    document.getElementById('fTech').value = '';
    document.getElementById('fCompleted').value = '';
    document.getElementById('fNotes').value = '';
  }
  modalBg.classList.add('open');
}
function closeModal(){ modalBg.classList.remove('open'); modalIsOpen = false; }
document.getElementById('newOrderBtn').addEventListener('click', ()=>openModal(null));
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modalBg.addEventListener('click', (e)=>{ if(e.target===modalBg) closeModal(); });

document.getElementById('saveBtn').addEventListener('click', async ()=>{
  const room = parseInt(document.getElementById('fRoom').value);
  const id = document.getElementById('editId').value;
  const data = {
    room, date: document.getElementById('fDate').value,
    category: document.getElementById('fCategory').value,
    priority: document.getElementById('fPriority').value,
    issue_type: document.getElementById('fType').value,
    status: document.getElementById('fStatus').value,
    cost: parseFloat(document.getElementById('fCost').value)||0,
    technician: document.getElementById('fTech').value,
    completed_date: document.getElementById('fCompleted').value || null,
    notes: document.getElementById('fNotes').value
  };
  closeModal();
  try{
    if(id){ await Orders.update(id, data); } else { await Orders.create(data); }
    await refreshAll();
  }catch(err){ alert(t('saveError')); }
});
document.getElementById('deleteBtn').addEventListener('click', async ()=>{
  const id = document.getElementById('editId').value;
  closeModal();
  try{ await Orders.remove(id); await refreshAll(); }
  catch(err){ alert(t('saveError')); }
});

const roomModalBg = document.getElementById('roomModalBg');
let activeRoomNumber = null;
function roomType(num){ const r = rooms.find(x=>x.number===num); return r ? r.type : ''; }
function openRoomModal(num){
  modalIsOpen = true;
  activeRoomNumber = num;
  document.getElementById('roomModalTitle').textContent = num;
  document.getElementById('roomTypeSelect').value = roomType(num);
  roomModalBg.classList.add('open');
}
document.getElementById('roomTypeSelect').addEventListener('change', async (e)=>{
  try{ await Rooms.setType(activeRoomNumber, e.target.value); await refreshAll(); }
  catch(err){ alert(t('saveError')); }
});
document.getElementById('roomCancelBtn').addEventListener('click', ()=>{ roomModalBg.classList.remove('open'); modalIsOpen=false; });
roomModalBg.addEventListener('click', (e)=>{ if(e.target===roomModalBg){ roomModalBg.classList.remove('open'); modalIsOpen=false; } });
document.getElementById('roomViewOrdersBtn').addEventListener('click', ()=>{
  roomModalBg.classList.remove('open');
  modalIsOpen = false;
  activeRoomFilter = activeRoomNumber;
  document.getElementById('searchBox').value = '';
  activeSearch=''; activeStatusFilter=''; activePriorityFilter='';
  document.getElementById('statusFilter').value=''; document.getElementById('priorityFilter').value='';
  switchView('orders');
  renderOrders();
});

initData();
