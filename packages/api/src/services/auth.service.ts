import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { generateToken } from '../utils/jwt';
import { AuthRequest, AuthResponse, User } from '../types/auth';

const DB_PATH = path.join(process.cwd(), 'users.json');

interface UserEntry extends User {
  password: string;
}

export class AuthService {
  private static loadUsers(): Map<string, UserEntry> {
    try {
      if (!fs.existsSync(DB_PATH)) {
        return new Map();
      }
      const data = fs.readFileSync(DB_PATH, 'utf8');
      const parsed = JSON.parse(data);
      return new Map(Object.entries(parsed));
    } catch (error) {
      console.error('Failed to load users:', error);
      return new Map();
    }
  }

  private static saveUsers(users: Map<string, UserEntry>) {
    try {
      const obj = Object.fromEntries(users);
      fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2), 'utf8');
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  static async initialize() {
    const users = this.loadUsers();
    const demoEmail = 'demo@archflow.io';

    if (!users.has(demoEmail)) {
      console.log('Seeding permanent demo account...');
      const hashedPassword = await bcrypt.hash('demo123', 10);
      users.set(demoEmail, {
        id: 'user_demo',
        email: demoEmail,
        name: 'Demo User',
        createdAt: new Date(),
        password: hashedPassword
      });
      this.saveUsers(users);
    }
  }

  static async register(data: AuthRequest): Promise<AuthResponse> {
    const { email, password, name } = data;
    const users = this.loadUsers();

    if (users.has(email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserEntry = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      createdAt: new Date(),
      password: hashedPassword
    };

    users.set(email, user);
    this.saveUsers(users);

    const token = generateToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  static async login(data: AuthRequest): Promise<AuthResponse> {
    const { email, password } = data;
    const users = this.loadUsers();

    const user = users.get(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  static async getUser(email: string): Promise<User | null> {
    const users = this.loadUsers();
    const user = users.get(email);
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Global initialization
AuthService.initialize();
