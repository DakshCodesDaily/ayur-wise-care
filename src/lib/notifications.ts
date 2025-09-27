export type NotificationType = "pre-therapy" | "post-therapy" | "reminder" | "tip";

export type TherapyNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  therapy: string;
  timing: "24h-before" | "2h-before" | "immediately-after" | "24h-after" | "weekly";
  priority: "high" | "medium" | "low";
  isRead: boolean;
  createdAt: string;
  scheduledFor?: string;
};

export type TherapyTip = {
  id: string;
  category: "diet" | "lifestyle" | "preparation" | "recovery" | "general";
  title: string;
  description: string;
  therapy: string;
  timing: "before" | "during" | "after";
  importance: "critical" | "important" | "helpful";
};

// Pre-therapy notifications and tips
export const preTherapyNotifications: TherapyNotification[] = [
  {
    id: "pre-1",
    type: "pre-therapy",
    title: "Diet Preparation",
    message: "Start light, warm meals 24 hours before your session. Avoid cold, processed foods.",
    therapy: "Abhyanga",
    timing: "24h-before",
    priority: "high",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "pre-2",
    type: "pre-therapy",
    title: "Oil Application",
    message: "Apply warm sesame oil to your body 2 hours before Abhyanga for better absorption.",
    therapy: "Abhyanga",
    timing: "2h-before",
    priority: "medium",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "pre-3",
    type: "pre-therapy",
    title: "Empty Stomach",
    message: "Ensure you have an empty stomach for Shirodhara. Last meal should be 4 hours before.",
    therapy: "Shirodhara",
    timing: "2h-before",
    priority: "high",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "pre-4",
    type: "pre-therapy",
    title: "Mental Preparation",
    message: "Practice deep breathing and meditation before your Panchakarma session.",
    therapy: "General",
    timing: "2h-before",
    priority: "medium",
    isRead: false,
    createdAt: new Date().toISOString(),
  }
];

// Post-therapy notifications and tips
export const postTherapyNotifications: TherapyNotification[] = [
  {
    id: "post-1",
    type: "post-therapy",
    title: "Rest Period",
    message: "Rest for at least 2 hours after your session. Avoid strenuous activities.",
    therapy: "Abhyanga",
    timing: "immediately-after",
    priority: "high",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-2",
    type: "post-therapy",
    title: "Diet After Session",
    message: "Consume warm, light meals. Avoid cold drinks and processed foods for 24 hours.",
    therapy: "General",
    timing: "24h-after",
    priority: "high",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-3",
    type: "post-therapy",
    title: "Hydration",
    message: "Drink warm water with ginger and honey to aid digestion and detoxification.",
    therapy: "General",
    timing: "immediately-after",
    priority: "medium",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-4",
    type: "post-therapy",
    title: "Follow-up Care",
    message: "Monitor your body's response. Report any unusual symptoms to your practitioner.",
    therapy: "General",
    timing: "24h-after",
    priority: "high",
    isRead: false,
    createdAt: new Date().toISOString(),
  }
];

// Therapy tips database
export const therapyTips: TherapyTip[] = [
  {
    id: "tip-1",
    category: "diet",
    title: "Pre-Therapy Diet",
    description: "Eat light, warm, easily digestible foods. Include rice, mung dal, and steamed vegetables.",
    therapy: "Abhyanga",
    timing: "before",
    importance: "critical"
  },
  {
    id: "tip-2",
    category: "lifestyle",
    title: "Sleep Schedule",
    description: "Maintain regular sleep schedule. Go to bed by 10 PM and wake up by 6 AM.",
    therapy: "General",
    timing: "before",
    importance: "important"
  },
  {
    id: "tip-3",
    category: "preparation",
    title: "Oil Selection",
    description: "Use warm sesame oil for Vata, coconut oil for Pitta, and mustard oil for Kapha.",
    therapy: "Abhyanga",
    timing: "before",
    importance: "critical"
  },
  {
    id: "tip-4",
    category: "recovery",
    title: "Post-Therapy Rest",
    description: "Avoid exposure to cold wind and air conditioning for 24 hours after therapy.",
    therapy: "Abhyanga",
    timing: "after",
    importance: "critical"
  },
  {
    id: "tip-5",
    category: "diet",
    title: "Recovery Diet",
    description: "Consume warm, cooked foods. Avoid raw vegetables and cold beverages.",
    therapy: "General",
    timing: "after",
    importance: "important"
  },
  {
    id: "tip-6",
    category: "lifestyle",
    title: "Mental Peace",
    description: "Practice meditation and avoid stressful activities during therapy period.",
    therapy: "General",
    timing: "during",
    importance: "important"
  }
];

// Notification management functions
const NOTIFICATIONS_KEY = "ayursutra.notifications";

export function loadNotifications(): TherapyNotification[] {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveNotifications(notifications: TherapyNotification[]) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function addNotification(notification: TherapyNotification) {
  const notifications = loadNotifications();
  notifications.push(notification);
  saveNotifications(notifications);
}

export function markNotificationAsRead(id: string) {
  const notifications = loadNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, isRead: true } : n
  );
  saveNotifications(updated);
}

export function getNotificationsForTherapy(therapy: string): TherapyNotification[] {
  const notifications = loadNotifications();
  return notifications.filter(n => n.therapy === therapy || n.therapy === "General");
}

export function getUnreadNotifications(): TherapyNotification[] {
  const notifications = loadNotifications();
  return notifications.filter(n => !n.isRead);
}

// Generate notifications based on therapy type and timing
export function generateTherapyNotifications(therapy: string, sessionDate: string): TherapyNotification[] {
  const notifications: TherapyNotification[] = [];
  const sessionDateTime = new Date(sessionDate);
  
  // Pre-therapy notifications
  const preNotifications = preTherapyNotifications.filter(n => 
    n.therapy === therapy || n.therapy === "General"
  );
  
  preNotifications.forEach(notification => {
    const scheduledTime = new Date(sessionDateTime);
    
    if (notification.timing === "24h-before") {
      scheduledTime.setHours(scheduledTime.getHours() - 24);
    } else if (notification.timing === "2h-before") {
      scheduledTime.setHours(scheduledTime.getHours() - 2);
    }
    
    notifications.push({
      ...notification,
      id: `${notification.id}-${Date.now()}`,
      scheduledFor: scheduledTime.toISOString(),
      createdAt: new Date().toISOString(),
    });
  });
  
  // Post-therapy notifications
  const postNotifications = postTherapyNotifications.filter(n => 
    n.therapy === therapy || n.therapy === "General"
  );
  
  postNotifications.forEach(notification => {
    const scheduledTime = new Date(sessionDateTime);
    
    if (notification.timing === "immediately-after") {
      scheduledTime.setHours(scheduledTime.getHours() + 1);
    } else if (notification.timing === "24h-after") {
      scheduledTime.setHours(scheduledTime.getHours() + 24);
    }
    
    notifications.push({
      ...notification,
      id: `${notification.id}-${Date.now()}`,
      scheduledFor: scheduledTime.toISOString(),
      createdAt: new Date().toISOString(),
    });
  });
  
  return notifications;
}

// Get tips for specific therapy
export function getTipsForTherapy(therapy: string): TherapyTip[] {
  return therapyTips.filter(tip => tip.therapy === therapy || tip.therapy === "General");
}

// Get tips by category
export function getTipsByCategory(category: string): TherapyTip[] {
  return therapyTips.filter(tip => tip.category === category);
}
