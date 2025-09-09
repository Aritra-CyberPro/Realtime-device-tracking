
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const Store = {
  get(k,f){ try{ return JSON.parse(localStorage.getItem(k)) ?? f } catch(e){ return f } },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)) }
};
(function seed(){
  if(Store.get('rt_seeded')) return;
  const devices=[
    {id:'D-201', label:'Delivery Team 1', owner:'Aarav Sharma', phone:'+91 90000 11111', status:'Online'},
    {id:'D-202', label:'Support Van', owner:'Isha Patel', phone:'+91 90000 22222', status:'Online'},
    {id:'D-203', label:'Ops Lead', owner:'Kabir Singh', phone:'+91 90000 33333', status:'Offline'},
  ];
  function mkTrack(lat,lng){
    const now=Date.now();
    return Array.from({length:30}).map((_,i)=>({lat:lat + (Math.random()-.5)*0.02*i/10, lng:lng + (Math.random()-.5)*0.02*i/10, t: now - (30-i)*15000}));
  }
  const tracks={'D-201':mkTrack(28.6139,77.2090),'D-202':mkTrack(28.6448,77.2167),'D-203':mkTrack(28.5672,77.3210)};
  Store.set('rt_devices',devices); Store.set('rt_tracks',tracks); Store.set('rt_seeded',true);
})();
class MockSocket{
  constructor(cb){
    this.cb=cb;
    this.timer=setInterval(()=>{
      const tracks=Store.get('rt_tracks',{});
      Object.keys(tracks).forEach(id=>{
        const last=tracks[id][tracks[id].length-1];
        tracks[id].push({lat:last.lat + (Math.random()-.5)*0.0015, lng:last.lng + (Math.random()-.5)*0.0015, t: Date.now()});
      });
      Store.set('rt_tracks',tracks); cb(tracks);
    },2000);
  }
  close(){clearInterval(this.timer)}
}
function initSidebar(active){ $$('.nav a').forEach(a=>{ if(a.dataset.page===active) a.classList.add('active') }) }
function renderDashboard(){
  const devs=Store.get('rt_devices',[]);
  $('#kpi-devices').textContent=devs.length;
  $('#kpi-online').textContent=devs.filter(d=>d.status==='Online').length;
  $('#kpi-offline').textContent=devs.filter(d=>d.status!=='Online').length;
  const tbody=$('#dev-tbody'); if(!tbody) return; tbody.innerHTML='';
  devs.forEach(d=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${d.label}</td><td>${d.id}</td><td>${d.owner}</td><td>${d.phone}</td><td><span class="badge">${d.status}</span></td>`;
    tbody.appendChild(tr);
  });
}
function renderLiveMap(){
  const devs=Store.get('rt_devices',[]);
  const sel=$('#deviceSel'); devs.forEach(d=>{const o=document.createElement('option');o.value=d.id;o.textContent=`${d.label} (${d.id})`;sel.appendChild(o)});
  const first=devs[0]?.id;
  let map=L.map('map').setView([28.6139,77.2090],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
  let path, marker;
  function plot(id){
    const t=Store.get('rt_tracks',{})[id]||[];
    if(path) map.removeLayer(path); if(marker) map.removeLayer(marker);
    const latlngs=t.map(p=>[p.lat,p.lng]);
    if(latlngs.length){
      path=L.polyline(latlngs).addTo(map);
      marker=L.marker(latlngs.at(-1)).addTo(map);
      map.fitBounds(path.getBounds(),{padding:[30,30]});
      $('#lastTs').textContent=new Date(t.at(-1).t).toLocaleString();
    }
  }
  sel.addEventListener('change', e=>plot(e.target.value)); plot(first);
  const sock=new MockSocket(all=>{
    const id=sel.value||first; const t=all[id]||[];
    if(t.length){
      const latlng=[t.at(-1).lat,t.at(-1).lng];
      if(marker) marker.setLatLng(latlng);
      if(path) path.addLatLng(latlng);
      $('#lastTs').textContent=new Date(t.at(-1).t).toLocaleString();
    }
  });
  window.addEventListener('beforeunload',()=>sock.close());
}
function login(e){ e.preventDefault(); const email=$('#email').value.trim(); const pass=$('#password').value.trim(); if(email && pass){ localStorage.setItem('rt_session', JSON.stringify({user:'Admin', email})); window.location.href='dashboard.html' } else alert('Enter email and password') }
function logout(){ localStorage.removeItem('rt_session'); window.location.href='index.html' }
function requireAuth(){ if(!localStorage.getItem('rt_session')) window.location.href='index.html' }
