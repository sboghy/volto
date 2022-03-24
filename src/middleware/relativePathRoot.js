/**
 * A middleware that prefixes all paths with the relative root path.
 * To use the relative paths, set the RAZZLE_PREFIX_PATH env var.
 */

import config from '@plone/volto/registry';

const relativePathRoot = (history) => ({ dispatch, getState }) => (next) => (
  action,
) => {
  if (typeof action === 'function') {
    return next(action);
  }

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload.location;
      const { prefixPath } = config.settings;
      if (!prefixPath) {
        break;
      }

      if (!pathname.startsWith(`/${prefixPath}`)) {
        const newPathname = `/${prefixPath}${pathname === '/' ? '' : pathname}`;
        action.payload.location.pathname = newPathname;
        history.push(newPathname);
      }
      return next(action);
    default:
      return next(action);
  }

  return next(action);
};

export default relativePathRoot;