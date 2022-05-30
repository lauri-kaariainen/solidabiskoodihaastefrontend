import Button from "@mui/material/Button";
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
    <Dialog
      sx={{ textAlign: "center" }}
      onClose={handleClose}
      open={openDialog}
    >
      <DialogTitle>Äänestä ravintolaa?</DialogTitle>
      <p
        style={{
          fontSize: "85%",
          width: "80%",
          wrap: "ellipsis",
          margin: "auto"
        }}
      >
        {restaurantName}
      </p>
      <Button color="success" onclick={handleSuccess}>
        Kyllä
      </Button>
    </Dialog>
  );
};
