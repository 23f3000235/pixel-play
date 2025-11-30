import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface VideoMosaicProps {
  frame: string;
  isLoading: boolean;
}

const VideoMosaic = ({ frame, isLoading }: VideoMosaicProps) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-card border border-border shadow-card">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <motion.img
          key={frame}
          src={`data:image/jpeg;base64,${frame}`}
          alt="Video Mosaic"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}
      
      {/* Glassmorphic overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-transparent" />
    </div>
  );
};

export default VideoMosaic;
