import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoMosaic from '@/components/VideoMosaic';
import ControlBar from '@/components/ControlBar';
import RosterPanel from '@/components/RosterPanel';
import NetworkStats from '@/components/NetworkStats';
import { useVideoStream } from '@/hooks/useVideoStream';
import { useRoster } from '@/hooks/useRoster';
import { CommandAction } from '@/types/conference';
import { useToast } from '@/hooks/use-toast';
import { Video } from 'lucide-react';

// Configure your backend URL here
const BACKEND_URL = 'http://localhost:8000'; // Update with your Python backend URL

const ConferenceRoom = () => {
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [networkStats, setNetworkStats] = useState({
    latency: 32,
    fps: 30,
    bitrate: 2500,
  });

  const { frame, isLoading } = useVideoStream(BACKEND_URL);
  const { participants, refreshRoster } = useRoster(BACKEND_URL);

  // Simulate network stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats({
        latency: Math.floor(Math.random() * 50) + 20,
        fps: Math.floor(Math.random() * 5) + 28,
        bitrate: Math.floor(Math.random() * 1000) + 2000,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = async (action: CommandAction) => {
    try {
      const response = await fetch(`${BACKEND_URL}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Update local state based on action
        switch (action) {
          case 'MUTE':
            setIsMuted(true);
            toast({
              title: 'Microphone muted',
              description: 'Your microphone is now muted',
            });
            break;
          case 'UNMUTE':
            setIsMuted(false);
            toast({
              title: 'Microphone unmuted',
              description: 'Your microphone is now active',
            });
            break;
          case 'VIDEO_ON':
            setIsVideoOn(true);
            toast({
              title: 'Video enabled',
              description: 'Your camera is now on',
            });
            break;
          case 'VIDEO_OFF':
            setIsVideoOn(false);
            toast({
              title: 'Video disabled',
              description: 'Your camera is now off',
            });
            break;
          case 'LEAVE':
            toast({
              title: 'Leaving call',
              description: 'You have left the conference',
              variant: 'destructive',
            });
            break;
        }
      }
    } catch (error) {
      console.error('Error sending command:', error);
      toast({
        title: 'Error',
        description: 'Failed to execute command',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-neon">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Conference Room</h1>
              <p className="text-sm text-muted-foreground">Real-time video conferencing</p>
            </div>
          </div>
          
          <NetworkStats stats={networkStats} />
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-6 mb-6">
          {/* Video Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="aspect-video lg:aspect-auto lg:h-[calc(100vh-300px)]"
          >
            <VideoMosaic frame={frame} isLoading={isLoading} />
          </motion.div>

          {/* Roster Panel */}
          <div className="h-[400px] lg:h-[calc(100vh-300px)]">
            <RosterPanel participants={participants} />
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex justify-center">
          <ControlBar
            isMuted={isMuted}
            isVideoOn={isVideoOn}
            onCommand={handleCommand}
            onRefreshRoster={refreshRoster}
          />
        </div>
      </div>
    </div>
  );
};

export default ConferenceRoom;
