import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandAction } from '@/types/conference';

interface ControlBarProps {
  isMuted: boolean;
  isVideoOn: boolean;
  onCommand: (action: CommandAction) => void;
  onRefreshRoster: () => void;
}

const ControlBar = ({ isMuted, isVideoOn, onCommand, onRefreshRoster }: ControlBarProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-4 p-6 rounded-2xl backdrop-blur-glass bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-card"
    >
      {/* Mute/Unmute */}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => onCommand(isMuted ? 'UNMUTE' : 'MUTE')}
        className={`
          relative rounded-full w-14 h-14 transition-all duration-300
          ${isMuted 
            ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
            : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }
        `}
      >
        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        {!isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full bg-success/20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Button>

      {/* Video On/Off */}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => onCommand(isVideoOn ? 'VIDEO_OFF' : 'VIDEO_ON')}
        className={`
          relative rounded-full w-14 h-14 transition-all duration-300
          ${!isVideoOn 
            ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
            : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }
        `}
      >
        {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
        {isVideoOn && (
          <motion.div
            className="absolute inset-0 rounded-full bg-success/20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </Button>

      {/* Leave Call */}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => onCommand('LEAVE')}
        className="rounded-full w-16 h-16 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-neon transition-all duration-300 hover:scale-110"
      >
        <PhoneOff className="w-7 h-7" />
      </Button>

      {/* Refresh Roster */}
      <Button
        variant="ghost"
        size="lg"
        onClick={onRefreshRoster}
        className="rounded-full w-14 h-14 bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300 hover:rotate-180"
      >
        <RefreshCw className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};

export default ControlBar;
