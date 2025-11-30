import { motion } from 'framer-motion';
import { Activity, Wifi, Zap } from 'lucide-react';
import { NetworkStats as NetworkStatsType } from '@/types/conference';

interface NetworkStatsProps {
  stats: NetworkStatsType;
}

const NetworkStats = ({ stats }: NetworkStatsProps) => {
  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-success';
    if (latency < 100) return 'text-primary';
    return 'text-destructive';
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex items-center gap-6 px-6 py-4 rounded-2xl backdrop-blur-glass bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-card"
    >
      {/* Latency */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/20">
          <Wifi className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Latency</p>
          <p className={`text-sm font-semibold ${getLatencyColor(stats.latency)}`}>
            {stats.latency}ms
          </p>
        </div>
      </div>

      {/* FPS */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-accent/20">
          <Activity className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">FPS</p>
          <p className="text-sm font-semibold text-foreground">{stats.fps}</p>
        </div>
      </div>

      {/* Bitrate */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-success/20">
          <Zap className="w-4 h-4 text-success" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Bitrate</p>
          <p className="text-sm font-semibold text-foreground">
            {(stats.bitrate / 1000).toFixed(1)} Mbps
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkStats;
