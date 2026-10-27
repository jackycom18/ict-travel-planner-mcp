const itinerary = [
  {
    id: 'day1',
    date: '5月1日',
    weekday: '周五',
    weather: '晴 · 15—25°C',
    area: '钟山风景区',
    duration: '约 8 小时',
    spots: [
      {
        id: 'zhongshanling',
        time: '08:30',
        end: '11:00',
        name: '中山陵',
        category: '城市地标 · 必访',
        description: '沿 392 级台阶拾级而上，在苍翠钟山间俯瞰南京城与紫金山脊线。',
        map: { x: 58, y: 42 },
        art: 'mountain',
      },
      {
        id: 'mingxiaoling',
        time: '11:30',
        end: '14:00',
        name: '明孝陵',
        category: '世界遗产 · 园林',
        description: '穿过神道石象路，在春日新绿与明代石刻之间慢慢散步。',
        map: { x: 50, y: 50 },
        art: 'forest',
      },
      {
        id: 'meilinggong',
        time: '15:00',
        end: '17:00',
        name: '美龄宫',
        category: '民国建筑 · 建筑',
        description: '梧桐项链中的蓝绿色宫殿，精致室内与山林远景适合收尾。',
        map: { x: 44, y: 39 },
        art: 'villa',
      },
    ],
    taxis: ['中山陵 → 明孝陵 · 约 9 分钟 · ¥18', '明孝陵 → 美龄宫 · 约 8 分钟 · ¥16'],
  },
  {
    id: 'day2',
    date: '5月2日',
    weekday: '周六',
    weather: '多云 · 16—24°C',
    area: '城史与古寺',
    duration: '约 9 小时',
    spots: [
      {
        id: 'nanjing-museum',
        time: '09:00',
        end: '12:00',
        name: '南京博物院',
        category: '博物馆 · 预约',
        description: '从史前文明看到民国街景，重点不必贪多，先看历史馆与民国馆。',
        map: { x: 49, y: 34 },
        art: 'museum',
      },
      {
        id: 'presidential-palace',
        time: '13:30',
        end: '15:30',
        name: '总统府',
        category: '近代史 · 园林',
        description: '六百年城市权力中心与西式花园叠合，建筑和展陈都值得停留。',
        map: { x: 37, y: 43 },
        art: 'palace',
      },
      {
        id: 'jiming-temple',
        time: '16:00',
        end: '18:00',
        name: '鸡鸣寺',
        category: '古寺 · 落日',
        description: '沿黄墙拾级而上，在药师佛塔附近等一场城市落日。',
        map: { x: 32, y: 24 },
        art: 'temple',
      },
    ],
    taxis: ['南京博物院 → 总统府 · 约 12 分钟 · ¥22', '总统府 → 鸡鸣寺 · 约 13 分钟 · ¥24'],
  },
  {
    id: 'day3',
    date: '5月3日',
    weekday: '周日',
    weather: '小雨 · 15—22°C',
    area: '城南烟火',
    duration: '约 10 小时',
    spots: [
      {
        id: 'niushoushan',
        time: '08:30',
        end: '12:00',
        name: '牛首山',
        category: '山景 · 佛文化',
        description: '从佛顶宫到山林步道，建筑和自然地景形成大开大合的空间体验。',
        map: { x: 50, y: 82 },
        art: 'mountain',
      },
      {
        id: 'porcelain-tower',
        time: '14:00',
        end: '16:00',
        name: '大报恩寺遗址',
        category: '历史 · 夜景',
        description: '玻璃塔保护下的遗址空间，光影与考古现场形成强烈对照。',
        map: { x: 49, y: 66 },
        art: 'temple',
      },
      {
        id: 'laomendong',
        time: '17:00',
        end: '20:00',
        name: '老门东',
        category: '街区 · 晚餐',
        description: '在青砖巷和城墙灯光间吃晚餐，作为三天旅程的松弛收尾。',
        map: { x: 55, y: 59 },
        art: 'street',
      },
    ],
    taxis: ['牛首山 → 大报恩寺 · 约 28 分钟 · ¥48', '大报恩寺 → 老门东 · 约 10 分钟 · ¥18'],
  },
];

const dayTabs = document.querySelector('#dayTabs');
const weatherList = document.querySelector('#weatherList');
const itineraryList = document.querySelector('#itineraryList');
const markerLayer = document.querySelector('#markerLayer');
const routeLayer = document.querySelector('#routeLayer');
const activeDate = document.querySelector('[data-active-date]');
const spotCount = document.querySelector('#spotCount');
const dateBannerSummary = document.querySelector('.date-banner__summary');
const dateBannerWeek = document.querySelector('.date-banner__week');

let activeDay = 0;
let selectedSpot = itinerary[0].spots[0].id;

/**
 * 功能：生成景点卡片中的本地 SVG 风景插画。
 * 输入：插画类型 type 和强调色 accent。
 * 输出：可插入卡片的 SVG 字符串。
 */
function makeArt(type, accent) {
  const sky = type === 'museum' || type === 'street' ? '#d8b277' : '#cfddd2';
  const scenes = {
    mountain: `
      <path d="M0 112 L55 45 L96 86 L142 32 L220 112Z" fill="#657e6a"/>
      <path d="M0 112 L86 66 L138 101 L187 58 L260 112Z" fill="#3e6254"/>
      <circle cx="68" cy="48" r="13" fill="#f1c86c" opacity=".8"/>`,
    forest: `
      <path d="M0 112 L52 68 L92 88 L142 50 L220 112Z" fill="#80937a"/>
      <g fill="#355f4b">${[18, 44, 74, 126, 156, 188].map((x, i) => `<path d="M${x} 112 L${x + 14} ${64 + i % 2 * 8} L${x + 28} 112Z"/>`).join('')}</g>`,
    villa: `
      <rect x="55" y="58" width="110" height="54" fill="#568581"/>
      <path d="M46 58 L110 30 L174 58Z" fill="${accent}"/>
      <rect x="74" y="72" width="20" height="20" fill="#f5e6bc"/>
      <rect x="127" y="72" width="20" height="20" fill="#f5e6bc"/>`,
    museum: `
      <rect x="36" y="58" width="148" height="54" fill="#e7d8bd"/>
      <path d="M28 58 L110 28 L192 58Z" fill="${accent}"/>
      <g fill="#8d6e4e">${[55, 83, 111, 139, 167].map(x => `<rect x="${x}" y="65" width="8" height="47"/>`).join('')}</g>`,
    palace: `
      <rect x="32" y="58" width="156" height="54" fill="#e3c7a5"/>
      <path d="M20 58 L66 35 L154 35 L200 58Z" fill="${accent}"/>
      <path d="M65 88 L110 68 L155 88Z" fill="#f1e5d0"/>
      <rect x="92" y="78" width="36" height="34" fill="#4d5e54"/>`,
    temple: `
      <rect x="54" y="56" width="112" height="56" fill="#d7b37f"/>
      <path d="M35 58 L110 24 L185 58Z" fill="${accent}"/>
      <rect x="95" y="70" width="30" height="42" fill="#6b4033"/>
      <circle cx="110" cy="54" r="8" fill="#f3cb6b"/>`,
    street: `
      <path d="M0 112 L38 66 L80 92 L124 48 L166 87 L220 60 L220 112Z" fill="#586f64"/>
      <g>${[24, 72, 126, 175].map((x, i) => `<rect x="${x}" y="${70 + i % 2 * 13}" width="31" height="${38 - i % 2 * 13}" fill="#8b5f48"/><path d="M${x - 4} ${70 + i % 2 * 13} L${x + 15} ${60 + i % 2 * 13} L${x + 35} ${70 + i % 2 * 13}Z" fill="${accent}"/>`).join('')}</g>`,
  };
  return `
    <svg viewBox="0 0 220 112" aria-hidden="true">
      <defs><linearGradient id="sky-${type}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="#f3e7cf"/></linearGradient></defs>
      <rect width="220" height="112" fill="url(#sky-${type})"/>
      ${scenes[type] || scenes.street}
      <path d="M0 104 Q45 95 80 103 T155 101 T220 104 V112 H0Z" fill="rgba(26,48,38,.22)"/>
    </svg>`;
}

/**
 * 功能：渲染三张天气卡并绑定按日切换。
 * 输入：无。
 * 输出：无；写入 weatherList。
 */
function renderWeather() {
  const icons = ['☀', '☁', '☂'];
  weatherList.innerHTML = itinerary.map((day, index) => `
    <button class="weather-card${index === activeDay ? ' active' : ''}" type="button" data-day="${index}" aria-pressed="${index === activeDay}">
      <span class="weather-icon" aria-hidden="true">${icons[index]}</span>
      <span class="weather-copy"><small>${day.date} · ${day.weekday}</small><b>${day.weather.split(' · ')[0]}</b></span>
      <span class="weather-temp">${day.weather.split(' · ')[1]}</span>
    </button>`).join('');
  weatherList.querySelectorAll('[data-day]').forEach(button => {
    button.addEventListener('click', () => setDay(Number(button.dataset.day)));
  });
}

/**
 * 功能：渲染每日切换标签。
 * 输入：无。
 * 输出：无；写入 dayTabs。
 */
function renderDayTabs() {
  dayTabs.innerHTML = itinerary.map((day, index) => `
    <button class="day-tab${index === activeDay ? ' active' : ''}" type="button" role="tab" aria-selected="${index === activeDay}" data-day="${index}">
      <b>${day.date}</b><small>${day.area}</small>
    </button>`).join('');
  dayTabs.querySelectorAll('[data-day]').forEach(button => {
    button.addEventListener('click', () => setDay(Number(button.dataset.day)));
  });
}

/**
 * 功能：渲染当天三个景点卡片和两段打车信息。
 * 输入：无。
 * 输出：无；写入 itineraryList。
 */
function renderItinerary() {
  const day = itinerary[activeDay];
  itineraryList.innerHTML = '';
  day.spots.forEach((spot, index) => {
    const card = document.createElement('article');
    card.className = 'spot-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.dataset.id = spot.id;
    card.setAttribute('aria-pressed', String(spot.id === selectedSpot));
    card.innerHTML = `
      <span class="spot-index">STOP ${String(index + 1).padStart(2, '0')}</span>
      <div class="spot-art">${makeArt(spot.art, index === 1 ? '#457b76' : '#b94a3e')}</div>
      <div class="spot-copy">
        <small>${spot.category}</small>
        <h3>${spot.name}</h3>
        <p>${spot.description}</p>
      </div>
      <span class="spot-time"><b>${spot.time}</b><span>${spot.end}</span></span>`;
    const activate = () => setSpot(spot.id);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
    itineraryList.appendChild(card);
    if (index < day.taxis.length) {
      const taxi = document.createElement('div');
      taxi.className = 'taxi-leg';
      taxi.innerHTML = `<span class="taxi-icon" aria-hidden="true">➜</span><span>${day.taxis[index]}</span>`;
      itineraryList.appendChild(taxi);
    }
  });

  activeDate.textContent = day.date;
  dateBannerWeek.textContent = `${day.weekday} · ${day.weather.split(' · ')[0]}`;
  dateBannerSummary.innerHTML = `<span>${day.area}</span><span>${day.duration}</span>`;
  spotCount.textContent = `${day.spots.length} 个目的地`;
}

/**
 * 功能：根据当天路线绘制折线、节点和景点标记。
 * 输入：无。
 * 输出：无；更新 SVG 地图。
 */
function renderMap() {
  const spots = itinerary[activeDay].spots;
  const points = spots.map(spot => `${spot.map.x * 7.2},${spot.map.y * 7}`);
  routeLayer.innerHTML = `
    <polyline class="route-shadow" points="${points.join(' ')}"/>
    <polyline class="route-path" points="${points.join(' ')}"/>`;
  markerLayer.innerHTML = spots.map((spot, index) => {
    const x = spot.map.x * 7.2;
    const y = spot.map.y * 7;
    const selected = spot.id === selectedSpot ? ' selected' : '';
    return `
      <g class="map-marker active${selected}" data-id="${spot.id}" role="button" tabindex="0" aria-label="${spot.name}">
        <circle class="pin" cx="${x}" cy="${y}" r="15"/>
        <text class="pin-number" x="${x}" y="${y + 4}">${index + 1}</text>
        <text class="pin-name" x="${x + 22}" y="${y + 4}">${spot.name}</text>
      </g>`;
  }).join('');
  markerLayer.querySelectorAll('.map-marker').forEach(marker => {
    const activate = () => {
      setSpot(marker.dataset.id);
      itineraryList.querySelector(`[data-id="${marker.dataset.id}"]`)?.focus();
    };
    marker.addEventListener('click', activate);
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
}

/**
 * 功能：切换当前景点并同步卡片与地图高亮。
 * 输入：景点 id。
 * 输出：无。
 */
function setSpot(id) {
  selectedSpot = id;
  itineraryList.querySelectorAll('.spot-card').forEach(card => {
    card.setAttribute('aria-pressed', String(card.dataset.id === id));
  });
  renderMap();
}

/**
 * 功能：切换到指定日期并重置该日首个景点。
 * 输入：日期序号 index（0–2）。
 * 输出：无。
 */
function setDay(index) {
  activeDay = index;
  selectedSpot = itinerary[index].spots[0].id;
  renderWeather();
  renderDayTabs();
  renderItinerary();
  renderMap();
}

renderWeather();
renderDayTabs();
renderItinerary();
renderMap();
