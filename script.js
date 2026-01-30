const activitiesDiv = document.getElementById("activities");
const totalSpan = document.getElementById("total");
const form = document.getElementById("form");

let activities = [];

// Carrega atividades do JSON
async function loadActivities() {
  try {
    const response = await fetch("activities.json");
    activities = await response.json();
    renderActivities();
  } catch (err) {
    console.error("Erro ao carregar activities.json", err);
    activitiesDiv.innerHTML = "<p>Erro ao carregar atividades.</p>";
  }
}

// Renderiza checkboxes
function renderActivities() {
  activitiesDiv.innerHTML = "";

  activities
    .filter(a => a.active === true)
    .forEach(act => {
      const div = document.createElement("div");
      div.className = "activity";

      div.innerHTML = `
        <input 
          type="checkbox"
          data-id="${act.id}"
          data-price="${act.price}"
        >
        <div>
          <h3>${act.name} – R$ ${act.price}</h3>
          <p>${act.description}</p>
        </div>
      `;

      activitiesDiv.appendChild(div);
    });
}

// Atualiza total
function updateTotal() {
  const checked = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );

  let total = 0;
  checked.forEach(c => {
    total += Number(c.dataset.price);
  });

  totalSpan.textContent = `R$ ${total}`;
}

activitiesDiv.addEventListener("change", updateTotal);

// Submit do formulário
form.addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const selectedActivities = [
    ...document.querySelectorAll("input[type=checkbox]:checked")
  ].map(c => String(c.dataset.id));

  if (!email) {
    alert("Informe um email válido.");
    return;
  }

  if (selectedActivities.length === 0) {
    alert("Selecione pelo menos uma atividade.");
    return;
  }

  const data = {
    email,
    message,
    activities: selectedActivities
  };

  try {
    const response = await fetch(
      "https://send-contract-email.contact-purplecatstudios.workers.dev",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar");
    }

    alert("Solicitação enviada! Verifique seu email.");
    form.reset();
    totalSpan.textContent = "R$ 0";

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar. Tente novamente.");
  }
});

// Inicialização
loadActivities();
