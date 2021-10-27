export default {
  home: {
    route: '/',
    exact: true,
  },
  signIn: {
    route: '/signin',
    exact: true,
  },
  signUp: {
    route: '/signup',
    exact: true,
  },
  notes: {
    route: '/notes',
    protected: true,
    exact: true,
  },
  create: {
    route: '/create',
    protected: true,
    exact: true,
  },
  trash: {
    route: '/trash',
    exact: true,
    protected: true,
  },
  edit: {
    route: '/edit/:noteId',
    protected: true,
    exact: true,
  },
};
