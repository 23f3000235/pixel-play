export interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
}

export interface NetworkStats {
  latency: number;
  fps: number;
  bitrate: number;
}

export type CommandAction = "MUTE" | "UNMUTE" | "VIDEO_ON" | "VIDEO_OFF" | "LEAVE";

export interface CommandPayload {
  action: CommandAction;
}
