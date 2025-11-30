import { useState, useEffect, useRef } from 'react';

export const useVideoStream = (backendUrl: string) => {
  const [frame, setFrame] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchFrame = async () => {
    try {
      const response = await fetch(`${backendUrl}/frame`);
      const data = await response.json();
      if (data.frame) {
        setFrame(data.frame);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching frame:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchFrame();

    // Set up interval for ~30fps (33ms)
    intervalRef.current = setInterval(fetchFrame, 33);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [backendUrl]);

  return { frame, isLoading };
};
