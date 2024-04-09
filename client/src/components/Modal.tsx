interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

export const Modal = ({show, onClose, children}: ModalProps) => {
if (!show) return null;
const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Ensure that the click is on the backdrop itself and not on any child elements
    if (event.currentTarget === event.target) {
        onClose();
    }
};

return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
     onClick={handleBackdropClick}>
      <div className="bg-white p-6 rounded-lg shadow-md m-4 relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-4 text-2xl">&times;</button>
        {children}
      </div>
    </div>
    </>
)


}