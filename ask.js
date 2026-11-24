// Paste the HTTPS endpoint from your Becoming Faithful Formspree form here.
const questionEndpoint = "https://formspree.io/f/xzervyne";
const form = document.querySelector("#ask");
const spanish = document.documentElement.lang === "es";
const status = form.querySelector('[role="status"]');
const button = form.querySelector("button");
const field = form.querySelector("textarea");

const email = form.querySelector("#email");
const reply = () => form.querySelector("input[name=reply]:checked")?.value;
form.addEventListener("change", () => { email.required = reply() === "private"; });
if (!questionEndpoint) {
  button.disabled = true;
  status.textContent = spanish
    ? "El buzón de preguntas abrirá pronto."
    : "The question inbox will open soon.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = field.value.trim();
  if (!questionEndpoint || !question || !reply()) return;
  if (location.hostname !== "becomingfaithfulcommunity.com" && location.hostname !== "www.becomingfaithfulcommunity.com") {
    status.textContent = spanish ? "Vista previa: no se envió ningún mensaje." : "Preview only: no message was sent."; return;
  }
  button.disabled = true;
  try {
    const data = new FormData();
    data.set("question", question);
    data.set("reply_preference", reply());
    data.set("publication_consent", reply() === "public" ? "anonymized public answer" : "no");
    if (reply() === "private") data.set("email", email.value.trim());
    data.set("topic", new URLSearchParams(location.search).get("topic") === "game" ? "Game feedback" : "Community question");
    const response = await fetch(questionEndpoint, {
      method: "POST", headers: { Accept: "application/json" }, body: data
    });
    if (!response.ok) throw new Error("Delivery failed");
    field.value = "";
    email.value = "";
    form.reset(); email.required = false;
    status.textContent = spanish ? "Gracias. Tu mensaje se envió." : "Thank you. Your message was sent.";
  } catch {
    status.textContent = spanish ? "No se pudo enviar. Tu texto sigue aquí." : "Your message could not be sent. Your text is still here.";
  } finally { button.disabled = false; }
});
