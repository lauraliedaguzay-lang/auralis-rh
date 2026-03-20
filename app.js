(function(){
'use strict';

/* ===== DATA ===== */
var candidates = [
  {i:'CM',n:'Camille Moreau',c:'Lyon',r:'D\u00e9veloppeuse Full-Stack',s:82,st:'Entretien',b:'b-int',col:'Entretien',d:2,msg:'Super, \u00e0 jeudi 14h.'},
  {i:'MD',n:'Marie Dubois',c:'Paris',r:'Chef de Projet Digital',s:78,st:'Pr\u00e9s\u00e9lection',b:'b-pre',col:'Pr\u00e9s\u00e9lection',d:5,msg:'Merci pour le retour rapide.'},
  {i:'NB',n:'Nadia Benzara',c:'Marseille',r:'UX Designer',s:65,st:'Nouveau',b:'b-new',col:'Nouveau',d:1,msg:'Bonjour, j\u2019ai bien re\u00e7u votre message.'},
  {i:'TP',n:'Thomas Petit',c:'Bordeaux',r:'Data Analyst',s:71,st:'D\u00e9cision',b:'b-dec',col:'D\u00e9cision',d:3,msg:'Je suis tr\u00e8s int\u00e9ress\u00e9 par le poste.'},
  {i:'SM',n:'Sarah Martin',c:'Lille',r:'Assistante RH',s:58,st:'Archiv\u00e9',b:'b-arch',col:'Archiv\u00e9',d:14,msg:'Merci pour votre retour.'}
];

var titles = {
  'page-dashboard':'Tableau de bord','page-candidates':'Candidats','page-kanban':'Pipeline',
  'page-calendar':'Calendrier','page-messaging':'Messages','page-candidate-detail':'Fiche candidat',
  'page-rgpd':'Protection des donn\u00e9es','page-academy':'Academy','page-analytics':'Tes r\u00e9sultats',
  'page-settings':'Param\u00e8tres','page-aurora-center':'Centre Aurora'
};

var auroraData = {
  'page-dashboard':{msg:'Camille attend une r\u00e9ponse depuis 2 jours, parce que les candidats r\u00e9pondent mieux quand on est r\u00e9actif.',btns:['Contacter Camille','Voir le pipeline']},
  'page-candidates':{msg:'3 candidats m\u00e9ritent ton attention aujourd\u2019hui. Par lequel tu veux commencer\u00a0?',btns:['Camille','Thomas']},
  'page-kanban':{msg:'Marie est en pr\u00e9s\u00e9lection depuis 5 jours, parce qu\u2019un process trop long d\u00e9courage les bons profils.',btns:['Planifier un entretien','Voir sa fiche']},
  'page-calendar':{msg:'Tu as 2 entretiens cette semaine. Mardi reste libre si tu as besoin de souffler.',btns:['Voir mardi','C\u2019est not\u00e9']},
  'page-messaging':{msg:'3 candidats n\u2019ont pas eu de r\u00e9ponse depuis 7 jours, parce que le silence peut \u00eatre per\u00e7u comme un refus.',btns:['Pr\u00e9parer un message','Plus tard']},
  'page-candidate-detail':{msg:'Camille a un profil similaire \u00e0 tes 3 derni\u00e8res recrues r\u00e9ussies, parce que son exp\u00e9rience et sa r\u00e9activit\u00e9 correspondent.',btns:['Avancer','Noter']},
  'page-rgpd':{msg:'2 dossiers \u00e0 traiter avant le 25 mars. Rien d\u2019urgent pour aujourd\u2019hui.',btns:['Voir les dossiers']},
  'page-academy':{msg:'Tu as trait\u00e9 tous tes candidats. C\u2019est un bon moment pour explorer un module, si tu veux.',btns:['Commencer','Pas maintenant']},
  'page-analytics':{msg:'Ton temps de r\u00e9ponse moyen est de 2,3 jours. Tu es dans les meilleurs 20%, parce que tu es r\u00e9gulier.',btns:['D\u00e9tail']},
  'page-settings':{msg:'Tes pr\u00e9f\u00e9rences sont sauvegard\u00e9es automatiquement.',btns:[]},
  'page-aurora-center':{msg:'Tu vois ici tout ce qu\u2019Aurora fait. Rien n\u2019est cach\u00e9.',btns:[]}
};

var moons = ['\ud83c\udf11','\ud83c\udf12','\ud83c\udf13','\ud83c\udf14','\ud83c\udf15'];
var onbStep = 0;
var onbSteps = [
  {t:'Tu es plut\u00f4t...',h:'<p class="onb-sub">Choisis ton profil pour personnaliser Aurora.</p><div class="persona-cards"><div class="persona-card" onclick="this.classList.toggle(\'selected\')">Alternant RH</div><div class="persona-card" onclick="this.classList.toggle(\'selected\')">Tuteur / Manager</div><div class="persona-card" onclick="this.classList.toggle(\'selected\')">Senior DRH</div></div>'},
  {t:'Comment tu t\u2019appelles\u00a0?',h:'<input class="input" id="onb-name" style="max-width:280px;margin:16px auto;display:block" placeholder="Pr\u00e9nom">'},
  {t:'Tu travailles pour...',h:'<input class="input" style="max-width:280px;margin:16px auto;display:block" placeholder="Organisation">'},
  {t:'Ton poste\u00a0?',h:'<input class="input" style="max-width:280px;margin:16px auto;display:block" placeholder="Poste">'},
  {t:'Tes pr\u00e9f\u00e9rences',h:'<div style="max-width:280px;margin:16px auto;text-align:left"><label style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px"><span>Notifications email</span><input type="checkbox" checked></label><label style="display:flex;justify-content:space-between;font-size:14px"><span>Mode sombre par d\u00e9faut</span><input type="checkbox" checked></label></div>'},
  {t:'Voici Aurora',h:'<p class="onb-sub">Aurora observe, sugg\u00e8re, et ne d\u00e9cide jamais \u00e0 ta place. Tu gardes le contr\u00f4le. Elle justifie toujours ses suggestions, parce que la transparence cr\u00e9e la confiance.</p>'},
  {t:'Ta premi\u00e8re action',h:'<p class="onb-sub">Consulte ton premier candidat. Aurora t\u2019accompagne. Si tu pr\u00e9f\u00e8res explorer librement, c\u2019est toi qui d\u00e9cides.</p>'},
  {t:'C\u2019est parti',h:'<p class="onb-sub">Tout est pr\u00eat. Aurora veille.</p>'}
];

/* ===== HELPERS ===== */
function $(s){return document.querySelector(s)}
function $$(s){return document.querySelectorAll(s)}

/* ===== TOAST ===== */
window.toast = function(msg, type){
  type = type || 'info';
  var wrap = $('#toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function(){t.classList.add('toast-out');setTimeout(function(){t.remove()},300)},3500);
};

/* ===== SIDEBAR CLONE ===== */
function cloneSidebars(){
  var src = $('#page-dashboard .sidebar');
  if(!src) return;
  var targets = ['sidebar-c','sidebar-k','sidebar-cal','sidebar-msg','sidebar-cd','sidebar-r','sidebar-a','sidebar-an','sidebar-s','sidebar-ac'];
  targets.forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.outerHTML = src.outerHTML;
  });
}

/* ===== SHOW PAGE ===== */
window.showPage = function(id){
  $$('.page').forEach(function(p){p.classList.remove('active')});
  var el = document.getElementById(id);
  if(el) el.classList.add('active');

  // Update ALL header titles
  $$('.header h2').forEach(function(h){
    if(titles[id]) h.textContent = titles[id];
  });

  // Update sidebar active states
  $$('.nav-btn').forEach(function(b){
    var onclick = b.getAttribute('onclick') || '';
    b.classList.toggle('active', onclick.indexOf(id) > -1);
  });

  // Update mobile nav
  $$('.mob-tab').forEach(function(b){
    var onclick = b.getAttribute('onclick') || '';
    b.classList.toggle('active', onclick.indexOf(id) > -1);
  });

  // Aurora bar
  var bar = $('#aurora-bar');
  var txt = $('#aurora-text');
  var acts = $('#aurora-actions');

  if(id === 'page-splash'){
    if(bar) bar.style.display = 'none';
    return;
  }
  if(bar) bar.style.display = 'flex';

  if(id === 'page-login'){
    if(txt) txt.textContent = '';
    if(acts) acts.innerHTML = '';
    return;
  }

  // Anti-burnout overrides
  var h = new Date().getHours();
  var d = new Date().getDay();
  var msg = '';
  var btns = [];

  if(h >= 20){
    msg = 'C\u2019est tard. \u00c7a peut attendre demain, parce que la fatigue nuit \u00e0 la qualit\u00e9 de tes d\u00e9cisions.';
    btns = ['D\u2019accord','Je termine juste un truc'];
  } else if(d === 1 && h < 10){
    msg = 'Bonne semaine. Par o\u00f9 tu veux commencer\u00a0?';
    btns = ['Mes candidats','Mon pipeline'];
  } else if(d === 5 && h >= 17){
    msg = 'Belle semaine. Tu peux partir serein, parce que tout est \u00e0 jour.';
    btns = ['Merci Aurora'];
  } else if(auroraData[id]){
    msg = auroraData[id].msg;
    btns = auroraData[id].btns;
  }

  if(txt) txt.textContent = msg;
  if(acts){
    acts.innerHTML = '';
    btns.forEach(function(label){
      var b = document.createElement('button');
      b.className = 'aurora-btn';
      b.textContent = label;
      b.onclick = function(){toast('Bien not\u00e9.','info')};
      acts.appendChild(b);
    });
  }

  // Update date and name
  var dateEl = $('#greet-date');
  if(dateEl) dateEl.textContent = new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  var nameEl = $('#greet-name');
  if(nameEl){
    var user = localStorage.getItem('auralis-user');
    nameEl.textContent = user || 'Marie';
  }

  // Update moon based on hour (wellness proxy)
  var moonIdx = Math.min(4, Math.floor(h / 5));
  $$('.moon-display').forEach(function(m){m.textContent = moons[moonIdx]});
};

/* ===== THEME ===== */
window.toggleTheme = function(){
  document.body.classList.toggle('light-mode');
  localStorage.setItem('auralis-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
};

/* ===== DEMO MODE ===== */
window.enterDemo = function(){
  localStorage.setItem('auralis-user', 'Marie');
  localStorage.setItem('auralis-demo', 'true');
  var bar = $('#demo-bar');
  if(bar) bar.classList.add('visible');
  showPage('page-dashboard');
  toast('Bienvenue en mode d\u00e9mo. Les donn\u00e9es sont fictives.', 'info');
};

/* ===== LOGOUT ===== */
window.logout = function(){
  localStorage.removeItem('auralis-user');
  localStorage.removeItem('auralis-demo');
  var bar = $('#demo-bar');
  if(bar) bar.classList.remove('visible');
  showPage('page-login');
  toast('D\u00e9connect\u00e9. \u00c0 bient\u00f4t.', 'info');
};

/* ===== ONBOARDING ===== */
function renderOnb(){
  var dots = $('#onb-dots');
  var content = $('#onb-content');
  var btn = $('#onb-next');
  if(!dots || !content || !btn) return;

  dots.innerHTML = '';
  for(var i = 0; i < 8; i++){
    var dot = document.createElement('span');
    dot.className = 'onb-dot' + (i <= onbStep ? ' active' : '');
    dots.appendChild(dot);
  }

  var step = onbSteps[onbStep];
  content.innerHTML = '<h2 class="onb-title">' + step.t + '</h2>' + step.h;

  if(onbStep === 7){
    btn.textContent = 'Commencer';
  } else {
    btn.textContent = 'Suivant \u2192';
  }
}

window.nextOnb = function(){
  // Save name if on step 1
  if(onbStep === 1){
    var nameInput = $('#onb-name');
    if(nameInput && nameInput.value){
      localStorage.setItem('auralis-user', nameInput.value);
    }
  }
  onbStep++;
  if(onbStep >= 8){
    onbStep = 0;
    showPage('page-dashboard');
    toast('Bienvenue. Aurora est l\u00e0 pour t\u2019accompagner.', 'success');
    return;
  }
  renderOnb();
};

/* ===== CANDIDATES GRID ===== */
function renderCandidates(filter){
  var grid = $('#cand-grid');
  if(!grid) return;
  filter = (filter || '').toLowerCase();
  grid.innerHTML = '';
  candidates.forEach(function(c){
    if(filter && c.n.toLowerCase().indexOf(filter) === -1 && c.c.toLowerCase().indexOf(filter) === -1) return;
    var low = c.s < 60 ? ' low-score' : '';
    grid.innerHTML += '<div class="glass' + low + '" style="padding:16px;cursor:pointer" onclick="showPage(\'page-candidate-detail\')">' +
      '<div style="display:flex;gap:10px;align-items:center">' +
      '<div class="avatar">' + c.i + '</div>' +
      '<div style="flex:1"><h4 style="font-size:13px;font-weight:600;margin:0">' + c.n + '</h4>' +
      '<p style="font-size:11px;opacity:.4;margin:0">' + c.c + ' \u00b7 ' + c.r + '</p></div>' +
      '<span class="badge ' + c.b + '">' + c.s + '</span>' +
      '</div></div>';
  });
}

window.filterCandidates = function(){
  var input = $('#search-cand');
  renderCandidates(input ? input.value : '');
};

/* ===== KANBAN ===== */
function renderKanban(){
  var board = $('#kanban-board');
  if(!board) return;
  var cols = ['Nouveau','Pr\u00e9s\u00e9lection','Entretien','D\u00e9cision','Archiv\u00e9'];
  board.innerHTML = '';
  cols.forEach(function(col){
    var cards = candidates.filter(function(c){return c.col === col});
    var html = '<div class="kanban-col glass"><div class="kanban-hd">' + col + ' <span class="badge b-pre">' + cards.length + '</span></div>';
    cards.forEach(function(c){
      html += '<div class="kcard glass"><div style="display:flex;gap:10px;align-items:center">' +
        '<div class="avatar">' + c.i + '</div>' +
        '<div style="flex:1"><h4 style="font-size:13px;margin:0">' + c.n + '</h4>' +
        '<p style="font-size:11px;opacity:.4;margin:0">' + c.c + '</p></div>' +
        '<span class="badge ' + c.b + '">' + c.s + '</span></div>' +
        '<p style="font-size:11px;opacity:.3;margin:4px 0 0">' + c.d + ' jours dans cette \u00e9tape</p></div>';
    });
    html += '</div>';
    board.innerHTML += html;
  });
}

/* ===== CALENDAR ===== */
function renderCalendar(){
  var grid = $('#cal-grid');
  if(!grid) return;
  var headers = ['L','M','M','J','V','S','D'];
  var events = {12:'#C4B5FD',18:'#818CF8',20:'#818CF8',25:'#6EE7B7'};
  var today = new Date().getDate();
  var html = '';
  headers.forEach(function(h){html += '<div class="cal-hd">' + h + '</div>'});
  // March 2025 starts on Saturday (index 5), so 5 empty cells
  for(var e = 0; e < 5; e++) html += '<div class="cal-day"></div>';
  for(var d = 1; d <= 31; d++){
    var cls = d === today ? ' cal-today' : '';
    var dot = events[d] ? '<span class="cal-dot" style="background:' + events[d] + '"></span>' : '';
    html += '<div class="cal-day' + cls + '">' + d + dot + '</div>';
  }
  grid.innerHTML = html;
}

/* ===== CHAT LIST ===== */
function renderChatList(){
  var list = $('#chat-list');
  if(!list) return;
  list.innerHTML = '';
  candidates.forEach(function(c,i){
    var active = i === 0 ? ' active' : '';
    list.innerHTML += '<div class="chat-item' + active + '">' +
      '<div class="avatar">' + c.i + '</div>' +
      '<div style="flex:1;min-width:0"><h4 style="font-size:13px;margin:0">' + c.n + '</h4>' +
      '<p style="font-size:11px;opacity:.35;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + c.msg + '</p></div></div>';
  });
}

/* ===== INIT ===== */
function init(){
  // Theme
  if(localStorage.getItem('auralis-theme') === 'light') document.body.classList.add('light-mode');

  // Clone sidebars
  setTimeout(cloneSidebars, 100);

  // Render dynamic content
  renderCandidates();
  renderKanban();
  renderCalendar();
  renderChatList();
  renderOnb();

  // Demo bar
  if(localStorage.getItem('auralis-demo') === 'true'){
    var bar = $('#demo-bar');
    if(bar) bar.classList.add('visible');
  }

  // Start with splash
  showPage('page-splash');
  setTimeout(function(){showPage('page-login')}, 3500);

  // Check existing session
  if(localStorage.getItem('auralis-user') && localStorage.getItem('auralis-demo')){
    setTimeout(function(){
      showPage('page-dashboard');
      var bar = $('#demo-bar');
      if(bar) bar.classList.add('visible');
    }, 3600);
  }
}

// Run
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();