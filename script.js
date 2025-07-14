const semestres = {
  "Primer semestre": [
    "Precálculo", "Química General I", "Laboratorio de Química General I", "Cátedra Institucional", "Comunicación y Redacción Científica", "Constitución Colombiana", "Historia de la Farmacia", "Informática", "Electivo General", "Cátedra Ambiental"
  ],
  "Segundo semestre": [
    "Cálculo Diferencial", "Física I", "Biología Celular y Molecular", "Química General II", "Laboratorio de Química General II", "Química Inorgánica Farmacéutica", "Emprendimiento"
  ],
  "Tercer semestre": [
    "Cálculo Integral", "Química Orgánica I", "Química Analítica", "Laboratorio de Química Analítica", "Estadística", "Electivo de Complementación I", "Física II"
  ],
  "Cuarto semestre": [
    "Bioquímica", "Química Orgánica II", "Laboratorio de Química Orgánica", "Análisis Instrumental", "Laboratorio de Análisis Instrumental", "Ética Profesional", "Seguridad Industrial y Salud Ocupacional"
  ],
  "Quinto semestre": [
    "Fisiopatología", "Química Heterocíclica", "Metodología de la Investigación", "Fisicoquímica", "Salud Pública y Seguridad Social", "Electivo de Complementación II", "Legislación Farmacéutica"
  ],
  "Sexto semestre": [
    "Farmacología General", "Microbiología", "Gestión de Servicios Farmacéuticos", "Tecnología Farmacéutica I", "Operaciones Unitarias", "Electivo de Complementación III", "Aseguramiento de la Calidad"
  ],
  "Séptimo semestre": [
    "Farmacología Especial", "Farmacognosia", "Asuntos Regulatorios", "Laboratorio de Tecnología Farmacéutica", "Tecnología Farmacéutica II", "Farmacia Hospitalaria"
  ],
  "Octavo semestre": [
    "Toxicología", "Biofarmacia y Farmacocinética", "Biotecnología Farmacéutica", "Farmacia Química", "Control Fisicoquímico de alimentos y Medicamentos", "Diseño Experimental"
  ],
  "Noveno semestre": [
    "Farmacia Clínica", "Farmacia Industrial", "Cosméticos", "Nutrición y Bromatología", "Gestión Empresarial", "Electivo de Profundización I"
  ],
  "Décimo semestre": [
    "Electivo de Profundización II", "Farmacoeconomía", "Opción de Grado", "Práctica Profesional"
  ]
};

const ramos = [];
for (const materias of Object.values(semestres)) {
  ramos.push(...materias);
}

const requisitos = {
  "Cálculo Diferencial": ["Precálculo"],
  "Química General II": ["Química General I"],
  "Laboratorio de Química General II": ["Laboratorio de Química General I"],
  "Química Inorgánica Farmacéutica": ["Química General I"],
  "Cálculo Integral": ["Cálculo Diferencial"],
  "Química Analítica": ["Química General II"],
  "Laboratorio de Química Analítica": ["Laboratorio de Química General II"],
  "Física II": ["Física I"],
  "Bioquímica": ["Biología Celular y Molecular", "Química Orgánica I"],
  "Química Orgánica II": ["Química Orgánica I"],
  "Laboratorio de Química Orgánica": ["Química Orgánica I"],
  "Análisis Instrumental": ["Química Analítica"],
  "Laboratorio de Análisis Instrumental": ["Química Analítica", "Laboratorio de Química Analítica"],
  "Fisiopatología": ["Biología Celular y Molecular", "Bioquímica"],
  "Química Heterocíclica": ["Química Orgánica II", "Laboratorio de Química Orgánica"],
  "Fisicoquímica": ["Cálculo Integral"],
  "Electivo de Complementación II": ["Electivo de Complementación I"],
  "Farmacología General": ["Fisiopatología"],
  "Microbiología": ["Biología Celular y Molecular"],
  "Gestión de Servicios Farmacéuticos": ["Salud Pública y Seguridad Social"],
  "Operaciones Unitarias": ["Cálculo Integral"],
  "Electivo de Complementación III": ["Electivo de Complementación II"],
  "Farmacología Especial": ["Farmacología General"],
  "Farmacognosia": ["Química Orgánica II"],
  "Asuntos Regulatorios": ["Legislación Farmacéutica"],
  "Laboratorio de Tecnología Farmacéutica": ["Tecnología Farmacéutica I"],
  "Tecnología Farmacéutica II": ["Tecnología Farmacéutica I"],
  "Farmacia Hospitalaria": ["Farmacología General"],
  "Toxicología": ["Farmacología General", "Farmacología Especial"],
  "Biofarmacia y Farmacocinética": ["Farmacología Especial"],
  "Biotecnología Farmacéutica": ["Microbiología"],
  "Farmacia Química": ["Química Heterocíclica"],
  "Control Fisicoquímico de alimentos y Medicamentos": ["Análisis Instrumental", "Laboratorio de Análisis Instrumental"],
  "Diseño Experimental": ["Estadística"],
  "Farmacia Clínica": ["Biofarmacia y Farmacocinética", "Farmacia Hospitalaria"],
  "Farmacia Industrial": ["Tecnología Farmacéutica II", "Laboratorio de Tecnología Farmacéutica"],
  "Cosméticos": ["Tecnología Farmacéutica II", "Laboratorio de Tecnología Farmacéutica"],
  "Electivo de Profundización II": ["Electivo de Profundización I"],
  "Farmacoeconomía": ["Farmacia Clínica"]
};

const contenedor = document.getElementById("malla");
const saved = localStorage.getItem("estadoRamos");
const estadoRamos = saved ? JSON.parse(saved) : {};

function renderizarMalla() {
  contenedor.innerHTML = '';
  Object.entries(semestres).forEach(([semestre, materias]) => {
    const seccion = document.createElement("div");
    seccion.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.innerText = semestre;
    seccion.appendChild(titulo);

    materias.forEach(nombre => {
      const aprobado = estadoRamos[nombre];
      const requisitosRamo = requisitos[nombre] || [];
      const desbloqueado = requisitosRamo.every(req => estadoRamos[req]);

      const div = document.createElement("div");
      div.className = "ramo";
      if (aprobado) div.classList.add("aprobado");
      if (!desbloqueado && requisitosRamo.length > 0) div.classList.add("bloqueado");

      div.innerText = nombre;
      div.onclick = () => {
        estadoRamos[nombre] = !estadoRamos[nombre];
        localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
        renderizarMalla();
      };

      seccion.appendChild(div);
    });

    contenedor.appendChild(seccion);
  });
}

renderizarMalla();
