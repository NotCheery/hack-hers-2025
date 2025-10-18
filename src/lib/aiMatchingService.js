// AI Matching Service for Clutch App
// This service handles intelligent matching between users who need items and those who have them

export class AIMatchingService {
  constructor() {
    this.matchCache = new Map();
    this.userProfiles = new Map();
    this.activeRequests = new Map();
    this.availableItems = new Map();
  }

  // Calculate distance between two coordinates using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Calculate profile compatibility score
  calculateProfileScore(requester, provider) {
    let score = 0;
    
    // University compatibility (same university = higher score)
    if (requester.university === provider.university) {
      score += 30;
    }
    
    // Academic year compatibility (similar year = higher score)
    const yearDiff = Math.abs(requester.academicYear - provider.academicYear);
    if (yearDiff === 0) score += 20;
    else if (yearDiff === 1) score += 15;
    else if (yearDiff === 2) score += 10;
    
    // Help history (more helpful users get higher scores)
    score += Math.min(provider.helpedCount * 2, 20);
    
    // Response time (faster responders get higher scores)
    if (provider.avgResponseTime < 30) score += 15; // minutes
    else if (provider.avgResponseTime < 60) score += 10;
    else if (provider.avgResponseTime < 120) score += 5;
    
    // Verification status
    if (provider.isVerified) score += 10;
    
    // Mutual connections (if any)
    const mutualConnections = this.getMutualConnections(requester.id, provider.id);
    score += mutualConnections * 5;
    
    return Math.min(score, 100); // Cap at 100
  }

  // Calculate urgency score for requests
  calculateUrgencyScore(request) {
    let urgencyScore = 0;
    
    // Time since request was made
    const hoursSinceRequest = (Date.now() - request.timestamp) / (1000 * 60 * 60);
    if (hoursSinceRequest < 1) urgencyScore += 30;
    else if (hoursSinceRequest < 6) urgencyScore += 20;
    else if (hoursSinceRequest < 24) urgencyScore += 10;
    
    // Item type urgency
    const urgentItems = ['Period Products', 'Medication'];
    if (urgentItems.includes(request.itemType)) {
      urgencyScore += 25;
    }
    
    // User's previous request frequency (more frequent = more urgent)
    const requestFrequency = this.getUserRequestFrequency(request.userId);
    if (requestFrequency > 3) urgencyScore += 15;
    
    // Time of day (evening/night requests might be more urgent)
    const hour = new Date().getHours();
    if (hour >= 18 || hour <= 6) urgencyScore += 10;
    
    return Math.min(urgencyScore, 100);
  }

  // Main matching algorithm
  findMatches(request) {
    try {
      console.log('AI Matching Service - Finding matches for:', request);
      
      const matches = [];
      const requesterLocation = request.location;
      const requesterProfile = this.userProfiles.get(request.userId);
      
      console.log('Requester location:', requesterLocation);
      console.log('Requester profile:', requesterProfile);
      
      if (!requesterLocation) {
        console.error('No requester location provided');
        return [];
      }
      
      if (!requesterProfile) {
        console.error('No requester profile found for userId:', request.userId);
        // Create a default profile for testing
        const defaultProfile = {
          id: request.userId,
          name: 'Test User',
          university: 'Test University',
          academicYear: 2,
          helpedCount: 5,
          avgResponseTime: 30,
          isVerified: true
        };
        this.userProfiles.set(request.userId, defaultProfile);
      }
      
      // Get all available items of the requested type
      const availableItems = Array.from(this.availableItems.values())
        .filter(item => 
          item.itemType === request.itemType && 
          item.isAvailable &&
          item.userId !== request.userId // Don't match with self
        );
      
      console.log('Available items for', request.itemType, ':', availableItems.length);
      
      for (const item of availableItems) {
        const providerProfile = this.userProfiles.get(item.userId);
        const providerLocation = providerProfile?.location;
        
        if (!providerProfile || !providerLocation) {
          console.warn('Skipping item - no provider profile or location:', item.id);
          continue;
        }
        
        // Calculate distance
        const distance = this.calculateDistance(
          requesterLocation.lat, requesterLocation.lng,
          providerLocation.lat, providerLocation.lng
        );
        
        console.log(`Distance to ${providerProfile.name}: ${distance.toFixed(2)}km`);
        
        // Skip if too far (configurable distance limit)
        if (distance > 50) {
          console.log(`Skipping ${providerProfile.name} - too far (${distance.toFixed(2)}km)`);
          continue;
        }
        
        // Calculate compatibility score
        const compatibilityScore = this.calculateProfileScore(requesterProfile || this.userProfiles.get(request.userId), providerProfile);
        
        // Calculate urgency score
        const urgencyScore = this.calculateUrgencyScore(request);
        
        // Calculate final match score
        const distanceScore = Math.max(0, 50 - (distance * 5)); // Distance penalty
        const finalScore = (compatibilityScore * 0.4) + (distanceScore * 0.3) + (urgencyScore * 0.3);
        
        const match = {
          itemId: item.id,
          providerId: item.userId,
          providerProfile: providerProfile,
          item: item,
          distance: distance,
          compatibilityScore: compatibilityScore,
          urgencyScore: urgencyScore,
          finalScore: finalScore,
          estimatedMeetTime: this.calculateEstimatedMeetTime(distance, providerProfile.avgResponseTime)
        };
        
        console.log('Created match:', match);
        matches.push(match);
      }
      
      // Sort by final score (highest first)
      const sortedMatches = matches.sort((a, b) => b.finalScore - a.finalScore);
      console.log('Sorted matches:', sortedMatches.length);
      
      return sortedMatches;
    } catch (error) {
      console.error('Error in findMatches:', error);
      return [];
    }
  }

  // Calculate estimated time to meet
  calculateEstimatedMeetTime(distance, avgResponseTime) {
    const responseTimeMinutes = avgResponseTime || 30;
    const travelTimeMinutes = distance * 2; // Assume 30km/h average speed
    return responseTimeMinutes + travelTimeMinutes;
  }

  // Get mutual connections between two users
  getMutualConnections(userId1, userId2) {
    // This would integrate with a social graph in a real implementation
    // For now, return a mock value
    return Math.floor(Math.random() * 3);
  }

  // Get user's request frequency
  getUserRequestFrequency(userId) {
    const userRequests = Array.from(this.activeRequests.values())
      .filter(req => req.userId === userId);
    return userRequests.length;
  }

  // Add a new request
  addRequest(request) {
    this.activeRequests.set(request.id, {
      ...request,
      timestamp: Date.now(),
      status: 'active'
    });
    
    // Trigger matching
    return this.findMatches(request);
  }

  // Add available item
  addAvailableItem(item) {
    this.availableItems.set(item.id, {
      ...item,
      timestamp: Date.now(),
      isAvailable: true
    });
    console.log(`Added available item ${item.id}: ${item.itemType} by ${item.userId}`);
  }

  // Update user profile
  updateUserProfile(userId, profileData) {
    this.userProfiles.set(userId, {
      ...profileData,
      lastUpdated: Date.now()
    });
    console.log(`Updated profile for ${userId}:`, profileData.name);
  }

  // Get match recommendations for a user
  getMatchRecommendations(userId) {
    const userRequests = Array.from(this.activeRequests.values())
      .filter(req => req.userId === userId && req.status === 'active');
    
    const allRecommendations = [];
    
    for (const request of userRequests) {
      const matches = this.findMatches(request);
      allRecommendations.push(...matches.slice(0, 3)); // Top 3 matches per request
    }
    
    // Sort all recommendations by score
    return allRecommendations.sort((a, b) => b.finalScore - a.finalScore);
  }

  // Accept a match
  acceptMatch(matchId, userId) {
    // In a real implementation, this would:
    // 1. Create a connection between users
    // 2. Send notifications
    // 3. Update match status
    // 4. Remove from available items
    
    console.log(`Match ${matchId} accepted by user ${userId}`);
    return { success: true, matchId, userId };
  }

  // Reject a match
  rejectMatch(matchId, userId) {
    // In a real implementation, this would:
    // 1. Update match status
    // 2. Possibly adjust algorithm weights
    
    console.log(`Match ${matchId} rejected by user ${userId}`);
    return { success: true, matchId, userId };
  }
}

// Export singleton instance
export const aiMatchingService = new AIMatchingService();
