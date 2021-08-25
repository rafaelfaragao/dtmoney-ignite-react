import { createContext, ReactNode, useEffect, useState} from 'react';
import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTtransactions] = useState<Transaction[]>([]);

  useEffect(()=>{
    api.get('transactions')
      .then(response => setTtransactions(response.data.transactions))
  }, []);
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>

  );
}