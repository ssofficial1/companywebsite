const WHATSAPP = "919140408078"; // Primary enquiry number, replace if required.

const medicines = [
  {brand:"Augmentin", generic:"Amoxicillin + Clavulanic Acid", maker:"GSK", country:"India / Global", form:"Tablet / Injection", note:"Prescription antibacterial; product-specific approval and supply status must be verified."},
  {brand:"Telma", generic:"Telmisartan", maker:"Glenmark", country:"India", form:"Tablet", note:"Prescription cardiovascular medicine; verify current product information."},
  {brand:"Pantop", generic:"Pantoprazole", maker:"Aristo", country:"India", form:"Tablet / Injection", note:"Prescription medicine; verify formulation and approved indication."},
  {brand:"Rosuvas", generic:"Rosuvastatin", maker:"Sun Pharma", country:"India", form:"Tablet", note:"Prescription lipid-lowering medicine; verify product information."},
  {brand:"Glycomet-GP", generic:"Glimepiride + Metformin", maker:"USV", country:"India", form:"Tablet", note:"Prescription antidiabetic combination; verify strength and indication."},
  {brand:"Plavix", generic:"Clopidogrel", maker:"Sanofi", country:"Global / India", form:"Tablet", note:"Prescription antiplatelet medicine; verify local product status."},
  {brand:"Lipitor", generic:"Atorvastatin", maker:"Pfizer", country:"Global", form:"Tablet", note:"Prescription lipid-lowering medicine; brand availability varies by market."},
  {brand:"Nexium", generic:"Esomeprazole", maker:"AstraZeneca", country:"Global", form:"Tablet / Injection", note:"Product status and formulation should be verified for the intended market."},
  {brand:"Januvia", generic:"Sitagliptin", maker:"MSD", country:"Global / India", form:"Tablet", note:"Prescription antidiabetic medicine; verify current approved label."},
  {brand:"Eliquis", generic:"Apixaban", maker:"BMS / Pfizer", country:"Global / India", form:"Tablet", note:"Prescription anticoagulant; supply requires appropriate regulatory compliance."},
  {brand:"Humira", generic:"Adalimumab", maker:"AbbVie", country:"Global", form:"Injection", note:"Biologic prescription medicine; cold-chain and market authorization must be verified."},
  {brand:"Herceptin", generic:"Trastuzumab", maker:"Roche", country:"Global / India", form:"Infusion", note:"Biologic oncology medicine; hospital/institutional supply and authorization required."}
];

const grid = document.getElementById("medicineGrid");
function renderMedicines(list){
  grid.innerHTML = list.map((m,i)=>`
    <article class="medicine-card">
      <div class="medicine-top"><h3>${m.brand}</h3><span class="country">${m.country}</span></div>
      <p><strong>${m.generic}</strong></p>
      <p>Manufacturer / origin: ${m.maker}</p>
      <span class="pill">${m.form}</span><span class="pill">Ethical / Rx reference</span>
      <p>${m.note}</p>
      <button onclick="openProduct('${m.brand.replace(/'/g,"\\'")}')">Research / Enquire</button>
    </article>`).join("");
}
renderMedicines(medicines);

document.getElementById("medicineSearch").addEventListener("input", e=>{
  const q=e.target.value.toLowerCase().trim();
  renderMedicines(medicines.filter(m=>Object.values(m).join(" ").toLowerCase().includes(q)));
});

function wa(text){
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank","noopener");
}
function openProduct(product){
  wa(`Hello Samrat Drug Agency, I need information/rate/availability for: ${product}. Please share the applicable product details and requirements.`);
}
window.openProduct=openProduct;

const modal=document.getElementById("inquiryModal");
const infoModal=document.getElementById("infoModal");
function show(m){m.classList.add("show");m.setAttribute("aria-hidden","false")}
function hide(m){m.classList.remove("show");m.setAttribute("aria-hidden","true")}
["openInquiry","openInquiry2","openInquiry3"].forEach(id=>document.getElementById(id)?.addEventListener("click",()=>show(modal)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{hide(modal);hide(infoModal)}));
[modal,infoModal].forEach(m=>m.addEventListener("click",e=>{if(e.target===m)hide(m)}));

document.getElementById("quickForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  wa(`Samrat Drug Agency enquiry\nName: ${f.get("name")}\nMobile: ${f.get("phone")}\nProduct: ${f.get("product")}\nMessage: ${f.get("message")||"-"}`);
  hide(modal); e.target.reset();
});

document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  wa(`Samrat Drug Agency ${f.get("type")}\nCustomer/Organisation: ${f.get("customer")}\nMobile: ${f.get("phone")}\nMedicine: ${f.get("medicine")}\nStrength: ${f.get("strength")||"-"}\nQuantity: ${f.get("quantity")||"-"}\nMessage: ${f.get("message")||"-"}`);
});

document.querySelectorAll(".outline-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.getElementById("infoTitle").textContent=btn.dataset.doc;
  show(infoModal);
}));

const header=document.querySelector(".header");
document.getElementById("menuToggle").addEventListener("click",()=>header.classList.toggle("nav-open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>header.classList.remove("nav-open")));

document.getElementById("floatingWA").addEventListener("click",e=>{
  e.preventDefault();
  wa("Hello Samrat Drug Agency, I have a medicine / rate / availability enquiry.");
});
