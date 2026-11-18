/* Code Jackpot – Washington electrical exam study game */
(function(){
"use strict";

// ---------- Exams & categories ----------
const EXAMS = {
  "06A":{en:"06A HVAC/Refrigeration",es:"06A HVAC/Refrigeración",den:"Specialty electrician · Art. 440 & 424, motors and controls, WA law",des:"Electricista de especialidad · Art. 440 y 424, motores y controles, leyes de WA",focus:"hvac"},
  "01":{en:"01 General Journey Level",es:"01 General Journey Level",den:"Full NEC & theory · heavy on load calcs",des:"NEC y teoría completos · énfasis en cálculo de carga",focus:"calc"},
  "02":{en:"02 Residential",es:"02 Residencial",den:"Dwellings · branch circuits, services, load calcs",des:"Viviendas · circuitos ramales, acometidas, cálculo de carga",focus:"calc"}
};
const CATS = {
  theory:{e:"⚡",en:"Theory & Ohm's Law",es:"Teoría y Ley de Ohm",sen:"Theory",ses:"Teoría"},
  general:{e:"📘",en:"Using the NEC",es:"Cómo usar el NEC",sen:"NEC",ses:"NEC"},
  branch:{e:"🔌",en:"Branch Circuits",es:"Circuitos Ramales",sen:"Branch",ses:"Ramales"},
  amp:{e:"🌡️",en:"Conductors & Ampacity",es:"Conductores y Ampacidad",sen:"Ampacity",ses:"Ampacidad"},
  ground:{e:"🌍",en:"Grounding & Bonding",es:"Puesta a Tierra y Unión",sen:"Grounding",ses:"Tierra"},
  raceway:{e:"📦",en:"Boxes & Raceways",es:"Cajas y Canalizaciones",sen:"Raceways",ses:"Cajas"},
  calc:{e:"🧮",en:"Load Calculations",es:"Cálculo de Carga",sen:"Load Calc",ses:"Cálculo"},
  motor:{e:"⚙️",en:"Motors (Art. 430)",es:"Motores (Art. 430)",sen:"Motors",ses:"Motores"},
  controls:{e:"🔧",en:"Controls & Meters",es:"Controles y Medidores",sen:"Controls",ses:"Controles"},
  hvac:{e:"❄️",en:"A/C & Heat (440/424)",es:"A/C y Calefacción (440/424)",sen:"A/C 440",ses:"A/C 440"},
  wa:{e:"🏛️",en:"Washington Law",es:"Leyes de Washington",sen:"WA Law",ses:"Leyes WA"}
};
const CK = Object.keys(CATS);
const applies=(q,ex)=>q.x==="all"||q.x.split(",").indexOf(ex)>=0;

// ---------- Text ----------
const TXT = {
en:{
  coins:"Coins",spins:"Spins",streak:"Streak",acc:"Accuracy",
  tabSlots:"🎰 Slots",tabBoard:"🎲 Board",tabLeaders:"🏆 Leaders",tabStats:"📊 Stats",
  marquee:"★ SPIN · ANSWER · WIN ★",spin:"SPIN",roll:"ROLL",
  practice:"Out of spins? Answer a free question to earn one",
  leg1:"3 of a kind = <b style='color:var(--gold)'>3× JACKPOT</b>",leg2:"2 of a kind = <b style='color:var(--gold)'>2×</b>",
  leg3:"No match = middle reel, 1×",leg4:"💰💰💰 = 500 free coins",
  slotStart:"Match symbols to multiply your payout!",spinAgain:"Spin again!",outSpins:"Out of spins — answer a free question to earn more.",
  jackpot:"🎉 JACKPOT! ",match:"✨ Match! ",cashJ:"💰 CASH JACKPOT! +500 coins",jack3:"JACKPOT 3×",
  level:"Level",xp:"XP",best:"Best streak",
  accTopic:"Accuracy by topic",statsNote:"Topics you miss come up more often. Get 3 right on a topic's board spaces to own it.",
  review:"Questions to review",noMiss:"Nothing yet. Questions you miss more than you get right will show up here.",
  disclaimer:"Practice questions written against the 2026 NEC, which takes effect in Washington on December 31, 2026, plus RCW 19.28 and WAC 296-46B. Where a section number changed, the 2023 number is shown too. Your exam may use a different edition — check with L&I and verify answers against the code book you'll test with. The real exam is in English.",
  reset:"Reset all progress",resetConfirm:"Tap again to confirm reset",
  practiceTag:"PRACTICE",correctSpin:"✔ CORRECT · +1 SPIN",correctCoins:"✔ +{n} COINS · +1 SPIN",wrong:"✘ NOT QUITE",cont:"CONTINUE",
  daily:"☀️ Daily bonus: +15 spins!",
  go:"GO +3 spins",bonus:"Bonus 200",book:"Code Book 2×",chance:"Chance",
  boardStart:"Roll to move. Own a topic with 3 correct answers!",
  passGo:"🏁 Passed GO: +3 spins",landGo:"Landed on GO: +3 spins",landBonus:"Bonus! +200 coins",
  doubles:"🎲 Doubles! 2× payout",bookTag:"CODE BOOK",chanceTag:"CHANCE",ownedTag:"OWNED · +{n} rent · ",
  toOwn:"{c}: {n}/3 to own",nowOwn:"🏠 You now own {c}!",
  ownedTxt:"Topics owned: {n}/{m} · Landing on an owned topic pays 150 rent",
  focus_calc:"🧮 Load Calc Challenge · 1 spin · 2× coins",focus_hvac:"❄️ A/C & Heat Challenge · 1 spin · 2× coins",
  tag_calc:"LOAD CALC 2×",tag_hvac:"A/C & HEAT 2×",sort_calc:"Load Calcs",sort_hvac:"A/C & Heat",
  pickTitle:"Which exam are you studying for?",pickNote:"You can switch anytime. Each exam keeps its own coins and leaderboard.",
  examLbl:"Exam: {e} ▾",
  week:"This week",allTime:"All-time",sortCoins:"Coins",sortAcc:"Accuracy",lbTitle:"🏆 {e} Leaderboard",
  lbNick:"Your leaderboard nickname",lbNickPh:"Nickname (no real names needed)",lbSave:"Save",you:" (you)",
  lbNote:"Your score posts automatically as you play. Accuracy ranks players with 20+ answers (10+ this week). The weekly board resets every Monday.",
  lbEmpty:"No scores yet. Answer a question to get on the board!",lbLoading:"Loading leaderboard…",
  lbOff:"The leaderboard isn't connected yet. Your progress still saves on this device.",
  lbErr:"Can't reach the leaderboard right now. Check your connection — your progress is saved.",
  lbNeedNick:"Set a nickname below to show up on the leaderboard.",saved:"✔ Saved",
  verEn:"Ver en inglés",hideEn:"Hide English",
  sheetTitle:"🧮 Load calc cheat sheet (2026 NEC, dwelling, standard method)",
  sheetIntro:"Load calcs are where most people lose points, so they come up more often. Work every problem in this order:",
  sheetSteps:"<li><b>General lighting:</b> sq ft × <b>2 VA</b> (120.41) — it was 3 VA in the 2023 NEC</li><li><b>Add</b> 1,500 VA per small-appliance circuit (min. 2) + 1,500 VA laundry (120.52)</li><li><b>Demand factor:</b> first 3,000 VA at 100%, next up to 120,000 VA at 35%, rest at 25% (Table 120.45)</li><li><b>Fastened appliances:</b> 4 or more → 75% (120.53)</li><li><b>Dryer:</b> 5,000 W or nameplate, whichever is larger (120.54)</li><li><b>Range:</b> Table 120.55 Col. C — 8 kW up to 12 kW, +5% per kW over 12</li><li><b>Heat vs. A/C:</b> count only the larger</li><li><b>Largest motor:</b> add 25% (430.24)</li><li><b>Amps:</b> total VA ÷ 240 V (single-phase) or ÷ (V × 1.732) (three-phase)</li><li><b>Optional method:</b> first <b>8 kVA</b> at 100%, rest at 40% (120.82) — it was 10 kVA in 2023</li>",
  hvacTitle:"❄️ A/C nameplate cheat sheet (Art. 440)",
  hvacSteps:"<li><b>MCA</b> sizes the wire (440.35)</li><li><b>MOP</b> is the biggest breaker or fuse — never go over it (440.22)</li><li>Single compressor wire: <b>125%</b> of RLC (440.32)</li><li>Compressor breaker: up to <b>175%</b>, <b>225%</b> if it won't start (440.22(A))</li><li>Disconnect: at least <b>115%</b> of RLC, in sight, readily accessible, not on access panels (440.12, 440.14)</li><li>Service receptacle within <b>25 ft</b>, same level, GFCI, not on the load side of the disconnect (210.63) — WA: not through a door or window</li><li>Outdoor units at dwellings need <b>GFCI</b> since Sept 1, 2026, changeouts included (210.8(F))</li><li>Electric heat: elements ≤ <b>60 A</b>, split over 48 A; disconnect ≥ <b>125%</b> (424.22, 424.19)</li>"
},
es:{
  coins:"Monedas",spins:"Giros",streak:"Racha",acc:"Aciertos",
  tabSlots:"🎰 Máquina",tabBoard:"🎲 Tablero",tabLeaders:"🏆 Líderes",tabStats:"📊 Avance",
  marquee:"★ GIRA · RESPONDE · GANA ★",spin:"GIRAR",roll:"TIRAR",
  practice:"¿Sin giros? Responde una pregunta gratis para ganar uno",
  leg1:"3 iguales = <b style='color:var(--gold)'>3× PREMIO MAYOR</b>",leg2:"2 iguales = <b style='color:var(--gold)'>2×</b>",
  leg3:"Sin iguales = rodillo del centro, 1×",leg4:"💰💰💰 = 500 monedas gratis",
  slotStart:"¡Junta símbolos iguales para multiplicar tu premio!",spinAgain:"¡Gira otra vez!",outSpins:"Sin giros — responde una pregunta gratis para ganar más.",
  jackpot:"🎉 ¡PREMIO MAYOR! ",match:"✨ ¡Iguales! ",cashJ:"💰 ¡PREMIO EN EFECTIVO! +500 monedas",jack3:"PREMIO 3×",
  level:"Nivel",xp:"XP",best:"Mejor racha",
  accTopic:"Aciertos por tema",statsNote:"Los temas que fallas aparecen más seguido. Acierta 3 en las casillas de un tema para ser dueño.",
  review:"Preguntas para repasar",noMiss:"Nada todavía. Aquí aparecerán las preguntas que falles más de lo que aciertes.",
  disclaimer:"Preguntas de práctica basadas en el NEC 2026, que entra en vigor en Washington el 31 de diciembre de 2026, y en el RCW 19.28 y WAC 296-46B. Donde cambió un número de sección, también se muestra el de 2023. Tu examen puede usar otra edición — confirma con L&I y verifica las respuestas en el libro de código con el que harás el examen. El examen real es en inglés.",
  reset:"Borrar todo el progreso",resetConfirm:"Toca otra vez para confirmar",
  practiceTag:"PRÁCTICA",correctSpin:"✔ ¡CORRECTO! · +1 GIRO",correctCoins:"✔ +{n} MONEDAS · +1 GIRO",wrong:"✘ INCORRECTO",cont:"CONTINUAR",
  daily:"☀️ Bono diario: ¡+15 giros!",
  go:"SALIDA +3 giros",bonus:"Bono 200",book:"Libro de Código 2×",chance:"Suerte",
  boardStart:"Tira los dados. ¡Sé dueño de un tema con 3 aciertos!",
  passGo:"🏁 Pasaste la SALIDA: +3 giros",landGo:"Caíste en la SALIDA: +3 giros",landBonus:"¡Bono! +200 monedas",
  doubles:"🎲 ¡Dobles! Premio 2×",bookTag:"LIBRO DE CÓDIGO",chanceTag:"SUERTE",ownedTag:"TUYO · +{n} renta · ",
  toOwn:"{c}: {n}/3 para ser dueño",nowOwn:"🏠 ¡Ahora eres dueño de {c}!",
  ownedTxt:"Temas tuyos: {n}/{m} · Caer en un tema tuyo paga 150 de renta",
  focus_calc:"🧮 Reto de Cálculo de Carga · 1 giro · 2× monedas",focus_hvac:"❄️ Reto de A/C y Calefacción · 1 giro · 2× monedas",
  tag_calc:"CÁLCULO DE CARGA 2×",tag_hvac:"A/C Y CALEFACCIÓN 2×",sort_calc:"Cálculo",sort_hvac:"A/C y Calef.",
  pickTitle:"¿Para qué examen estás estudiando?",pickNote:"Puedes cambiar cuando quieras. Cada examen tiene sus propias monedas y tabla de líderes.",
  examLbl:"Examen: {e} ▾",
  week:"Esta semana",allTime:"Histórico",sortCoins:"Monedas",sortAcc:"Aciertos",lbTitle:"🏆 Líderes {e}",
  lbNick:"Tu apodo en la tabla",lbNickPh:"Apodo (no necesitas tu nombre real)",lbSave:"Guardar",you:" (tú)",
  lbNote:"Tu puntaje se publica automáticamente mientras juegas. Aciertos clasifica a jugadores con 20+ respuestas (10+ esta semana). La tabla semanal se reinicia cada lunes.",
  lbEmpty:"Todavía no hay puntajes. ¡Responde una pregunta para entrar a la tabla!",lbLoading:"Cargando la tabla…",
  lbOff:"La tabla de líderes todavía no está conectada. Tu progreso se sigue guardando en este dispositivo.",
  lbErr:"No se puede conectar con la tabla ahora. Revisa tu conexión — tu progreso está guardado.",
  lbNeedNick:"Escribe un apodo abajo para aparecer en la tabla.",saved:"✔ Guardado",
  verEn:"Ver en inglés",hideEn:"Ocultar inglés",
  sheetTitle:"🧮 Guía rápida de cálculo de carga (NEC 2026, vivienda, método estándar)",
  sheetIntro:"El cálculo de carga es donde más puntos se pierden, por eso aparece más seguido. Resuelve cada problema en este orden:",
  sheetSteps:"<li><b>Alumbrado general:</b> pies² × <b>2 VA</b> (120.41) — era 3 VA en el NEC 2023</li><li><b>Suma</b> 1,500 VA por circuito de pequeños electrodomésticos (mín. 2) + 1,500 VA de lavandería (120.52)</li><li><b>Factor de demanda:</b> primeros 3,000 VA al 100%, hasta 120,000 VA al 35%, el resto al 25% (Tabla 120.45)</li><li><b>Electrodomésticos fijos:</b> 4 o más → 75% (120.53)</li><li><b>Secadora:</b> 5,000 W o la placa, lo que sea mayor (120.54)</li><li><b>Estufa:</b> Tabla 120.55 Col. C — 8 kW hasta 12 kW, +5% por cada kW sobre 12</li><li><b>Calefacción vs. A/C:</b> cuenta solo la mayor</li><li><b>Motor más grande:</b> suma 25% (430.24)</li><li><b>Amperios:</b> VA total ÷ 240 V (monofásico) o ÷ (V × 1.732) (trifásico)</li><li><b>Método opcional:</b> primeros <b>8 kVA</b> al 100%, el resto al 40% (120.82) — era 10 kVA en 2023</li>",
  hvacTitle:"❄️ Guía rápida de la placa del A/C (Art. 440)",
  hvacSteps:"<li><b>MCA</b> dimensiona el cable (440.35)</li><li><b>MOP</b> es el breaker o fusible más grande — nunca lo excedas (440.22)</li><li>Cable de un solo compresor: <b>125%</b> de la RLC (440.32)</li><li>Breaker del compresor: hasta <b>175%</b>, <b>225%</b> si no arranca (440.22(A))</li><li>Desconectador: al menos <b>115%</b> de la RLC, a la vista, accesible, no en paneles de acceso (440.12, 440.14)</li><li>Receptáculo de servicio a menos de <b>25 pies</b>, mismo nivel, GFCI, no del lado de carga del desconectador (210.63) — WA: no a través de puerta o ventana</li><li>Unidades exteriores en viviendas necesitan <b>GFCI</b> desde el 1 de sept. de 2026, incluyendo cambios de equipo (210.8(F))</li><li>Calefacción eléctrica: elementos ≤ <b>60 A</b>, dividir arriba de 48 A; desconectador ≥ <b>125%</b> (424.22, 424.19)</li>"
}};
const REF_ES={"Ohm's law":"Ley de Ohm","Power formula":"Fórmula de potencia","Series circuits":"Circuitos en serie","Parallel circuits":"Circuitos en paralelo","Three-phase formula":"Fórmula trifásica","AC theory":"Teoría de CA","Single-phase systems":"Sistemas monofásicos","Transformer theory":"Teoría de transformadores","Transformers":"Transformadores","Voltage drop":"Caída de voltaje","Meters":"Medidores","Controls":"Controles","Motors":"Motores","Compressors":"Compresores","Safety":"Seguridad","HVAC fundamentals":"Fundamentos de HVAC","Single-phase formula":"Fórmula monofásica"};

// ---------- State ----------
const KEY="codeJackpot.v2";
let S={v:2,lang:"",exam:"",spins:20,streak:0,best:0,xp:0,qs:{},cat:{},ex:{},day:"",nick:"",pid:""};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&s.v===2)S=Object.assign(S,s);}catch(e){}
CK.forEach(c=>{S.cat[c]=S.cat[c]||{r:0,t:0};});
if(!S.lang)S.lang=((navigator.language||"en").toLowerCase().indexOf("es")===0)?"es":"en";
if(!S.pid)S.pid=(Date.now().toString(36)+Math.random().toString(36).slice(2,10));
function E(){const k=S.exam||"06A";if(!S.ex[k])S.ex[k]={coins:0,right:0,total:0,focusR:0,focusT:0,own:{},prog:{},pos:0,week:{k:"",coins:0,right:0,total:0,focusR:0}};const x=S.ex[k];const wk=weekKey();if(x.week.k!==wk)x.week={k:wk,coins:0,right:0,total:0,focusR:0};return x;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}queuePush();}
function weekKey(d){d=d?new Date(d):new Date();const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y=t.getUTCFullYear();const w=Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7);return y+"-W"+(w<10?"0":"")+w;}

const $=id=>document.getElementById(id);
const T=(k,v)=>{let s=(TXT[S.lang]||TXT.en)[k];if(s===undefined)s=TXT.en[k]!==undefined?TXT.en[k]:k;if(v)for(const x in v)s=s.split("{"+x+"}").join(v[x]);return s;};
const cn=c=>CATS[c][S.lang];
const cs=c=>CATS[c]["s"+S.lang];
const exName=k=>EXAMS[k][S.lang];
const focus=()=>EXAMS[S.exam||"06A"].focus;
function toast(t,ms){const el=$("toast");el.textContent=t;el.style.display="block";clearTimeout(toast._t);toast._t=setTimeout(()=>el.style.display="none",ms||2200);}
function burst(txt){const b=document.createElement("div");b.className="burst";b.textContent=txt;b.style.left=(40+Math.random()*50)+"%";b.style.top="45%";document.body.appendChild(b);setTimeout(()=>b.remove(),1000);}
function qText(i,lang){
  const q=QB[i];
  if((lang||S.lang)==="es"&&q.es){const r=REF_ES[q.r]||q.r.replace(/Table/g,"Tabla").replace("Ch. 9","Cap. 9").replace("e.g.,","p. ej.,").replace(/ in (2023|2020)\)/,", $1)").replace("manufacturer instructions","instrucciones del fabricante");return {q:q.es.q,a:q.es.a,e:q.es.e,r};}
  return {q:q.q,a:q.a,e:q.e,r:q.r};
}

// Categories available for current exam (need at least 3 questions)
function examCats(){const ex=S.exam||"06A";return CK.filter(c=>QB.filter(q=>q.c===c&&applies(q,ex)).length>=3);}

// ---------- Language & exam ----------
function applyLang(){
  document.documentElement.lang=S.lang;
  document.querySelectorAll("[data-t]").forEach(el=>el.innerHTML=T(el.dataset.t));
  document.querySelectorAll(".langbar button").forEach(b=>b.classList.toggle("on",b.dataset.lang===S.lang));
  const ex=S.exam||"06A";
  $("examBtn").textContent=T("examLbl",{e:ex});
  $("subTxt").textContent=exName(ex)+" · "+EXAMS[ex]["d"+S.lang];
  $("focusBtn").textContent=T("focus_"+focus());
  $("sortFocus").textContent=T("sort_"+focus());
  $("lbTitle").textContent=T("lbTitle",{e:ex});
  $("sheetCalc").style.display=ex==="06A"?"none":"";
  $("sheetHvac").style.display="";
  reelState=reelState.map(k=>examCats().indexOf(k)>=0||k==="cash"?k:examCats()[0]);
  [0,1,2].forEach(i=>setReel(i,reelState[i]));
  $("slotMsg").textContent=T("slotStart");
  boardMsgText=null;
  buildBoard();
  if($("stats").classList.contains("on"))stats();
  renderLB();
  hud();
}
document.querySelectorAll(".langbar button").forEach(b=>b.onclick=()=>{S.lang=b.dataset.lang;save();applyLang();});

function pickExam(first){
  const sh=$("sheet");
  sh.innerHTML='<div class="qtext" style="margin-top:0"></div><div id="exlist"></div><div class="note" style="margin-top:8px"></div>';
  sh.querySelector(".qtext").textContent=T("pickTitle");
  sh.querySelector(".note").textContent=T("pickNote");
  Object.keys(EXAMS).forEach(k=>{
    const b=document.createElement("button");b.className="examcard"+(k===S.exam?" on":"");
    b.innerHTML="<b></b><span></span>";b.children[0].textContent=EXAMS[k][S.lang];b.children[1].textContent=EXAMS[k]["d"+S.lang];
    b.onclick=()=>{S.exam=k;E();save();$("modal").classList.remove("on");applyLang();loadLB(true);};
    $("exlist").appendChild(b);
  });
  $("modal").classList.add("on");
}
$("examBtn").onclick=()=>pickExam(false);

// daily bonus
(function(){const d=new Date().toDateString();if(S.day!==d){if(S.day){S.spins+=15;setTimeout(()=>toast(T("daily")),400);}S.day=d;}})();

function level(){let l=1,need=300,x=S.xp;while(x>=need){x-=need;l++;need=Math.round(need*1.25);}return {l,x,need};}
function hud(){
  const x=E();
  $("coins").textContent=x.coins.toLocaleString();
  $("spins").textContent=S.spins;
  $("streak").textContent=S.streak+(S.streak>=3?"🔥":"");
  $("acc").textContent=x.total?Math.round(100*x.right/x.total)+"%":"–";
  const L=level();$("lvlbar").style.width=(100*L.x/L.need)+"%";
  $("lvltxt").textContent=T("level")+" "+L.l+" · "+L.x+"/"+L.need+" "+T("xp")+" · "+T("best")+" "+S.best;
  $("spinBtn").disabled=S.spins<=0;$("focusBtn").disabled=S.spins<=0;
  const rb=$("rollBtn");if(rb)rb.disabled=S.spins<=0;
}

// ---------- Question picking (weak-spot weighting + exam focus) ----------
let recent=[];
function pick(cat){
  const ex=S.exam||"06A";
  if(!cat&&Math.random()<0.35)cat=focus();
  let pool=[];QB.forEach((q,i)=>{if(applies(q,ex)&&(!cat||q.c===cat))pool.push(i);});
  if(!pool.length)QB.forEach((q,i)=>{if(applies(q,ex))pool.push(i);});
  const fresh=pool.filter(i=>recent.indexOf(i)<0);if(fresh.length)pool=fresh;
  const w=pool.map(i=>{const s=S.qs[i]||{r:0,w:0};return Math.max(0.3,1+2*s.w-0.5*s.r)+(s.r+s.w===0?1:0);});
  let sum=w.reduce((a,b)=>a+b,0),r=Math.random()*sum;
  for(let k=0;k<pool.length;k++){r-=w[k];if(r<=0){recent.push(pool[k]);if(recent.length>10)recent.shift();return pool[k];}}
  return pool[0];
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t;}return a;}

// ---------- Question modal ----------
function ask(idx,mult,label,onDone,practice){
  const q=QB[idx],x=qText(idx),en=qText(idx,"en"),C=CATS[q.c];
  const opts=shuffle(x.a.map((t,i)=>({t,i,ok:i===0})));
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<span class="qcat"></span><span class="qmult"></span><div class="qtext"><span id="qT"></span><div class="entext" id="qEn"></div></div>'+
    (S.lang==="es"?'<button class="enbtn" id="enBtn"></button>':'')+
    '<div id="opts"></div><div class="result" id="res"></div><div class="explain" id="exp"><span id="expT"></span><div class="entext" id="expEn"></div><span class="ref">📖 <span id="refT"></span></span></div><button class="bigbtn" id="cont" style="display:none"></button>';
  sh.querySelector(".qcat").textContent=C.e+" "+cn(q.c);
  sh.querySelector(".qmult").textContent=practice?T("practiceTag"):(label||(mult+"×"));
  $("qT").textContent=x.q;$("qEn").textContent=en.q;
  $("expT").textContent=x.e;$("expEn").textContent=en.e;$("refT").textContent=x.r;$("cont").textContent=T("cont");
  if($("enBtn")){$("enBtn").textContent=T("verEn");$("enBtn").onclick=()=>{const on=sh.classList.toggle("showen");$("enBtn").textContent=on?T("hideEn"):T("verEn");};}
  const box=$("opts");
  opts.forEach(o=>{const b=document.createElement("button");b.className="opt";const s1=document.createElement("span");s1.textContent=o.t;b.appendChild(s1);
    if(S.lang==="es"){const s2=document.createElement("div");s2.className="entext";s2.textContent=en.a[o.i];b.appendChild(s2);}
    b.onclick=()=>choose(o,b);box.appendChild(b);});
  $("modal").classList.add("on");sh.scrollTop=0;
  function choose(o,btn){
    [...box.children].forEach((b,i)=>{b.disabled=true;if(opts[i].ok)b.classList.add("right");});
    const s=S.qs[idx]=S.qs[idx]||{r:0,w:0};const X=E(),W=X.week,isF=q.c===focus();
    S.cat[q.c].t++;X.total++;W.total++;if(isF)X.focusT++;
    let gained=0;
    if(o.ok){
      s.r++;S.cat[q.c].r++;X.right++;W.right++;if(isF){X.focusR++;W.focusR++;}
      S.streak++;S.best=Math.max(S.best,S.streak);
      const sb=1+0.1*Math.min(S.streak,10);
      gained=practice?0:Math.round(100*mult*sb);
      X.coins+=gained;W.coins+=gained;S.xp+=practice?10:Math.round(20*mult);S.spins++;
      $("res").textContent=practice?T("correctSpin"):T("correctCoins",{n:gained});$("res").className="result g";burst("💰");
    }else{
      s.w++;btn.classList.add("wrong");S.streak=0;S.xp+=5;$("res").textContent=T("wrong");$("res").className="result b";
    }
    $("exp").style.display="block";$("cont").style.display="block";
    save();hud();
    $("cont").onclick=()=>{$("modal").classList.remove("on");if(onDone)onDone(o.ok,gained);};
  }
}
function addCoins(n){const X=E();X.coins+=n;X.week.coins+=n;}

// ---------- Slots ----------
let reelState=["theory","general","ground"];
function syms(){const c=examCats();return c.concat([focus(),focus(),"cash"]);}
function setReel(i,k){reelState[i]=k;const r=$("r"+i);r.querySelector(".sym").textContent=k==="cash"?"💰":CATS[k].e;r.querySelector(".lab").textContent=k==="cash"?(S.lang==="es"?"Bono":"Bonus"):cn(k);}
let spinning=false;
$("spinBtn").onclick=()=>{
  if(spinning||S.spins<=0)return;
  spinning=true;S.spins--;save();hud();
  const SY=syms();const rnd=()=>SY[Math.floor(Math.random()*SY.length)];
  const res=[rnd(),rnd(),rnd()];
  if(Math.random()<0.25)res[2]=res[Math.floor(Math.random()*2)];
  [0,1,2].forEach(i=>{$("r"+i).classList.remove("win");$("r"+i).classList.add("spin");});
  const tick=setInterval(()=>[0,1,2].forEach(i=>{if($("r"+i).classList.contains("spin"))setReel(i,rnd());}),70);
  [0,1,2].forEach(i=>setTimeout(()=>{$("r"+i).classList.remove("spin");setReel(i,res[i]);if(i===2){clearInterval(tick);resolve(res);}},700+i*450));
};
function resolve(res){
  spinning=false;
  const cnt={};res.forEach(k=>cnt[k]=(cnt[k]||0)+1);
  const top=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0],n=cnt[top];
  if(top==="cash"&&n===3){[0,1,2].forEach(i=>$("r"+i).classList.add("win"));addCoins(500);save();hud();$("slotMsg").textContent=T("cashJ");burst("💰");burst("💰");return;}
  let cat,mult,label;
  if(n>=2&&top!=="cash"){cat=top;mult=n;label=n===3?T("jack3"):"2×";res.forEach((k,i)=>{if(k===top)$("r"+i).classList.add("win");});}
  else{const ec=examCats();cat=res[1]==="cash"?ec[Math.floor(Math.random()*ec.length)]:res[1];mult=1;label="1×";}
  $("slotMsg").textContent=(n===3?T("jackpot"):n===2?T("match"):"")+cn(cat)+" · "+label;
  setTimeout(()=>ask(pick(cat),mult,label,()=>{$("slotMsg").textContent=S.spins>0?T("spinAgain"):T("outSpins");}),n>=2?600:300);
}
$("practiceBtn").onclick=()=>ask(pick(),1,"",null,true);
$("focusBtn").onclick=()=>{if(S.spins<=0)return;S.spins--;save();hud();ask(pick(focus()),2,T("tag_"+focus()),()=>{$("slotMsg").textContent=S.spins>0?T("spinAgain"):T("outSpins");});};

// ---------- Board ----------
function spaces(){
  const sp=new Array(20);
  sp[0]={t:"go",e:"🏁"};sp[5]={t:"bonus",e:"🎁"};sp[10]={t:"book",e:"📖"};sp[15]={t:"chance",e:"❓"};
  const f=focus(),others=examCats().filter(c=>c!==f);const order=[];let o=0;
  for(let i=0;i<16;i++){if(i%4===0)order.push(f);else{order.push(others[o%others.length]);o++;}}
  let k=0;for(let i=0;i<20;i++){if(!sp[i]){const c=order[k++];sp[i]={t:"cat",c,e:CATS[c].e};}}
  return sp;
}
function coord(i){if(i<=5)return[1,i+1];if(i<=9)return[i-4,6];if(i<=15)return[6,6-(i-10)];return[6-(i-15),1];}
let boardMsgText=null,SP=null;
function buildBoard(){
  SP=spaces();const X=E();
  const g=$("boardGrid");g.innerHTML="";
  SP.forEach((s,i)=>{
    const d=document.createElement("div");const rc=coord(i);
    d.className="cell"+(s.t!=="cat"?" special":"")+(s.t==="cat"&&X.own[s.c]?" own":"");
    d.style.gridRow=rc[0];d.style.gridColumn=rc[1];
    d.innerHTML='<div class="e"></div><div class="n"></div>'+(i===X.pos?'<div class="tok">⛑️</div>':"");
    d.querySelector(".e").textContent=s.e;d.querySelector(".n").textContent=s.t==="cat"?cs(s.c):T(s.t);
    g.appendChild(d);
  });
  const ctr=document.createElement("div");ctr.className="center";
  ctr.innerHTML='<div class="dice"><div class="die" id="d1">⚀</div><div class="die" id="d2">⚀</div></div><button class="bigbtn" id="rollBtn"></button><div class="msg" id="boardMsg"></div>';
  g.appendChild(ctr);
  $("rollBtn").textContent=T("roll");
  $("boardMsg").textContent=boardMsgText||T("boardStart");
  $("rollBtn").onclick=roll;
  const ec=examCats();
  $("ownedTxt").textContent=T("ownedTxt",{n:ec.filter(c=>X.own[c]).length,m:ec.length});
  hud();
}
function setBoardMsg(t){boardMsgText=t;const m=$("boardMsg");if(m)m.textContent=t;}
const FACES=["⚀","⚁","⚂","⚃","⚄","⚅"];
let rolling=false;
function roll(){
  if(rolling||S.spins<=0)return;rolling=true;S.spins--;save();hud();
  const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6);
  $("d1").classList.add("roll");$("d2").classList.add("roll");
  const t=setInterval(()=>{$("d1").textContent=FACES[Math.floor(Math.random()*6)];$("d2").textContent=FACES[Math.floor(Math.random()*6)];},80);
  setTimeout(()=>{clearInterval(t);move(a+b,a===b,a,b);},700);
}
function move(steps,dbl,a,b){
  let n=0;const X=E();
  const hop=setInterval(()=>{
    X.pos=(X.pos+1)%20;n++;
    if(X.pos===0&&n<steps){S.spins+=3;toast(T("passGo"));}
    buildBoard();$("d1").textContent=FACES[a-1];$("d2").textContent=FACES[b-1];
    if(n>=steps){clearInterval(hop);land(dbl);}
  },160);
}
function land(dbl){
  const X=E(),s=SP[X.pos];const done=()=>{rolling=false;save();buildBoard();};
  const mult=dbl?2:1;
  if(dbl)toast(T("doubles"));
  if(s.t==="go"){S.spins+=3;setBoardMsg(T("landGo"));done();return;}
  if(s.t==="bonus"){addCoins(200);burst("🎁");setBoardMsg(T("landBonus"));done();return;}
  if(s.t==="book"){ask(pick(),2*mult,T("bookTag")+" "+(2*mult)+"×",done);return;}
  if(s.t==="chance"){const ec=examCats();const c=ec[Math.floor(Math.random()*ec.length)];ask(pick(c),mult,T("chanceTag")+" "+mult+"×",done);return;}
  const c=s.c;
  if(X.own[c]){addCoins(150*mult);burst("🏠");}
  ask(pick(c),mult,(X.own[c]?T("ownedTag",{n:150*mult}):"")+mult+"×",(ok)=>{
    if(ok&&!X.own[c]){X.prog[c]=(X.prog[c]||0)+1;
      if(X.prog[c]>=3){X.own[c]=true;toast(T("nowOwn",{c:cn(c)}));}
      else setBoardMsg(T("toOwn",{c:cn(c),n:X.prog[c]}));}
    done();
  });
}

// ---------- Stats ----------
function stats(){
  const ec=examCats();
  $("catBars").innerHTML="";
  ec.forEach(c=>{const s=S.cat[c],p=s.t?Math.round(100*s.r/s.t):0,col=!s.t?"#444":p>=70?"var(--good)":p>=50?"var(--gold)":"var(--bad)";
    const d=document.createElement("div");d.className="bar";
    d.innerHTML='<span class="n"></span><span class="t"><i></i></span><span class="p"></span>';
    d.querySelector(".n").textContent=CATS[c].e+" "+cn(c);
    const bar=d.querySelector("i");bar.style.width=(s.t?p:0)+"%";bar.style.background=col;
    d.querySelector(".p").textContent=s.t?p+"% ("+s.t+")":"—";
    $("catBars").appendChild(d);});
  const ex=S.exam||"06A";
  const miss=Object.keys(S.qs).filter(i=>QB[i]&&applies(QB[i],ex)&&S.qs[i].w>S.qs[i].r).sort((a,b)=>S.qs[b].w-S.qs[a].w).slice(0,8);
  const box=$("missList");box.innerHTML="";
  if(!miss.length){box.textContent=T("noMiss");return;}
  miss.forEach(i=>{const x=qText(+i);const d=document.createElement("div");d.style.margin="6px 0";
    d.innerHTML='• <span></span><br><b style="color:var(--good)"></b> — <span style="color:var(--volt)"></span>';
    const sp=d.querySelectorAll("span,b");sp[0].textContent=x.q;sp[1].textContent=x.a[0];sp[2].textContent=x.r;box.appendChild(d);});
}
$("resetBtn").onclick=function(){
  if(this.dataset.armed){const keep={v:2,lang:S.lang,exam:S.exam,nick:S.nick,pid:S.pid};try{localStorage.setItem(KEY,JSON.stringify(keep));}catch(e){}location.reload();}
  else{this.dataset.armed=1;this.textContent=T("resetConfirm");}
};

// ---------- Leaderboard (Google Sheet via Apps Script) ----------
const URL_=(typeof CJ_CONFIG==="object"&&CJ_CONFIG.sheetUrl)||"";
const LB={rows:[],period:"week",sort:"coins",status:URL_?"loading":"off",lastSent:"",timer:null,loadedAt:0,poll:null};
function topicsStr(){return examCats().filter(c=>S.cat[c].t>0).map(c=>c+" "+S.cat[c].r+"/"+S.cat[c].t).join(", ");}
function queuePush(){if(!URL_)return;clearTimeout(LB.timer);LB.timer=setTimeout(pushScore,4000);}
function payload(){const X=E(),W=X.week;return {pid:S.pid,nick:(S.nick||"").slice(0,20),exam:S.exam||"06A",coins:X.coins,right:X.right,total:X.total,focusR:X.focusR,best:S.best,wk:W.k,wcoins:W.coins,wright:W.right,wtotal:W.total,wfocusR:W.focusR,topics:topicsStr(),lang:S.lang};}
function pushScore(){
  if(!URL_)return;const p=payload();if(p.total===0)return;
  const key=JSON.stringify(p);if(key===LB.lastSent)return;
  try{fetch(URL_,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:key}).then(()=>{LB.lastSent=key;if($("leaders").classList.contains("on"))setTimeout(()=>loadLB(true),1500);}).catch(()=>{});}catch(e){}
}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){clearTimeout(LB.timer);pushScore();}});
function loadLB(force){
  if(!URL_){LB.status="off";renderLB();return;}
  if(!force&&Date.now()-LB.loadedAt<20000){renderLB();return;}
  if(!LB.rows.length)LB.status="loading";renderLB();
  const u=URL_+(URL_.indexOf("?")>=0?"&":"?")+"action=top&exam="+encodeURIComponent(S.exam||"06A")+"&wk="+encodeURIComponent(weekKey());
  const ctl=typeof AbortController!=="undefined"?new AbortController():null;const to=setTimeout(()=>{if(ctl)ctl.abort();},10000);
  fetch(u,ctl?{signal:ctl.signal}:{}).then(r=>r.json()).then(d=>{clearTimeout(to);LB.rows=(d&&Array.isArray(d.rows))?d.rows:[];LB.status="ok";LB.loadedAt=Date.now();renderLB();})
    .catch(()=>{clearTimeout(to);LB.status="err";renderLB();});
}
const num=v=>{v=Number(v);return isFinite(v)&&v>=0?v:0;};
function renderLB(){
  const list=$("lbList"),st=$("lbStatus");if(!list)return;
  $("nickIn").placeholder=T("lbNickPh");if(document.activeElement!==$("nickIn"))$("nickIn").value=S.nick||"";
  document.querySelectorAll(".lbsort button").forEach(b=>b.classList.toggle("on",b.dataset.sort===LB.sort));
  document.querySelectorAll(".lbtoggle button").forEach(b=>b.classList.toggle("on",b.dataset.period===LB.period));
  list.innerHTML="";
  if(LB.status==="off"){st.textContent=T("lbOff");return;}
  const wk=weekKey(),W=LB.period==="week";
  let rows=LB.rows.map(r=>({nick:String(r.nick||"").slice(0,20),
    coins:num(W?r.wcoins:r.coins),right:num(W?r.wright:r.right),total:num(W?r.wtotal:r.total),focus:num(W?r.wfocusR:r.focusR),wk:String(r.wk||"")}))
    .filter(r=>r.nick&&(!W||r.wk===wk)&&r.total>0);
  if(LB.sort==="acc"){const min=W?10:20;rows=rows.filter(r=>r.total>=min);rows.forEach(r=>r.acc=r.right/r.total);}
  rows.sort((a,b)=>(b[LB.sort]||0)-(a[LB.sort]||0));rows=rows.slice(0,25);
  rows.forEach((r,i)=>{
    const me=S.nick&&r.nick===S.nick;
    const d=document.createElement("div");d.className="lbrow"+(me?" me":"");
    d.innerHTML='<span class="rk"></span><span class="nm"></span><span class="vl"></span>';
    d.children[0].textContent=["🥇","🥈","🥉"][i]||String(i+1);
    d.children[1].textContent=r.nick+(me?T("you"):"");
    d.children[2].textContent=LB.sort==="coins"?r.coins.toLocaleString()+" 💰":LB.sort==="focus"?r.focus+" "+CATS[focus()].e:Math.round(r.acc*100)+"%";
    list.appendChild(d);
  });
  st.textContent=LB.status==="loading"?T("lbLoading"):LB.status==="err"?T("lbErr"):!S.nick?T("lbNeedNick"):!rows.length?T("lbEmpty"):"";
}
document.querySelectorAll(".lbsort button").forEach(b=>b.onclick=()=>{LB.sort=b.dataset.sort;renderLB();});
document.querySelectorAll(".lbtoggle button").forEach(b=>b.onclick=()=>{LB.period=b.dataset.period;renderLB();});
$("nickBtn").onclick=()=>{S.nick=$("nickIn").value.replace(/[<>]/g,"").trim().slice(0,20);LB.lastSent="";save();clearTimeout(LB.timer);pushScore();toast(T("saved"));renderLB();};

// ---------- Tabs ----------
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));
  document.querySelectorAll("section").forEach(s=>s.classList.toggle("on",s.id===b.dataset.tab));
  clearInterval(LB.poll);
  if(b.dataset.tab==="board")buildBoard();
  if(b.dataset.tab==="stats")stats();
  if(b.dataset.tab==="leaders"){loadLB(false);LB.poll=setInterval(()=>loadLB(true),60000);}
});

// ---------- Start ----------
if(!S.exam){S.exam="06A";applyLang();pickExam(true);}else applyLang();
// Leaderboard opens first
loadLB(true);LB.poll=setInterval(()=>loadLB(true),60000);
save();
if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js").catch(()=>{});}
})();
