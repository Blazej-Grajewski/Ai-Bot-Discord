// src/handlers/rateLimiter.js
const cooldowns = new Map();
const COOLDOWN_SECONDS = 10;

// clean up expired cooldowns every 60 seconds
setInterval(() => {
  const now = Date.now();

  for (const [userId, time] of cooldowns.entries()) {
    if ((now - time) / 1000 > COOLDOWN_SECONDS) {
      cooldowns.delete(userId);
    }
  }
}, 60_000);

function isRateLimited(userId) {
  const now = Date.now();

  // 1. check if userId is in the map
  if (cooldowns.has(userId)) {
    const lastTime = cooldowns.get(userId);

    // 2. check how much time passed
    const diffSeconds = (now - lastTime) / 1000;

    // 3. if not enough time — return seconds left
    if (diffSeconds < COOLDOWN_SECONDS) {
      const timeLeft = Math.ceil(COOLDOWN_SECONDS - diffSeconds);
      return timeLeft;
    }
  }

  // 4. enough time passed OR first time — update map
  cooldowns.set(userId, now);
  return false; // not rate limited
}

module.exports = { isRateLimited };