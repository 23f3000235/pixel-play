import { useState, useEffect, useRef } from 'react';
import { Participant } from '@/types/conference';

export const useRoster = (backendUrl: string) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRoster = async () => {
    try {
      const response = await fetch(`${backendUrl}/roster`);
      const data = await response.json();
      if (data.participants) {
        setParticipants(data.participants);
      }
    } catch (error) {
      console.error('Error fetching roster:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRoster();

    // Update every 2 seconds
    intervalRef.current = setInterval(fetchRoster, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [backendUrl]);

  return { participants, refreshRoster: fetchRoster };
};
