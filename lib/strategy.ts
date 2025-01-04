import OAuth1Strategy, { Strategy } from "passport-oauth1";

import { type StrategyOptions, type VerifyFunction } from "passport-oauth1";

import {
  DISCOGS_STRATEGY_NAME,
  DISCOGS_ACCESS_TOKEN_URL,
  DISCOGS_AUTH_URL,
  DISCOGS_REQUEST_TOKEN_URL,
  DISCOGS_SIG_METHOD,
  DISCOGS_PROFILE_URL,
} from "./constants.js";

/**
 * Strategy instance constructor
 *
 * The OAuth authentication strategy authenticates requests using the OAuth
 * protocol.
 *
 * OAuth provides a facility for delegated authentication, whereby users can
 * authenticate using a third-party service such as Twitter.  Delegating in this
 * manner involves a sequence of events, including redirecting the user to the
 * third-party service for authorization.  Once authorization has been obtained,
 * the user is redirected back to the application and a token can be used to
 * obtain credentials.
 *
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(token, tokenSecret, profile, cb) { ... }
 *
 * The verify callback is responsible for finding or creating the user, and
 * invoking `cb` with the following arguments:
 *
 *     done(err, user, info);
 *
 * `user` should be set to `false` to indicate an authentication failure.
 * Additional `info` can optionally be passed as a third argument, typically
 * used to display informational messages.  If an exception occured, `err`
 * should be set.
 *
 * Options:
 *
 *   - `requestTokenURL`       URL used to obtain an unauthorized request token
 *   - `accessTokenURL`        URL used to exchange a user-authorized request token for an access token
 *   - `userAuthorizationURL`  URL used to obtain user authorization
 *   - `consumerKey`           identifies client to service provider
 *   - `consumerSecret`        secret used to establish ownership of the consumer key
 *   - 'signatureMethod'       signature method used to sign the request (default: 'HMAC-SHA1')
 *   - `callbackURL`           URL to which the service provider will redirect the user after obtaining authorization
 *   - `passReqToCallback`     when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new DiscogsStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/example/callback'
 *       },
 *       function(token, tokenSecret, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 */

export class DiscogsStrategy extends Strategy {
  name: string;

  constructor(options: StrategyOptions, verify: VerifyFunction) {
    options.accessTokenURL ??= DISCOGS_ACCESS_TOKEN_URL;
    options.accessTokenURL ??= DISCOGS_ACCESS_TOKEN_URL;
    options.userAuthorizationURL ??= DISCOGS_AUTH_URL;
    options.signatureMethod ??= DISCOGS_SIG_METHOD;
    options.passReqToCallback ??= false;

    super(options, verify);

    this.name = DISCOGS_STRATEGY_NAME;
  }
}
