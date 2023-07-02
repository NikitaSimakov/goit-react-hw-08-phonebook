import { Registration } from '../pages/Registration/Registration';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import Layout from './Outlet/Outlet';
import Contacts from '../pages/Contacts/Contacts';
import NotFound from '../pages/NotFound/NotFound';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { PublicRoute } from './PublicRoute/PublicRoute';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        fontSize: 30,
        color: '#010101',
        padding: 30,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </div>
  );
};

export default App;
