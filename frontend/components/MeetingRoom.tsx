"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  MessageSquare,
  Users,
  PhoneOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MeetingRoomProps {
  meetingId: string;
  displayName: string;
  isHost: boolean;
}

export default function MeetingRoom({ meetingId, displayName, isHost }: MeetingRoomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex relative overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-2xl flex flex-col items-center justify-center border border-gray-700">
            {isVideoOn ? (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-zoom-blue/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-zoom-blue">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white font-medium">{displayName}</p>
                  <p className="text-gray-400 text-sm mt-1">Camera Active</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <VideoIcon className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-gray-400 text-sm">Camera is off</p>
              </div>
            )}
          </div>
        </div>

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-72 bg-gray-800 border-l border-gray-700 p-4 flex flex-col">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants (1)
            </h3>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50">
                <div className="w-8 h-8 rounded-full bg-zoom-blue flex items-center justify-center text-white text-sm font-medium">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{displayName}</p>
                  {isHost && <p className="text-gray-400 text-xs">Host</p>}
                </div>
                <Mic className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </h3>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center">No messages yet</p>
            </div>
            <div className="p-3 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 h-9 px-3 rounded-lg bg-gray-700 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zoom-blue"
                />
                <Button size="sm" className="shrink-0">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isMuted
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              !isVideoOn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            title={isVideoOn ? "Turn off camera" : "Turn on camera"}
          >
            {!isVideoOn ? (
              <VideoOff className="h-5 w-5" />
            ) : (
              <VideoIcon className="h-5 w-5" />
            )}
          </button>

          <button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all duration-200"
            title="Share screen"
          >
            <Monitor className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              setShowChat(!showChat);
              if (showParticipants) setShowParticipants(false);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              showChat
                ? "bg-zoom-blue hover:bg-zoom-blue-dark text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            title="Chat"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              setShowParticipants(!showParticipants);
              if (showChat) setShowChat(false);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              showParticipants
                ? "bg-zoom-blue hover:bg-zoom-blue-dark text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            title="Participants"
          >
            <Users className="h-5 w-5" />
          </button>

          <a
            href="/"
            className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200"
            title="Leave Meeting"
          >
            <PhoneOff className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
