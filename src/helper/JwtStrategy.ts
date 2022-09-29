import passport from "passport";
import passportJwt from 'passport-jwt'

const JWTstrategy = passportJwt.Strategy;
const extractJWT = passportJwt.ExtractJwt;

class JwtStrategy {
    verifyJwt() {
        passport.use(new JWTstrategy({
            secretOrKey: process.env.JWT_SECRET as string,
            jwtFromRequest: extractJWT.fromHeader('x-token')
        }, (token, done) => {
            try {
                console.log(token.user);
                return done(null, token);
            } catch(error) {
                done(error);
            }
        }))
    }
}

export default new JwtStrategy();