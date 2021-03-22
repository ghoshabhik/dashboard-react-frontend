import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ExamMenu({ selectedVal , keyId, user}) {
  const [stat, setStat] = React.useState(selectedVal)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    setStat(e.currentTarget.innerText)
    console.log('I can call update api from here', keyId, e.currentTarget.innerText)

    const response = await fetch(`https://dashboard-strapi-backend.herokuapp.com/books/updateStatus?id=${keyId}&status=${e.currentTarget.innerText}`, 
        {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        } 
        );
      // const  respdata = response.json()
      console.log(response)
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
        {stat}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Not Started</MenuItem>
        <MenuItem onClick={handleClose}>Reading</MenuItem>
        <MenuItem onClick={handleClose}>Cancelled</MenuItem>
        <MenuItem onClick={handleClose}>Finished</MenuItem>
        <MenuItem onClick={handleClose}>Reviewed</MenuItem>

      </Menu>
    </div>
  );
}