import React, { useState } from 'react';
import type { PollItem as PollItemType } from '../types';
import { PollItem } from './PollItem';

interface PollSectionProps {
  title: string;
  icon: React.ReactNode;
  items: PollItemType[];
  onAddItem: (text: string) => void;
  onVote: (id: number) => void;
  placeholder: string;
  color: 'red' | 'green';
}

export const PollSection: React.FC<PollSectionProps> = ({ title, icon, items, onAddItem, onVote, placeholder, color }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleAddClick = () => {
    if (newItemText.trim()) {
      onAddItem(newItemText.trim());
      setNewItemText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  const totalVotes = items.reduce((sum, item) => sum + item.votes, 0);

  const colors = {
    red: {
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      ring: 'focus:ring-red-500',
      border: 'focus:border-red-500',
    },
    green: {
      button: 'bg-green-700 hover:bg-green-800 focus:ring-green-600',
      ring: 'focus:ring-green-600',
      border: 'focus:border-green-600',
    },
  };
  const selectedColor = colors[color];


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full space-y-6">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`flex-grow block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${selectedColor.ring} ${selectedColor.border} sm:text-sm text-gray-900 dark:text-gray-100`}
        />
        <button
          onClick={handleAddClick}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-md shadow-sm transition-colors duration-200 ${selectedColor.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Adicionar
        </button>
      </div>
      
      {items.length > 0 ? (
        <ul className="space-y-4">
          {items.map((item) => (
            <PollItem
              key={item.id}
              item={item}
              onVote={onVote}
              totalVotes={totalVotes}
              color={color}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 pt-4">Nenhuma opção adicionada ainda.</p>
      )}
    </div>
  );
};