import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const items = useSelector((state) => state.cart.items)
  let itemCount = 0;
  items.map(item => itemCount += item.quantity);

  const dispatch = useDispatch();

  const onShowCartHandler = () => {
    dispatch(cartActions.toggleVisiblity());
  };

  return (
    <button onClick={onShowCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
