import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/slices/orderSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
