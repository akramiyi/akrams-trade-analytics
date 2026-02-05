'use client';

import { Trash2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  symbol: string;
  notes: string;
  type: 'Trade' | 'ETF' | 'Mutual Fund';
}

interface JournalListProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="mb-4 p-4 bg-gray-700 rounded-md flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{entry.symbol} <span className="text-sm text-gray-400">({entry.type})</span></h3>
              <p>{entry.notes}</p>
            </div>
            <button onClick={() => onDelete(entry.id)} className="text-red-500 hover:text-red-400">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalList;
