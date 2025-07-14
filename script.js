const ramos = [
  // --- PRIMER SEMESTRE ---
  { nombre: "Precálculo", requisitos: [] },
  { nombre: "Química General I", requisitos: [] },
  { nombre: "Laboratorio de Química General I", requisitos: [] },
  { nombre: "Cátedra Institucional", requisitos: [] },
  { nombre: "Comunicación y Redacción Científica", requisitos: [] },
  { nombre: "Constitución Colombiana", requisitos: [] },
  { nombre: "Historia de la Farmacia", requisitos: [] },
  { nombre: "Informática", requisitos: [] },
  { nombre: "Electivo General", requisitos: [] },
  { nombre: "Cátedra Ambiental", requisitos: [] },

  // --- SEGUNDO SEMESTRE ---
  { nombre: "Cálculo Diferencial", requisitos: ["Precálculo"] },
  { nombre: "Física I", requisitos: [] },
  { nombre: "Biología Celular y Molecular", requisitos: [] },
  { nombre: "Química General II", requisitos: ["Química General I"] },
  { nombre: "Laboratorio de Química General II", requisitos: ["Laboratorio de Química General I"] },
  { nombre: "Química Inorgánica Farmacéutica", requisitos: ["Química General I"] },
  { nombre: "Emprendimiento", requisitos: [] },

  // --- TERCER SEMESTRE ---
  { nombre: "Cálculo Integral", requisitos: ["Cálculo Diferencial"] },
  { nombre: "Química Orgánica I", requisitos: [] },
  { nombre: "Química Analítica", requisitos: ["Química General II"] },
  { nombre: "Laboratorio de Química Analítica", requisitos: ["Laboratorio de Química General II"] },
  { nombre: "Estadística", requisitos: [] },
  { nombre: "Electivo de Complementación I", requisitos: [] },
  { nombre: "Física II", requisitos: ["Física I"] },

  // --- CUARTO SEMESTRE ---
  { nombre: "Bioquímica", requisitos: ["Biología Celular y Molecular", "Química Orgánica I"] },
  { nombre: "Química Orgánica II", requisitos: ["Química Orgánica I"] },
  { nombre: "Laboratorio de Química Orgánica", requisitos: ["Química Orgánica I"] },
  { nombre: "Análisis Instrumental", requisitos: ["Química Analítica"] },
  { nombre: "Laboratorio de Análisis Instrumental", requisitos: ["Química Analítica", "Laboratorio de Química Analítica"] },
  { nombre: "Ética Profesional", requisitos: [] },
  { nombre: "Seguridad Industrial y Salud Ocupacional", requisitos: [] },

  // --- QUINTO SEMESTRE ---
  { nombre: "Fisiopatología", requisitos: ["Biología Celular y Molecular", "Bioquímica"] },
  { nombre: "Química Heterocíclica", requisitos: ["Química Orgánica II", "Laboratorio de Química Orgánica"] },
  { nombre: "Metodología de la Investigación", requisitos: [] },
  { nombre: "Fisicoquímica", requisitos: ["Cálculo Integral"] },
  { nombre: "Salud Pública y Seguridad Social", requisitos: [] },
  { nombre: "Electivo de Complementación II", requisitos: ["Electivo de Complementación I"] },
  { nombre: "Legislación Farmacéutica", requisitos: [] },

  // --- SEXTO SEMESTRE ---
  { nombre: "Farmacología General", requisitos: ["Fisiopatología"] },
  { nombre: "Microbiología", requisitos: ["Biología Celular y Molecular"] },
  { nombre: "Gestión de Servicios Farmacéuticos", requisitos: ["Salud Pública y Seguridad Social"] },
  { nombre: "Tecnología Farmacéutica I", requisitos: [] },
  { nombre: "Operaciones Unitarias", requisitos: ["Cálculo Integral"] },
  { nombre: "Electivo de Complementación III", requisitos: ["Electivo de Complementación II"] },
  { nombre: "Aseguramiento de la Calidad", requisitos: [] },

  // --- SÉPTIMO SEMESTRE ---
  { nombre: "Farmacología Especial", requisitos: ["Farmacología General"] },
  { nombre: "Farmacognosia", requisitos: ["Química Orgánica II"] },
  { nombre: "Asuntos Regulatorios", requisitos: ["Legislación Farmacéutica"] },
  { nombre: "Laboratorio de Tecnología Farmacéutica", requisitos: ["Tecnología Farmacéutica I"] },
  { nombre: "Tecnología Farmacéutica II", requisitos: ["Tecnología Farmacéutica I"] },
  { nombre: "Farmacia Hospitalaria", requisitos: ["Farmacología General"] },

  // --- OCTAVO SEMESTRE ---
  { nombre: "Toxicología", requisitos: ["Farmacología General", "Farmacología Especial"] },
  { nombre: "Biofarmacia y Farmacocinética", requisitos: ["Farmacología Especial"] },
  { nombre: "Biotecnología Farmacéutica", requisitos: ["Microbiología"] },
  { nombre: "Farmacia Química", requisitos: ["Química Heterocíclica"] },
  { nombre: "Control Fisicoquímico de alimentos y Medicamentos", requisitos: ["Análisis Instrumental", "Laboratorio de Análisis Instrumental"] },
  { nombre: "Diseño Experimental", requisitos: ["Estadística"] },

  // --- NOVENO SEMESTRE ---
  { nombre: "Farmacia Clínica", requisitos: ["Biofarmacia y Farmacocinética", "Farmacia Hospitalaria"] },
  { nombre: "Farmacia Industrial", requisitos: ["Tecnología Farmacéutica II", "Laboratorio de Tecnología Farmacéutica"] },
  { nombre: "Cosméticos", requisitos: ["Tecnología Farmacéutica II", "Laboratorio de Tecnología Farmacéutica"] },
  { nombre: "Nutrición y Bromatología", requisitos: [] },
  { nombre: "Gestión Empresarial", requisitos: [] },
  { nombre: "Electivo de Profundización I", requisitos: [] },

  // --- DÉCIMO SEMESTRE ---
  { nombre: "Electivo de Profundización II", requisitos: ["Electivo de Profundización I"] },
  { nombre: "Farmacoeconomía", requisitos: ["Farmacia Clínica"] },
  { nombre: "Opción de Grado", requisitos: [] },
  { nombre: "Práctica Profesional", requisitos: [] },
];

// ✅ SOLO UNA VEZ:
const contenedor = document.getElementById('malla');
const saved = localStorage.getItem("estadoRamos");
const estadoRamos = saved ? JSON.parse(saved) : {};

function renderizarMalla() {
  contenedor.innerHTML = '';
  ramos.forEach(ramo => {
    const aprobado = estadoRamos[ramo.nombre];
    const desbloqueado = ramo.requisitos.every(req => estadoRamos[req]);

    const div = document.createElement('div');
    div.className = 'ramo';
    if (aprobado) div.classList.add('aprobado');
    if (!desbloqueado && ramo.requisitos.length > 0) div.classList.add('bloqueado');

    div.innerText = ramo.nombre;
    div.onclick = () => {
      estadoRamos[ramo.nombre] = !estadoRamos[ramo.nombre];
      localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
      renderizarMalla();
    };

    contenedor.appendChild(div);
  });
}

renderizarMalla();
