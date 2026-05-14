import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

export type UserRecord = {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

declare global {
  // eslint-disable-next-line no-var
  var __nestcaseUsers: Map<string, UserRecord> | undefined;
}

function memoryUsers(): Map<string, UserRecord> {
  if (!globalThis.__nestcaseUsers) globalThis.__nestcaseUsers = new Map();
  return globalThis.__nestcaseUsers;
}

async function readDisk(): Promise<Record<string, UserRecord>> {
  try {
    const raw = await readFile(USERS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, UserRecord>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function writeDisk(data: Record<string, UserRecord>): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function findUser(email: string): Promise<UserRecord | null> {
  const key = email.toLowerCase().trim();
  const mem = memoryUsers().get(key);
  if (mem) return mem;

  const disk = await readDisk();
  const u = disk[key];
  if (u) memoryUsers().set(key, u);
  return u ?? null;
}

export async function createUserRecord(
  email: string,
  password: string,
  name: string
): Promise<{ ok: true } | { ok: false; code: 'EMAIL_TAKEN' }> {
  const key = email.toLowerCase().trim();
  if (memoryUsers().has(key) || (await readDisk())[key]) {
    return { ok: false, code: 'EMAIL_TAKEN' };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const rec: UserRecord = {
    email: key,
    passwordHash,
    name: name.trim() || (key.split('@')[0] ?? 'Client'),
    createdAt: new Date().toISOString(),
  };

  memoryUsers().set(key, rec);

  try {
    const disk = await readDisk();
    disk[key] = rec;
    await writeDisk(disk);
  } catch {
    /* Sur Vercel le FS est souvent read-only : les comptes restent en mémoire d’instance. */
  }

  return { ok: true };
}

export async function verifyUserPassword(record: UserRecord, password: string): Promise<boolean> {
  return bcrypt.compare(password, record.passwordHash);
}
