// API endpoint for AI matching functionality
import { NextResponse } from 'next/server';
import { aiMatchingService } from '@/lib/aiMatchingService';
import { enhancedAIMatchingService } from '@/lib/enhancedAIMatchingService';

// Mock data for demonstration - Expanded with more users and items
const mockUsers = [
  // Stanford University Users
  {
    id: 'user1',
    name: 'Sarah Johnson',
    university: 'Stanford University',
    academicYear: 3,
    helpedCount: 23,
    avgResponseTime: 25,
    isVerified: true,
    location: { lat: 37.4419, lng: -122.1430 },
    major: 'Computer Science',
    bio: 'Always happy to help fellow students!'
  },
  {
    id: 'user2',
    name: 'Emily Chen',
    university: 'Stanford University',
    academicYear: 2,
    helpedCount: 15,
    avgResponseTime: 45,
    isVerified: true,
    location: { lat: 37.4419, lng: -122.1430 },
    major: 'Biology',
    bio: 'Pre-med student who loves helping others'
  },
  {
    id: 'user3',
    name: 'Jessica Martinez',
    university: 'Stanford University',
    academicYear: 4,
    helpedCount: 31,
    avgResponseTime: 20,
    isVerified: true,
    location: { lat: 37.4419, lng: -122.1430 },
    major: 'Psychology',
    bio: 'Senior who believes in supporting the community'
  },
  
  // UC Berkeley Users
  {
    id: 'user4',
    name: 'Jessica Lee',
    university: 'UC Berkeley',
    academicYear: 4,
    helpedCount: 8,
    avgResponseTime: 60,
    isVerified: false,
    location: { lat: 37.8719, lng: -122.2585 },
    major: 'Engineering',
    bio: 'Engineering student passionate about women in tech'
  },
  {
    id: 'user5',
    name: 'Maya Patel',
    university: 'UC Berkeley',
    academicYear: 2,
    helpedCount: 12,
    avgResponseTime: 35,
    isVerified: true,
    location: { lat: 37.8719, lng: -122.2585 },
    major: 'Public Health',
    bio: 'Public health major focused on community wellness'
  },
  {
    id: 'user6',
    name: 'Alex Thompson',
    university: 'UC Berkeley',
    academicYear: 3,
    helpedCount: 19,
    avgResponseTime: 40,
    isVerified: true,
    location: { lat: 37.8719, lng: -122.2585 },
    major: 'Business',
    bio: 'Business student who loves connecting people'
  },

  // UCLA Users
  {
    id: 'user7',
    name: 'Sofia Rodriguez',
    university: 'UCLA',
    academicYear: 1,
    helpedCount: 5,
    avgResponseTime: 75,
    isVerified: false,
    location: { lat: 34.0689, lng: -118.4452 },
    major: 'Nursing',
    bio: 'Freshman nursing student excited to help others'
  },
  {
    id: 'user8',
    name: 'Zoe Kim',
    university: 'UCLA',
    academicYear: 3,
    helpedCount: 27,
    avgResponseTime: 30,
    isVerified: true,
    location: { lat: 34.0689, lng: -118.4452 },
    major: 'Medicine',
    bio: 'Pre-med student with a passion for women\'s health'
  },

  // USC Users
  {
    id: 'user9',
    name: 'Riley O\'Connor',
    university: 'USC',
    academicYear: 2,
    helpedCount: 14,
    avgResponseTime: 50,
    isVerified: true,
    location: { lat: 34.0224, lng: -118.2851 },
    major: 'Communications',
    bio: 'Communications major who loves building community'
  },
  {
    id: 'user10',
    name: 'Taylor Williams',
    university: 'USC',
    academicYear: 4,
    helpedCount: 22,
    avgResponseTime: 25,
    isVerified: true,
    location: { lat: 34.0224, lng: -118.2851 },
    major: 'Social Work',
    bio: 'Social work student dedicated to supporting others'
  },

  // Georgia Tech Users (Atlanta area)
  {
    id: 'user11',
    name: 'Maya Johnson',
    university: 'Georgia Tech',
    academicYear: 3,
    helpedCount: 16,
    avgResponseTime: 30,
    isVerified: true,
    location: { lat: 33.7756, lng: -84.3963 },
    major: 'Computer Science',
    bio: 'CS student passionate about helping fellow students'
  },
  {
    id: 'user12',
    name: 'Ava Smith',
    university: 'Georgia Tech',
    academicYear: 2,
    helpedCount: 9,
    avgResponseTime: 40,
    isVerified: true,
    location: { lat: 33.7756, lng: -84.3963 },
    major: 'Engineering',
    bio: 'Engineering student who believes in community support'
  },
  {
    id: 'user13',
    name: 'Sophia Davis',
    university: 'Emory University',
    academicYear: 4,
    helpedCount: 25,
    avgResponseTime: 25,
    isVerified: true,
    location: { lat: 33.7915, lng: -84.3237 },
    major: 'Pre-Med',
    bio: 'Pre-med student focused on women\'s health advocacy'
  },
  {
    id: 'user14',
    name: 'Isabella Wilson',
    university: 'Emory University',
    academicYear: 1,
    helpedCount: 6,
    avgResponseTime: 55,
    isVerified: false,
    location: { lat: 33.7915, lng: -84.3237 },
    major: 'Psychology',
    bio: 'Freshman psychology major excited to help others'
  }
];

const mockItems = [
  // Period Products
  {
    id: 'item1',
    userId: 'user2',
    itemType: 'Period Products',
    description: 'Tampons (regular and super) - unopened boxes',
    quantity: 8,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  },
  {
    id: 'item2',
    userId: 'user5',
    itemType: 'Period Products',
    description: 'Pads (regular flow) - variety pack',
    quantity: 12,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 4 * 60 * 60 * 1000 // 4 hours ago
  },
  {
    id: 'item3',
    userId: 'user8',
    itemType: 'Period Products',
    description: 'Menstrual cups (2 different sizes)',
    quantity: 2,
    isAvailable: true,
    condition: 'Like new',
    submittedAt: Date.now() - 1 * 60 * 60 * 1000 // 1 hour ago
  },
  {
    id: 'item4',
    userId: 'user10',
    itemType: 'Period Products',
    description: 'Period panties (size M) - organic cotton',
    quantity: 3,
    isAvailable: true,
    condition: 'Good',
    submittedAt: Date.now() - 6 * 60 * 60 * 1000 // 6 hours ago
  },

  // Contraception
  {
    id: 'item5',
    userId: 'user1',
    itemType: 'Contraception',
    description: 'Condoms (latex-free) - variety pack',
    quantity: 10,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 3 * 60 * 60 * 1000 // 3 hours ago
  },
  {
    id: 'item6',
    userId: 'user6',
    itemType: 'Contraception',
    description: 'Emergency contraception (Plan B)',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 5 * 60 * 60 * 1000 // 5 hours ago
  },
  {
    id: 'item7',
    userId: 'user9',
    itemType: 'Contraception',
    description: 'Birth control pills (1 month supply)',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  },

  // Cosmetics
  {
    id: 'item8',
    userId: 'user3',
    itemType: 'Cosmetics',
    description: 'Lipstick collection (5 different shades)',
    quantity: 5,
    isAvailable: true,
    condition: 'Good',
    submittedAt: Date.now() - 1 * 60 * 60 * 1000 // 1 hour ago
  },
  {
    id: 'item9',
    userId: 'user4',
    itemType: 'Cosmetics',
    description: 'Foundation and concealer (medium skin tone)',
    quantity: 2,
    isAvailable: true,
    condition: 'Good',
    submittedAt: Date.now() - 3 * 60 * 60 * 1000 // 3 hours ago
  },
  {
    id: 'item10',
    userId: 'user7',
    itemType: 'Cosmetics',
    description: 'Skincare set (cleanser, moisturizer, serum)',
    quantity: 3,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 4 * 60 * 60 * 1000 // 4 hours ago
  },
  {
    id: 'item11',
    userId: 'user8',
    itemType: 'Cosmetics',
    description: 'Eyeshadow palette (neutral tones)',
    quantity: 1,
    isAvailable: true,
    condition: 'Like new',
    submittedAt: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  },

  // Medication
  {
    id: 'item12',
    userId: 'user1',
    itemType: 'Medication',
    description: 'Pain relievers (ibuprofen) - unopened bottle',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 1 * 60 * 60 * 1000 // 1 hour ago
  },
  {
    id: 'item13',
    userId: 'user3',
    itemType: 'Medication',
    description: 'Antacids and digestive aids',
    quantity: 2,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 3 * 60 * 60 * 1000 // 3 hours ago
  },
  {
    id: 'item14',
    userId: 'user5',
    itemType: 'Medication',
    description: 'Cold and flu medicine (daytime)',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 5 * 60 * 60 * 1000 // 5 hours ago
  },
  {
    id: 'item15',
    userId: 'user10',
    itemType: 'Medication',
    description: 'Allergy medication (antihistamines)',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  },

  // Atlanta Area Items
  {
    id: 'item16',
    userId: 'user11',
    itemType: 'Period Products',
    description: 'Tampons (super absorbency) - unopened box',
    quantity: 6,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 1 * 60 * 60 * 1000 // 1 hour ago
  },
  {
    id: 'item17',
    userId: 'user12',
    itemType: 'Period Products',
    description: 'Pads (heavy flow) - variety pack',
    quantity: 10,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 3 * 60 * 60 * 1000 // 3 hours ago
  },
  {
    id: 'item18',
    userId: 'user13',
    itemType: 'Contraception',
    description: 'Condoms (latex) - multipack',
    quantity: 12,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  },
  {
    id: 'item19',
    userId: 'user14',
    itemType: 'Cosmetics',
    description: 'Lipstick (nude shade) - barely used',
    quantity: 1,
    isAvailable: true,
    condition: 'Like new',
    submittedAt: Date.now() - 4 * 60 * 60 * 1000 // 4 hours ago
  },
  {
    id: 'item20',
    userId: 'user11',
    itemType: 'Medication',
    description: 'Pain relievers (acetaminophen) - unopened',
    quantity: 1,
    isAvailable: true,
    condition: 'New',
    submittedAt: Date.now() - 1 * 60 * 60 * 1000 // 1 hour ago
  }
];

// Mock requests - users looking for items
const mockRequests = [
  // Period Products Requests
  {
    id: 'req1',
    userId: 'requester1',
    itemType: 'Period Products',
    description: 'Urgently need tampons for tonight',
    urgency: 'high',
    location: { lat: 37.4419, lng: -122.1430 }, // Stanford area
    timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
    status: 'active'
  },
  {
    id: 'req2',
    userId: 'requester2',
    itemType: 'Period Products',
    description: 'Looking for pads, any brand',
    urgency: 'medium',
    location: { lat: 37.8719, lng: -122.2585 }, // Berkeley area
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    status: 'active'
  },

  // Contraception Requests
  {
    id: 'req3',
    userId: 'requester3',
    itemType: 'Contraception',
    description: 'Need emergency contraception ASAP',
    urgency: 'high',
    location: { lat: 34.0689, lng: -118.4452 }, // UCLA area
    timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
    status: 'active'
  },
  {
    id: 'req4',
    userId: 'requester4',
    itemType: 'Contraception',
    description: 'Looking for condoms for safety',
    urgency: 'medium',
    location: { lat: 34.0224, lng: -118.2851 }, // USC area
    timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
    status: 'active'
  },

  // Cosmetics Requests
  {
    id: 'req5',
    userId: 'requester5',
    itemType: 'Cosmetics',
    description: 'Need foundation for job interview tomorrow',
    urgency: 'medium',
    location: { lat: 37.4419, lng: -122.1430 }, // Stanford area
    timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
    status: 'active'
  },
  {
    id: 'req6',
    userId: 'requester6',
    itemType: 'Cosmetics',
    description: 'Looking for lipstick for special event',
    urgency: 'low',
    location: { lat: 37.8719, lng: -122.2585 }, // Berkeley area
    timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
    status: 'active'
  },

  // Medication Requests
  {
    id: 'req7',
    userId: 'requester7',
    itemType: 'Medication',
    description: 'Need pain relievers for headache',
    urgency: 'medium',
    location: { lat: 34.0689, lng: -118.4452 }, // UCLA area
    timestamp: Date.now() - 45 * 60 * 1000, // 45 minutes ago
    status: 'active'
  },
  {
    id: 'req8',
    userId: 'requester8',
    itemType: 'Medication',
    description: 'Looking for cold medicine',
    urgency: 'medium',
    location: { lat: 34.0224, lng: -118.2851 }, // USC area
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    status: 'active'
  }
];

// Mock requester profiles (users who are looking for items)
const mockRequesters = [
  {
    id: 'requester1',
    name: 'Ava Wilson',
    university: 'Stanford University',
    academicYear: 2,
    helpedCount: 7,
    avgResponseTime: 35,
    isVerified: true,
    location: { lat: 37.4419, lng: -122.1430 },
    major: 'Economics',
    bio: 'Sophomore who believes in supporting each other'
  },
  {
    id: 'requester2',
    name: 'Chloe Brown',
    university: 'UC Berkeley',
    academicYear: 3,
    helpedCount: 12,
    avgResponseTime: 40,
    isVerified: true,
    location: { lat: 37.8719, lng: -122.2585 },
    major: 'Environmental Science',
    bio: 'Environmental science major passionate about sustainability'
  },
  {
    id: 'requester3',
    name: 'Isabella Davis',
    university: 'UCLA',
    academicYear: 1,
    helpedCount: 3,
    avgResponseTime: 60,
    isVerified: false,
    location: { lat: 34.0689, lng: -118.4452 },
    major: 'Pre-Med',
    bio: 'Freshman pre-med student learning about community support'
  },
  {
    id: 'requester4',
    name: 'Sophia Miller',
    university: 'USC',
    academicYear: 2,
    helpedCount: 9,
    avgResponseTime: 45,
    isVerified: true,
    location: { lat: 34.0224, lng: -118.2851 },
    major: 'Journalism',
    bio: 'Journalism student who loves connecting with people'
  },
  {
    id: 'requester5',
    name: 'Olivia Garcia',
    university: 'Stanford University',
    academicYear: 4,
    helpedCount: 18,
    avgResponseTime: 30,
    isVerified: true,
    location: { lat: 37.4419, lng: -122.1430 },
    major: 'Political Science',
    bio: 'Senior preparing for law school, values community'
  },
  {
    id: 'requester6',
    name: 'Emma Rodriguez',
    university: 'UC Berkeley',
    academicYear: 3,
    helpedCount: 15,
    avgResponseTime: 35,
    isVerified: true,
    location: { lat: 37.8719, lng: -122.2585 },
    major: 'Art History',
    bio: 'Art history major who appreciates beauty and community'
  },
  {
    id: 'requester7',
    name: 'Charlotte Martinez',
    university: 'UCLA',
    academicYear: 2,
    helpedCount: 11,
    avgResponseTime: 50,
    isVerified: true,
    location: { lat: 34.0689, lng: -118.4452 },
    major: 'Psychology',
    bio: 'Psychology student interested in mental health support'
  },
  {
    id: 'requester8',
    name: 'Amelia Anderson',
    university: 'USC',
    academicYear: 1,
    helpedCount: 4,
    avgResponseTime: 55,
    isVerified: false,
    location: { lat: 34.0224, lng: -118.2851 },
    major: 'Film',
    bio: 'Film student who loves storytelling and community'
  }
];

// Initialize mock data - ensure it's loaded every time
const initializeMockData = () => {
  console.log('Initializing mock data...');
  
  // Clear existing data
  aiMatchingService.userProfiles.clear();
  aiMatchingService.availableItems.clear();
  aiMatchingService.activeRequests.clear();
  
  // Add all users
  [...mockUsers, ...mockRequesters].forEach(user => {
    aiMatchingService.updateUserProfile(user.id, user);
  });
  
  // Add all items
  mockItems.forEach(item => {
    aiMatchingService.addAvailableItem(item);
  });
  
  // Add all requests
  mockRequests.forEach(request => {
    aiMatchingService.addRequest(request);
  });
  
  console.log('Mock data initialized:', {
    users: aiMatchingService.userProfiles.size,
    items: aiMatchingService.availableItems.size,
    requests: aiMatchingService.activeRequests.size
  });
};

// Initialize data immediately
initializeMockData();

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    console.log('AI Matching API - Action:', action, 'Data:', data);

    switch (action) {
      case 'findMatches':
        try {
          console.log('AI Matching API - Action:', action, 'Data:', data);
          
          // Handle both formats: direct fields or requestData object
          let requestData;
          if (data && data.requestData) {
            requestData = data.requestData;
          } else {
            const { itemType, location, description } = data || {};
            
            if (!itemType || !location) {
              console.log('Missing required fields:', { itemType, location });
              return NextResponse.json({ 
                success: false, 
                error: 'Invalid request data. Missing itemType or location.' 
              }, { status: 400 });
            }
            
            requestData = {
              id: `req_${Date.now()}`,
              userId: 'current_user',
              itemType: itemType,
              description: description || `Looking for ${itemType}`,
              urgency: 'medium',
              location: location,
              timestamp: Date.now(),
              status: 'active'
            };
          }
          
          console.log('Request data:', requestData);
          const matches = aiMatchingService.findMatches(requestData);
          console.log('Found matches:', matches.length);
          
          return NextResponse.json({ 
            success: true, 
            matches: matches.slice(0, 5), // Return top 5 matches
            totalMatches: matches.length 
          });
        } catch (error) {
          console.error('Error in findMatches:', error);
          return NextResponse.json({ 
            success: false, 
            error: 'Internal server error: ' + error.message 
          }, { status: 500 });
        }

      case 'addRequest':
        const { request: newRequest } = data;
        const requestMatches = aiMatchingService.addRequest(newRequest);
        return NextResponse.json({ 
          success: true, 
          matches: requestMatches.slice(0, 5),
          requestId: newRequest.id 
        });

      case 'addAvailableItem':
        const { item } = data;
        aiMatchingService.addAvailableItem(item);
        return NextResponse.json({ 
          success: true, 
          itemId: item.id 
        });

      case 'getRecommendations':
        const { userId } = data;
        const recommendations = aiMatchingService.getMatchRecommendations(userId);
        return NextResponse.json({ 
          success: true, 
          recommendations: recommendations.slice(0, 10) 
        });

      case 'acceptMatch':
        const { matchId, userId: acceptUserId } = data;
        const acceptResult = aiMatchingService.acceptMatch(matchId, acceptUserId);
        return NextResponse.json(acceptResult);

      case 'rejectMatch':
        const { matchId: rejectMatchId, userId: rejectUserId } = data;
        const rejectResult = aiMatchingService.rejectMatch(rejectMatchId, rejectUserId);
        return NextResponse.json(rejectResult);

      case 'updateProfile':
        const { userId: profileUserId, profileData } = data;
        aiMatchingService.updateUserProfile(profileUserId, profileData);
        return NextResponse.json({ 
          success: true, 
          userId: profileUserId 
        });

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('AI Matching API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    switch (action) {
      case 'getRecommendations':
        if (!userId) {
          return NextResponse.json({ 
            success: false, 
            error: 'User ID required' 
          }, { status: 400 });
        }
        const recommendations = aiMatchingService.getMatchRecommendations(userId);
        return NextResponse.json({ 
          success: true, 
          recommendations: recommendations.slice(0, 10) 
        });

      case 'getMockData':
        return NextResponse.json({ 
          success: true, 
          users: mockUsers,
          requesters: mockRequesters,
          items: mockItems,
          requests: mockRequests
        });

      case 'debug':
        return NextResponse.json({
          success: true,
          debug: {
            userProfiles: aiMatchingService.userProfiles.size,
            availableItems: aiMatchingService.availableItems.size,
            activeRequests: aiMatchingService.activeRequests.size,
            allItems: Array.from(aiMatchingService.availableItems.values()),
            allUsers: Array.from(aiMatchingService.userProfiles.values())
          }
        });

      case 'getPersonalizedRecommendations':
        const { userId: recUserId, userProfile } = data;
        const personalizedRecommendations = await enhancedAIMatchingService.generatePersonalizedRecommendations(recUserId, userProfile);
        return NextResponse.json({ 
          success: true, 
          recommendations: personalizedRecommendations 
        });

      case 'getSafetyTips':
        const { itemType, location } = data;
        const safetyTips = await enhancedAIMatchingService.generateSafetyTips(itemType, location);
        return NextResponse.json({ 
          success: true, 
          safetyTips: safetyTips 
        });

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('AI Matching API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
