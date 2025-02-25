import React from "react";
import PropTypes from "prop-types";

import { Button, Checkbox, Tooltip, Modal } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    padding: theme.spacing(3),
    fontFamily: theme.typography.fontFamily,
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    top: 15,
    right: 15,
    border: "2px solid #000",
    boxShadow: "10px 5px 5px black",
  },
  deleteBox: {
    display: "flex",
    justifyContent: "space-around",
  },
  deleteBtn: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
  },
}));

const MenuModal = (props) => {
  const classes = useStyles();
  const {
    stravaLogout,
    modalOpen,
    handleClose,
    handleDelete,
    setDisabledDelete,
    disabledDelete,
    currentUser,
  } = props;

  return (
    <div className={classes.root}>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ top: 0, right: 0 }} className={classes.modalPaper}>
          <section>
            <Button
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.github.com/sselfridge/mapper.bike"
              onClick={handleClose}
            >
              View source on GitHub
            </Button>
          </section>
          <hr />
          <section>
            <Button onClick={handleClose} href="mailto:Sam.Selfridge@gmail.com">
              Feedback?
            </Button>
          </section>
          <hr />
          {currentUser.athleteId !== null && (
            <section>
              <Button
                href=""
                onClick={() => {
                  stravaLogout();
                  handleClose();
                }}
              >
                Logout
              </Button>
            </section>
          )}
          {currentUser.athleteId !== null && (
            <Tooltip title="Click Box to enable Delete. CANNOT BE UN-DONE!">
              <div className={classes.deleteBox}>
                <Checkbox
                  checked={!disabledDelete}
                  onChange={() => {
                    setDisabledDelete(!disabledDelete);
                  }}
                />
                <Button
                  variant={"contained"}
                  disabled={disabledDelete}
                  className={classes.deleteBtn}
                  onClick={handleDelete}
                >
                  Delete All My Data
                </Button>
              </div>
            </Tooltip>
          )}
        </div>
      </Modal>
    </div>
  );

  // return (
  //
  // );
};
MenuModal.propTypes = {
  stravaLogout: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  disabledDelete: PropTypes.bool.isRequired,
  setDisabledDelete: PropTypes.func.isRequired,
};
export default MenuModal;
