import React, { useState } from 'react';
import ContactList from '../components/ContactList';
import { useSafety } from '../context/SafetyContext';
import { Users, Plus, X } from 'lucide-react';
import { Contact } from '../types';

const Contacts: React.FC = () => {
  const { addContact } = useSafety();
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    relation: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      addContact(newContact as Contact);
      setNewContact({ name: '', relation: '', phone: '' });
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Users size={24} className="mr-2 text-blue-700" /> 
          Emergency Contacts
        </h1>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center transition-colors duration-200"
        >
          {showForm ? (
            <>
              <X size={16} className="mr-1" /> Cancel
            </>
          ) : (
            <>
              <Plus size={16} className="mr-1" /> Add Contact
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Contact</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newContact.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact's full name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <select
                id="relation"
                name="relation"
                value={newContact.relation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select relationship</option>
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Friend">Friend</option>
                <option value="Relative">Relative</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newContact.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      )}

      <ContactList showActions={true} />
    </div>
  );
};

export default Contacts;