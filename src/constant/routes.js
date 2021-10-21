export default {
  home: {
    route: '/',
    exact: true,
    protected: false,
  },
  signIn: {
    route: '/signin',
    exact: true,
    protected: false,
  },
  signUp: {
    route: '/signup',
    exact: true,
    protected: false,
  },
  notes: {
    route: '/notes',
    exact: true,
    protected: true,
  },
  create: {
    route: '/create',
    exact: true,
    protected: true,
  },
  trash: {
    route: '/trash',
    exact: true,
    protected: true,
  },
  edit: {
    route: '/edit/:noteId',
    exact: true,
    protected: true,
  },
};
