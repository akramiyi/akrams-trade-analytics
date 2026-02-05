'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import JournalList from '../../components/JournalList';

interface JournalEntry {
  id: string;
  symbol: string;
  notes: string;
  type: 'Trade' | 'ETF' | 'Mutual Fund';
}

const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [symbol, setSymbol] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState<'Trade' | 'ETF' | 'Mutual Fund'>('Trade');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'journals'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const journalEntries: JournalEntry[] = [];
        querySnapshot.forEach((doc) => {
          journalEntries.push({ id: doc.id, ...doc.data() } as JournalEntry);
        });
        setEntries(journalEntries);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && symbol && notes) {
      await addDoc(collection(db, 'journals'), {
        userId: user.uid,
        symbol,
        notes,
        type,
      });
      setSymbol('');
      setNotes('');
    }
  };

  const deleteEntry = async (id: string) => {
    await deleteDoc(doc(db, 'journals', id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">New Entry</h2>
          <form onSubmit={addEntry}>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as 'Trade' | 'ETF' | 'Mutual Fund')} 
              className="w-full bg-gray-700 p-2 rounded-md mb-4"
            >
              <option value="Trade">Trade</option>
              <option value="ETF">ETF</option>
              <option value="Mutual Fund">Mutual Fund</option>
            </select>
            <input 
              className="w-full bg-gray-700 p-2 rounded-md mb-4" 
              type="text" 
              placeholder={type === 'Mutual Fund' ? 'Scheme Name' : 'Symbol'} 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
            <textarea 
              className="w-full bg-gray-700 p-2 rounded-md mb-4" 
              placeholder="Notes" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button type="submit" className="w-full bg-blue-600 p-2 rounded-md">Save</button>
          </form>
        </div>
        <div className="md:col-span-2">
          <JournalList entries={entries} onDelete={deleteEntry} />
        </div>
      </div>
    </div>
  );
};

export default Journal;
