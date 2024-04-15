import {ButtonGroup} from "@mui/material";

const UserActionsGroup = ({ children }) => {
  return (
    <div className="modal-group">
      <ButtonGroup>
        {children}
      </ButtonGroup>
    </div>
  );
}
export default UserActionsGroup;