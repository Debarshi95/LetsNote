export default {
  home: {
    route: '/',
    exact: true,
  },
  signin: {
    route: '/signin',
    exact: true,
  },
  signup: {
    route: '/signup',
    exact: true,
  },
  notes: {
    route: '/notes',
    isProtected: true,
    exact: true,
  },
  create: {
    route: '/create',
    isProtected: true,
    exact: true,
  },
  trash: {
    route: '/trash',
    exact: true,
    isProtected: true,
  },
  edit: {
    route: '/edit/:noteId',
    isProtected: true,
    exact: true,
  },
};
