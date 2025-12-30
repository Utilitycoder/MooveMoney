export interface Contact {
  id: string;
  user_id?: string;
  name: string;
  address: string;
  notes?: string;
  createdAt: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactsStore {
  contacts: Contact[];
  addContact: (name: string, address: string, notes?: string) => Promise<void>;
  getContactByAddress: (address: string) => Contact | undefined;
  removeContact: (id: string) => void;
}