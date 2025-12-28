import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { AuthRequest, AuthResponse, User } from '../types/auth';

const users = new Map<string, User & { password: string }>();

export class AuthService {
  static async register(data: AuthRequest): Promise<AuthResponse> {
    const { email, password, name } = data;
    
    if (users.has(email)) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user: User & { password: string } = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      createdAt: new Date(),
      password: hashedPassword
    };
    
    users.set(email, user);
    
    const token = generateToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  static async login(data: AuthRequest): Promise<AuthResponse> {
    const { email, password } = data;
    
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
    const user = users.get(email);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
