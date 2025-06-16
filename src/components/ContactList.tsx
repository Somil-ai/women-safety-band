import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { Phone, Trash2 } from 'lucide-react';
import { Contact } from '../types';

interface ContactListProps {
  showActions?: boolean;
  limit?: number;
}

const ContactList: React.FC<ContactListProps> = ({ showActions = true, limit }) => {
  const { contacts, removeContact } = useSafety();
  
  const displayContacts = limit ? contacts.slice(0, limit) : contacts;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
      
      {displayContacts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No emergency contacts added yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {displayContacts.map((contact) => (
            <ContactItem 
              key={contact.id} 
              contact={contact} 
              onDelete={showActions ? removeContact : undefined} 
            />
          ))}
        </ul>
      )}
      
      {limit && contacts.length > limit && (
        <div className="mt-3 text-center">
          <a href="/contacts" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all contacts ({contacts.length})
          </a>
        </div>
      )}
    </div>
  );
};

interface ContactItemProps {
  contact: Contact;
  onDelete?: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete }) => {
  return (
    <li className="py-3 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-800">{contact.name}</p>
        <p className="text-sm text-gray-600">{contact.relation}</p>
        <p className="text-sm text-gray-500">{contact.phone}</p>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors duration-200"
          aria-label={`Call ${contact.name}`}
        >
          <Phone size={16} />
        </button>
        
        {onDelete && (
          <button 
            onClick={() => onDelete(contact.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
            aria-label={`Remove ${contact.name}`}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </li>
  );
};

export default ContactList;