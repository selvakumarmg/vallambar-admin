import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import { useSelector } from 'react-redux';

export const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    requiresAuth: false,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    requiresAuth: true,
  },
  {
    path: '/login',
    component: Login,
    requiresAuth: false,
  }
];

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
             !isAuthenticated ? (
              <Navigate to="/login" />
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Routes>
  </BrowserRouter>
  );
};

function Main() {
  return (
    <PrivateRoute />
  );
}

export default Main;
