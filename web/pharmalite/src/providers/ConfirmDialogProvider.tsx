import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";


interface showConfirmDialogFunc {
  (title: string, content: string, successHandler: Function): void;
}

export const ConfirmDialogContext = React.createContext<{
  showConfirmDialog: showConfirmDialogFunc;
}>({ showConfirmDialog: () => {} });

export const ConfirmDialogProvider: React.FC<any> = (props) => {
  const [state, setState] = React.useState({
    isOpen: false,
    successHandler: undefined,
    title: "",
    content: "",
  } as {
    isOpen: boolean;
    successHandler?: Function;
    title: string;
    content: string;
  });
  const confirmDialogContext = React.useMemo(
    () => ({
      showConfirmDialog: (
        title: string,
        content: string,
        successHandler: Function
      ) => {
        setState({
          isOpen: true,
          successHandler,
          title,
          content,
        });
      },
    }),
    []
  );
  const closeDialog = () => {
    setState({
      ...state,
      isOpen: false,
    });
    // successHandler:undefined , title:"",content:""
  };
  return (
    <ConfirmDialogContext.Provider value={confirmDialogContext}>
      <>
        <Dialog open={state.isOpen} onClose={closeDialog}>
          <DialogTitle>{state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{state.content}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="cancel-btn"
              onClick={closeDialog}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (state.successHandler) {
                  state.successHandler();
                }
                closeDialog();
              }}
              className="add-btn"
              variant="contained"
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        {props.children}
      </>
    </ConfirmDialogContext.Provider>
  );
};

// HOC
// eslint-disable-next-line react/display-name
// export const withConfirmDialogContext = (ChildComponent: any) => (
//   props: any
// ) => {
//   const { showConfirmDialog } = React.useContext(ConfirmDialogContext);
//   return (
//     <ChildComponent {...props} confirmDialog={{ show: showConfirmDialog }} />
//   );
// };
