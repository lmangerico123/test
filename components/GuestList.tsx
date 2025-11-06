import React, { useState } from 'react';
import type { Guest } from '../types';
import { UsersIcon } from './icons';

interface GuestListProps {
  guests: Guest[];
  onAddGuest: (name: string) => void;
  onRemoveGuest: (id: number) => void;
}

export const GuestList: React.FC<GuestListProps> = ({ guests, onAddGuest, onRemoveGuest }) => {
  const [newGuestName, setNewGuestName] = useState('');

  const handleAddClick = () => {
    if (newGuestName.trim()) {
      onAddGuest(newGuestName.trim());
      setNewGuestName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  const selectedColor = {
    button: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400',
    ring: 'focus:ring-amber-500',
    border: 'focus:border-amber-500',
    icon: 'text-amber-600 dark:text-amber-500',
    removeButton: 'text-gray-400 hover:text-red-500 dark:hover:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UsersIcon className={`w-8 h-8 ${selectedColor.icon}`} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Lista de Convidados</h2>
        </div>
        <span className="text-lg font-bold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
          {guests.length}
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nome do convidado"
          className={`flex-grow block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${selectedColor.ring} ${selectedColor.border} sm:text-sm text-gray-900 dark:text-gray-100`}
        />
        <button
          onClick={handleAddClick}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-md shadow-sm transition-colors duration-200 ${selectedColor.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Adicionar
        </button>
      </div>

      {guests.length > 0 ? (
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {guests.map((guest) => (
            <li key={guest.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-md transition-all animate-fade-in">
              <span className="font-medium text-gray-700 dark:text-gray-200">{guest.name}</span>
              <button onClick={() => onRemoveGuest(guest.id)} className={`p-1 rounded-full ${selectedColor.removeButton} transition-colors`} aria-label={`Remover ${guest.name}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 pt-4">Nenhum convidado confirmado ainda.</p>
      )}
    </div>
  );
};
