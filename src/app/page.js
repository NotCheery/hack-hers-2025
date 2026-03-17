'use client';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import RealMap from '@/components/RealMap';
import { organizations } from '@/lib/locations';
import { useRouter } from 'next/navigation';

import ProfileScreen from '@/components/screens/ProfileScreen';
import HomeScreen from '@/components/screens/HomeScreen';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, MessageSquare, User, Home, Plus, ArrowLeft, Check, X,
  Navigation, Shield, ChevronRight, Gift, Users, Send, Award, Bell,
  CheckCircle2, UserCheck, Map as MapIcon, ArrowRight, Settings as SettingsIcon
} from 'lucide-react';
import AIMatchingComponent from '@/components/AIMatchingComponent';
import PigeonMap from '@/app/components/PigeonMap';
import { useAuth } from '@/contexts/AuthContext';
import {
  FourPointStar, StarPatch, WashiTape, BinderClip, WavyDivider,
  TicketStub, Postcard, Notecard, Asterisk, Diamond, HeartOutline,
  PadIllustration, TamponIllustration, LinerIllustration,
  PixelHeart, PixelBow, Sparkle, RetroWindow, CornerFlourish,
  GiftBoxIcon, RequestHandIcon
} from '@/components/ui/Decorative';

const SCREENS = {
  SPLASH: 'splash',
  PERMISSIONS: 'permissions',
  HOME: 'home',
  REQUEST: 'request',
  GIVE: 'give',
  COMMUNITY: 'community',
  POLICIES: 'policies',
  NOTIFICATIONS: 'notifications',
  REQUEST_SENT: 'request_sent',
  LOADING: 'loading',
  AI_MATCHING: 'ai_matching',
  MATCHES: 'matches',
  ALL_MATCHES: 'all_matches',
  MAP: 'map',
  CHAT: 'chat',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  AI_PERMISSIONS: 'ai_permissions',
  SELECT_SOURCE: 'select_source',
  DIRECTIONS_MAP: 'directions_map',
  TRANSACTION_COMPLETE: 'transaction_complete',
};

function getDistance(lat1, lng1, lat2, lng2) {
  if (!lat1 || !lng1 || !lat2 || !lng2) return 'Calculating...';
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1) + ' miles';
}

const GSU_CAMPUSES = ['Atlanta Campus', 'Clarkston Campus', 'Alpharetta Campus', 'Decatur Campus', 'Dunwoody Campus', 'Newton Campus'];

const allMatchesData = [
  { id: 1, name: 'Emma Chen', distance: '0.3 miles', items: 'Period Products', verified: true, lat: 33.7535, lng: -84.3853 },
  { id: 2, name: 'Women\'s Center', distance: '0.5 miles', items: 'All Items', verified: true, lat: 33.7528, lng: -84.3848 },
  { id: 3, name: 'Sarah Martinez', distance: '0.7 miles', items: 'Period Products', verified: false, lat: 33.7540, lng: -84.3860 },
  { id: 4, name: 'Jessica B.', distance: '0.9 miles', items: 'Pain Relief', verified: false, lat: 33.7510, lng: -84.3870 }
];

const communityPosts = [
  { id: 1, thread: 'Restock Updates', content: 'The Women\'s Center just got a huge donation of pads and tampons.', user: 'Anonymous', timestamp: '2h ago', verified: false },
  { id: 2, thread: 'Communal Hangouts / 3rd Spaces', content: 'Study group for finals at the GSU library, 3rd floor. Safe space, all welcome.', user: 'Maya J.', timestamp: '5h ago', verified: true },
  { id: 3, thread: 'Memes & Positivity', content: 'Just a reminder that you are all amazing and capable. You got this.', user: 'Anonymous', timestamp: '1d ago', verified: false },
  { id: 4, thread: 'Personal Stories', content: 'Feeling really overwhelmed with classes and personal stuff. Just needed to vent somewhere safe.', user: 'Anonymous', timestamp: '1d ago', verified: false },
  { id: 5, thread: 'Restock Updates', content: 'Zara at Atlantic Station has a donation bin at the front register till Friday.', user: 'Anonymous', timestamp: '3d ago', verified: false },
];

const notificationsData = [
  { id: 1, type: 'chat_request', from: { name: 'Alex R.', verified: true }, item: 'Pain Relief', isContact: true, status: 'pending' },
  { id: 2, type: 'chat_request', from: { name: 'Anonymous', verified: false }, item: 'Period Products', isContact: false, status: 'pending' },
  { id: 3, type: 'info', content: 'Your donation to GSU Women\'s Center has been logged.', status: 'read' },
  { id: 4, type: 'chat_request', from: { name: 'Jordan P.', verified: true }, item: 'Hygiene Items', isContact: true, status: 'accepted' },
];

// Shared back button for headers
function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-taupe/10 transition">
      <ArrowLeft size={22} strokeWidth={1} className="text-maroon" />
    </button>
  );
}

// Page header component
function PageHeader({ title, onBack, right }) {
  return (
    <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-cream">
      <div className="flex items-center gap-3">
        {onBack && <BackButton onClick={onBack} />}
        <h2 className="font-display text-2xl text-near-black">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export default function ClutchWireframe() {
  const { user, loading, logOut, updateUserProfile } = useAuth();
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [previousScreen, setPreviousScreen] = useState(SCREENS.SPLASH);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [requestItem, setRequestItem] = useState('');
  const [aiPermissions, setAiPermissions] = useState(true);
  const [showWarning, setShowWarning] = useState(null);
  const [whitelistedUsers, setWhitelistedUsers] = useState([]);
  const [communityTab, setCommunityTab] = useState('Restock Updates');
  const [notificationTab, setNotificationTab] = useState('All');
  const [sentRequests, setSentRequests] = useState([]);
  const [requestSentTo, setRequestSentTo] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState('Atlanta Campus');
  const [selectedSourceType, setSelectedSourceType] = useState('org');
  const [selectedSource, setSelectedSource] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedRequestSource, setSelectedRequestSource] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 33.7535, lng: -84.3853 })
      );
    } else {
      setUserLocation({ lat: 33.7535, lng: -84.3853 });
    }
  }, []);

  const navigate = useCallback((screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  }, [currentScreen]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentScreen(SCREENS.HOME);
      } else {
        setCurrentScreen(SCREENS.SPLASH);
      }
    }
  }, [user, loading]);

  const goBack = () => {
    if (selectedChat) { setSelectedChat(null); return; }
    if (selectedMatch) { setSelectedMatch(null); return; }
    if (currentScreen === SCREENS.ALL_MATCHES) { setCurrentScreen(SCREENS.MATCHES); return; }
    if ([SCREENS.COMMUNITY, SCREENS.GIVE, SCREENS.NOTIFICATIONS, SCREENS.REQUEST_SENT, SCREENS.MAP, SCREENS.SELECT_SOURCE, SCREENS.DIRECTIONS_MAP, SCREENS.TRANSACTION_COMPLETE].includes(currentScreen)) { setCurrentScreen(SCREENS.HOME); return; }
    setCurrentScreen(previousScreen);
  };

  const handleStartChat = (match) => {
    setSentRequests([...sentRequests, match.id]);
    setRequestSentTo(match);
    navigate(SCREENS.REQUEST_SENT);
  };

  const handleDonation = (spot) => setSelectedSpot(spot);

  const handleDirections = (spot) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCompleteDonation = () => {
    setSelectedSpot(null);
    navigate(SCREENS.TRANSACTION_COMPLETE);
  };

  const handleRequestSource = (source) => setSelectedRequestSource(source);

  const handleRequestDirections = (source) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${source.lat},${source.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCompleteRequest = () => {
    setRequestSentTo(selectedRequestSource);
    setSelectedRequestSource(null);
    navigate(SCREENS.REQUEST_SENT);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setCurrentScreen(SCREENS.SPLASH);
      setPreviousScreen(SCREENS.SPLASH);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ── Modals ──

  const DonationModal = ({ spot, onCancel, onGetDirections, onComplete }) => (
    <div className="fixed inset-0 bg-near-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Postcard className="max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <MapPin size={20} strokeWidth={1} className="text-hot-pink" />
          <h3 className="font-display text-lg text-near-black">{spot.name}</h3>
        </div>
        <div className="bg-cream rounded-lg p-3 mb-5 space-y-2 text-sm">
          <p className="text-taupe flex items-center gap-2">
            <MapPin size={14} strokeWidth={1} className="text-hot-pink" /> {spot.address}
          </p>
          <p className="text-near-black font-medium flex items-center gap-2">
            <Navigation size={14} strokeWidth={1} className="text-maroon" /> {spot.distance}
          </p>
        </div>
        <div className="space-y-2">
          <button onClick={onGetDirections} className="w-full border border-maroon text-maroon py-2.5 rounded-full text-sm font-medium hover:bg-maroon/5 transition flex items-center justify-center gap-2">
            <Navigation size={16} strokeWidth={1} /> Get directions
          </button>
          <button onClick={onComplete} className="w-full bg-hot-pink text-white py-2.5 rounded-full text-sm font-medium hover:bg-hot-pink/90 transition">
            Confirm donation
          </button>
          <button onClick={onCancel} className="w-full text-taupe py-2 text-sm hover:text-near-black transition">
            Cancel
          </button>
        </div>
      </Postcard>
    </div>
  );

  const RequestModal = ({ source, onCancel, onGetDirections, onComplete, isOrganization = false }) => (
    <div className="fixed inset-0 bg-near-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Notecard className="max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <Users size={20} strokeWidth={1} className="text-hot-pink" />
          <h3 className="font-display text-lg text-near-black">{source.name}</h3>
        </div>
        <div className="bg-cream rounded-lg p-3 mb-5 space-y-2 text-sm">
          {source.address && (
            <p className="text-taupe flex items-center gap-2">
              <MapPin size={14} strokeWidth={1} className="text-hot-pink" /> {source.address}
            </p>
          )}
          <p className="text-near-black font-medium flex items-center gap-2">
            <Navigation size={14} strokeWidth={1} className="text-maroon" /> {source.distance}
          </p>
          <p className="text-taupe flex items-center gap-2">
            <Diamond size={8} className="text-hot-pink" /> {source.items}
          </p>
        </div>
        <div className="space-y-2">
          <button onClick={onGetDirections} className="w-full border border-maroon text-maroon py-2.5 rounded-full text-sm font-medium hover:bg-maroon/5 transition flex items-center justify-center gap-2">
            <Navigation size={16} strokeWidth={1} /> Get directions
          </button>
          {!isOrganization && (
            <button onClick={onComplete} className="w-full bg-hot-pink text-white py-2.5 rounded-full text-sm font-medium hover:bg-hot-pink/90 transition">
              Send request
            </button>
          )}
          <button onClick={onCancel} className="w-full text-taupe py-2 text-sm hover:text-near-black transition">
            Cancel
          </button>
        </div>
      </Notecard>
    </div>
  );

  const WarningModal = ({ match, onCancel, onProceed, onWhitelist }) => (
    <div className="fixed inset-0 bg-near-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-taupe/30 p-6 max-w-sm w-full shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} strokeWidth={1} className="text-maroon" />
          <h3 className="font-display text-lg text-near-black">Safety notice</h3>
        </div>
        <p className="text-dusty-rose text-sm mb-6 leading-relaxed">
          We are not responsible for interactions with unverified users. It is in your best interest to only accept items from Clutch Verified members. Stay safe, let loved ones know of any updates, and call the police for suspicious activity, or our support number (470-777-2141).
        </p>
        <div className="space-y-2">
          <button onClick={onProceed} className="w-full bg-hot-pink text-white py-2.5 rounded-full text-sm font-medium hover:bg-hot-pink/90 transition">
            I understand, proceed
          </button>
          <button onClick={onWhitelist} className="w-full bg-cream text-taupe py-2.5 rounded-full text-xs font-medium hover:bg-taupe/10 transition">
            Proceed and don&apos;t warn again for {match.name}
          </button>
          <button onClick={onCancel} className="w-full text-taupe py-2 text-xs hover:text-near-black transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // ── Screen renderer ──

  const renderScreen = () => {
    if (loading) {
      return (
        <div className="w-full h-screen bg-cream bg-canvas flex flex-col items-center justify-center">
          <PixelHeart size={24} className="gentle-bounce mb-4" color="#FF0090" />
          <p className="font-display text-xl text-near-black">loading...</p>
        </div>
      );
    }

    // ── SPLASH ──
    if (currentScreen === SCREENS.SPLASH) {
      return (
        <div className="w-full h-screen bg-cream bg-canvas flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          {/* Scattered cute decorations */}
          <PixelHeart size={14} className="absolute top-16 left-10 sparkle" color="#F9C6D0" />
          <PixelBow size={18} className="absolute top-28 right-14 sparkle" color="#F9C6D0" style={{ animationDelay: '0.5s' }} />
          <Sparkle size={16} className="absolute bottom-36 left-14 text-soft-pink sparkle" style={{ animationDelay: '1s' }} />
          <PixelHeart size={10} className="absolute bottom-28 right-16 sparkle" color="#FF0090" style={{ animationDelay: '1.5s' }} />
          <FourPointStar size={14} className="absolute top-44 left-[65%] text-soft-pink star-pulse" />

          {/* Gingham strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gingham-rose opacity-40" />

          {/* Content */}
          <div className="flex items-center gap-2 mb-4">
            <PixelHeart size={14} color="#FF0090" />
            <PixelBow size={20} color="#FF0090" />
            <PixelHeart size={14} color="#FF0090" />
          </div>
          <h1 className="font-display text-7xl text-near-black tracking-tight mb-2">Clutch</h1>
          <p className="text-dusty-rose text-sm tracking-wide mb-10">Feminine help on standby.</p>

          {/* Retro window style button */}
          <div className="retro-window max-w-[200px]">
            <div className="retro-window-header">
              <div className="retro-window-dot" />
              <div className="retro-window-dot" style={{ opacity: 0.4 }} />
              <div className="retro-window-dot" style={{ opacity: 0.25 }} />
            </div>
            <div className="p-3 text-center">
              <button
                onClick={() => { window.location.href = '/login'; }}
                className="w-full bg-hot-pink hover:bg-hot-pink/90 text-white px-8 py-2.5 rounded-full font-medium text-sm transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── PERMISSIONS ──
    if (currentScreen === SCREENS.PERMISSIONS) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="App Permissions" />
          <p className="px-6 text-dusty-rose text-sm mb-4">For the best experience, please enable the following:</p>
          <div className="flex-1 px-6 space-y-3">
            {[
              { icon: CheckCircle2, label: 'App Tracking', desc: 'Helps us improve app performance.' },
              { icon: MapIcon, label: 'Location', desc: 'Finds matches and resources near you.' },
              { icon: UserCheck, label: 'Contacts', desc: 'Identifies requests from people you know.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white border border-soft-pink/50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={22} strokeWidth={1} className="text-hot-pink" />
                  <div>
                    <p className="font-medium text-near-black text-sm">{label}</p>
                    <p className="text-dusty-rose text-xs">{desc}</p>
                  </div>
                </div>
                <button className="px-4 py-1 text-xs font-medium rounded-full bg-hot-pink text-white">Allow</button>
              </div>
            ))}
          </div>
          <div className="p-4">
            <button onClick={() => navigate(SCREENS.HOME)} className="w-full bg-hot-pink text-white py-3 rounded-full font-medium transition hover:bg-hot-pink/90">
              Finish Setup
            </button>
          </div>
        </div>
      );
    }

    // ── HOME ──
    if (currentScreen === SCREENS.HOME) {
      return (
        <HomeScreen
          t={{}}
          navigate={navigate}
          SCREENS={SCREENS}
          selectedCampus={selectedCampus}
          user={user}
        />
      );
    }

    // ── GIVE / DONATE ──
    if (currentScreen === SCREENS.GIVE) {
      const dropOffSpots = organizations.map(org => ({
        ...org,
        distance: getDistance(userLocation?.lat, userLocation?.lng, org.lat, org.lng),
      }));
      return (
        <>
          <div className="w-full h-screen bg-cream flex flex-col">
            <PageHeader title="Donate Items" onBack={goBack} />
            <div className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
              <p className="text-dusty-rose text-sm mb-2">Select a verified drop-off location near you.</p>
              {dropOffSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => handleDonation(spot)}
                  className="w-full bg-white border border-soft-pink/50 p-4 rounded-xl hover:shadow-md transition text-left relative group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-base text-near-black">{spot.name}</p>
                      <p className="text-xs text-taupe flex items-center gap-1 mt-1">
                        <MapPin size={12} strokeWidth={1} /> {spot.distance}
                      </p>
                    </div>
                    <StarPatch size={20} className="text-hot-pink" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {selectedSpot && (
            <DonationModal
              spot={selectedSpot}
              onCancel={() => setSelectedSpot(null)}
              onGetDirections={() => handleDirections(selectedSpot)}
              onComplete={handleCompleteDonation}
            />
          )}
        </>
      );
    }

    // ── COMMUNITY ──
    if (currentScreen === SCREENS.COMMUNITY) {
      const TABS = ['Restock Updates', 'Communal Hangouts / 3rd Spaces', 'Memes & Positivity', 'Personal Stories'];
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="Community" onBack={goBack} />
          <div className="px-4 pb-2">
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setCommunityTab(tab)}
                  className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition ${
                    communityTab === tab
                      ? 'bg-hot-pink text-white'
                      : 'bg-white text-taupe border border-soft-pink/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <WavyDivider className="mx-6 my-0" />
          <div className="flex-1 px-4 pt-2 space-y-3 overflow-y-auto">
            {communityPosts.filter(p => p.thread === communityTab).map(post => (
              <div key={post.id} className="bg-white border border-soft-pink/40 p-4 rounded-xl">
                <p className="text-near-black text-sm mb-3 leading-relaxed">{post.content}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs font-medium text-taupe flex items-center gap-1">
                    {post.user}
                    {post.verified && <StarPatch size={12} className="text-hot-pink" />}
                  </p>
                  <p className="text-xs text-taupe">{post.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-soft-pink/40 p-4 flex gap-2 items-center">
            <input type="text" placeholder="post anonymously..." className="flex-1 bg-cream text-near-black placeholder-taupe/60 p-3 rounded-full text-sm outline-none focus:ring-1 focus:ring-hot-pink" />
            <button className="bg-hot-pink hover:bg-hot-pink/90 text-white p-3 rounded-full transition">
              <Send size={18} strokeWidth={1} />
            </button>
          </div>
        </div>
      );
    }

    // ── NOTIFICATIONS ──
    if (currentScreen === SCREENS.NOTIFICATIONS) {
      const TABS = ['All', 'From Contacts', 'Others'];
      const filteredNotifications = notificationsData.filter(n => {
        if (notificationTab === 'All') return n.type === 'chat_request';
        if (notificationTab === 'From Contacts') return n.isContact;
        if (notificationTab === 'Others') return !n.isContact;
        return false;
      });

      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="Notifications" onBack={goBack} />
          <div className="px-4 pb-2">
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setNotificationTab(tab)}
                  className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition ${
                    notificationTab === tab
                      ? 'bg-hot-pink text-white'
                      : 'bg-white text-taupe border border-soft-pink/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <WavyDivider className="mx-6 my-0" />
          <div className="flex-1 px-4 pt-2 space-y-3 overflow-y-auto">
            {filteredNotifications.length > 0 ? filteredNotifications.map(notif => (
              <div key={notif.id} className="bg-white border border-soft-pink/40 p-4 rounded-xl">
                <p className="text-near-black text-sm mb-3">
                  <span className={`font-medium ${notif.from.verified ? 'text-hot-pink' : 'text-near-black'}`}>{notif.from.name}</span>
                  {' '}requested{' '}
                  <span className="font-medium">{notif.item}</span>.
                </p>
                {notif.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedChat(notif.from); navigate(SCREENS.CHAT); }} className="flex-1 bg-hot-pink text-white text-sm font-medium py-2 rounded-full transition hover:bg-hot-pink/90">Accept</button>
                    <button className="flex-1 bg-cream text-dusty-rose text-sm font-medium py-2 rounded-full hover:bg-taupe/10 transition">Decline</button>
                  </div>
                )}
                {notif.status === 'accepted' && (
                  <p className="text-sm font-medium text-maroon flex items-center gap-1">
                    <Check size={14} strokeWidth={1} /> You accepted this request.
                  </p>
                )}
              </div>
            )) : (
              <p className="text-center text-taupe mt-8 text-sm">No new requests.</p>
            )}
          </div>
        </div>
      );
    }

    // ── REQUEST SENT ──
    if (currentScreen === SCREENS.REQUEST_SENT) {
      return (
        <div className="w-full h-screen bg-cream bg-canvas flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <PixelHeart size={12} className="absolute top-20 right-16 sparkle" color="#F9C6D0" />
          <Sparkle size={14} className="absolute bottom-28 left-12 text-soft-pink sparkle" style={{ animationDelay: '0.5s' }} />
          <PixelBow size={16} className="absolute top-32 left-10 sparkle" color="#F9C6D0" style={{ animationDelay: '1s' }} />

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gingham-rose opacity-30" />

          <RetroWindow className="max-w-xs w-full mb-6">
            <div className="text-center py-4">
              <PixelHeart size={28} className="mx-auto mb-3 gentle-bounce" color="#FF0090" />
              <h1 className="font-display text-2xl text-near-black mb-2">Request sent.</h1>
              <p className="text-dusty-rose text-sm max-w-xs">
                Your request has been sent to {requestSentTo?.name}. You will be notified when they respond.
              </p>
            </div>
          </RetroWindow>
          <button onClick={goBack} className="bg-hot-pink hover:bg-hot-pink/90 text-white px-8 py-3 rounded-full font-medium transition text-sm">
            Back to Home
          </button>
        </div>
      );
    }

    // ── REQUEST — Product Selection ──
    if (currentScreen === SCREENS.REQUEST) {
      const products = [
        { name: 'Pad', key: 'Period Products', Illustration: PadIllustration },
        { name: 'Tampon', key: 'Period Products', Illustration: TamponIllustration },
        { name: 'Liner', key: 'Period Products', Illustration: LinerIllustration },
      ];
      return (
        <div className="w-full h-screen bg-cream bg-canvas flex flex-col">
          <PageHeader title="What do you need?" onBack={goBack} />
          <div className="flex-1 px-6 pt-2 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              {products.map(({ name, key, Illustration }) => (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedProduct(name);
                    setRequestItem(key);
                    navigate(SCREENS.SELECT_SOURCE);
                  }}
                  className="relative group"
                >
                  <div className={`retro-window transition-shadow hover:shadow-lg ${
                    selectedProduct === name ? 'ring-2 ring-hot-pink' : ''
                  }`}>
                    <div className="retro-window-header">
                      <div className="retro-window-dot" />
                      <div className="retro-window-dot" style={{ opacity: 0.4 }} />
                    </div>
                    <div className="p-3 text-center bg-dots-pink">
                      {selectedProduct === name && (
                        <div className="absolute top-8 left-0 right-0 z-10">
                          <WashiTape rotate="-1deg" />
                        </div>
                      )}
                      <Illustration className="mx-auto mb-2" />
                      <p className="font-display text-base text-near-black">{name}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <WavyDivider />
            <div className="flex items-center gap-2 mb-1">
              <PixelHeart size={8} color="#C27088" />
              <p className="label-caps text-dusty-rose">Other needs</p>
            </div>
            {['Pain Relief', 'Hygiene Items', 'Other'].map(item => (
              <button
                key={item}
                onClick={() => { setRequestItem(item); navigate(SCREENS.SELECT_SOURCE); }}
                className="w-full bg-white border border-soft-pink p-4 rounded-xl text-left hover:shadow-sm transition flex items-center justify-between group"
              >
                <span className="text-near-black text-sm font-medium">{item}</span>
                <ArrowRight size={16} strokeWidth={1} className="text-dusty-rose group-hover:text-hot-pink transition-colors" />
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ── SELECT SOURCE ──
    if (currentScreen === SCREENS.SELECT_SOURCE) {
      const tabs = ['Organizations', 'People'];
      const activeTab = selectedSourceType === 'org' ? 'Organizations' : 'People';
      const filteredOrgs = organizations.filter(org => org.items === 'All Items' || org.items.includes(requestItem)).map(org => ({
        ...org,
        distance: getDistance(userLocation?.lat, userLocation?.lng, org.lat, org.lng),
      }));
      const people = allMatchesData.filter(person => person.items === requestItem || person.items === 'All Items');

      return (
        <>
          <div className="w-full h-screen bg-cream flex flex-col">
            <PageHeader title={`Sources for ${requestItem}`} onBack={goBack} />
            <div className="px-6 pb-2">
              <div className="flex space-x-2">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedSourceType(tab === 'Organizations' ? 'org' : 'person')}
                    className={`px-4 py-2 text-xs font-medium rounded-full transition ${
                      activeTab === tab
                        ? 'bg-hot-pink text-white'
                        : 'bg-white text-taupe border border-soft-pink/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <WavyDivider className="mx-6 my-0" />
            <div className="flex-1 px-6 pt-2 space-y-3 overflow-y-auto">
              {selectedSourceType === 'org' ? (
                filteredOrgs.length > 0 ? filteredOrgs.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleRequestSource(org)}
                    className="w-full bg-white border border-soft-pink/50 p-4 rounded-xl hover:shadow-md transition text-left relative"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-display text-base text-near-black">{org.name}</p>
                        <p className="text-xs text-taupe flex items-center gap-1 mt-1">
                          <MapPin size={12} strokeWidth={1} /> {org.distance}
                        </p>
                      </div>
                      {org.verified && <StarPatch size={18} className="text-hot-pink" />}
                    </div>
                    <p className="text-sm text-taupe mt-1">{org.items}</p>
                  </button>
                )) : <p className="text-center text-taupe mt-8 text-sm">No organizations available for {requestItem}.</p>
              ) : (
                people.length > 0 ? people.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => handleRequestSource(person)}
                    className={`w-full bg-white border p-4 rounded-xl hover:shadow-md transition text-left ${
                      person.verified ? 'border-hot-pink/30' : 'border-taupe/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-display text-base text-near-black">{person.name}</p>
                        <p className="text-xs text-taupe flex items-center gap-1 mt-1">
                          <MapPin size={12} strokeWidth={1} /> {person.distance}
                        </p>
                      </div>
                      {person.verified && <StarPatch size={18} className="text-hot-pink" />}
                    </div>
                    <p className="text-sm text-taupe mt-1">{person.items}</p>
                  </button>
                )) : <p className="text-center text-taupe mt-8 text-sm">No people available for {requestItem}.</p>
              )}
            </div>
          </div>
          {selectedRequestSource && (
            <RequestModal
              source={selectedRequestSource}
              onCancel={() => setSelectedRequestSource(null)}
              onGetDirections={() => handleRequestDirections(selectedRequestSource)}
              onComplete={handleCompleteRequest}
              isOrganization={selectedSourceType === 'org'}
            />
          )}
        </>
      );
    }

    // ── DIRECTIONS MAP ──
    if (currentScreen === SCREENS.DIRECTIONS_MAP) {
      const handleGetDirections = () => {
        if (userLocation && selectedSource) {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedSource.lat},${selectedSource.lng}&travelmode=walking`;
          window.open(url, '_blank');
        }
      };

      return (
        <div className="w-full h-screen bg-cream flex flex-col items-center justify-center p-6">
          <Postcard className="max-w-sm w-full">
            <h2 className="font-display text-xl text-near-black mb-2">Directions to {selectedSource?.name}</h2>
            <p className="text-sm text-taupe mb-6">Distance: {selectedSource?.distance}</p>
            <div className="space-y-2">
              <button onClick={handleGetDirections} className="w-full bg-hot-pink text-white py-3 rounded-full font-medium transition hover:bg-hot-pink/90">
                Get Directions
              </button>
              <button onClick={() => navigate(SCREENS.SELECT_SOURCE)} className="w-full text-taupe py-2 text-sm hover:text-near-black transition">
                Cancel
              </button>
            </div>
          </Postcard>
        </div>
      );
    }

    // ── MATCHES (AI Curated) ──
    if (currentScreen === SCREENS.MATCHES && !selectedMatch) {
      const curatedMatches = allMatchesData.filter(match => match.verified);
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title={`Top matches for ${requestItem}`} onBack={goBack} />
          <div className="flex-1 px-6 space-y-3 overflow-y-auto">
            {curatedMatches.map((match) => (
              <button key={match.id} onClick={() => setSelectedMatch(match)} className="w-full bg-white border border-hot-pink/30 p-4 rounded-xl hover:shadow-md transition text-left">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-display text-base text-near-black">{match.name}</p>
                    <p className="text-xs text-taupe flex items-center gap-1 mt-1"><MapPin size={12} strokeWidth={1} /> {match.distance}</p>
                  </div>
                  <StarPatch size={18} className="text-hot-pink" />
                </div>
                <p className="text-sm text-taupe mt-1">{match.items}</p>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-soft-pink/40">
            <button onClick={() => navigate(SCREENS.ALL_MATCHES)} className="w-full text-center text-sm font-medium text-taupe hover:text-hot-pink transition">
              Want other options? Click here
            </button>
          </div>
        </div>
      );
    }

    // ── ALL MATCHES ──
    if (currentScreen === SCREENS.ALL_MATCHES && !selectedMatch) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title={`All matches for ${requestItem}`} onBack={goBack} />
          <div className="flex-1 px-6 space-y-3 overflow-y-auto">
            {allMatchesData.map((match) => (
              <button
                key={match.id}
                onClick={() => {
                  if (!match.verified && !whitelistedUsers.includes(match.id)) {
                    setShowWarning(match);
                  } else {
                    setSelectedMatch(match);
                  }
                }}
                className={`w-full bg-white border p-4 rounded-xl hover:shadow-md transition text-left ${
                  match.verified ? 'border-hot-pink/30' : 'border-taupe/20'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-display text-base text-near-black">{match.name}</p>
                    <p className="text-xs text-taupe flex items-center gap-1 mt-1"><MapPin size={12} strokeWidth={1} /> {match.distance}</p>
                  </div>
                  {match.verified && <StarPatch size={18} className="text-hot-pink" />}
                </div>
                <p className="text-sm text-taupe mt-1">{match.items}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ── MATCH DETAIL ──
    if (selectedMatch) {
      const isRequestSent = sentRequests.includes(selectedMatch.id);
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title={selectedMatch.name} onBack={() => setSelectedMatch(null)} />
          <div className="flex-1 px-6 space-y-4 overflow-y-auto">
            <Notecard>
              <div className="space-y-4">
                <div>
                  <p className="label-caps text-dusty-rose mb-1">Distance</p>
                  <p className="font-display text-2xl text-near-black flex items-center gap-2">
                    <Navigation size={18} strokeWidth={1} /> {selectedMatch.distance}
                  </p>
                </div>
                <div>
                  <p className="label-caps text-dusty-rose mb-1">Verification</p>
                  <p className="flex items-center gap-2 text-sm">
                    {selectedMatch.verified ? (
                      <>
                        <Check size={16} strokeWidth={1} className="text-maroon" />
                        <span className="text-maroon font-medium">Verified</span>
                      </>
                    ) : (
                      <>
                        <X size={16} strokeWidth={1} className="text-taupe" />
                        <span className="text-taupe font-medium">Unverified</span>
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <p className="label-caps text-dusty-rose mb-1">Available Items</p>
                  <p className="text-near-black text-sm">{selectedMatch.items}</p>
                </div>
                <p className="text-xs text-taupe italic">All interactions are anonymous and safe. Never share personal details.</p>
              </div>
            </Notecard>
          </div>
          <div className="p-4 space-y-2 border-t border-soft-pink/40">
            <button
              onClick={() => handleStartChat(selectedMatch)}
              disabled={isRequestSent}
              className={`w-full py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition ${
                isRequestSent
                  ? 'bg-taupe/30 text-taupe cursor-not-allowed'
                  : 'bg-hot-pink hover:bg-hot-pink/90 text-white'
              }`}
            >
              {isRequestSent ? 'Request Sent' : 'Start Chat'}
            </button>
            <button onClick={() => setSelectedMatch(null)} className="w-full text-taupe py-2 text-sm hover:text-near-black transition">
              Back
            </button>
          </div>
        </div>
      );
    }

    // ── CHAT ──
    if (selectedChat) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <div className="px-6 pt-6 pb-4 flex items-center gap-3 bg-white border-b border-soft-pink/40">
            <BackButton onClick={goBack} />
            <div>
              <h2 className="font-display text-lg text-near-black">{selectedChat.name}</h2>
              <p className="text-xs text-taupe">arrange exchange -- chat is encrypted</p>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="bg-white border border-soft-pink/50 p-3 rounded-2xl rounded-tl-none w-3/4">
              <p className="text-sm text-near-black">hi, i need period products</p>
            </div>
            <div className="bg-pale-pink border border-hot-pink/15 p-3 rounded-2xl rounded-tr-none w-3/4 ml-auto">
              <p className="text-sm text-near-black">I have tampons and pads available. We can meet at the Women&apos;s Center or I can drop off at your dorm.</p>
            </div>
          </div>
          <div className="bg-white border-t border-soft-pink/40 p-4 flex gap-2">
            <input type="text" placeholder="type message..." className="flex-1 bg-cream text-near-black placeholder-taupe/60 p-3 rounded-full text-sm outline-none focus:ring-1 focus:ring-hot-pink" />
            <button className="bg-hot-pink hover:bg-hot-pink/90 text-white p-3 rounded-full transition">
              <MessageSquare size={18} strokeWidth={1} />
            </button>
          </div>
        </div>
      );
    }

    // ── MAP ──
    if (currentScreen === SCREENS.MAP) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="Nearby Providers" onBack={goBack} />
          <div className="flex-1 relative min-h-[400px] torn-bottom">
            <div className="absolute top-0 left-0 right-0 p-2 text-near-black text-center text-xs z-20 pointer-events-none">
              <span className="bg-cream/80 px-3 py-1 rounded-full border border-soft-pink/50">Click anywhere on the map to flag a new location</span>
            </div>
            <div className="w-full h-full">
              <RealMap />
            </div>
          </div>
        </div>
      );
    }

    // ── PROFILE ──
    if (currentScreen === SCREENS.PROFILE) {
      return (
        <ProfileScreen
          t={{}}
          goBack={() => navigate(SCREENS.HOME)}
          navigate={navigate}
          handleLogout={handleLogout}
          SCREENS={SCREENS}
          selectedCampus={selectedCampus}
          setSelectedCampus={setSelectedCampus}
          GSU_CAMPUSES={GSU_CAMPUSES}
          user={user}
          updateUserProfile={updateUserProfile}
        />
      );
    }

    // ── SETTINGS ──
    if (currentScreen === SCREENS.SETTINGS) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="Settings" onBack={goBack} />
          <div className="flex-1 px-6 space-y-3">
            {[
              { label: 'Policies & Safety', action: () => navigate(SCREENS.POLICIES) },
              { label: 'Account Info', action: () => {} },
              { label: 'School Info', action: () => {} },
              { label: 'AI Permissions', action: () => navigate(SCREENS.AI_PERMISSIONS) },
            ].map(({ label, action }) => (
              <button key={label} onClick={action} className="w-full text-left bg-white border border-soft-pink/50 p-4 rounded-xl hover:shadow-sm transition flex justify-between items-center">
                <p className="text-near-black text-sm">{label}</p>
                <ChevronRight size={18} strokeWidth={1} className="text-taupe" />
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ── POLICIES ──
    if (currentScreen === SCREENS.POLICIES) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="Policies & Safety" onBack={goBack} />
          <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-6">
            <div className="bg-white border border-soft-pink/50 p-5 rounded-xl">
              <h3 className="font-display text-lg text-near-black mb-3">Conduct Rules</h3>
              <ul className="space-y-2 text-sm text-taupe">
                <li className="flex items-start gap-2"><Diamond size={6} className="text-hot-pink mt-1.5 shrink-0" /> No hate speech, harassment, or bullying.</li>
                <li className="flex items-start gap-2"><Diamond size={6} className="text-hot-pink mt-1.5 shrink-0" /> No explicit, graphic, or inappropriate content.</li>
                <li className="flex items-start gap-2"><Diamond size={6} className="text-hot-pink mt-1.5 shrink-0" /> Respect privacy: no sharing of personal data.</li>
                <li className="flex items-start gap-2"><Diamond size={6} className="text-hot-pink mt-1.5 shrink-0" /> Users under 20 remain anonymous by default.</li>
                <li className="flex items-start gap-2"><Diamond size={6} className="text-hot-pink mt-1.5 shrink-0" /> Chat requests must be accepted by verified users only.</li>
              </ul>
            </div>
            <div className="bg-white border border-soft-pink/50 p-5 rounded-xl">
              <h3 className="font-display text-lg text-near-black mb-3">Verification & Partners</h3>
              <p className="text-sm text-taupe leading-relaxed">Verification requires a valid GSU student email or official ID to ensure community safety. Our partners are verified 3rd spaces, women-led stores, and community organizations. Verified users get access to exclusive coupons.</p>
            </div>
            <div className="bg-white border border-soft-pink/50 p-5 rounded-xl">
              <h3 className="font-display text-lg text-near-black mb-3">Legal Disclaimer</h3>
              <p className="text-sm text-taupe leading-relaxed">CLUTCH connects users to safe resources and verified locations but is not responsible for in-person exchanges that occur outside of these designated safe spots. We adhere to COPPA and FERPA protections for minors and student data.</p>
            </div>
            <a href="https://www.gofundme.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-hot-pink hover:bg-hot-pink/90 text-white py-3 rounded-full font-medium transition text-sm">
              Support Us on GoFundMe
            </a>
          </div>
        </div>
      );
    }

    // ── AI PERMISSIONS ──
    if (currentScreen === SCREENS.AI_PERMISSIONS) {
      return (
        <div className="w-full h-screen bg-cream flex flex-col">
          <PageHeader title="AI Permissions" onBack={goBack} />
          <div className="flex-1 px-6 space-y-4">
            <div className="bg-white border border-soft-pink/50 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-near-black text-sm">Enable AI Matching</p>
                  <p className="text-xs text-taupe mt-1">Allow Clutch AI to find the best matches for you.</p>
                </div>
                <button onClick={() => setAiPermissions(!aiPermissions)} className={`w-12 h-7 rounded-full p-0.5 transition-colors ${aiPermissions ? 'bg-hot-pink' : 'bg-taupe/30'}`}>
                  <span className={`block w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${aiPermissions ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ── TRANSACTION COMPLETE ──
    if (currentScreen === SCREENS.TRANSACTION_COMPLETE) {
      return (
        <div className="w-full h-screen bg-cream bg-canvas flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Scattered decorations */}
          <PixelHeart size={12} className="absolute top-16 left-10 sparkle" color="#F9C6D0" />
          <Sparkle size={16} className="absolute top-24 right-14 text-soft-pink sparkle" style={{ animationDelay: '0.5s' }} />
          <PixelBow size={14} className="absolute bottom-32 left-16 sparkle" color="#F9C6D0" style={{ animationDelay: '1s' }} />
          <PixelHeart size={10} className="absolute bottom-24 right-20 sparkle" color="#FF0090" style={{ animationDelay: '1.5s' }} />

          {/* Star burst behind ticket */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Sparkle size={120} className="text-soft-pink/20 star-pulse" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gingham-rose opacity-30" />

          <div className="relative z-10 w-full max-w-xs">
            <TicketStub points={10}>
              <div className="mt-4">
                <WavyDivider />
              </div>
            </TicketStub>

            <div className="text-center mt-8">
              <h1 className="font-display text-2xl text-near-black mb-2">Transaction complete.</h1>
              <p className="text-dusty-rose text-sm">Points added to your account.</p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate(SCREENS.HOME)}
                className="text-hot-pink text-sm font-medium underline underline-offset-4 hover:text-deep-rose transition"
              >
                Redeem perks
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate(SCREENS.HOME)}
                className="text-dusty-rose text-xs hover:text-near-black transition"
              >
                back to home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderScreen()}
      {showWarning && (
        <WarningModal
          match={showWarning}
          onCancel={() => setShowWarning(null)}
          onProceed={() => {
            setSelectedMatch(showWarning);
            setShowWarning(null);
          }}
          onWhitelist={() => {
            setWhitelistedUsers([...whitelistedUsers, showWarning.id]);
            setSelectedMatch(showWarning);
            setShowWarning(null);
          }}
        />
      )}
    </>
  );
}
