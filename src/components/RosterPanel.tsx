import { motion } from 'framer-motion';
import { Users, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { Participant } from '@/types/conference';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RosterPanelProps {
  participants: Participant[];
}

const RosterPanel = ({ participants }: RosterPanelProps) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-full rounded-2xl backdrop-blur-glass bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-card overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Participants</h2>
            <p className="text-sm text-muted-foreground">{participants.length} in call</p>
          </div>
        </div>
      </div>

      {/* Participant List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-border/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Name */}
                  <span className="font-medium text-foreground">{participant.name}</span>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-2">
                  {participant.isMuted ? (
                    <div className="p-1.5 rounded-full bg-destructive/20">
                      <MicOff className="w-4 h-4 text-destructive" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-success/20">
                      <Mic className="w-4 h-4 text-success" />
                    </div>
                  )}
                  
                  {participant.isVideoOn ? (
                    <div className="p-1.5 rounded-full bg-success/20">
                      <Video className="w-4 h-4 text-success" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-destructive/20">
                      <VideoOff className="w-4 h-4 text-destructive" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default RosterPanel;
