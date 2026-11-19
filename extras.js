// Diagrams for lessons, and Code Lookup Drill items.
// Each diagram is a function of L(en, es) → SVG string. Colors are fixed for the dark theme.
const DIAGRAMS = (function(){
  const W='#eef2ff',M='#9aa6cf',G='#ffc83d',V='#3ee6ff',R='#ff5a6e',N='#3ddc84',B='#212c52',K='#0a0f20';
  const t=(x,y,s,o)=>`<text x="${x}" y="${y}" fill="${(o&&o.c)||W}" font-size="${(o&&o.s)||12}" font-family="Inter,sans-serif" text-anchor="${(o&&o.a)||'middle'}" font-weight="${(o&&o.w)||600}">${s}</text>`;
  const svg=(h,body)=>`<svg viewBox="0 0 320 ${h}" xmlns="http://www.w3.org/2000/svg" role="img" style="width:100%;height:auto;display:block;background:${K};border-radius:12px;margin:8px 0">${body}</svg>`;
  return {
  water:L=>svg(150,`<rect x="20" y="40" width="80" height="60" rx="8" fill="${B}" stroke="${V}"/>${t(60,66,L('Pump','Bomba'))}${t(60,84,L('= voltage','= voltaje'),{c:G,s:11})}
    <rect x="100" y="60" width="70" height="20" fill="${V}" opacity=".5"/>${t(135,52,L('flow = amps','flujo = amperios'),{c:V,s:11})}
    <rect x="170" y="64" width="50" height="12" fill="${V}" opacity=".5"/><rect x="170" y="56" width="50" height="8" fill="${M}"/><rect x="170" y="76" width="50" height="8" fill="${M}"/>${t(195,108,L('narrow = ohms','angosto = ohmios'),{c:G,s:11})}
    <rect x="220" y="60" width="80" height="20" fill="${V}" opacity=".5"/>${t(160,138,L('Voltage pushes · current flows · resistance restricts','Voltaje empuja · corriente fluye · resistencia restringe'),{s:10,c:M})}`),
  ohm:L=>svg(170,`<polygon points="160,15 260,150 60,150" fill="${B}" stroke="${G}" stroke-width="2"/><line x1="95" y1="100" x2="225" y2="100" stroke="${G}" stroke-width="2"/><line x1="160" y1="100" x2="160" y2="150" stroke="${G}" stroke-width="2"/>
    ${t(160,80,'E',{s:30,c:G,w:800})}${t(125,135,'I',{s:26,c:V,w:800})}${t(195,135,'R',{s:26,c:N,w:800})}
    ${t(40,40,L('E = volts','E = voltios'),{a:'start',s:11})}${t(40,56,L('I = amps','I = amperios'),{a:'start',s:11,c:V})}${t(40,72,L('R = ohms','R = ohmios'),{a:'start',s:11,c:N})}
    ${t(280,40,'E = I × R',{a:'end',s:11,c:G})}${t(280,56,'I = E ÷ R',{a:'end',s:11,c:V})}${t(280,72,'R = E ÷ I',{a:'end',s:11,c:N})}`),
  seriespar:L=>{const res=(x,y,v)=>`<rect x="${x}" y="${y}" width="${v?14:34}" height="${v?34:14}" rx="3" fill="${G}"/>`;
    return svg(170,`${t(80,18,L('Series','Serie'),{c:G})}<rect x="20" y="30" width="120" height="110" rx="6" fill="none" stroke="${V}" stroke-width="2"/>${res(35,23)}${res(90,23)}${res(133,70,1)}<circle cx="20" cy="85" r="10" fill="${K}" stroke="${W}"/>${t(20,89,'+',{s:12})}
    ${t(80,160,L('one path','un camino'),{s:11,c:M})}
    ${t(240,18,L('Parallel','Paralelo'),{c:G})}<line x1="180" y1="35" x2="300" y2="35" stroke="${V}" stroke-width="2"/><line x1="180" y1="135" x2="300" y2="135" stroke="${V}" stroke-width="2"/><line x1="180" y1="35" x2="180" y2="135" stroke="${V}" stroke-width="2"/>
    ${[220,260,300].map(x=>`<line x1="${x}" y1="35" x2="${x}" y2="68" stroke="${V}" stroke-width="2"/>${res(x-7,68,1)}<line x1="${x}" y1="102" x2="${x}" y2="135" stroke="${V}" stroke-width="2"/>`).join('')}<circle cx="180" cy="85" r="10" fill="${K}" stroke="${W}"/>${t(180,89,'+',{s:12})}
    ${t(240,160,L('separate paths','caminos separados'),{s:11,c:M})}`);},
  meter:L=>svg(160,`<rect x="20" y="60" width="90" height="40" rx="6" fill="${B}" stroke="${G}"/>${t(65,85,L('Load','Carga'))}<line x1="5" y1="80" x2="20" y2="80" stroke="${V}" stroke-width="3"/><line x1="110" y1="80" x2="125" y2="80" stroke="${V}" stroke-width="3"/>
    <path d="M30 60 Q65 20 100 60" fill="none" stroke="${R}" stroke-width="2" stroke-dasharray="4 3"/>${t(8,28,L('VOLTS: across (parallel)','VOLTIOS: a través (paralelo)'),{s:10,c:R,a:'start'})}
    <rect x="190" y="70" width="110" height="20" rx="4" fill="${B}"/><circle cx="245" cy="80" r="16" fill="none" stroke="${N}" stroke-width="3"/><line x1="170" y1="80" x2="300" y2="80" stroke="${V}" stroke-width="3"/>${t(245,50,L('AMPS: clamp one wire','AMPERIOS: pinza en un cable'),{s:10,c:N})}
    ${t(160,140,L('OHMS: power OFF, part isolated','OHMIOS: energía APAGADA, pieza aislada'),{s:11,c:G})}`),
  loto:L=>svg(150,`${['1','2','3','4','5','6'].map((n,i)=>`<circle cx="${30+i*52}" cy="50" r="18" fill="${B}" stroke="${G}" stroke-width="2"/>${t(30+i*52,56,n,{s:16,c:G,w:800})}`).join('')}
    ${t(30,90,L('Notify','Avisa'),{s:9})}${t(82,90,L('Shut off','Apaga'),{s:9})}${t(134,90,L('Isolate','Aísla'),{s:9})}${t(186,90,L('Lock/tag','Candado'),{s:9})}${t(238,90,L('Discharge','Descarga'),{s:9})}${t(290,90,L('Test','Prueba'),{s:9,c:R})}
    ${t(160,128,L('Test: live – dead – live','Prueba: vivo – muerto – vivo'),{s:12,c:R})}`),
  splitphase:L=>svg(170,`<rect x="30" y="30" width="60" height="110" rx="8" fill="${B}" stroke="${G}"/>${t(60,90,L('Xfmr','Transf.'),{s:11})}
    <line x1="90" y1="45" x2="290" y2="45" stroke="${R}" stroke-width="3"/>${t(300,49,'L1',{s:11,c:R,a:'end'})}<line x1="90" y1="85" x2="290" y2="85" stroke="${W}" stroke-width="3"/>${t(300,89,'N',{s:11,a:'end'})}<line x1="90" y1="125" x2="290" y2="125" stroke="${R}" stroke-width="3"/>${t(300,129,'L2',{s:11,c:R,a:'end'})}
    <line x1="150" y1="45" x2="150" y2="85" stroke="${V}" stroke-width="2"/>${t(165,70,'120 V',{s:11,c:V,a:'start'})}
    <line x1="230" y1="45" x2="230" y2="125" stroke="${G}" stroke-width="2"/>${t(240,110,'240 V',{s:11,c:G,a:'start'})}
    ${t(160,160,L('Hot–neutral 120 V · hot–hot 240 V','Vivo–neutro 120 V · vivo–vivo 240 V'),{s:11,c:M})}`),
  ladder:L=>svg(170,`<line x1="30" y1="20" x2="30" y2="150" stroke="${R}" stroke-width="3"/><line x1="290" y1="20" x2="290" y2="150" stroke="${W}" stroke-width="3"/>${t(30,14,'R (24V)',{s:10,c:R})}${t(290,14,'C',{s:10})}
    <line x1="30" y1="55" x2="80" y2="55" stroke="${V}" stroke-width="2"/><line x1="80" y1="45" x2="80" y2="65" stroke="${V}" stroke-width="2"/><line x1="92" y1="45" x2="92" y2="65" stroke="${V}" stroke-width="2"/>${t(86,38,'Y',{s:10,c:V})}
    <line x1="92" y1="55" x2="140" y2="55" stroke="${V}" stroke-width="2"/><line x1="140" y1="45" x2="140" y2="65" stroke="${V}" stroke-width="2"/><line x1="152" y1="45" x2="152" y2="65" stroke="${V}" stroke-width="2"/><line x1="136" y1="66" x2="156" y2="44" stroke="${V}" stroke-width="2"/>${t(146,38,L('limit','límite'),{s:10,c:V})}
    <line x1="152" y1="55" x2="220" y2="55" stroke="${V}" stroke-width="2"/><circle cx="235" cy="55" r="14" fill="${B}" stroke="${G}" stroke-width="2"/>${t(235,59,'CC',{s:10,c:G})}<line x1="249" y1="55" x2="290" y2="55" stroke="${V}" stroke-width="2"/>
    <line x1="30" y1="115" x2="220" y2="115" stroke="${V}" stroke-width="2"/><circle cx="235" cy="115" r="14" fill="${B}" stroke="${G}" stroke-width="2"/>${t(235,119,'IFR',{s:9,c:G})}<line x1="249" y1="115" x2="290" y2="115" stroke="${V}" stroke-width="2"/>
    ${t(110,95,L('NO = ‖   NC = ‖ with slash','NA = ‖   NC = ‖ con diagonal'),{s:10,c:M})}${t(160,160,L('Each rung: switches → load','Cada peldaño: interruptores → carga'),{s:11,c:M})}`),
  necmap:L=>svg(160,`${[['1–4',L('General: applies to all','General: aplica a todo'),G],['5–7',L('Special: can modify 1–4','Especial: modifica 1–4'),V],['8',L('Communications','Comunicaciones'),N],['9',L('Tables','Tablas'),M]].map((r,i)=>`<rect x="20" y="${12+i*36}" width="64" height="28" rx="6" fill="${r[2]}"/>${t(52,31+i*36,L('Ch. ','Cap. ')+r[0],{s:11,c:K,w:800})}${t(96,31+i*36,r[1],{a:'start',s:12})}`).join('')}`),
  service:L=>svg(150,`<rect x="10" y="50" width="60" height="40" rx="6" fill="${B}" stroke="${M}"/>${t(40,75,L('Utility','Compañía'),{s:10})}<rect x="120" y="50" width="60" height="40" rx="6" fill="${B}" stroke="${G}"/>${t(150,75,L('Main','Principal'),{s:10})}<rect x="230" y="50" width="70" height="40" rx="6" fill="${B}" stroke="${V}"/>${t(265,75,L('Subpanel','Subpanel'),{s:10})}
    <line x1="70" y1="70" x2="120" y2="70" stroke="${R}" stroke-width="3"/><line x1="180" y1="70" x2="230" y2="70" stroke="${G}" stroke-width="3"/><line x1="265" y1="90" x2="265" y2="125" stroke="${V}" stroke-width="3"/>
    ${t(95,40,L('Service','Acometida'),{s:10,c:R})}${t(95,112,'Art. 230',{s:9,c:M})}${t(205,40,L('Feeder','Alimentador'),{s:10,c:G})}${t(205,112,'Art. 215',{s:9,c:M})}${t(265,140,L('Branch circuit · 210','Circuito ramal · 210'),{s:10,c:V})}`),
  fault:L=>svg(170,`<rect x="20" y="40" width="70" height="80" rx="6" fill="${B}" stroke="${G}"/>${t(55,85,L('Panel','Panel'),{s:11})}<rect x="220" y="50" width="80" height="60" rx="6" fill="${B}" stroke="${M}"/>${t(260,84,L('Metal case','Caja metálica'),{s:10})}
    <line x1="90" y1="55" x2="230" y2="60" stroke="${R}" stroke-width="3"/>${t(160,48,L('hot touches case','vivo toca la caja'),{s:10,c:R})}<circle cx="232" cy="62" r="5" fill="${R}"/>
    <path d="M220 100 L90 105" stroke="${N}" stroke-width="3"/>${t(155,128,L('EGC: fault current back to source','EGC: corriente de falla de regreso'),{s:10,c:N})}
    ${t(12,155,L('→ breaker trips','→ se dispara el breaker'),{s:11,c:G,a:'start'})}${t(260,155,L('ground rod alone ✗','solo varilla ✗'),{s:10,c:M})}`),
  workspace:L=>svg(160,`<rect x="40" y="20" width="60" height="120" fill="${M}"/><rect x="50" y="35" width="40" height="60" rx="3" fill="${B}" stroke="${G}"/>${t(70,70,L('Panel','Panel'),{s:10})}
    <rect x="100" y="20" width="150" height="120" fill="${N}" opacity=".18" stroke="${N}" stroke-dasharray="5 4"/>${t(175,70,L('KEEP CLEAR','MANTENER LIBRE'),{s:12,c:N,w:800})}
    <line x1="100" y1="150" x2="250" y2="150" stroke="${G}" stroke-width="2"/>${t(175,145,L('3 ft deep','3 pies prof.'),{s:10,c:G})}${t(285,60,L('6½ ft','6½ pies'),{s:10,c:G})}${t(285,76,L('high','alto'),{s:10,c:G})}${t(175,100,L('30 in. wide','30 pulg. ancho'),{s:10,c:G})}`),
  nameplate:L=>svg(160,`<rect x="40" y="15" width="240" height="130" rx="8" fill="#c9d0ea"/>${t(160,38,L('CONDENSING UNIT','UNIDAD CONDENSADORA'),{s:11,c:'#1a2040',w:800})}
    ${t(60,62,'208/230 V  1 PH  60 Hz',{a:'start',s:11,c:'#1a2040'})}${t(60,82,'COMP RLA 14.1   LRA 77',{a:'start',s:11,c:'#1a2040'})}
    <rect x="55" y="92" width="210" height="22" rx="4" fill="${G}"/>${t(60,108,L('MIN CIRCUIT AMPS 18.6 → wire','AMP. MÍN. CIRCUITO 18.6 → cable'),{a:'start',s:11,c:'#2a1a00',w:800})}
    <rect x="55" y="117" width="210" height="22" rx="4" fill="${V}"/>${t(60,133,L('MAX FUSE/BKR 30 → breaker','FUSIBLE/BKR MÁX 30 → breaker'),{a:'start',s:11,c:'#04202a',w:800})}`),
  loadflow:L=>svg(150,`${[L('Sq ft × 2 VA','Pies² × 2 VA'),L('+ 1,500 VA each','+ 1,500 VA c/u'),L('Demand %','% demanda'),L('+ fixed appl.','+ fijos'),L('+ dryer, range','+ secad., estufa'),L('+ heat OR A/C','+ calef. O A/C'),L('÷ 240 = amps','÷ 240 = amps')].map((s,i)=>{const x=i<4?12+i*77:50+(i-4)*77,y=i<4?20:90;return `<rect x="${x}" y="${y}" width="70" height="44" rx="6" fill="${i===6?G:B}" stroke="${G}"/>${t(x+35,y+16,String(i+1),{s:11,c:i===6?K:G,w:800})}${t(x+35,y+34,s,{s:9,c:i===6?K:W})}`;}).join('')}`),
  spacing:L=>svg(150,`<line x1="10" y1="110" x2="310" y2="110" stroke="${M}" stroke-width="3"/>${[40,160,280].map(x=>`<rect x="${x-8}" y="88" width="16" height="22" rx="3" fill="${G}"/>`).join('')}
    <line x1="40" y1="125" x2="160" y2="125" stroke="${V}" stroke-width="2"/>${t(100,140,L('max 12 ft apart','máx. 12 pies'),{s:10,c:V})}<line x1="160" y1="70" x2="220" y2="70" stroke="${N}" stroke-width="2"/>${t(190,62,L('≤ 6 ft','≤ 6 pies'),{s:10,c:N})}
    ${t(160,30,L('No point on the wall more than 6 ft from a receptacle','Ningún punto a más de 6 pies de un receptáculo'),{s:10})}`)
  };
})();

// Code Lookup Drill: [exams, EN topic, ES topic, answer, distractors]
const LOOKUPS = [
["all","Working space in front of a panel","Espacio de trabajo frente a un panel","110.26",["110.14","210.63","230.24"]],
["all","Definitions (\"readily accessible\", \"in sight from\")","Definiciones (\"fácilmente accesible\", \"a la vista de\")","Article 100",["Article 90","Article 110","Chapter 9"]],
["all","Purpose and arrangement of the Code","Propósito y organización del Código","Article 90",["Article 100","Article 110","Article 120"]],
["all","Conductor ampacity table (raceway, 30°C)","Tabla de ampacidad de conductores (canalización, 30°C)","Table 310.16",["Table 250.122","Table 314.16(B)","Table 300.5"]],
["all","Max breaker for 14, 12, 10 AWG (small conductor rule)","Breaker máximo para 14, 12, 10 AWG (conductores pequeños)","240.4(D)",["240.6(A)","310.16","210.19"]],
["all","Standard breaker and fuse sizes","Tamaños estándar de breakers y fusibles","240.6(A)",["240.4(D)","240.21","110.9"]],
["all","Equipment grounding conductor size","Calibre del conductor de puesta a tierra de equipos","Table 250.122",["250.66","Table 310.16","250.52"]],
["all","Grounding electrode conductor size","Calibre del conductor del electrodo de puesta a tierra","250.66",["Table 250.122","250.24","250.53"]],
["all","Types of grounding electrodes (rods, Ufer, water pipe)","Tipos de electrodos de tierra (varillas, Ufer, tubería)","250.52",["250.66","250.122","250.4"]],
["all","Box fill volume per conductor","Volumen de ocupación de caja por conductor","314.16",["312.8","300.14","Chapter 9, Table 1"]],
["all","Conduit fill percentages","Porcentajes de llenado de tubo","Chapter 9, Table 1",["314.16","Table 310.16","358.22"]],
["all","Burial depth (minimum cover)","Profundidad de enterramiento (cubierta mínima)","Table 300.5",["Table 310.16","230.24","300.14"]],
["all","EMT support and securing","Soporte y sujeción de EMT","358.30",["334.30","352.30","300.11"]],
["all","NM cable support and securing","Soporte y sujeción de cable NM","334.30",["358.30","338.10","300.4"]],
["all","GFCI protection requirements","Requisitos de protección GFCI","210.8",["210.12","406.4","210.63"]],
["all","HVAC service receptacle (within 25 ft)","Receptáculo de servicio de HVAC (a 25 pies)","210.63",["210.52","440.14","210.8"]],
["all","A/C disconnect location","Ubicación del desconectador del A/C","440.14",["440.32","430.102","210.63"]],
["all","Conductors for a single hermetic compressor (125%)","Conductores para un solo compresor hermético (125%)","440.32",["440.22","430.22","440.12"]],
["all","A/C short-circuit protection (175% / 225%)","Protección contra cortocircuito del A/C (175% / 225%)","440.22",["440.32","430.52","240.6"]],
["all","2026: A/C equipment near tubs and showers","2026: equipo de A/C cerca de tinas y regaderas","440.8",["440.14","210.8","680.22"]],
["all","Rooftop unit wire-type EGC","Cable de tierra en unidades de techo","440.9",["440.14","250.118","440.32"]],
["06A,01,02","Electric heat element protection (60 A / 48 A)","Protección de elementos de calefacción (60 A / 48 A)","424.22",["424.19","424.63","440.22"]],
["06A,01,02","Duct heater fan interlock","Enclavamiento del ventilador del calentador de ducto","424.63",["424.64","424.19","440.14"]],
["01,06A","Motor full-load current tables","Tablas de corriente a plena carga de motores","430.247–430.250",["430.52","430.32","440.32"]],
["01,06A","Motor branch-circuit short-circuit protection table","Tabla de protección contra cortocircuito de motores","Table 430.52",["430.32","430.22","Table 430.250"]],
["01,06A","Motor overload protection","Protección contra sobrecarga de motores","430.32",["430.52","430.22","430.102"]],
["01,02","2026: dwelling general lighting load (2 VA/sq ft)","2026: carga de alumbrado de vivienda (2 VA/pie²)","120.41",["120.82","120.55","210.11"]],
["01,02","Household range demand table","Tabla de demanda de estufas domésticas","Table 120.55",["120.54","Table 120.45","120.53"]],
["01,02","Optional method for a dwelling","Método opcional para una vivienda","120.82",["120.41","120.55","120.87"]],
["01,02","Dwelling receptacle spacing (6 ft rule)","Separación de receptáculos de vivienda (regla de 6 pies)","210.52",["210.11","210.8","406.12"]],
["01,02","Required dwelling branch circuits (small appliance, laundry, bath)","Circuitos ramales obligatorios (pequeños electrodom., lavandería, baño)","210.11",["210.52","120.52","210.23"]],
["01,02","AFCI protection","Protección AFCI","210.12",["210.8","406.4","230.71"]],
["01,02","Overhead service conductor clearances","Distancias de conductores aéreos de acometida","230.24",["230.79","300.5","225.18"]],
["01,02","Minimum service rating for a one-family dwelling","Capacidad mínima de acometida de vivienda unifamiliar","230.79(C)",["230.24","310.12","120.41"]],
["all","Washington amendments to Article 210","Enmiendas de Washington al Artículo 210","WAC 296-46B-210",["RCW 19.28.210","WAC 296-46B-010","WAC 296-46B-901"]],
["all","Trainee supervision and ratios","Supervisión y proporción de aprendices","RCW 19.28.161",["RCW 19.28.061","WAC 296-46B-901","RCW 19.28.271"]],
["all","Administrator duties","Deberes del administrador","RCW 19.28.061",["RCW 19.28.161","RCW 19.28.041","WAC 296-46B-945"]],
["all","Permit and inspection timing","Plazos de permisos e inspecciones","WAC 296-46B-901",["RCW 19.28.161","WAC 296-46B-940","WAC 296-46B-915"]]
];
