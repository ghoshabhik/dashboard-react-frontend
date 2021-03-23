/* eslint-disable */ 
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ProjectMenu({ selectedVal , keyId, user, handleLoad}) {
  const [stat, setStat] = React.useState(selectedVal)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    setStat(e.currentTarget.innerText)
    console.log('I can call update api from here', keyId, e.currentTarget.innerText)

    const response = await fetch(`https://todoapp-abhik.netlify.app/api/update-tasks?id=${keyId}&hours=${e.currentTarget.innerText}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        //const content = await response.json();
    setAnchorEl(null);
    handleLoad()
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
        <MenuItem onClick={handleClose}>0</MenuItem>
        <MenuItem onClick={handleClose}>0.5</MenuItem>
        <MenuItem onClick={handleClose}>1</MenuItem>
        <MenuItem onClick={handleClose}>1.5</MenuItem>
        <MenuItem onClick={handleClose}>2</MenuItem>
        <MenuItem onClick={handleClose}>2.5</MenuItem>
        <MenuItem onClick={handleClose}>3</MenuItem>
        <MenuItem onClick={handleClose}>3.5</MenuItem>
        <MenuItem onClick={handleClose}>4</MenuItem>
        <MenuItem onClick={handleClose}>4.5</MenuItem>
        <MenuItem onClick={handleClose}>5</MenuItem>
        <MenuItem onClick={handleClose}>5.5</MenuItem>
        <MenuItem onClick={handleClose}>6</MenuItem>
        <MenuItem onClick={handleClose}>6.5</MenuItem>
        <MenuItem onClick={handleClose}>7</MenuItem>
        <MenuItem onClick={handleClose}>7.5</MenuItem>
        <MenuItem onClick={handleClose}>8</MenuItem>
        <MenuItem onClick={handleClose}>8.5</MenuItem>
        <MenuItem onClick={handleClose}>9</MenuItem>
        <MenuItem onClick={handleClose}>9.5</MenuItem>
        <MenuItem onClick={handleClose}>10</MenuItem>
        <MenuItem onClick={handleClose}>10.5</MenuItem>
        <MenuItem onClick={handleClose}>11</MenuItem>
      </Menu>
    </div>
  );
}