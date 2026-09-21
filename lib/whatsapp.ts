import { InquiryItem } from "./types";

export interface ProjectDetails {
  projectName?: string;
  location?: string;
  clientName?: string;
  notes?: string;
}

export function generateWhatsAppPayload(
  items: InquiryItem[],
  details: ProjectDetails = {}
): string {
  if (items.length === 0) return "";

  let message = `Hello Parashar Lighting Team,\n\n`;
  message += `I would like to inquire about trade pricing, custom options, and lead times for the following items on my project board:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.title}\n`;
    message += `   - Finish: ${item.selectedFinish} | Warmth: ${item.selectedWarmth} | Qty: ${item.quantity}\n`;
    message += `   - Link: parasharlighting.com/product/${item.product.slug}\n\n`;
  });

  if (details.projectName || details.location || details.clientName || details.notes) {
    message += `PROJECT DETAILS:\n`;
    if (details.projectName) message += `- Project Name: ${details.projectName}\n`;
    if (details.location) message += `- Location: ${details.location}\n`;
    if (details.clientName) message += `- Client / Architect: ${details.clientName}\n`;
    if (details.notes) message += `- Notes: ${details.notes}\n`;
  }

  return message;
}

export function generateWhatsAppUrl(
  items: InquiryItem[],
  details: ProjectDetails = {},
  phoneNumber: string = "919876543210" // Configurable WhatsApp Trade Desk number
): string {
  const text = generateWhatsAppPayload(items, details);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
