import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import { User } from '../interfaces/user.interface';
import userModel from '../models/user.model';

class GoogleAuth {

    passportConf() {
        const GoogleStrategy = passportGoogle.Strategy;
        const clientId = process.env.GOOGLE_CLIENT_ID as string;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
        passport.serializeUser((user, done) => {
            done(null, user.id);
        })
        passport.deserializeUser(async(id: string, done) => {
            const user: User | null = await userModel.findById(id);
            done(null, { id: user?._id! });
        })

        passport.use('sign-in-google', new GoogleStrategy({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: 'http://localhost:4000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ googleId: profile.id });
                if(user) {
                    return done(null, user);
                } else {
                    const newUser = await userModel.create({
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        googleId: profile.id,
                    });
                    done(null, newUser);
                }
            } catch(error) {
                return done(null, false);
            }
        }
        ))

    }
}

export default new GoogleAuth()