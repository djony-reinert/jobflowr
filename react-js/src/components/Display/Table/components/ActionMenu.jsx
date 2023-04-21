import React, { useRef, useState } from 'react';
import { IconButton, MenuItem, Popover } from "@mui/material";
import Iconify from "../../../iconify";

const ActionMenu = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleOpenMenu} ref={buttonRef}>
        <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default ActionMenu;
