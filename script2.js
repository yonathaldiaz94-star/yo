
const TEAMS = [
  { name: 'Nacional', color: '#1a6b3c', pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 },
  { name: 'Peñarol', color: '#d4a017', pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 }
];

const FORMA = {
  Nacional: ['G', 'G', 'E', 'G', 'G'],
  Peñarol: ['G', 'G', 'G', 'E', 'P']
};

let J18 = [
  { l: 'Nacional', gl: 3, gv: 1, v: 'Peñarol' }
];

const J19 = [
  { l: 'Peñarol', v: 'Nacional', date: 'Próximamente' }
];

const GOLEADORES = [];

const AVATAR_COLORS = [
  '#1a6b3c',
  '#1a3a6b',
  '#6b1a1a',
  '#8e44ad',
  '#e67e22',
  '#16a085',
  '#d4a017',
  '#c0392b'
];



function pts(t) {
  return t.g * 3 + t.e;
}

function initials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function actualizarTabla() {

  TEAMS.forEach(team => {
    team.pj = 0;
    team.g = 0;
    team.e = 0;
    team.p = 0;
    team.gf = 0;
    team.gc = 0;
  });

  J18.forEach(match => {

    const local = TEAMS.find(t => t.name === match.l);
    const visita = TEAMS.find(t => t.name === match.v);

    if (!local || !visita) return;

    local.pj++;
    visita.pj++;

    local.gf += match.gl;
    local.gc += match.gv;

    visita.gf += match.gv;
    visita.gc += match.gl;

    if (match.gl > match.gv) {
      local.g++;
      visita.p++;
    } else if (match.gl < match.gv) {
      visita.g++;
      local.p++;
    } else {
      local.e++;
      visita.e++;
    }
  });

  renderTabla();
}


function renderTabla() {

  const sorted = [...TEAMS].sort(
    (a, b) =>
      pts(b) - pts(a) ||
      (b.gf - b.gc) - (a.gf - a.gc) ||
      b.gf - a.gf
  );

  document.getElementById('tabla-body').innerHTML = sorted
    .map((t, i) => {

      const pos = i + 1;

      const badgeCls =
        pos === 1 ? 'pos-1' :
        pos === 2 ? 'pos-2' :
        'pos-n';

      const forma = FORMA[t.name] || [];

      const formHTML = forma
        .map(f =>
          `<span class="form-pill ${
            f === 'G' ? 'f-w' :
            f === 'E' ? 'f-d' :
            'f-l'
          }">${f}</span>`
        )
        .join('');

      const diff = t.gf - t.gc;
      const diffText = diff > 0 ? `+${diff}` : diff;

      return `
      <tr>
        <td><span class="pos-badge ${badgeCls}">${pos}</span></td>

        <td>
          <div class="team-cell">
            <span class="team-dot" style="background:${t.color}"></span>
            ${t.name}
          </div>
        </td>

        <td style="text-align:center">${t.pj}</td>
        <td style="text-align:center">${t.g}</td>
        <td style="text-align:center">${t.e}</td>
        <td style="text-align:center">${t.p}</td>
        <td style="text-align:center">${t.gf}</td>
        <td style="text-align:center">${t.gc}</td>
        <td style="text-align:center">${diffText}</td>
        <td style="text-align:center;font-weight:600">${pts(t)}</td>
        <td>${formHTML}</td>
      </tr>
      `;
    })
    .join('');
}

function renderPartidos() {

  document.getElementById('partidos-j18').innerHTML = J18
    .map(m => `
      <div class="match-card">
        <div class="match-teams">
          <span style="font-weight:500;flex:1;text-align:right">${m.l}</span>
          <span class="match-score">${m.gl} - ${m.gv}</span>
          <span style="flex:1">${m.v}</span>
        </div>
        <span class="badge badge-done">Final</span>
      </div>
    `)
    .join('');

  document.getElementById('partidos-j19').innerHTML = J19
    .map(m => `
      <div class="match-card">
        <div class="match-teams">
          <span style="font-weight:500;flex:1;text-align:right">${m.l}</span>
          <span class="match-vs">vs</span>
          <span style="flex:1">${m.v}</span>
        </div>
        <span>${m.date}</span>
      </div>
    `)
    .join('');
}

function renderGoleadores() {

  const container = document.getElementById('goleadores-list');

  container.innerHTML = `
    <div style="padding:30px;text-align:center;color:var(--text-secondary)">
      No hay goleadores registrados.
    </div>
  `;
}

function showTab(id, btn) {

  document.querySelectorAll('.section')
    .forEach(s => s.classList.remove('active'));

  document.querySelectorAll('.tab')
    .forEach(t => t.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

function openModal() {
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

function saveResult() {

  const local = document.getElementById('m-local').value;
  const visit = document.getElementById('m-visit').value;

  if (local === visit) {
    alert('El equipo local y visitante no pueden ser el mismo.');
    return;
  }

  const gl = parseInt(document.getElementById('m-gl').value) || 0;
  const gv = parseInt(document.getElementById('m-gv').value) || 0;

  J18.push({
    l: local,
    gl,
    gv,
    v: visit
  });

  actualizarTabla();
  renderPartidos();

  closeModal();

  const notif = document.getElementById('notif');

  notif.classList.add('show');

  setTimeout(() => {
    notif.classList.remove('show');
  }, 2500);
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) {
    closeModal();
  }
});


actualizarTabla();
renderPartidos();
renderGoleadores();
