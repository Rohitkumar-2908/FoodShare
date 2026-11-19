"use strict";
const fs = require("fs");
const path = require("path");

// Minimal .env loader. Real environment variables always win.
function loadEnvFile(file) {
  let text;
  try { text = fs.readFileSync(file, "utf8"); } catch (e) { return false; /* no .env file */ }
  text.split(/\r?\n/).forEach((l) => {
    if (l.trim().startsWith("#")) return;
    const m = l.match(/^\s*(?:export\s+)?([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  });
  return true;
}
// Secrets come from NAME or from the file named by NAME_FILE (Docker/Kubernetes secrets).
function secret(name) {
  const f = process.env[name + "_FILE"];
  if (f) return fs.readFileSync(f, "utf8").trim();
  return process.env[name] || "";
}
const num = (k, d) => {
  const v = process.env[k];
  if (v === undefined || v === "") return d;
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};
function getConfig() {
  return {
    env: process.env.NODE_ENV || "development",
    port: num("PORT", 3000),
    host: process.env.HOST || "127.0.0.1",
    trustProxy: process.env.TRUST_PROXY === "1",
    publicDir: path.join(__dirname, "..", "public"),
    dataDir: process.env.DATA_DIR || path.join(__dirname, "..", "data"),
    mongoUri: secret("MONGODB_URI"),
    mongoDb: process.env.MONGODB_DB || "foodshare",
    mongoTimeoutMs: num("MONGO_TIMEOUT_MS", 4000),
    mongoMaxPool: num("MONGO_MAX_POOL", 20),
    mongoMinPool: num("MONGO_MIN_POOL", 2),
    mongoReadPref: process.env.MONGO_READ_PREFERENCE || "primary",
    breakerFailures: num("BREAKER_FAILURES", 3),
    breakerCooldownMs: num("BREAKER_COOLDOWN_MS", 10000),
    rateCapacity: num("RATE_CAPACITY", 60),
    rateRefillPerSec: num("RATE_REFILL_PER_SEC", 1),
    writeCapacity: num("WRITE_CAPACITY", 10),
    writeRefillPerSec: num("WRITE_REFILL_PER_SEC", 0.5),
    maxBody: num("MAX_BODY_BYTES", 5 * 1024 * 1024),
    requestTimeoutMs: num("REQUEST_TIMEOUT_MS", 15000),
    backupKeep: num("BACKUP_KEEP", 14),
    backupIntervalMin: num("BACKUP_INTERVAL_MIN", 60),
    auditTtlDays: num("AUDIT_TTL_DAYS", 90),
    corsOrigin: process.env.CORS_ORIGIN || "",
    metricsToken: secret("METRICS_TOKEN"),
    webhookUrl: process.env.WEBHOOK_URL || "",
    // Comma-separated: first signs new deliveries, the rest are previous secrets (rotation).
    webhookSecrets: secret("WEBHOOK_SECRET").split(",").map((s) => s.trim()).filter(Boolean),
    webhookAllowPrivate: process.env.WEBHOOK_ALLOW_PRIVATE === "1",
    flags: new Set((process.env.FEATURES || "webhooks,metrics").split(",").map((s) => s.trim()).filter(Boolean)),
    shutdownMs: num("SHUTDOWN_TIMEOUT_MS", 10000),
    adminEmail: (process.env.ADMIN_EMAIL || "").toLowerCase(),
    adminPassword: secret("ADMIN_PASSWORD"),
    scryptN: num("SCRYPT_N", 16384),
    lockoutAttempts: num("LOCKOUT_ATTEMPTS", 5),
    lockoutIpAttempts: num("LOCKOUT_IP_ATTEMPTS", 30),
    lockoutMs: num("LOCKOUT_MS", 15 * 60000),
    sessionIdleMin: num("SESSION_IDLE_MIN", 30),
    sessionAbsHours: num("SESSION_ABS_HOURS", 8),
    authCapacity: num("AUTH_CAPACITY", 10),
    authRefillPerSec: num("AUTH_REFILL_PER_SEC", 0.2),
  };
}
module.exports = { getConfig, loadEnvFile, secret };
