export const CONTACT_POPUP_OPEN_EVENT = "technogetic:open-contact-popup";

export const openContactPopup = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONTACT_POPUP_OPEN_EVENT));
};
