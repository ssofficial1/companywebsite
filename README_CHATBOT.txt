SAMRAT DRUG AGENCY — FAQ HELP DESK

What was added:
1. faq-chat.html — standalone customer Help Desk / chat window.
2. faq-chat.css — responsive Help Desk design.
3. faq-chat.js — predefined FAQ conversation + organised WhatsApp enquiry form.
4. index.html — added Help Desk link in the main navigation and Hero card.

How it works:
- Customer opens Help Desk from the main website.
- Customer clicks predefined questions and gets instant answers.
- For a final rate/availability/order/product enquiry, customer clicks Start WhatsApp Enquiry.
- Customer fills name, phone, product, strength, quantity, enquiry type and message.
- WhatsApp opens with an organised message addressed to Samrat Drug Agency.

WhatsApp number currently configured:
+91 91404 08078

To change the WhatsApp destination:
Open faq-chat.js and change:
const WHATSAPP = "919140408078";

No AI API, server, database or paid service is required for this version.
