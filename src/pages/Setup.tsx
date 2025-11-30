import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Setup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  const { meetingId, name } = location.state || {};

  useEffect(() => {
    if (!meetingId || !name) {
      navigate('/');
    }
  }, [meetingId, name, navigate]);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast({
          title: 'Camera/Microphone Access Denied',
          description: 'Please allow access to continue',
          variant: 'destructive',
        });
      }
    };

    initializeMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = isMicEnabled;
      });
    }
  }, [isMicEnabled, stream]);

  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = isCameraEnabled;
      });
    }
  }, [isCameraEnabled, stream]);

  const handleJoinMeeting = () => {
    navigate('/conference', { state: { meetingId, name, isMicEnabled, isCameraEnabled } });
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
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Setup Your Devices</h1>
          <p className="text-muted-foreground">Configure your audio and video before joining</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl border border-border/50"
          >
            <div className="aspect-video bg-background/50 rounded-xl overflow-hidden relative mb-4">
              {isCameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted">
                  <VideoOff className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              
              {/* Preview Label */}
              <div className="absolute bottom-4 left-4 glass-card px-3 py-1 rounded-lg">
                <p className="text-sm text-foreground font-medium">{name}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isMicEnabled ? 'bg-primary/20' : 'bg-destructive/20'}`}>
                    {isMicEnabled ? (
                      <Mic className="w-5 h-5 text-primary" />
                    ) : (
                      <MicOff className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Microphone</Label>
                    <p className="text-xs text-muted-foreground">
                      {isMicEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isMicEnabled}
                  onCheckedChange={setIsMicEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isCameraEnabled ? 'bg-primary/20' : 'bg-destructive/20'}`}>
                    {isCameraEnabled ? (
                      <Video className="w-5 h-5 text-primary" />
                    ) : (
                      <VideoOff className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Camera</Label>
                    <p className="text-xs text-muted-foreground">
                      {isCameraEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isCameraEnabled}
                  onCheckedChange={setIsCameraEnabled}
                />
              </div>
            </div>
          </motion.div>

          {/* Settings & Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Meeting Details</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                  <Label className="text-xs text-muted-foreground">Your Name</Label>
                  <p className="text-foreground font-medium mt-1">{name}</p>
                </div>
                
                <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                  <Label className="text-xs text-muted-foreground">Meeting ID</Label>
                  <p className="text-foreground font-medium mt-1">{meetingId}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Before you join</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Make sure you're in a quiet environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Check your camera and microphone settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>You can mute/unmute during the call</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleJoinMeeting}
              className="w-full h-12 text-base bg-gradient-primary hover:shadow-neon transition-all duration-300"
            >
              Join Meeting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full h-12 text-base"
            >
              Back
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Setup;
