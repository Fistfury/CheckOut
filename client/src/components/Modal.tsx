interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

export const Modal = ({show, onClose, children}: ModalProps) => {
if (!show) return null;
const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
        onClose();
    }
};

return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
     onClick={handleBackdropClick}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg m-4 relative max-w-md w-full">
        <button onClick={onClose} className="absolute top-0 right-0 p-4 text-2xl text-beard-dark hover:text-beard-orange">&times;</button>
        {children}
      </div>
    </div>
    </>
)


}