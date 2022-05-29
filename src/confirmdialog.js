// import Modal from "@mui/material/Modal";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export const ConfirmDialog = ({
  handleClose,
  openDialog,
  restaurantName = "tuntematon",
  setActiveVote
}) => {
  const handleSuccess = () => {
    setActiveVote(restaurantName);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <DialogTitle>Äänestä ravintolaa?</DialogTitle>
      <p style={{ textAlign: "center", fontSize: "85%" }}>{restaurantName}</p>
      <Button color="success" onclick={handleSuccess}>
        Kyllä
      </Button>
    </Dialog>
  );
};
