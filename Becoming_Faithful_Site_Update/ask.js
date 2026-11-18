// Paste the HTTPS endpoint from your Becoming Faithful Formspree form here.
const questionEndpoint = "";
const form = document.querySelector("#ask");
const spanish = document.documentElement.lang === "es";
const status = form.querySelector('[role="status"]');
const button = form.querySelector("button");
const field = form.querySelector("textarea");

if (!questionEndpoint) {
  button.disabled = true;
  status.textContent = spanish
    ? "El buzón de preguntas abrirá pronto."
    : "The question inbox will open soon.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = field.value.trim();
  if (!questionEndpoint || !question) return;
  button.disabled = true;
  try {
    const data = new FormData();
    data.set("question", question);
    data.set("topic", new URLSearchParams(location.search).get("topic") === "game" ? "Game feedback" : "Community question");
    const response = await fetch(questionEndpoint, {
      method: "POST", headers: { Accept: "application/json" }, body: data
    });
    if (!response.ok) throw new Error("Delivery failed");
    field.value = "";
    status.textContent = spanish ? "Gracias. Tu mensaje se envió." : "Thank you. Your message was sent.";
  } catch {
    status.textContent = spanish ? "No se pudo enviar. Tu texto sigue aquí." : "Your message could not be sent. Your text is still here.";
  } finally { button.disabled = false; }
});
