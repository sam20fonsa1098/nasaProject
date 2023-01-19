import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email'],
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
);

authRouter.get('/logout', (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/');
  });
});

export { authRouter };
