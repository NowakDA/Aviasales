import { useState, useEffect } from 'react';

import api from '../utils/API';

export interface Ticket {
  price: number;
  carrier: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
  }[];
}
 
export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string | null>(null);

  useEffect(() => {

    async function fetchSearchId() {
      try {
        const response = await api.get<{ searchId: string }>('/search');
        setSearchId(response.data.searchId)
      } catch (err) {
        setError('Ошибка получения searchId');
      } finally {
        setLoading(false);
      }
    }
    if(!searchId){
    fetchSearchId();}
  }, [searchId]);


  useEffect(() => {
    if (!searchId) return;
    async function fetchTickets() {
      
      let stop = false;
      while (!stop) {
        try {
          setLoading(true)
          const response = await api.get<{ tickets: Ticket[]; stop: boolean }>(`/tickets?searchId=${searchId}`);
          setTickets(prev => [...prev, ...response.data.tickets]);
          stop = response.data.stop;
        } catch (err) {
          
        } finally {
          setLoading(false);
        }
      }
      
    }
    fetchTickets();
  }, [searchId]);




  return { tickets, loading, error };
}
