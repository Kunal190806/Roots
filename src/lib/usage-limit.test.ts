import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkUsageLimit, incrementUsage } from './usage-limit';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({ path: 'usage/test-user' }),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  increment: vi.fn((val) => ({ type: 'increment', value: val })),
}));

describe('usage-limit business logic', () => {
  const mockDb: any = {};
  const userId = 'test-user';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes new user usage if record does not exist', async () => {
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => false,
      data: () => null,
    } as any);

    const result = await checkUsageLimit(mockDb, userId);

    expect(doc).toHaveBeenCalledWith(mockDb, 'usage', userId);
    expect(setDoc).toHaveBeenCalled();
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(5);
  });

  it('resets usage count on a new day', async () => {
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        count: 4,
        lastReset: '2000-01-01', // old day
      }),
    } as any);

    const result = await checkUsageLimit(mockDb, userId);

    expect(updateDoc).toHaveBeenCalled();
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(5);
  });

  it('enforces limit on the same day', async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    vi.mocked(getDoc).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        count: 5,
        lastReset: todayStr,
      }),
    } as any);

    const result = await checkUsageLimit(mockDb, userId);

    expect(updateDoc).not.toHaveBeenCalled();
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('increments usage', async () => {
    await incrementUsage(mockDb, userId);
    expect(updateDoc).toHaveBeenCalled();
  });
});
