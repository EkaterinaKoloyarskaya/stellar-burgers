import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { getUser, logout } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const App = (): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(logout());
    }
    dispatch(getIngredients());
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const matchFeedOrder = useMatch('/feed/:number');
  const matchProfileOrder = useMatch('/profile/orders/:number');
  const orderNumber =
    matchFeedOrder?.params.number ?? matchProfileOrder?.params.number;
  const backgroundLocation = location.state?.background;

  const handleModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <h1
                className={`${styles.detailHeader} text text_type_main-large mb-5`}
              >
                Детали ингредиента
              </h1>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={
                  <span className='text text_type_digits-default'>{`#${orderNumber}`}</span>
                }
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={
                  <span className='text text_type_digits-default'>{`#${orderNumber}`}</span>
                }
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
