import { useGlobalContext } from "../context";

const Modal = () => {
    return ( 
        <aside className="modal-overlay">
            <div className="modal-container">
                <h1>modal container</h1>
            </div>
        </aside>
    );
}
 
export default Modal;