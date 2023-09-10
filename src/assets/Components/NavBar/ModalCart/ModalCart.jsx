import { AnimatePresence } from 'framer-motion';
import { CardsContainer, CartBuy, CartBuyDesc, CartContainer, CartHeader, Separator } from './ModalCart.Styles';
import ModalCartCard from './ModalCartCard';
import { TbTrashXFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../../Redux/cart/cartSlice';
import { Button, TrashButton } from '../../..//Components/UX/Button/Button';
import { PrecioDolar } from '../../../../Utils/constantes'
import { formatPrice } from '../../../../Utils/FormatPrice'
import { toggleModalHidden, changeModal } from '../../../../Redux/modal/modalSlice';

const ModalCart = ({ hiddenCart, setHiddenCart }) => {

    const modal = useSelector(state => state.modal.hiddenModal)
    const {cartItems} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const ShowModal = (title, color) => {
        if(modal){
        dispatch(toggleModalHidden())
        dispatch(changeModal({title, color}))
        }
    }

    const totalPrice = cartItems.reduce((acc, item) => acc += (item.price * item.quantity), 0)

    return (
        <>
        <AnimatePresence >
            {!hiddenCart && (
                <CartContainer
                    initial={{ translateX: 600 }}
                    animate={{ translateX: 0 }}
                    exit={{ translateX: 600 }}
                    transition={{ type: "spring", damping: 27 }}
                    key="cart-modal"
                    >
                    <CartHeader>
                    <h1>Tu Compra</h1>
                    <TrashButton 
                        disabled={!cartItems.length} 
                        onClick={()=>dispatch(clearCart()) && ShowModal('Carrito Vacio', 'var(--Rojo)')}
                    ><TbTrashXFilled/></TrashButton>
                </CartHeader>
                
            <CardsContainer>
                {
                    cartItems.length === 0 ? <h4>No hay productos en el carrito</h4> :
                    cartItems.map((item) => {
                        return <ModalCartCard key={item.id} {...item}/>
                    })
                }
            </CardsContainer>
                
            <CartBuy>
                <Separator />
                <CartBuyDesc>
                    <p>Total:</p>
                    <h2>{formatPrice(totalPrice*PrecioDolar)}</h2>
                </CartBuyDesc>
                <Button 
                    disabled={!cartItems.length}
                    onClick={()=>dispatch(clearCart())}
                >Comprar</Button>
            </CartBuy>
        </CartContainer>
        )}
        </AnimatePresence>
        </>
    )
}

export default ModalCart;