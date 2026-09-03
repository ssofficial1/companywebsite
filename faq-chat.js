const WHATSAPP = "919140408078";
const chatArea = document.getElementById("chatArea");
const faqGrid = document.getElementById("faqGrid");
const modal = document.getElementById("enquiryModal");
const form = document.getElementById("enquiryForm");

const faqs = [
  ["What does Samrat Drug Agency do?", "Samrat Drug Agency pharmaceutical distribution enquiries, product information and order coordination ke liye support provide karti hai."],
  ["Where are you located?", "Hamari location Rapti Nagar Phase 4, Chargwan, Gorakhpur — 273013 hai."],
  ["How can I ask for a medicine rate?", "Medicine/brand name, strength aur quantity share kijiye. Final rate enquiry ke liye 'Start WhatsApp Enquiry' button se organised message bhej sakte hain."],
  ["Can I check medicine availability?", "Haan. Product name, strength aur required quantity bhejiye. Availability ko transaction se pehle Samrat Drug Agency se confirm kiya jayega."],
  ["How do I place an order enquiry?", "Order request ke liye naam, mobile, product, strength, quantity aur requirement fill karke WhatsApp par enquiry bhejiye."],
  ["Do you provide product information?", "Basic product information aur research references ke liye website ke Research section ko dekhiye. Specific product details manufacturer/regulatory sources se verify kiye jane chahiye."],
  ["Do you supply prescription medicines?", "Prescription medicines legally permitted channels aur applicable prescription/licence requirements ke according hi handle kiye jane chahiye."],
  ["How can I contact you?", "Aap 9140408078 ya 9795000018 par contact kar sakte hain. WhatsApp enquiry ke liye primary number 9140408078 use kiya gaya hai."],
  ["Can I request institutional supply?", "Haan, institutional supply enquiry ke liye organisation name, product requirement, quantity aur contact details WhatsApp par share kijiye."],
  ["Can the website give a final medicine price?", "Website par displayed information indicative/reference purpose ke liye hai. Final price, availability aur eligibility Samrat Drug Agency se confirm honi chahiye."]
];

function addMessage(text, type = "bot") {
  const row = document.createElement("div");
  row.className = `message ${type}`;
  if (type === "bot") {
    row.innerHTML = `<div class="avatar">S</div><div class="bubble"><strong>Samrat Assistant</strong><p>${escapeHtml(text)}</p></div>`;
  } else {
    row.innerHTML = `<div class="bubble"><p>${escapeHtml(text)}</p></div>`;
  }
  chatArea.appendChild(row);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[ch]));
}

faqs.forEach(([question, answer]) => {
  const button = document.createElement("button");
  button.className = "faq-btn";
  button.type = "button";
  button.textContent = question;
  button.addEventListener("click", () => {
    addMessage(question, "user");
    setTimeout(() => addMessage(answer), 180);
  });
  faqGrid.appendChild(button);
});

document.getElementById("openEnquiry").addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});
document.getElementById("closeEnquiry").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const product = data.get("product").trim();
  const strength = data.get("strength").trim() || "Not specified";
  const quantity = data.get("quantity").trim() || "Not specified";
  const type = data.get("type");
  const message = data.get("message").trim() || "No additional message";

  const waMessage = `*SAMRAT DRUG AGENCY — WEBSITE ENQUIRY*\n\n*Customer / Organisation:* ${name}\n*Mobile / WhatsApp:* ${phone}\n*Product / Medicine:* ${product}\n*Strength:* ${strength}\n*Quantity:* ${quantity}\n*Enquiry Type:* ${type}\n*Additional Message:* ${message}\n\n_Sent from Samrat Drug Agency Help Desk website._`;
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  addMessage(`Your ${type.toLowerCase()} details are ready. WhatsApp is opening with an organised message.` , "bot");
  closeModal();
  form.reset();
});
