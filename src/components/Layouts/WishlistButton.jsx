import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { fetchWishlistStatus, addToWishlist, removeFromWishlist } from '../../redux/actions/wishlistActions';

const WishlistButton = ({ productId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistStatus = useSelector(state => state.wishlistStatus);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchWishlistStatus(productId));
        }
    }, [dispatch, productId, isLoggedIn]);

    const handleWishlistClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else if (wishlistStatus) {
            dispatch(removeFromWishlist(productId));
        } else {
            dispatch(addToWishlist(productId));
        }
    };

    return (
        <>
            {wishlistStatus ? (
                <AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5"
                             onClick={handleWishlistClick}
                             color="red"
                             title="Remove from wishlist"
                />
            ) : (
                <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5"
                                onClick={handleWishlistClick}
                                color="#333"
                                title="Add to wishlist"
                />
            )}
        </>
    );
};

export default WishlistButton;