import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { Strategy } from 'passport-google-oauth20';
import { join } from 'path';
import { router } from './routers/router';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    keys: [`${process.env.COOKIE_KEY_1}`, `${process.env.COOKIE_KEY_2}`],
  }),
);

app.use((request, response, next) => {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

passport.use(
  new Strategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: '/v1/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  const { id } = user as { id: string };
  done(null, id);
});

passport.deserializeUser((id: string, done) => {
  done(null, id);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:8000',
  }),
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(join(__dirname, '..', '..', '..', '..', 'public')));
app.use(router);
app.get('/*', (req, resp) => {
  resp.sendFile(
    join(__dirname, '..', '..', '..', '..', 'public', 'index.html'),
  );
});

export { app };
