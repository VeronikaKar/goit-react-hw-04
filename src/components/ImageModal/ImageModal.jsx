import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "5px",
  },
  overlay: {
    backgroundColor: "rgba(40, 40, 40, 0.75)",
  },
};
    

Modal.setAppElement("#root");

export function ImageModal({ modalIsOpen, onRequestClose, modalImg, onClick }) {
  return (
    <div onClick={onClick}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <img src={modalImg.url} alt={modalImg.alt} />
      </Modal>
    </div>
  );
}