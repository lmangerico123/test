import React from 'react';
import type { PollItem as PollItemType } from '../types';

interface PollItemProps {
  item: PollItemType;
  onVote: (id: number) => void;
  totalVotes: number;
  color: 'red' | 'green';
}

export const PollItem: React.FC<PollItemProps> = ({ item, onVote, totalVotes, color }) => {
  const votePercentage = totalVotes > 0 ? (item.votes / totalVotes) * 100 : 0;
  
  const colors = {
    red: {
      bg: 'bg-red-200',
      progress: 'bg-red-500',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    green: {
      bg: 'bg-green-200',
      progress: 'bg-green-600',
      button: 'bg-green-700 hover:bg-green-800 focus:ring-green-600',
    },
  };
  const selectedColor = colors[color];

  return (
    <li className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="flex-1 font-medium text-gray-700 dark:text-gray-200">{item.text}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-12 text-right">
            {item.votes} {item.votes === 1 ? 'voto' : 'votos'}
          </span>
          <button
            onClick={() => onVote(item.id)}
            className={`px-4 py-1.5 text-sm font-semibold text-white rounded-md shadow-sm transition-colors duration-200 ${selectedColor.button} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            Votar
          </button>
        </div>
      </div>
      <div className={`w-full ${selectedColor.bg} rounded-full h-2.5 dark:${selectedColor.bg.replace('200','800')}`}>
        <div
          className={`${selectedColor.progress} h-2.5 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${votePercentage}%` }}
        ></div>
      </div>
    </li>
  );
};