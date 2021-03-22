import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ProjectMenu({ selectedVal , keyId, user}) {
  const [stat, setStat] = React.useState(selectedVal)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    setStat(e.currentTarget.innerText)
    console.log('I can call update api from here', keyId, e.currentTarget.innerText)

    const response = await fetch(`https://dashboard-strapi-backend.herokuapp.com/projects/updateStatus?id=${keyId}&status=${e.currentTarget.innerText}`, 
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
        <MenuItem onClick={handleClose}>Planning</MenuItem>
        <MenuItem onClick={handleClose}>Coding</MenuItem>
        <MenuItem onClick={handleClose}>Documentation</MenuItem>
        <MenuItem onClick={handleClose}>Completed</MenuItem>

      </Menu>
    </div>
  );
}