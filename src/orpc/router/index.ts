import { os } from '@orpc/server'
import * as s3Routes from "./s3";
import * as stravaRoutes from "./strava";

function createPrefixedRouter<T extends Record<string, any>>(prefix: `/${string}`, routes: T) {
  return os.prefix(prefix).router(routes);
}

export default {
  s3 : createPrefixedRouter('/s3',s3Routes),
  strava : createPrefixedRouter('/strava',stravaRoutes)
}
