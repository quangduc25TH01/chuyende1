import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { omit } from 'lodash';

import '../config/passportConfig';
import { userRepository } from '../repositories/userRepository';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
    }

    const userRole = role ? role : 'STAFF';

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });
    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};

export const signIn = (req: Request, res: Response, next: any) => {
  return passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err)
      return res
        .status(500)
        .json({ message: 'Error during authentication', error: err });
    if (!user) return res.status(401).json(info);

    return req.logIn(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Error during login', error: err });
      return res.json({
        user: omit(user, 'password'),
      });
    });
  })(req, res, next);
};

export const signOut = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ message: 'Error during logout', error: err });
    return res.json({ message: 'Logout successful' });
  });
};

export const Me = (req: Request, res: Response) => {
  res.json({ user: omit(req.user, 'password') });
};
