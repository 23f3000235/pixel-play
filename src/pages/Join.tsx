import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Join = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState('');
  const [name, setName] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId.trim() && name.trim()) {
      navigate('/setup', { state: { meetingId, name } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="p-4 rounded-2xl bg-gradient-primary shadow-neon mb-4"
          >
            <Video className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Join Meeting</h1>
          <p className="text-muted-foreground">Enter your details to get started</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-2xl border border-border/50"
        >
          <form onSubmit={handleJoin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingId" className="text-foreground">Meeting ID</Label>
              <Input
                id="meetingId"
                type="text"
                placeholder="Enter meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                required
                className="h-12 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-gradient-primary hover:shadow-neon transition-all duration-300"
              disabled={!meetingId.trim() || !name.trim()}
            >
              Continue to Setup
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          By joining, you agree to our terms of service
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Join;
