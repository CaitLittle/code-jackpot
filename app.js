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
  mission:"<b>Daily mission:</b> {s}/{sn} 🎰 spins + {r}/{rn} 🎲 rolls → <b>+10 spins</b>",missionDone:"<b>✅ Daily mission done!</b> Come back tomorrow for a new one.",missionToast:"🎯 Daily mission complete! +10 spins",
  toBoardT:"Time to hit the Board!",toBoardP:"You've been spinning — now go build up your topics. <b>Your next roll pays 2×.</b>",toBoardGo:"🎲 Go to the Board",
  toSlotsT:"Back to the Slots!",toSlotsP:"Nice moves. Time for a quick spin — <b>your next spin is a guaranteed match (2×).</b>",toSlotsGo:"🎰 Go to the Slots",
  stay:"Keep playing here",boardBoostOn:"🔥 Next roll pays 2×",slotBoostOn:"🔥 Next spin is a guaranteed match",boostTag:"BONUS",
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
  mission:"<b>Misión diaria:</b> {s}/{sn} 🎰 giros + {r}/{rn} 🎲 tiros → <b>+10 giros</b>",missionDone:"<b>✅ ¡Misión diaria cumplida!</b> Regresa mañana por otra.",missionToast:"🎯 ¡Misión diaria cumplida! +10 giros",
  toBoardT:"¡Hora de ir al Tablero!",toBoardP:"Ya giraste bastante — ahora ve a construir tus temas. <b>Tu próximo tiro paga 2×.</b>",toBoardGo:"🎲 Ir al Tablero",
  toSlotsT:"¡De vuelta a la Máquina!",toSlotsP:"Buenas jugadas. Hora de un giro rápido — <b>tu próximo giro es un par garantizado (2×).</b>",toSlotsGo:"🎰 Ir a la Máquina",
  stay:"Seguir jugando aquí",boardBoostOn:"🔥 El próximo tiro paga 2×",slotBoostOn:"🔥 El próximo giro es un par garantizado",boostTag:"BONO",
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
function save(){try{checkBadges();}catch(e){}try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}queuePush();}
function weekKey(d){d=d?new Date(d):new Date();const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y=t.getUTCFullYear();const w=Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7);return y+"-W"+(w<10?"0":"")+w;}

const $=id=>document.getElementById(id);
const T=(k,v)=>{let s=(TXT[S.lang]||TXT.en)[k];if(s===undefined)s=TXT.en[k]!==undefined?TXT.en[k]:k;if(v)for(const x in v)s=s.split("{"+x+"}").join(v[x]);return s;};
const cn=c=>CATS[c][S.lang];
const cs=c=>CATS[c]["s"+S.lang];
const exName=k=>EXAMS[k][S.lang];
const focus=()=>EXAMS[S.exam||"06A"].focus;
const toastQ=[];let toastOn=false;
function toast(t,ms){toastQ.push([t,ms||2200]);if(!toastOn)nextToast();}
function nextToast(){const el=$("toast");const n=toastQ.shift();if(!n){toastOn=false;el.style.display="none";return;}toastOn=true;el.textContent=n[0];el.style.display="block";setTimeout(nextToast,n[1]);}
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
  renderLearn();
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
  $("coins").textContent=wallet().toLocaleString();
  $("spins").textContent=S.spins;
  $("streak").textContent=S.streak+(S.streak>=3?"🔥":"");
  $("acc").textContent=x.total?Math.round(100*x.right/x.total)+"%":"–";
  const L=level();$("lvlbar").style.width=(100*L.x/L.need)+"%";
  $("lvltxt").textContent=RANK_E[rankIdx()]+" "+rankName(rankIdx())+" · "+T("level")+" "+L.l+" · "+L.x+"/"+L.need+" "+T("xp")+" · "+T("best")+" "+S.best;
  if($("board")&&$("board").classList.contains("on")){renderBuild();}
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
function ask(idx,mult,label,onDone,practice,noLink){
  const q=QB[idx],x=qText(idx),en=qText(idx,"en"),C=CATS[q.c];
  const opts=shuffle(x.a.map((t,i)=>({t,i,ok:i===0})));
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<span class="qcat"></span><span class="qmult"></span><div class="qtext"><span id="qT"></span><div class="entext" id="qEn"></div></div>'+
    (S.lang==="es"?'<button class="enbtn" id="enBtn"></button>':'')+
    '<div id="opts"></div><div class="result" id="res"></div><div class="explain" id="exp"><span id="expT"></span><div class="entext" id="expEn"></div><span class="ref">📖 <span id="refT"></span></span></div><button class="bigbtn" id="cont" style="display:none"></button>';
  sh.querySelector(".qcat").textContent=C.e+" "+cn(q.c);
  sh.querySelector(".qmult").textContent=label||(practice?T("practiceTag"):(mult+"×"));
  $("qT").textContent=x.q;$("qEn").textContent=en.q;
  $("expT").textContent=x.e;$("expEn").textContent=en.e;$("refT").textContent=x.r;$("cont").textContent=T("cont");
  if($("enBtn")){$("enBtn").textContent=T("verEn");$("enBtn").onclick=()=>{const on=sh.classList.toggle("showen");$("enBtn").textContent=on?T("hideEn"):T("verEn");};}
  const box=$("opts");
  opts.forEach(o=>{const b=document.createElement("button");b.className="opt";const s1=document.createElement("span");s1.textContent=o.t;b.appendChild(s1);
    if(S.lang==="es"){const s2=document.createElement("div");s2.className="entext";s2.textContent=en.a[o.i];b.appendChild(s2);}
    b.onclick=()=>choose(o,b);box.appendChild(b);});
  const pbar=powerBar(idx,opts,box,sh);
  $("modal").classList.add("on");sh.scrollTop=0;
  function choose(o,btn){
    [...box.children].forEach((b,i)=>{b.disabled=true;if(opts[i].ok)b.classList.add("right");});
    pbar.querySelectorAll("button").forEach(b=>b.disabled=true);
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
      s.w++;btn.classList.add("wrong");if((S.shield||0)>0&&S.streak>0){S.shield--;toast(T("shieldUsed"),2500);}else S.streak=0;S.xp+=5;$("res").textContent=T("wrong");$("res").className="result b";
      const lid=CAT_LESSON[q.c];
      if(!noLink&&lid&&findLesson(lid)){const rb=document.createElement("button");rb.className="ghost";rb.textContent=T("reviewLesson");
        rb.onclick=()=>{$("modal").classList.remove("on");if(onDone)onDone(false,0);setTimeout(()=>openLesson(lid),200);};$("cont").after(rb);}
    }
    logAns(q.c,o.ok);
    $("exp").style.display="block";$("cont").style.display="block";
    save();hud();
    $("cont").onclick=()=>{$("modal").classList.remove("on");if(onDone)onDone(o.ok,gained);};
  }
}
function addCoins(n){const X=E();X.coins+=n;X.week.coins+=n;}

// ---------- Guide: daily mission + nudges between Slots and Board ----------
const SPINS_PER_TURN=5,ROLLS_PER_TURN=4,MISSION_SPINS=5,MISSION_ROLLS=4;
function G(){const d=new Date().toDateString();if(!S.guide)S.guide={n:0,next:"",boardBoost:false,slotBoost:false};if(!S.guide.day||S.guide.day.d!==d)S.guide.day={d,spins:0,rolls:0,done:false};return S.guide;}
function renderGuide(){
  const g=G(),m=g.day;
  const html=m.done?T("missionDone"):T("mission",{s:Math.min(m.spins,MISSION_SPINS),sn:MISSION_SPINS,r:Math.min(m.rolls,MISSION_ROLLS),rn:MISSION_ROLLS});
  const pct=m.done?100:Math.round(100*(Math.min(m.spins,MISSION_SPINS)+Math.min(m.rolls,MISSION_ROLLS))/(MISSION_SPINS+MISSION_ROLLS));
  ["missionS","missionB"].forEach(id=>{const el=$(id);if(el)el.innerHTML='<span>🎯</span><div class="mt">'+html+'<div class="mp"><i style="width:'+pct+'%"></i></div></div>';});
  $("slotBoost").textContent=T("slotBoostOn");$("slotBoost").classList.toggle("on",!!g.slotBoost);
  $("boardBoost").textContent=T("boardBoostOn");$("boardBoost").classList.toggle("on",!!g.boardBoost);
  const noLessons=!Object.keys(S.lessons||{}).length;
  let afford=false;try{afford=canAfford();}catch(e){}
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("next",(b.dataset.tab===g.next||(b.dataset.tab==="learn"&&noLessons)||(b.dataset.tab==="board"&&afford))&&!b.classList.contains("on")));
}
function checkMission(){const g=G(),m=g.day;if(!m.done&&m.spins>=MISSION_SPINS&&m.rolls>=MISSION_ROLLS){m.done=true;S.spins+=10;S.missions=(S.missions||0)+1;toast(T("missionToast"),3000);burst("🎯");}}
function goTab(t){const b=document.querySelector('.tabs button[data-tab="'+t+'"]');if(b)b.click();}
function nudge(to){
  const g=G();g.n=0;g.next=to;
  if(to==="board")g.boardBoost=true;else g.slotBoost=true;
  save();renderGuide();
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<div class="nudge"><div class="big"></div><div class="qtext" style="margin:0 0 6px"></div><div class="note" style="font-size:14px" id="nP"></div><button class="bigbtn" id="nGo"></button><button class="ghost" id="nStay"></button></div>';
  sh.querySelector(".big").textContent=to==="board"?"🎲":"🎰";
  sh.querySelector(".qtext").textContent=T(to==="board"?"toBoardT":"toSlotsT");
  $("nP").innerHTML=T(to==="board"?"toBoardP":"toSlotsP");
  $("nGo").textContent=T(to==="board"?"toBoardGo":"toSlotsGo");$("nStay").textContent=T("stay");
  $("nGo").onclick=()=>{$("modal").classList.remove("on");goTab(to);};
  $("nStay").onclick=()=>{$("modal").classList.remove("on");};
  $("modal").classList.add("on");
}
function countTurn(kind){ // kind: "slots" | "board"
  const g=G();
  if(kind==="slots"){g.day.spins++;}else{g.day.rolls++;}
  if(g.next===kind)g.next="";
  if(g.lastKind!==kind){g.lastKind=kind;g.n=0;}
  g.n++;checkMission();save();renderGuide();
  return g.n>=(kind==="slots"?SPINS_PER_TURN:ROLLS_PER_TURN);
}

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
  const g=G();if(g.slotBoost){g.slotBoost=false;if(res[0]==="cash")res[0]=focus();res[1]=res[0];renderGuide();}
  const STOP=[1800,2500,3200];let left=3;
  [0,1,2].forEach(i=>{$("r"+i).classList.remove("win");spinReel(i,res[i],STOP[i],SY,()=>{if(--left===0)resolve(res);});});
};
function symHTML(k){return '<div class="cellr"><div class="sym">'+(k==="cash"?"💰":CATS[k].e)+'</div><div class="lab">'+(k==="cash"?(S.lang==="es"?"Bono":"Bonus"):cn(k))+'</div></div>';}
function spinReel(i,result,dur,SY,done){
  const r=$("r"+i),h=r.clientHeight||96;
  const n=18+i*7,list=[reelState[i]];
  for(let j=1;j<n;j++)list.push(SY[Math.floor(Math.random()*SY.length)]);
  list.push(result);
  const strip=document.createElement("div");strip.className="strip";
  strip.innerHTML=list.map(symHTML).join("")+symHTML(SY[0]);
  r.classList.add("spin");r.appendChild(strip);
  const dist=(list.length-1)*h,t0=performance.now();
  const over=14,blurEnd=0.55; // slows down like a real reel, nudges past, then settles back
  const pos=p=>p<0.88?(1-Math.pow(1-p/0.88,3))*(dist+over):dist+over*(1-Math.sin((p-0.88)/0.12*Math.PI/2));
  function step(now){
    const p=Math.min(1,(now-t0)/dur);
    const y=pos(p);
    strip.style.transform="translateY("+(-y)+"px)";
    strip.style.filter=p<blurEnd?"blur(1.2px)":"none";
    if(p<1)requestAnimationFrame(step);
    else{r.classList.remove("spin");strip.remove();setReel(i,result);r.classList.add("thunk");setTimeout(()=>r.classList.remove("thunk"),220);done();}
  }
  requestAnimationFrame(step);
}
function resolve(res){
  spinning=false;
  const cnt={};res.forEach(k=>cnt[k]=(cnt[k]||0)+1);
  const top=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0],n=cnt[top];
  if(top==="cash"&&n===3){[0,1,2].forEach(i=>$("r"+i).classList.add("win"));addCoins(500);save();hud();$("slotMsg").textContent=T("cashJ");burst("💰");burst("💰");if(countTurn("slots"))setTimeout(()=>nudge("board"),900);return;}
  let cat,mult,label;
  if(n>=2&&top!=="cash"){cat=top;mult=n;label=n===3?T("jack3"):"2×";res.forEach((k,i)=>{if(k===top)$("r"+i).classList.add("win");});}
  else{const ec=examCats();cat=res[1]==="cash"?ec[Math.floor(Math.random()*ec.length)]:res[1];mult=1;label="1×";}
  $("slotMsg").textContent=(n===3?T("jackpot"):n===2?T("match"):"")+cn(cat)+" · "+label;
  const turnUp=countTurn("slots");
  setTimeout(()=>ask(pick(cat),mult,label,()=>{$("slotMsg").textContent=S.spins>0?T("spinAgain"):T("outSpins");if(turnUp)setTimeout(()=>nudge("board"),250);}),n>=2?600:300);
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
    d.innerHTML='<div class="e"></div><div class="n"></div>'+(i===X.pos?'<div class="tok"></div>':"");
    d.querySelector(".e").textContent=s.e;d.querySelector(".n").textContent=s.t==="cat"?cs(s.c):T(s.t);
    if(i===X.pos)d.querySelector(".tok").textContent=myToken();
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
  const t=setInterval(()=>{$("d1").textContent=FACES[Math.floor(Math.random()*6)];$("d2").textContent=FACES[Math.floor(Math.random()*6)];},130);
  setTimeout(()=>{clearInterval(t);$("d1").textContent=FACES[a-1];$("d2").textContent=FACES[b-1];$("d1").classList.remove("roll");$("d2").classList.remove("roll");setTimeout(()=>move(a+b,a===b,a,b),450);},1300);
}
function move(steps,dbl,a,b){
  let n=0;const X=E();
  const hop=setInterval(()=>{
    X.pos=(X.pos+1)%20;n++;
    if(X.pos===0&&n<steps){S.spins+=3;toast(T("passGo"));}
    buildBoard();$("d1").textContent=FACES[a-1];$("d2").textContent=FACES[b-1];
    if(n>=steps){clearInterval(hop);land(dbl);}
  },450);
}
function land(dbl){
  const X=E(),s=SP[X.pos];
  const g=G();const boosted=!!g.boardBoost;g.boardBoost=false;
  const turnUp=countTurn("board");
  const done=()=>{rolling=false;save();buildBoard();if(turnUp)setTimeout(()=>nudge("slots"),250);};
  const mult=(dbl?2:1)*(boosted?2:1);
  if(boosted)burst("🔥");
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
  renderLook();
  renderBadges();
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
function payload(){const X=E(),W=X.week;return {pid:S.pid,nick:(S.nick||"").slice(0,20),exam:S.exam||"06A",coins:X.coins,right:X.right,total:X.total,focusR:X.focusR,best:S.best,wk:W.k,wcoins:W.coins,wright:W.right,wtotal:W.total,wfocusR:W.focusR,topics:topicsStr(),lang:S.lang,ready:(function(){try{const r=readiness();return r.need?"":r.pct;}catch(e){return "";}})(),lessons:Object.keys(S.lessons||{}).length,rank:rankIdx()};}
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
    rank:Math.min(4,num(r.rank)),coins:num(W?r.wcoins:r.coins),right:num(W?r.wright:r.right),total:num(W?r.wtotal:r.total),focus:num(W?r.wfocusR:r.focusR),wk:String(r.wk||"")}))
    .filter(r=>r.nick&&(!W||r.wk===wk)&&r.total>0);
  if(LB.sort==="acc"){const min=W?10:20;rows=rows.filter(r=>r.total>=min);rows.forEach(r=>r.acc=r.right/r.total);}
  rows.sort((a,b)=>(b[LB.sort]||0)-(a[LB.sort]||0));rows=rows.slice(0,25);
  rows.forEach((r,i)=>{
    const me=S.nick&&r.nick===S.nick;
    const d=document.createElement("div");d.className="lbrow"+(me?" me":"");
    d.innerHTML='<span class="rk"></span><span class="nm"></span><span class="vl"></span>';
    d.children[0].textContent=["🥇","🥈","🥉"][i]||String(i+1);
    d.children[1].textContent=RANK_E[r.rank]+" "+r.nick+(me?T("you"):"");
    d.children[2].textContent=LB.sort==="coins"?r.coins.toLocaleString()+" 💰":LB.sort==="focus"?r.focus+" "+CATS[focus()].e:Math.round(r.acc*100)+"%";
    list.appendChild(d);
  });
  st.textContent=LB.status==="loading"?T("lbLoading"):LB.status==="err"?T("lbErr"):!S.nick?T("lbNeedNick"):!rows.length?T("lbEmpty"):"";
}
document.querySelectorAll(".lbsort button").forEach(b=>b.onclick=()=>{LB.sort=b.dataset.sort;renderLB();});
document.querySelectorAll(".lbtoggle button").forEach(b=>b.onclick=()=>{LB.period=b.dataset.period;renderLB();});
$("nickBtn").onclick=()=>{S.nick=$("nickIn").value.replace(/[<>]/g,"").trim().slice(0,20);LB.lastSent="";save();clearTimeout(LB.timer);pushScore();toast(T("saved"));renderLB();};

// ---------- Learn tab: lessons, Exam Mode, Code Lookup Drill, Ready Meter, reminders ----------
Object.assign(TXT.en,{
  tabLearn:"📚 Learn",readyTitle:"🎯 Ready Meter",readyNeed:"Answer at least {n} more questions for {e} to see your Ready Meter.",
  ready0:"Not ready yet — keep going",ready1:"Getting close",ready2:"On track to pass",ready3:"Ready for the exam",
  readyLine:"Passing line: 70%",readyWeak:"Work on these next:",readyNoExam:"Take a practice exam to sharpen your estimate.",practiceBtn:"Practice",
  readyHow:"Based on your last 60 answers, your practice exam scores, and how many topics you've covered for this exam.",
  examBtn:"📝 Exam Mode",examBtnSub:"Timed practice test",lookupBtn:"🔎 Code Lookup Drill",lookupBtnSub:"Find it in the book, fast",
  pathTitle:"📚 Lessons — start here",pathNote:"New to electrical? Start at the top and go in order. Each unit ends with a 🦺 safety lesson. Pass a lesson's 3-question check to unlock the next one.",
  lessonsDone:"{n} of {m} lessons done",start:"Start",review:"Review",locked:"Locked",
  checkBtn:"✅ Check yourself (3 questions)",checkPass:"🎉 Lesson complete! +150 coins, +3 spins",checkFail:"You got {n} of 3. Review the lesson and try again — you need 2 to pass.",
  close:"Close",reviewLesson:"📚 Review the lesson",
  exTitle:"📝 Exam Mode",exIntro:"Real exam conditions: a timer, no answers shown until the end, 70% to pass. Use your code book like the real (open-book) exam.",
  exQuick:"Quick: 20 questions · 60 min",exFull:"Full: 60 questions · 3 hours",exNote:"The 01 NEC & Theory section is 60 questions in 3 hours. Check with PSI/L&I for your exam's exact format.",
  exQ:"Question {i} of {n}",exPrev:"◀ Back",exNext:"Next ▶",exSubmit:"Submit exam",exSubmitConfirm:"Tap again to submit — {n} unanswered",exQuit:"Quit",exQuitConfirm:"Tap again to quit (nothing is saved)",
  exPass:"PASS",exFail:"NOT YET",exScore:"{p}% · {r} of {n} correct",exTime:"Time used: {t}",exReport:"Score report by code article",exMissed:"Questions you missed",exDone:"Done",exReward:"+{c} coins",timeUp:"⏰ Time's up!",
  lkTitle:"🔎 Code Lookup Drill",lkIntro:"Grab your code book. For each topic, find it in the book, then tap the section. Faster = more coins. Goal: under 2 minutes each.",
  lkStart:"Start (5 topics)",lkFind:"Find it in your code book:",lkRight:"✔ {s}s · +{c} coins",lkWrong:"✘ It's {a}",lkSummary:"{r} of {n} right · average {s}s",lkBest:"Your best average: {s}s",
  remTitle:"🔔 Daily reminders",remPush:"Turn on push notifications",remPushOn:"✔ Notifications are on",remPushNo:"Notifications are blocked. Turn them on in your phone's settings for this site.",
  remIos:"On iPhone, add the game to your Home Screen first, then open it from there to turn on notifications.",
  remCal:"📅 Add a daily reminder to my calendar",remTime:"Remind me at:",remCalNote:"Works on any phone: opens your calendar with a daily reminder to study.",
  learnNudge:"New here? Start with the 📚 Learn tab."
});
Object.assign(TXT.es,{
  tabLearn:"📚 Clases",readyTitle:"🎯 Medidor de preparación",readyNeed:"Responde al menos {n} preguntas más de {e} para ver tu medidor.",
  ready0:"Todavía no — sigue practicando",ready1:"Ya casi",ready2:"Vas bien para aprobar",ready3:"Listo para el examen",
  readyLine:"Línea para aprobar: 70%",readyWeak:"Practica esto después:",readyNoExam:"Haz un examen de práctica para afinar el cálculo.",practiceBtn:"Practicar",
  readyHow:"Basado en tus últimas 60 respuestas, tus exámenes de práctica y cuántos temas has cubierto para este examen.",
  examBtn:"📝 Modo examen",examBtnSub:"Examen de práctica con tiempo",lookupBtn:"🔎 Búsqueda en el código",lookupBtnSub:"Encuéntralo en el libro, rápido",
  pathTitle:"📚 Lecciones — empieza aquí",pathNote:"¿Nuevo en electricidad? Empieza arriba y ve en orden. Cada unidad termina con una lección de 🦺 seguridad. Aprueba la revisión de 3 preguntas para abrir la siguiente.",
  lessonsDone:"{n} de {m} lecciones terminadas",start:"Empezar",review:"Repasar",locked:"Bloqueada",
  checkBtn:"✅ Ponte a prueba (3 preguntas)",checkPass:"🎉 ¡Lección terminada! +150 monedas, +3 giros",checkFail:"Acertaste {n} de 3. Repasa la lección e inténtalo otra vez — necesitas 2 para aprobar.",
  close:"Cerrar",reviewLesson:"📚 Repasar la lección",
  exTitle:"📝 Modo examen",exIntro:"Condiciones reales: con tiempo, sin respuestas hasta el final, 70% para aprobar. Usa tu libro de código como en el examen real (a libro abierto).",
  exQuick:"Rápido: 20 preguntas · 60 min",exFull:"Completo: 60 preguntas · 3 horas",exNote:"La sección de NEC y Teoría del 01 son 60 preguntas en 3 horas. Confirma con PSI/L&I el formato exacto de tu examen.",
  exQ:"Pregunta {i} de {n}",exPrev:"◀ Atrás",exNext:"Siguiente ▶",exSubmit:"Entregar examen",exSubmitConfirm:"Toca otra vez para entregar — {n} sin responder",exQuit:"Salir",exQuitConfirm:"Toca otra vez para salir (no se guarda nada)",
  exPass:"APROBADO",exFail:"TODAVÍA NO",exScore:"{p}% · {r} de {n} correctas",exTime:"Tiempo usado: {t}",exReport:"Resultados por artículo del código",exMissed:"Preguntas que fallaste",exDone:"Listo",exReward:"+{c} monedas",timeUp:"⏰ ¡Se acabó el tiempo!",
  lkTitle:"🔎 Búsqueda en el código",lkIntro:"Toma tu libro de código. Para cada tema, encuéntralo en el libro y toca la sección. Más rápido = más monedas. Meta: menos de 2 minutos cada uno.",
  lkStart:"Empezar (5 temas)",lkFind:"Encuéntralo en tu libro de código:",lkRight:"✔ {s}s · +{c} monedas",lkWrong:"✘ Es {a}",lkSummary:"{r} de {n} correctas · promedio {s}s",lkBest:"Tu mejor promedio: {s}s",
  remTitle:"🔔 Recordatorios diarios",remPush:"Activar notificaciones",remPushOn:"✔ Las notificaciones están activadas",remPushNo:"Las notificaciones están bloqueadas. Actívalas en la configuración de tu teléfono para este sitio.",
  remIos:"En iPhone, primero agrega el juego a tu pantalla de inicio y ábrelo desde ahí para activar las notificaciones.",
  remCal:"📅 Agregar un recordatorio diario a mi calendario",remTime:"Recordarme a las:",remCalNote:"Funciona en cualquier teléfono: abre tu calendario con un recordatorio diario para estudiar.",
  learnNudge:"¿Eres nuevo? Empieza en la pestaña 📚 Aprender."
});
CATS.safety={e:"🦺",en:"Safety",es:"Seguridad",sen:"Safety",ses:"Seguridad"};
if(CK.indexOf("safety")<0)CK.push("safety");
if(!S.cat.safety)S.cat.safety={r:0,t:0};
if(!S.lessons)S.lessons={};
const CAT_LESSON={theory:"u1l2",controls:"u2l3",general:"u3l1",branch:"u6l2",amp:"u3l3",ground:"u3l5",raceway:"u3l6",calc:"u5l2",motor:"u2l3",hvac:"u4l1",wa:"u7l1",safety:"u1s"};
const fmtP=s=>{const d=document.createElement("div");s.split(/(\*\*[^*]+\*\*)/).forEach(part=>{if(/^\*\*[^*]+\*\*$/.test(part)){const b=document.createElement("b");b.textContent=part.slice(2,-2);d.appendChild(b);}else d.appendChild(document.createTextNode(part));});return d;};
function examUnits(){const ex=S.exam||"06A";return UNITS.filter(u=>u.x==="all"||u.x.split(",").indexOf(ex)>=0);}
function findLesson(id){for(const u of UNITS)for(let i=0;i<u.lessons.length;i++)if(u.lessons[i].id===id)return {u,l:u.lessons[i],i};return null;}
function lessonOpen(u,i){return i===0||!!S.lessons[u.lessons[i-1].id]||!!S.lessons[u.lessons[i].id];}
function logAns(c,ok){const X=E();if(!X.log)X.log=[];X.log.push([c,ok?1:0]);if(X.log.length>120)X.log.splice(0,X.log.length-120);}

// ----- Ready Meter -----
function readiness(){
  const X=E(),log=(X.log||[]).slice(-60);
  if(log.length<20)return {need:20-log.length};
  const acc=log.reduce((a,b)=>a+b[1],0)/log.length;
  const ex=(X.exams||[]).slice(-2);const exAvg=ex.length?ex.reduce((a,b)=>a+b.p,0)/ex.length/100:null;
  const ec=examCats();const cov=ec.filter(c=>S.cat[c]&&S.cat[c].t>=5).length/ec.length;
  const base=0.7*acc+0.3*(exAvg===null?acc:exAvg);
  const pct=Math.round(100*base*(0.85+0.15*cov));
  const per={};log.forEach(([c,ok])=>{per[c]=per[c]||{r:0,t:0};per[c].t++;per[c].r+=ok;});
  const weak=ec.map(c=>{const p=per[c]||S.cat[c]||{r:0,t:0};return {c,acc:p.t?p.r/p.t:0,t:p.t};}).sort((a,b)=>a.acc-b.acc||a.t-b.t).slice(0,3);
  return {pct,weak,hasExam:ex.length>0};
}
function renderReady(){
  const box=$("readyCard");if(!box)return;box.innerHTML="";
  const h=document.createElement("h3");h.textContent=T("readyTitle")+" · "+(S.exam||"06A");box.appendChild(h);
  const r=readiness();
  if(r.need){const p=document.createElement("div");p.className="note";p.textContent=T("readyNeed",{n:r.need,e:S.exam||"06A"});box.appendChild(p);return;}
  const lbl=r.pct>=80?T("ready3"):r.pct>=70?T("ready2"):r.pct>=60?T("ready1"):T("ready0");
  const col=r.pct>=70?"var(--good)":r.pct>=60?"var(--gold)":"var(--bad)";
  box.insertAdjacentHTML("beforeend",'<div class="rdy"><div class="rdyn"></div><div class="rdyl"></div></div><div class="gauge"><i></i><b></b></div><div class="note gline"></div>');
  box.querySelector(".rdyn").textContent=r.pct+"%";box.querySelector(".rdyn").style.color=col;box.querySelector(".rdyl").textContent=lbl;
  box.querySelector(".gauge i").style.width=Math.min(100,r.pct)+"%";box.querySelector(".gauge i").style.background=col;
  box.querySelector(".gline").textContent=T("readyLine");
  const w=document.createElement("div");w.className="note";w.style.marginTop="8px";w.textContent=T("readyWeak");box.appendChild(w);
  r.weak.forEach(x=>{const d=document.createElement("div");d.className="weakrow";d.innerHTML='<span></span><button class="mini"></button>';
    d.children[0].textContent=CATS[x.c].e+" "+cn(x.c)+(x.t?" · "+Math.round(x.acc*100)+"%":"");d.children[1].textContent=T("practiceBtn");
    d.children[1].onclick=()=>ask(pick(x.c),1,"",()=>renderReady(),true);box.appendChild(d);});
  const n=document.createElement("div");n.className="note";n.style.marginTop="8px";n.textContent=(r.hasExam?"":T("readyNoExam")+" ")+T("readyHow");box.appendChild(n);
}

// ----- Lesson path -----
function renderPath(){
  const box=$("pathList");if(!box)return;box.innerHTML="";
  const units=examUnits();let total=0,done=0;
  units.forEach(u=>{total+=u.lessons.length;done+=u.lessons.filter(l=>S.lessons[l.id]).length;});
  $("pathCount").textContent=T("lessonsDone",{n:done,m:total});
  units.forEach(u=>{
    const card=document.createElement("div");card.className="unit";
    const ud=u.lessons.filter(l=>S.lessons[l.id]).length;
    card.innerHTML='<div class="uhead"><span class="ue"></span><span class="ut"></span><span class="uc"></span></div><div class="ulist"></div>';
    card.querySelector(".ue").textContent=u.e;card.querySelector(".ut").textContent=u.t[S.lang];card.querySelector(".uc").textContent=ud+"/"+u.lessons.length;
    const list=card.querySelector(".ulist");
    u.lessons.forEach((l,i)=>{
      const open=lessonOpen(u,i),isDone=!!S.lessons[l.id];
      const b=document.createElement("button");b.className="lrow"+(isDone?" done":open?" open":" locked")+(l.safety?" safety":"");
      b.innerHTML='<span class="li"></span><span class="lt"></span><span class="ls"></span>';
      b.children[0].textContent=isDone?"✅":open?"▶️":"🔒";b.children[1].textContent=l.t[S.lang];b.children[2].textContent=isDone?T("review"):open?T("start"):T("locked");
      b.disabled=!open;b.onclick=()=>openLesson(l.id);list.appendChild(b);
    });
    box.appendChild(card);
  });
}
function openLesson(id){
  const f=findLesson(id);if(!f)return;const l=f.l;
  const sh=$("sheet");sh.classList.remove("showen");sh.innerHTML="";
  const top=document.createElement("div");top.innerHTML='<span class="qcat"></span>'+(S.lang==="es"?'<button class="enbtn" id="enBtn"></button>':'');
  top.querySelector(".qcat").textContent=f.u.e+" "+f.u.t[S.lang];sh.appendChild(top);
  const h=document.createElement("div");h.className="qtext";h.textContent=l.t[S.lang];sh.appendChild(h);
  if(l.svg&&DIAGRAMS[l.svg]){const d=document.createElement("div");d.innerHTML=DIAGRAMS[l.svg]((en,es)=>S.lang==="es"?es:en);sh.appendChild(d);}
  const body=document.createElement("div");body.className="lbody";
  l[S.lang].forEach((p,k)=>{const el=fmtP(p.replace(/^• /,""));el.className=p.indexOf("• ")===0?"lbul":"lpar";
    if(S.lang==="es"){const en=fmtP(l.en[k].replace(/^• /,""));en.className="entext";el.appendChild(en);}
    body.appendChild(el);});
  sh.appendChild(body);
  const go=document.createElement("button");go.className="bigbtn";go.style.fontSize="16px";go.textContent=T("checkBtn");go.onclick=()=>lessonCheck(l);sh.appendChild(go);
  const cl=document.createElement("button");cl.className="ghost";cl.textContent=T("close");cl.onclick=()=>{$("modal").classList.remove("on");};sh.appendChild(cl);
  if($("enBtn")){$("enBtn").textContent=T("verEn");$("enBtn").onclick=()=>{const on=sh.classList.toggle("showen");$("enBtn").textContent=on?T("hideEn"):T("verEn");};}
  $("modal").classList.add("on");sh.scrollTop=0;
}
function lessonCheck(l){
  const ids=shuffle(l.quiz).slice(0,3);let right=0,k=0;
  const next=()=>{if(k>=ids.length){finish();return;}const i=ids[k++];ask(i,1,"✅ "+k+"/3",ok=>{if(ok)right++;setTimeout(next,150);},true,true);};
  const finish=()=>{
    const pass=right>=2;
    if(pass&&!S.lessons[l.id]){S.lessons[l.id]=true;addCoins(150);S.spins+=3;burst("🎉");}
    else if(pass){S.lessons[l.id]=true;}
    save();hud();
    const sh=$("sheet");sh.innerHTML='<div class="nudge"><div class="big"></div><div class="qtext" style="margin:0 0 10px"></div><button class="bigbtn" id="lcBtn"></button></div>';
    sh.querySelector(".big").textContent=pass?"🎉":"📚";sh.querySelector(".qtext").textContent=pass?T("checkPass"):T("checkFail",{n:right});
    $("lcBtn").textContent=pass?T("exDone"):T("reviewLesson");$("lcBtn").onclick=()=>{if(pass){$("modal").classList.remove("on");renderLearn();}else openLesson(l.id);};
    $("modal").classList.add("on");
  };
  next();
}

// ----- Exam Mode -----
let EXM=null;
function examMenu(){
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<div class="qtext" style="margin-top:0"></div><div class="note" id="exI"></div><button class="examcard" id="exA"><b></b></button><button class="examcard" id="exB"><b></b></button><div class="note" id="exN"></div><button class="ghost" id="exC"></button>';
  sh.querySelector(".qtext").textContent=T("exTitle")+" · "+(S.exam||"06A");$("exI").textContent=T("exIntro");$("exN").textContent=T("exNote");
  $("exA").firstChild.textContent=T("exQuick");$("exB").firstChild.textContent=T("exFull");$("exC").textContent=T("close");
  $("exA").onclick=()=>startExam(20,60);$("exB").onclick=()=>startExam(60,180);$("exC").onclick=()=>$("modal").classList.remove("on");
  $("modal").classList.add("on");
}
function startExam(n,mins){
  const ex=S.exam||"06A";let pool=[];QB.forEach((q,i)=>{if(applies(q,ex))pool.push(i);});
  const qs=shuffle(pool).slice(0,n).map(i=>({i,order:shuffle([0,1,2,3]),pick:-1}));
  EXM={qs,cur:0,end:Date.now()+mins*60000,start:Date.now(),timer:null};
  EXM.timer=setInterval(()=>{const el=$("exClock");if(!el){return;}const ms=EXM.end-Date.now();if(ms<=0){clearInterval(EXM.timer);toast(T("timeUp"),3000);finishExam();return;}el.textContent=fmtT(ms);el.style.color=ms<5*60000?"var(--bad)":"var(--gold)";},1000);
  renderExamQ();
}
const fmtT=ms=>{const s=Math.max(0,Math.round(ms/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":":"")+(h&&m<10?"0":"")+m+":"+(x<10?"0":"")+x;};
function renderExamQ(){
  const e=EXM,o=e.qs[e.cur],x=qText(o.i),en=qText(o.i,"en");
  const sh=$("sheet");const keepEn=sh.classList.contains("showen");
  sh.innerHTML='<div class="exhead"><span id="exPos"></span><span id="exClock"></span></div>'+(S.lang==="es"?'<button class="enbtn" id="enBtn"></button>':'')+'<div class="qtext"><span id="qT"></span><div class="entext" id="qEn"></div></div><div id="opts"></div><div class="exnav"><button class="ghost" id="exP"></button><button class="ghost" id="exNx"></button></div><button class="bigbtn" id="exS" style="font-size:16px"></button><button class="ghost" id="exQ" style="color:var(--muted)"></button>';
  $("exPos").textContent=T("exQ",{i:e.cur+1,n:e.qs.length});$("exClock").textContent=fmtT(e.end-Date.now());
  $("qT").textContent=x.q;$("qEn").textContent=en.q;
  o.order.forEach(k=>{const b=document.createElement("button");b.className="opt"+(o.pick===k?" sel":"");const s1=document.createElement("span");s1.textContent=x.a[k];b.appendChild(s1);
    if(S.lang==="es"){const s2=document.createElement("div");s2.className="entext";s2.textContent=en.a[k];b.appendChild(s2);}
    b.onclick=()=>{o.pick=k;if(e.cur<e.qs.length-1){e.cur++;}renderExamQ();};$("opts").appendChild(b);});
  $("exP").textContent=T("exPrev");$("exP").disabled=e.cur===0;$("exP").onclick=()=>{e.cur--;renderExamQ();};
  $("exNx").textContent=T("exNext");$("exNx").disabled=e.cur===e.qs.length-1;$("exNx").onclick=()=>{e.cur++;renderExamQ();};
  const un=e.qs.filter(q=>q.pick<0).length;
  $("exS").textContent=T("exSubmit");$("exS").onclick=function(){if(un===0||this.dataset.armed)finishExam();else{this.dataset.armed=1;this.textContent=T("exSubmitConfirm",{n:un});}};
  $("exQ").textContent=T("exQuit");$("exQ").onclick=function(){if(this.dataset.armed){clearInterval(e.timer);EXM=null;$("modal").classList.remove("on");}else{this.dataset.armed=1;this.textContent=T("exQuitConfirm");}};
  if($("enBtn")){if(keepEn)sh.classList.add("showen");$("enBtn").textContent=sh.classList.contains("showen")?T("hideEn"):T("verEn");$("enBtn").onclick=()=>{const on=sh.classList.toggle("showen");$("enBtn").textContent=on?T("hideEn"):T("verEn");};}
  $("modal").classList.add("on");
}
function artKey(i){const q=QB[i],r=q.r||"";
  if(/WAC|RCW/.test(r))return S.lang==="es"?"Leyes de WA":"WA law";
  const m=r.match(/(?:NEC|Table|Art\.)\s*(?:Table\s*)?(\d{2,3})/);if(m)return "Art. "+m[1];
  if(/Ch\. 9/.test(r))return S.lang==="es"?"Cap. 9":"Ch. 9";
  return cn(q.c);}
function finishExam(){
  const e=EXM;if(!e)return;clearInterval(e.timer);EXM=null;
  const X=E(),W=X.week;let right=0;const rep={},missed=[];
  e.qs.forEach(o=>{const q=QB[o.i],ok=o.pick===0;const s=S.qs[o.i]=S.qs[o.i]||{r:0,w:0};
    S.cat[q.c].t++;X.total++;W.total++;if(q.c===focus())X.focusT++;
    if(ok){right++;s.r++;S.cat[q.c].r++;X.right++;W.right++;if(q.c===focus()){X.focusR++;W.focusR++;}}else{s.w++;missed.push(o);}
    logAns(q.c,ok);const k=artKey(o.i);rep[k]=rep[k]||{r:0,t:0};rep[k].t++;if(ok)rep[k].r++;});
  const p=Math.round(100*right/e.qs.length),pass=p>=70;
  const coins=right*20+(pass?300:0);addCoins(coins);S.xp+=right*10;
  if(!X.exams)X.exams=[];X.exams.push({d:Date.now(),n:e.qs.length,p});if(X.exams.length>10)X.exams.shift();
  save();hud();
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<div class="nudge"><div class="result" id="exR"></div><div class="qtext" id="exSc" style="margin:4px 0"></div><div class="note" id="exT"></div><div class="note" id="exC"></div></div><h3 style="font-size:14px;margin:14px 0 6px" id="exRh"></h3><div id="exRep"></div><h3 style="font-size:14px;margin:14px 0 6px" id="exMh"></h3><div id="exMiss"></div><button class="bigbtn" id="exD"></button>';
  $("exR").textContent=pass?"✔ "+T("exPass"):"✘ "+T("exFail");$("exR").className="result "+(pass?"g":"b");
  $("exSc").textContent=T("exScore",{p,r:right,n:e.qs.length});$("exT").textContent=T("exTime",{t:fmtT(Date.now()-e.start)});$("exC").textContent=T("exReward",{c:coins});
  $("exRh").textContent=T("exReport");
  Object.keys(rep).map(k=>({k,...rep[k]})).sort((a,b)=>a.r/a.t-b.r/b.t).forEach(x=>{const pc=Math.round(100*x.r/x.t),col=pc>=70?"var(--good)":pc>=50?"var(--gold)":"var(--bad)";
    const d=document.createElement("div");d.className="bar";d.innerHTML='<span class="n"></span><span class="t"><i></i></span><span class="p"></span>';
    d.querySelector(".n").textContent=x.k;d.querySelector("i").style.width=pc+"%";d.querySelector("i").style.background=col;d.querySelector(".p").textContent=x.r+"/"+x.t;$("exRep").appendChild(d);});
  $("exMh").textContent=T("exMissed")+" ("+missed.length+")";
  missed.forEach(o=>{const x=qText(o.i);const d=document.createElement("div");d.className="explain";d.style.display="block";d.style.marginBottom="8px";
    d.innerHTML='<b></b><div style="color:var(--good);margin-top:4px"></div><div style="margin-top:4px"></div><span class="ref"></span>';
    d.children[0].textContent=x.q;d.children[1].textContent="✔ "+x.a[0];d.children[2].textContent=x.e;d.children[3].textContent="📖 "+x.r;$("exMiss").appendChild(d);});
  $("exD").textContent=T("exDone");$("exD").onclick=()=>{$("modal").classList.remove("on");renderLearn();};
  $("modal").classList.add("on");sh.scrollTop=0;
}

// ----- Code Lookup Drill -----
function lookupMenu(){
  const sh=$("sheet");sh.classList.remove("showen");
  sh.innerHTML='<div class="qtext" style="margin-top:0"></div><div class="note" id="lkI"></div><div class="note" id="lkB" style="margin-top:6px"></div><button class="bigbtn" id="lkS"></button><button class="ghost" id="lkC"></button>';
  sh.querySelector(".qtext").textContent=T("lkTitle");$("lkI").textContent=T("lkIntro");
  const X=E();$("lkB").textContent=X.lkBest?T("lkBest",{s:X.lkBest}):"";
  $("lkS").textContent=T("lkStart");$("lkC").textContent=T("close");
  $("lkS").onclick=()=>startLookup();$("lkC").onclick=()=>$("modal").classList.remove("on");
  $("modal").classList.add("on");
}
function startLookup(){
  const ex=S.exam||"06A";const pool=LOOKUPS.filter(l=>l[0]==="all"||l[0].split(",").indexOf(ex)>=0);
  const items=shuffle(pool).slice(0,5);const res=[];let k=0,timer=null;
  const show=()=>{
    if(k>=items.length)return done();
    const it=items[k],t0=Date.now();
    const sh=$("sheet");sh.innerHTML='<div class="exhead"><span></span><span id="lkClock">2:00</span></div><div class="note"></div><div class="qtext" style="margin-top:4px"></div><div id="opts"></div><div class="result" id="lkR"></div><button class="bigbtn" id="lkN" style="display:none"></button>';
    sh.querySelector(".exhead span").textContent=(k+1)+" / "+items.length;sh.querySelector(".note").textContent=T("lkFind");
    sh.querySelector(".qtext").textContent=S.lang==="es"?it[2]:it[1];
    let answered=false;
    const finish=(choice)=>{if(answered)return;answered=true;clearInterval(timer);const secs=Math.round((Date.now()-t0)/1000);const ok=choice===it[3];
      [...$("opts").children].forEach(b=>{b.disabled=true;if(b.textContent===it[3])b.classList.add("right");else if(b.textContent===choice)b.classList.add("wrong");});
      let c=0;if(ok){c=50+Math.max(0,120-secs)*2;addCoins(c);burst("🔎");}
      res.push({ok,secs});$("lkR").textContent=ok?T("lkRight",{s:secs,c}):T("lkWrong",{a:it[3]});$("lkR").className="result "+(ok?"g":"b");
      $("lkN").style.display="block";$("lkN").textContent=T("cont");$("lkN").onclick=()=>{k++;show();};save();hud();};
    shuffle([it[3]].concat(it[4])).forEach(a=>{const b=document.createElement("button");b.className="opt";b.textContent=a;b.onclick=()=>finish(a);$("opts").appendChild(b);});
    timer=setInterval(()=>{const left=120-Math.round((Date.now()-t0)/1000);const el=$("lkClock");if(el){el.textContent=fmtT(Math.max(0,left)*1000);el.style.color=left<30?"var(--bad)":"var(--gold)";}if(left<=0)finish(null);},500);
    $("modal").classList.add("on");
  };
  const done=()=>{const X=E();const r=res.filter(x=>x.ok).length;const avg=Math.round(res.reduce((a,b)=>a+b.secs,0)/res.length);
    if(r===res.length){X.lkPerfect=true;if(!X.lkBest||avg<X.lkBest)X.lkBest=avg;}save();
    const sh=$("sheet");sh.innerHTML='<div class="nudge"><div class="big">🔎</div><div class="qtext" style="margin:0 0 6px"></div><div class="note"></div><button class="bigbtn" id="lkA"></button><button class="ghost" id="lkD"></button></div>';
    sh.querySelector(".qtext").textContent=T("lkSummary",{r,n:res.length,s:avg});sh.querySelector(".note").textContent=X.lkBest?T("lkBest",{s:X.lkBest}):"";
    $("lkA").textContent=T("lkStart");$("lkA").onclick=()=>startLookup();$("lkD").textContent=T("exDone");$("lkD").onclick=()=>$("modal").classList.remove("on");};
  show();
}

// ----- Reminders -----
const OS_ID=(typeof CJ_CONFIG==="object"&&CJ_CONFIG.oneSignalAppId)||"";
let osReady=false;
function initPush(){
  if(!OS_ID||location.protocol!=="https:")return;
  window.OneSignalDeferred=window.OneSignalDeferred||[];
  const base=location.pathname.replace(/[^/]*$/,"");
  window.OneSignalDeferred.push(function(OneSignal){
    return OneSignal.init({appId:OS_ID,serviceWorkerPath:(base+"push/onesignal/OneSignalSDKWorker.js").replace(/^\//,""),serviceWorkerParam:{scope:base+"push/onesignal/"}})
      .then(()=>{osReady=true;try{OneSignal.User.addTags({exam:S.exam||"06A",lang:S.lang});}catch(e){}renderReminders();});
  });
  const s=document.createElement("script");s.src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";s.defer=true;document.head.appendChild(s);
}
function renderReminders(){
  const box=$("remCard");if(!box)return;box.innerHTML="";
  const h=document.createElement("h3");h.textContent=T("remTitle");box.appendChild(h);
  if(OS_ID){
    const perm=(typeof Notification!=="undefined")?Notification.permission:"default";
    const isIOS=/iphone|ipad/i.test(navigator.userAgent),standalone=(navigator.standalone===true)||(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches);
    if(perm==="granted"){const d=document.createElement("div");d.className="note";d.style.color="var(--good)";d.textContent=T("remPushOn");box.appendChild(d);}
    else if(perm==="denied"){const d=document.createElement("div");d.className="note";d.textContent=T("remPushNo");box.appendChild(d);}
    else if(isIOS&&!standalone){const d=document.createElement("div");d.className="note";d.textContent=T("remIos");box.appendChild(d);}
    else{const b=document.createElement("button");b.className="calcbtn";b.style.marginTop="0";b.textContent=T("remPush");
      b.onclick=()=>{window.OneSignalDeferred=window.OneSignalDeferred||[];window.OneSignalDeferred.push(function(OneSignal){return OneSignal.Notifications.requestPermission().then(()=>renderReminders());});};box.appendChild(b);}
  }
  const row=document.createElement("div");row.className="nickrow";row.style.marginTop="10px";row.innerHTML='<span class="note" style="align-self:center"></span><input type="time" id="remT" value="'+(S.remTime||"17:30")+'" style="flex:0 0 120px">';
  row.querySelector("span").textContent=T("remTime");box.appendChild(row);
  const c=document.createElement("button");c.className="ghost";c.textContent=T("remCal");c.onclick=calendarReminder;box.appendChild(c);
  const n=document.createElement("div");n.className="note";n.style.marginTop="6px";n.textContent=T("remCalNote");box.appendChild(n);
}
function calendarReminder(){
  const tm=($("remT")&&$("remT").value)||"17:30";S.remTime=tm;save();
  const [hh,mm]=tm.split(":").map(Number);const d=new Date();d.setHours(hh,mm,0,0);if(d<new Date())d.setDate(d.getDate()+1);
  const p=n=>(n<10?"0":"")+n;const dt=d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+"T"+p(hh)+p(mm)+"00";
  const end=new Date(d.getTime()+15*60000);const dte=end.getFullYear()+p(end.getMonth()+1)+p(end.getDate())+"T"+p(end.getHours())+p(end.getMinutes())+"00";
  const title=S.lang==="es"?"Estudiar: Code Jackpot ⚡":"Study: Code Jackpot ⚡";
  const desc=(S.lang==="es"?"10 minutos de estudio para tu examen eléctrico. ":"10 minutes of study for your electrical exam. ")+location.href.split("#")[0];
  const now=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Code Jackpot//EN","BEGIN:VEVENT","UID:cj-"+S.pid+"@codejackpot","DTSTAMP:"+now,"DTSTART:"+dt,"DTEND:"+dte,"RRULE:FREQ=DAILY","SUMMARY:"+title,"DESCRIPTION:"+desc,"URL:"+location.href.split("#")[0],
    "BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+title,"TRIGGER:PT0M","END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"}));a.download="code-jackpot-reminder.ics";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);
}

function renderLearn(){renderReady();renderPath();renderReminders();renderGuide();}
$("examModeBtn").onclick=examMenu;$("lookupModeBtn").onclick=lookupMenu;
initPush();

// ---------- Rewards: build-a-job, power-ups, ranks & badges ----------
Object.assign(TXT.en,{
  wallet:"Coins",jobDoneBanner:"🎉 Job complete!",buildTitle:"🏗️ Your job site",buildNote:"Spend coins to build each job. Finish a job for bonus spins and a harder job.",
  buildBtn:"Build · {c}",built:"Built ✓",needMore:"Need {c} more",jobDone:"🎉 Job complete! +{s} spins",jobN:"Job {n}",
  shopTitle:"🛒 Power-ups",shopNote:"Use 50/50 and Code hint right inside a question.",
  pu5050:"50/50",puHint:"💡 Hint",puShield:"🛡️ Streak shield",puSpins:"🎰 +5 spins",puOwned:"You have {n}",buy:"Buy · {c}",
  pu5050d:"Removes two wrong answers ({c} coins)",puHintd:"Shows which code section to look in ({c} coins)",puShieldd:"Keeps your streak alive after one wrong answer",puSpinsd:"Trade coins for more plays",
  hintTxt:"📖 Look in: {r}",noCoins:"Not enough coins",shieldUsed:"🛡️ Streak shield used — your streak is safe!",bought:"✔ Bought",
  ranks:["Trainee","Apprentice","Journey Level","Crew Lead","Master"],rankLbl:"Rank: {r}",nextRank:"Next rank at level {l}",
  badgeTitle:"🏅 Badges",badgeGot:"🏅 New badge: {b}",
  b_lesson1:"First lesson",b_safety:"Safety first (all safety lessons)",b_unit:"Unit complete",b_exam:"Passed a practice exam",b_full:"Passed a FULL practice exam",
  b_streak10:"10 in a row",b_lookup:"Perfect lookup drill",b_job1:"First job built",b_job3:"Three jobs built",b_ready80:"Ready Meter 80%+",b_mission7:"7 daily missions"
});
Object.assign(TXT.es,{
  wallet:"Monedas",jobDoneBanner:"🎉 ¡Trabajo terminado!",buildTitle:"🏗️ Tu obra",buildNote:"Gasta monedas para construir cada trabajo. Termina uno para ganar giros extra y un trabajo más difícil.",
  buildBtn:"Construir · {c}",built:"Hecho ✓",needMore:"Faltan {c}",jobDone:"🎉 ¡Trabajo terminado! +{s} giros",jobN:"Trabajo {n}",
  shopTitle:"🛒 Ayudas",shopNote:"Usa 50/50 y Pista dentro de una pregunta.",
  pu5050:"50/50",puHint:"💡 Pista",puShield:"🛡️ Escudo de racha",puSpins:"🎰 +5 giros",puOwned:"Tienes {n}",buy:"Comprar · {c}",
  pu5050d:"Quita dos respuestas incorrectas ({c} monedas)",puHintd:"Muestra en qué sección del código buscar ({c} monedas)",puShieldd:"Mantiene tu racha después de una respuesta incorrecta",puSpinsd:"Cambia monedas por más jugadas",
  hintTxt:"📖 Busca en: {r}",noCoins:"No tienes suficientes monedas",shieldUsed:"🛡️ Se usó el escudo — ¡tu racha está a salvo!",bought:"✔ Comprado",
  ranks:["Aprendiz","Ayudante","Oficial","Líder de cuadrilla","Maestro/a"],rankLbl:"Rango: {r}",nextRank:"Siguiente rango en el nivel {l}",
  badgeTitle:"🏅 Insignias",badgeGot:"🏅 Nueva insignia: {b}",
  b_lesson1:"Primera lección",b_safety:"La seguridad primero (todas las de seguridad)",b_unit:"Unidad completa",b_exam:"Aprobaste un examen de práctica",b_full:"Aprobaste un examen COMPLETO",
  b_streak10:"10 seguidas",b_lookup:"Búsqueda perfecta",b_job1:"Primer trabajo construido",b_job3:"Tres trabajos construidos",b_ready80:"Medidor 80%+",b_mission7:"7 misiones diarias"
});
const RANK_LV=[1,3,6,10,15],RANK_E=["🪪","🔧","⚡","🦺","👑"];
function rankIdx(){const l=level().l;let r=0;RANK_LV.forEach((v,i)=>{if(l>=v)r=i;});return r;}
function rankName(i){return T("ranks")[i]||"";}
const PRICES={p5050:100,hint:75,shield:150,spins:250};
function wallet(){const X=E();return Math.max(0,X.coins-(X.spent||0));}
function spend(c){if(wallet()<c){toast(T("noCoins"));return false;}const X=E();X.spent=(X.spent||0)+c;save();hud();return true;}

// Jobs: each piece [emoji, EN, ES]; costs grow per piece and per job
const JOBS=[
 {e:"🏠",en:"House: new service",es:"Casa: acometida nueva",p:[["🔌","Meter base","Base del medidor"],["🗄️","Main panel","Panel principal"],["🌍","Ground rods","Varillas de tierra"],["🍳","Kitchen circuits","Circuitos de cocina"],["🛁","Bathroom GFCIs","GFCI del baño"]]},
 {e:"❄️",en:"Heat pump install",es:"Instalación de bomba de calor",p:[["🧱","Pad & condenser","Base y condensadora"],["🔴","Disconnect","Desconectador"],["🔌","Service receptacle","Receptáculo de servicio"],["〰️","Whip & breaker","Flexible y breaker"],["🌡️","Thermostat wiring","Cableado del termostato"]]},
 {e:"🔥",en:"Electric heat retrofit",es:"Calefacción eléctrica",p:[["📦","Air handler","Manejadora de aire"],["♨️","Heat strips","Resistencias"],["⏱️","Sequencer","Secuenciador"],["🛑","Duct heater limits","Límites del calentador"],["🧮","Load calc approved","Cálculo de carga aprobado"]]},
 {e:"🏢",en:"Commercial rooftop unit",es:"Unidad de techo comercial",p:[["🏗️","Crane lift","Grúa"],["📦","Set the RTU","Colocar la unidad"],["🟩","Disconnect & EGC","Desconectador y tierra"],["🔋","Feeder","Alimentador"],["✅","Inspection passed","Inspección aprobada"]]}
];
function jobState(){const X=E();if(!X.build)X.build={job:0,got:0};return X.build;}
function jobDef(n){const t=JOBS[n%JOBS.length];return t;}
function pieceCost(n,k){return Math.round((400+n*500+k*150)*(1+Math.floor(n/JOBS.length)*0.5)/50)*50;}
function jobReward(n){return 15+5*Math.min(n,6);}
function canAfford(){const b=jobState();return wallet()>=pieceCost(b.job,b.got);}
function renderBuild(){
  const box=$("buildCard");if(!box)return;const b=jobState(),j=jobDef(b.job);box.innerHTML="";
  const h=document.createElement("h3");h.textContent=T("buildTitle");box.appendChild(h);
  const n=document.createElement("div");n.className="note";n.textContent=T("buildNote");box.appendChild(n);
  const jt=document.createElement("div");jt.className="jobt";jt.textContent=j.e+" "+T("jobN",{n:b.job+1})+" · "+j[S.lang];box.appendChild(jt);
  const bar=document.createElement("div");bar.className="gauge";bar.innerHTML="<i></i>";bar.querySelector("i").style.width=(100*b.got/5)+"%";bar.querySelector("i").style.background="var(--gold)";box.appendChild(bar);
  if(celebrating){const done=jobDef(celebrating.job);jt.textContent=done.e+" "+T("jobN",{n:celebrating.job+1})+" · "+done[S.lang];bar.querySelector("i").style.width="100%";const sc=sceneHTML(celebrating.job,5);box.appendChild(sc);celebrate(sc);return;}
  box.appendChild(sceneHTML(b.job,b.got));justBuilt=-1;
  const grid=document.createElement("div");grid.className="pieces";
  j.p.forEach((p,k)=>{const d=document.createElement("div");d.className="piece"+(k<b.got?" got":k===b.got?" next":"");
    d.innerHTML='<div class="pe"></div><div class="pn"></div>';d.querySelector(".pe").textContent=p[0];d.querySelector(".pn").textContent=S.lang==="es"?p[2]:p[1];grid.appendChild(d);});
  box.appendChild(grid);
  const cost=pieceCost(b.job,b.got),btn=document.createElement("button");btn.className="bigbtn";btn.style.fontSize="17px";
  const w=wallet();btn.textContent=w>=cost?T("buildBtn",{c:cost.toLocaleString()}):T("needMore",{c:(cost-w).toLocaleString()});btn.disabled=w<cost;
  btn.onclick=()=>{if(!spend(cost))return;justBuilt=b.got;b.got++;burst(j.p[b.got-1][0]);
    if(b.got>=5){const s=jobReward(b.job);S.spins+=s;celebrating={job:b.job};b.job++;b.got=0;toast(T("jobDone",{s}),3000);
      setTimeout(()=>{celebrating=null;renderBuild();},3200);}
    save();renderBuild();renderGuide();checkBadges();};
  box.appendChild(btn);
}
function renderShop(){
  const box=$("shopCard");if(!box)return;box.innerHTML="";
  const h=document.createElement("h3");h.textContent=T("shopTitle");box.appendChild(h);
  const n=document.createElement("div");n.className="note";n.textContent=T("shopNote");box.appendChild(n);
  [["shield",T("puShield"),T("puShieldd"),PRICES.shield,()=>{S.shield=(S.shield||0)+1;}],["spins",T("puSpins"),T("puSpinsd"),PRICES.spins,()=>{S.spins+=5;}]].forEach(it=>{
    const r=document.createElement("div");r.className="shoprow";r.innerHTML='<div><b></b><div class="note"></div></div><button class="mini"></button>';
    r.querySelector("b").textContent=it[1];r.querySelector(".note").textContent=it[2]+(it[0]==="shield"?" · "+T("puOwned",{n:S.shield||0}):"");
    const bt=r.querySelector("button");bt.textContent=T("buy",{c:it[3]});bt.onclick=()=>{if(spend(it[3])){it[4]();save();hud();toast(T("bought"));renderShop();}};box.appendChild(r);});
  [[T("pu5050"),T("pu5050d",{c:PRICES.p5050})],[T("puHint"),T("puHintd",{c:PRICES.hint})]].forEach(it=>{const d=document.createElement("div");d.className="note";d.style.marginTop="6px";d.textContent=it[0]+" — "+it[1];box.appendChild(d);});
}
// Power-up bar inside a question
function powerBar(idx,opts,box,sh){
  const bar=document.createElement("div");bar.className="pubar";
  const b1=document.createElement("button");b1.className="mini";b1.textContent=T("pu5050")+" · "+PRICES.p5050;
  b1.onclick=()=>{if(!spend(PRICES.p5050))return;b1.disabled=true;let n=0;shuffle([...box.children].map((b,i)=>i)).forEach(i=>{if(n<2&&!opts[i].ok&&!box.children[i].disabled){box.children[i].disabled=true;box.children[i].style.opacity=".3";n++;}});};
  const b2=document.createElement("button");b2.className="mini";b2.textContent=T("puHint")+" · "+PRICES.hint;
  b2.onclick=()=>{if(!spend(PRICES.hint))return;b2.disabled=true;const d=document.createElement("div");d.className="note";d.style.color="var(--volt)";d.style.margin="4px 0";d.textContent=T("hintTxt",{r:qText(idx).r});bar.after(d);};
  const nz=s=>String(s).toLowerCase().replace(/[^a-z0-9.]/g,"");const ans=nz(QB[idx].a[0]),ref=nz(QB[idx].r);
  const giveaway=ans.length>2&&(ref.indexOf(ans)>=0||ans.indexOf(ref)>=0||/^(rcw|wac|nec|table|article)/.test(ans));
  bar.appendChild(b1);if(!giveaway)bar.appendChild(b2);box.before(bar);
  return bar;
}
// Badges
const BADGES=[
 ["lesson1","📘",()=>Object.keys(S.lessons||{}).length>=1],
 ["unit","🧩",()=>UNITS.some(u=>u.lessons.every(l=>S.lessons[l.id]))],
 ["safety","🦺",()=>UNITS.every(u=>u.lessons.filter(l=>l.safety).every(l=>S.lessons[l.id]))],
 ["streak10","🔥",()=>S.best>=10],
 ["exam","📝",()=>Object.values(S.ex).some(x=>(x.exams||[]).some(e=>e.p>=70))],
 ["full","🎓",()=>Object.values(S.ex).some(x=>(x.exams||[]).some(e=>e.p>=70&&e.n>=60))],
 ["lookup","🔎",()=>Object.values(S.ex).some(x=>x.lkPerfect)],
 ["job1","🏠",()=>Object.values(S.ex).some(x=>x.build&&x.build.job>=1)],
 ["job3","🏗️",()=>Object.values(S.ex).some(x=>x.build&&x.build.job>=3)],
 ["ready80","🎯",()=>{try{const r=readiness();return !r.need&&r.pct>=80;}catch(e){return false;}}],
 ["mission7","📅",()=>(S.missions||0)>=7]
];
function checkBadges(){if(!S.badges)S.badges={};let got=null;BADGES.forEach(b=>{if(!S.badges[b[0]]&&b[2]()){S.badges[b[0]]=Date.now();got=b;}});if(got){toast(T("badgeGot",{b:got[1]+" "+T("b_"+got[0])}),3000);try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}}
function renderBadges(){
  const box=$("badgeCard");if(!box)return;box.innerHTML="";if(!S.badges)S.badges={};
  const h=document.createElement("h3");h.textContent=T("badgeTitle")+" · "+Object.keys(S.badges).length+"/"+BADGES.length;box.appendChild(h);
  const r=rankIdx(),rl=document.createElement("div");rl.className="note";rl.style.marginBottom="8px";
  rl.textContent=RANK_E[r]+" "+T("rankLbl",{r:rankName(r)})+(r<RANK_LV.length-1?" · "+T("nextRank",{l:RANK_LV[r+1]}):"");box.appendChild(rl);
  const g=document.createElement("div");g.className="badges";
  BADGES.forEach(b=>{const d=document.createElement("div");d.className="badge"+(S.badges[b[0]]?" got":"");d.innerHTML='<div class="be"></div><div class="bn"></div>';d.querySelector(".be").textContent=b[1];d.querySelector(".bn").textContent=T("b_"+b[0]);g.appendChild(d);});
  box.appendChild(g);
}


// ---------- Look & feel: themes and avatars ----------
Object.assign(TXT.en,{lookTitle:"🎨 Make it yours",lookTheme:"Color theme",lookAvatar:"Your game piece",
  th_classic:"Classic",th_rose:"Rose Gold",th_lavender:"Lavender",th_mint:"Mint & Coral",th_sunset:"Sunset",th_midnight:"Midnight Pink"});
Object.assign(TXT.es,{lookTitle:"🎨 Hazlo tuyo",lookTheme:"Colores",lookAvatar:"Tu ficha",
  th_classic:"Clásico",th_rose:"Oro rosa",th_lavender:"Lavanda",th_mint:"Menta y coral",th_sunset:"Atardecer",th_midnight:"Rosa nocturno"});
const THEMES={
  classic:{sw:["#0d1326","#ffc83d","#3ee6ff"]},
  rose:{sw:["#2a1420","#f4b6c2","#e8a87c"]},
  lavender:{sw:["#1e1636","#c9b6ff","#7ee8c8"]},
  mint:{sw:["#0f2a2a","#ff8a7a","#7ee8d0"]},
  sunset:{sw:["#2a1622","#ffb347","#ff6f91"]},
  midnight:{sw:["#120f24","#ff7eb6","#9ad0ff"]}
};
const AVATARS=["👷‍♀️","👷‍♂️","👷","⛑️","🦺","⚡","🔧","❄️","🌸","🦋","💎","🌻"];
function applyTheme(){document.body.setAttribute("data-theme",S.theme||"classic");const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=THEMES[S.theme||"classic"].sw[0];}
function myToken(){return S.avatar||"👷‍♀️";}
function renderLook(){
  const box=$("lookCard");if(!box)return;box.innerHTML="";
  const h=document.createElement("h3");h.textContent=T("lookTitle");box.appendChild(h);
  const l1=document.createElement("div");l1.className="note";l1.textContent=T("lookTheme");box.appendChild(l1);
  const g=document.createElement("div");g.className="themes";
  Object.keys(THEMES).forEach(k=>{const b=document.createElement("button");b.className="themebtn"+((S.theme||"classic")===k?" on":"");
    b.innerHTML='<span class="sw"></span><span class="tn"></span>';const sw=b.querySelector(".sw");
    sw.style.background="linear-gradient(135deg,"+THEMES[k].sw[0]+" 0 45%,"+THEMES[k].sw[1]+" 45% 75%,"+THEMES[k].sw[2]+" 75%)";
    b.querySelector(".tn").textContent=T("th_"+k);b.onclick=()=>{S.theme=k;save();applyTheme();renderLook();};g.appendChild(b);});
  box.appendChild(g);
  const l2=document.createElement("div");l2.className="note";l2.style.marginTop="10px";l2.textContent=T("lookAvatar");box.appendChild(l2);
  const a2=document.createElement("div");a2.className="avatars";
  AVATARS.forEach(e=>{const b=document.createElement("button");b.className="avbtn"+(myToken()===e?" on":"");b.textContent=e;b.onclick=()=>{S.avatar=e;save();renderLook();buildBoard();};a2.appendChild(b);});
  box.appendChild(a2);
}
applyTheme();

// ---------- Illustrated job scenes: parts appear as they're built ----------
const SCENES=(function(){
  const Ls=(en,es)=>S.lang==="es"?es:en;
  const sky='<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#d9f1ff"/></linearGradient><linearGradient id="indoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e9dc"/><stop offset="1" stop-color="#e2d3bf"/></linearGradient></defs>';
  const svg=b=>'<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" class="scene-svg">'+sky+b+'</svg>';
  const pt=(k,b)=>'<g class="pt" data-k="'+k+'">'+b+'</g>';
  const tag=(x,y,s)=>'<text x="'+x+'" y="'+y+'" font-size="9" font-weight="700" font-family="Inter,sans-serif" fill="#1d2440" text-anchor="middle">'+s+'</text>';
  return [
  // Job 1: house, new service
  ()=>svg('<rect width="320" height="190" fill="url(#sky)"/><rect y="160" width="320" height="30" fill="#7cc46a"/><rect y="158" width="320" height="4" fill="#5aa24c"/>'+
   '<polygon points="40,80 160,20 280,80" fill="#c0504d"/><rect x="50" y="80" width="220" height="80" fill="#f5e6c8" stroke="#8a7a5a"/>'+
   '<rect x="60" y="92" width="95" height="60" fill="#fff8ec" stroke="#b9a882"/><rect x="165" y="92" width="95" height="60" fill="#eef7ff" stroke="#b9a882"/>'+
   tag(107,88,Ls("KITCHEN","COCINA"))+tag(212,88,Ls("BATH","BAÑO"))+'<rect x="300" y="40" width="6" height="120" fill="#7a5a3a"/><line x1="303" y1="48" x2="268" y2="96" stroke="#222" stroke-width="2"/>'+
   pt(0,'<rect x="262" y="96" width="14" height="20" rx="3" fill="#9aa4b8" stroke="#3a4560"/><circle cx="269" cy="104" r="4.5" fill="#d8f0ff" stroke="#3a4560"/>')+
   pt(1,'<rect x="140" y="100" width="12" height="30" fill="#7d879c" stroke="#3a4560"/><line x1="143" y1="106" x2="149" y2="106" stroke="#fff"/><line x1="143" y1="111" x2="149" y2="111" stroke="#fff"/><line x1="143" y1="116" x2="149" y2="116" stroke="#fff"/><line x1="152" y1="104" x2="262" y2="104" stroke="#3a4560" stroke-width="1.5" stroke-dasharray="3 2"/>')+
   pt(2,'<line x1="269" y1="116" x2="269" y2="176" stroke="#2e8b57" stroke-width="2.5"/><rect x="266" y="160" width="6" height="26" fill="#b87333"/>')+
   pt(3,'<rect x="72" y="118" width="70" height="16" fill="#d9c3a3"/><rect x="80" y="108" width="7" height="9" rx="1.5" fill="#fff" stroke="#555"/><rect x="118" y="108" width="7" height="9" rx="1.5" fill="#fff" stroke="#555"/><circle cx="100" cy="100" r="7" fill="#ffe27a" opacity=".9"/>')+
   pt(4,'<rect x="230" y="128" width="26" height="20" rx="6" fill="#fff" stroke="#9ab"/><rect x="180" y="104" width="12" height="16" rx="2" fill="#fff" stroke="#555"/><rect x="183" y="107" width="6" height="3" fill="#e33"/><rect x="183" y="113" width="6" height="3" fill="#333"/>')),
  // Job 2: heat pump install
  ()=>svg('<rect width="320" height="190" fill="url(#sky)"/><rect y="160" width="320" height="30" fill="#7cc46a"/>'+
   '<rect x="20" y="40" width="190" height="120" fill="#e9dcc3" stroke="#8a7a5a"/><rect x="20" y="40" width="190" height="10" fill="#b5654a"/><rect x="40" y="70" width="60" height="50" fill="#bfe4ff" stroke="#fff" stroke-width="3"/>'+
   pt(0,'<rect x="225" y="150" width="80" height="10" fill="#bbb"/><rect x="232" y="102" width="66" height="48" rx="4" fill="#e7ebf2" stroke="#7d879c"/><circle cx="265" cy="126" r="17" fill="#cfd6e2" stroke="#7d879c"/><line x1="252" y1="126" x2="278" y2="126" stroke="#7d879c" stroke-width="2"/><line x1="265" y1="113" x2="265" y2="139" stroke="#7d879c" stroke-width="2"/>')+
   pt(1,'<rect x="186" y="84" width="20" height="26" rx="2" fill="#8d97ab" stroke="#3a4560"/><rect x="192" y="90" width="8" height="10" fill="#e33"/>')+
   pt(2,'<rect x="160" y="96" width="14" height="18" rx="2" fill="#fff" stroke="#555"/><rect x="164" y="100" width="6" height="3" fill="#333"/><rect x="164" y="106" width="6" height="3" fill="#333"/>'+tag(167,124,"GFCI"))+
   pt(3,'<path d="M196 110 C 200 140, 225 128, 236 130" fill="none" stroke="#222" stroke-width="3"/><path d="M196 84 L196 60 L210 60" fill="none" stroke="#666" stroke-width="2.5"/>')+
   pt(4,'<rect x="54" y="80" width="30" height="34" rx="4" fill="#fff" stroke="#555"/><text x="69" y="102" font-size="11" font-weight="800" text-anchor="middle" fill="#2a7">72°</text>')),
  // Job 3: electric heat retrofit (utility closet)
  ()=>svg('<rect width="320" height="190" fill="url(#indoor)"/><rect y="168" width="320" height="22" fill="#b89a74"/>'+
   '<rect x="230" y="20" width="70" height="40" fill="#cfd6e2" stroke="#7d879c"/>'+tag(265,33,Ls("DUCT","DUCTO"))+
   pt(0,'<rect x="90" y="50" width="90" height="118" rx="4" fill="#e7ebf2" stroke="#7d879c"/><rect x="100" y="120" width="70" height="40" fill="#d5dbe6"/><rect x="180" y="30" width="50" height="20" fill="#cfd6e2" stroke="#7d879c"/>')+
   pt(1,'<rect x="100" y="60" width="70" height="40" fill="#2b2f3a"/><path d="M106 70 q6 -8 12 0 t12 0 t12 0 t12 0 t10 0" fill="none" stroke="#ff5a3c" stroke-width="3"/><path d="M106 88 q6 -8 12 0 t12 0 t12 0 t12 0 t10 0" fill="none" stroke="#ff8a3c" stroke-width="3"/>')+
   pt(2,'<rect x="40" y="70" width="34" height="24" rx="3" fill="#8d97ab" stroke="#3a4560"/>'+tag(57,86,"SEQ")+'<line x1="74" y1="82" x2="100" y2="82" stroke="#3a4560" stroke-width="1.5" stroke-dasharray="3 2"/>')+
   pt(3,'<circle cx="252" cy="47" r="6" fill="#e33" stroke="#fff"/><circle cx="276" cy="47" r="6" fill="#e33" stroke="#fff"/>'+tag(254,72,Ls("LIMITS","LÍMITES")))+
   pt(4,'<rect x="230" y="96" width="60" height="70" rx="4" fill="#fff" stroke="#888"/><rect x="250" y="91" width="20" height="8" rx="2" fill="#aaa"/>'+tag(260,116,Ls("LOAD CALC","CÁLCULO"))+'<path d="M246 136 l10 10 l20 -22" fill="none" stroke="#2a7" stroke-width="5" stroke-linecap="round"/>')),
  // Job 4: commercial rooftop unit
  ()=>svg('<rect width="320" height="190" fill="url(#sky)"/><rect x="20" y="96" width="210" height="94" fill="#9aa3b5" stroke="#6b7488"/>'+
   [40,80,120,160,200].map(x=>'<rect x="'+x+'" y="112" width="20" height="16" fill="#cfe9ff"/><rect x="'+x+'" y="142" width="20" height="16" fill="#cfe9ff"/>').join('')+'<rect x="20" y="92" width="210" height="6" fill="#6b7488"/>'+
   pt(0,'<rect x="262" y="20" width="8" height="170" fill="#f2b705"/><line x1="266" y1="22" x2="150" y2="22" stroke="#f2b705" stroke-width="6"/><line x1="160" y1="22" x2="160" y2="52" stroke="#333"/><path d="M156 52 q4 8 8 0" fill="none" stroke="#333" stroke-width="2"/>')+
   pt(1,'<rect x="110" y="58" width="80" height="34" rx="3" fill="#e7ebf2" stroke="#7d879c"/><circle cx="130" cy="75" r="10" fill="#cfd6e2" stroke="#7d879c"/><circle cx="170" cy="75" r="10" fill="#cfd6e2" stroke="#7d879c"/>')+
   pt(2,'<rect x="196" y="66" width="16" height="22" rx="2" fill="#8d97ab" stroke="#3a4560"/><rect x="200" y="71" width="8" height="9" fill="#e33"/><path d="M204 88 L204 92" stroke="#2e8b57" stroke-width="3"/>')+
   pt(3,'<path d="M212 80 L226 80 L226 186" fill="none" stroke="#555" stroke-width="4"/>')+
   pt(4,'<g transform="rotate(-14 70 60)"><rect x="36" y="44" width="72" height="28" rx="4" fill="none" stroke="#1f9d55" stroke-width="3"/><text x="72" y="64" font-size="13" font-weight="900" font-family="Inter,sans-serif" fill="#1f9d55" text-anchor="middle">'+Ls("PASSED","APROBADO")+'</text></g>'))
  ];
})();
let justBuilt=-1,celebrating=null;
function sceneHTML(job,got){
  const html=SCENES[job%SCENES.length]();const wrap=document.createElement("div");wrap.className="scene";wrap.innerHTML=html;
  wrap.querySelectorAll("g.pt").forEach(g=>{const k=+g.dataset.k;g.classList.add(k<got?"on":k===got?"nextpt":"off");if(k===justBuilt&&k<got)g.classList.add("popin");});
  return wrap;
}
function celebrate(wrap){
  wrap.classList.add("party");
  const cols=["#ffc83d","#ff6f91","#3ee6ff","#3ddc84","#c9b6ff","#ff8a7a"];
  for(let i=0;i<36;i++){const c=document.createElement("i");c.className="confetti";c.style.left=(Math.random()*100)+"%";c.style.background=cols[i%cols.length];c.style.animationDelay=(Math.random()*0.4)+"s";c.style.transform="rotate("+(Math.random()*360)+"deg)";wrap.appendChild(c);}
  const ban=document.createElement("div");ban.className="banner";ban.textContent=T("jobDoneBanner");wrap.appendChild(ban);
}

// ---------- Tabs ----------
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));
  document.querySelectorAll("section").forEach(s=>s.classList.toggle("on",s.id===b.dataset.tab));
  clearInterval(LB.poll);
  renderGuide();
  if(b.dataset.tab==="board"){buildBoard();renderBuild();renderShop();}
  if(b.dataset.tab==="stats")stats();
  if(b.dataset.tab==="learn")renderLearn();
  if(b.dataset.tab==="leaders"){loadLB(false);LB.poll=setInterval(()=>loadLB(true),60000);}
});

// ---------- Start ----------
if(!S.exam){S.exam="06A";applyLang();pickExam(true);}else applyLang();
if(!Object.keys(S.lessons||{}).length&&E().total<5)setTimeout(()=>toast(T("learnNudge"),3500),1200);
// Leaderboard opens first
loadLB(true);LB.poll=setInterval(()=>loadLB(true),60000);
save();
if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js").catch(()=>{});}
})();
