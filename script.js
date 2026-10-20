// EDIT BAGIAN INI UNTUK MENGGANTI ISI AU
const AU = {
  owner: "Aksara Harsa Mahendra",
  wallpaper: "linear-gradient(145deg,#f8d8e8,#d7e7fb 55%,#e7d9ff)",
  contacts: [
    {id:"aluna", name:"Aluna Kirana Putri", short:"Aluna", avatar:"A", preview:"kamu udah pulang?", messages:[
      {from:"them", text:"Aksa, kamu udah pulang?"},
      {from:"me", text:"Baru aja. Kenapa, Lun?"},
      {from:"them", text:"Nggak apa-apa. Cuma mau mastiin aja."},
      {from:"me", text:"Tumben perhatian."},
      {from:"them", text:"Geer banget sih kamu 😭"}
    ], call:["Halo?","Kamu lagi sibuk nggak?","Aku cuma pengin denger suara kamu sebentar.","Oh… yaudah, jangan lupa istirahat, ya."]},
    {id:"ibu", name:"Bunda", short:"Bunda", avatar:"♡", preview:"Jangan lupa makan ya.", messages:[
      {from:"them",text:"Jangan lupa makan ya."},
      {from:"me",text:"Iya, Bun. Nanti aku makan."}
    ], call:["Halo, Nak?","Kamu udah makan belum?","Jangan tidur terlalu malam, ya."]}
  ],
  instagram: {username:"aksarahm", name:"Aksara Harsa", bio:"little things, little coincidences ✦", posts:[
    {emoji:"🌆", caption:"langit sore hari ini bagus."},
    {emoji:"🐩", caption:"some things stay with us."},
    {emoji:"⌛", caption:"wish #1"}
  ]},
  photos:["🌇","🐩","⌛","🌷","☁️","📷","🌊","🧸","🌙"]
};
// JANGAN PERLU MENGUBAH KODE DI BAWAH INI UNTUK EDIT DASAR.

let currentChat=null, messageIndex={}, callIndex=0, currentCall=null;
const $=id=>document.getElementById(id);
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active')}
function openApp(id){if(id==='messages')renderMessages();if(id==='phoneapp')renderPhone();if(id==='instagram')renderInstagram();if(id==='photos')renderPhotos();go(id)}
function initials(n){return n.split(' ').map(s=>s[0]).slice(0,2).join('')}
function renderMessages(){$('messageList').innerHTML=AU.contacts.map(c=>`<div class="contact" onclick="openChat('${c.id}')"><div class="avatar">${c.avatar||initials(c.name)}</div><div style="flex:1;min-width:0"><strong>${c.name}</strong><div class="sub">${c.preview||'Pesan'}</div></div><span style="color:#aaa">›</span></div>`).join('')}
function openChat(id){currentChat=AU.contacts.find(c=>c.id===id);messageIndex[id]=messageIndex[id]||0;$('chatTitle').textContent=currentChat.short||currentChat.name;renderChat();go('chat')}
function renderChat(){let msgs=currentChat.messages.slice(0,messageIndex[currentChat.id]);$('chatBody').innerHTML=msgs.map(m=>`<div class="bubble ${m.from==='me'?'me':'them'}">${escapeHTML(m.text)}</div>`).join('');$('chatBody').scrollTop=$('chatBody').scrollHeight}
function nextMessage(){if(!currentChat)return;let idx=messageIndex[currentChat.id]||0;if(idx<currentChat.messages.length){messageIndex[currentChat.id]=idx+1;renderChat()}else toast('Percakapan selesai 💗')}
function renderPhone(){$('phoneList').innerHTML=AU.contacts.map(c=>`<div class="contact" onclick="startCall('${c.id}')"><div class="avatar">${c.avatar||initials(c.name)}</div><div style="flex:1"><strong>${c.name}</strong><div class="sub">Ketuk untuk simulasi panggilan</div></div><span style="color:#1685ff">📞</span></div>`).join('')}
function startCall(id){currentCall=AU.contacts.find(c=>c.id===id);callIndex=0;$('callName').textContent=currentCall.name;$('callAvatar').textContent=currentCall.avatar||initials(currentCall.name);$('callStatus').textContent='Panggilan simulasi';$('callScript').textContent=currentCall.call[0]||'Halo?';callIndex=1;go('call')}
function nextCallLine(){if(!currentCall)return;if(callIndex<currentCall.call.length){$('callScript').textContent=currentCall.call[callIndex++]}else toast('Dialog panggilan selesai 💗')}
function renderInstagram(){const i=AU.instagram;$('instaContent').innerHTML=`<div class="profile"><div class="avatar">${initials(i.name)}</div><div><b>${i.username}</b><div class="sub">12 posts　 248 followers　 301 following</div></div></div><b>${i.name}</b><p>${i.bio}</p><button class="pill secondary" onclick="toast('DM fiktif: fitur demo')">Message</button><h4>Posts</h4>${i.posts.map(p=>`<div class="post"><div style="font-size:90px;text-align:center;background:#f1e5ed;border-radius:10px;padding:20px">${p.emoji}</div><p><b>${i.username}</b> ${p.caption}</p><button class="pill secondary" onclick="toast('Postingan dibuka')">Lihat postingan</button></div>`).join('')}`}
function renderPhotos(){$('photoGrid').innerHTML=AU.photos.map((p,i)=>`<div class="photo" onclick="toast('Foto ${i+1}: ${p}')">${p}</div>`).join('')}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
let toastTimer;function toast(t){const el=$('toast');el.textContent=t;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',1900)}
function updateClock(){const d=new Date();const time=d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',hour12:false});const date=d.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'});$('statusTime').textContent=time;$('lockClock').textContent=time;$('homeClock').textContent=time;$('lockDate').textContent=date;$('homeDate').textContent=date;$('calendarDate').textContent=d.getDate()}
document.documentElement.style.setProperty('--wallpaper',AU.wallpaper);renderMessages();renderPhone();renderInstagram();renderPhotos();updateClock();setInterval(updateClock,30000);
