import { ReactElement, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Paper } from "@mui/material";



interface Props {
    children: ReactElement;
  }
  
  export default function Layout(props: Props): ReactElement {

    // ---- Constants ----
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    // ---- Event handlers ----
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

      setAnchorEl(null);
    };
    return(
      <>
    <div>
    <Paper sx={{ width: '100%' , maxWidth: '100%' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Centralized Logging
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home </MenuItem>
        <MenuItem component={Link} to="/overview" onClick={handleClose}> 
          Overview Logs
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Paper>
    </div>
      <div>{props.children}</div>
      </>
    
    )
}