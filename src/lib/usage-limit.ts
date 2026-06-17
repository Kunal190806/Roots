
import { doc, getDoc, setDoc, updateDoc, increment, Firestore } from 'firebase/firestore';

const DAILY_LIMIT = 5;

/**
 * Checks if a user has exceeded their daily AI usage limit.
 * If the last reset was on a previous day, it resets the counter.
 */
export async function checkUsageLimit(db: Firestore, userId: string): Promise<{ allowed: boolean; remaining: number }> {
  const usageRef = doc(db, 'usage', userId);
  const usageDoc = await getDoc(usageRef);
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (!usageDoc.exists()) {
    // Initialize for a new user
    await setDoc(usageRef, {
      count: 0,
      lastReset: todayStr
    });
    return { allowed: true, remaining: DAILY_LIMIT };
  }

  const data = usageDoc.data();
  const lastResetStr = data.lastReset;

  if (lastResetStr !== todayStr) {
    // Reset for a new day
    await updateDoc(usageRef, {
      count: 0,
      lastReset: todayStr
    });
    return { allowed: true, remaining: DAILY_LIMIT };
  }

  const currentCount = data.count || 0;
  return {
    allowed: currentCount < DAILY_LIMIT,
    remaining: Math.max(0, DAILY_LIMIT - currentCount)
  };
}

/**
 * Increments the AI usage count for a user.
 */
export async function incrementUsage(db: Firestore, userId: string) {
  const usageRef = doc(db, 'usage', userId);
  await updateDoc(usageRef, {
    count: increment(1)
  });
}
