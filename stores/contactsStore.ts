import { Contact, ContactsStore } from "@/types/contactStore";
import { create } from "zustand";

export const useContactsStore = create<ContactsStore>()((set, get) => ({
  contacts: [],
  addContact: async (name: string, address: string, notes?: string) => {
    try {
      // Import dynamically to avoid circular dependencies
      const { saveContact } = await import("@/services/contactService");
      
      // Save to backend
      const savedContact = await saveContact(name, address, notes);
      
      // Update local store with backend response
      const newContact: Contact = {
        id: savedContact.id,
        user_id: savedContact.user_id,
        name: savedContact.nickname,
        address: savedContact.address,
        notes: savedContact.notes,
        createdAt: new Date(savedContact.created_at).getTime(),
        created_at: savedContact.created_at,
        updated_at: savedContact.updated_at,
      };
      
      const existingContact = get().getContactByAddress(address);
      if (existingContact) {
        // Update existing contact
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === existingContact.id ? newContact : contact
          ),
        }));
      } else {
        // Add new contact
        set((state) => ({
          contacts: [...state.contacts, newContact],
        }));
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
      // Fallback to local-only save if API fails
      const existingContact = get().getContactByAddress(address);
      if (existingContact) {
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === existingContact.id
              ? { ...contact, name, address, notes }
              : contact
          ),
        }));
      } else {
        const newContact: Contact = {
          id: Date.now().toString(),
          name,
          address,
          notes,
          createdAt: Date.now(),
        };
        set((state) => ({
          contacts: [...state.contacts, newContact],
        }));
      }
    }
  },
  getContactByAddress: (address: string) => {
    return get().contacts.find(
      (contact) => contact.address.toLowerCase() === address.toLowerCase()
    );
  },
  removeContact: (id: string) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },
}));
