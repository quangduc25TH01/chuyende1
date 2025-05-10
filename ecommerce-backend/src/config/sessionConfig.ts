import config from '.';

export const sessionConfig = {
  secret: config.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  },
};
