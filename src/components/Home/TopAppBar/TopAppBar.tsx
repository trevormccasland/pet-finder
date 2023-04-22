import React, { FC, useCallback, useState } from 'react'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import './TopAppBar.css'

interface iTopAppBar {
    onSettingsClick: () => void
    onTitleClick: () => void
}

const TopAppBar: FC<iTopAppBar> = ({ onSettingsClick, onTitleClick }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const handleClose = useCallback(() => setAnchorEl(null), [])
    const handleSettingsClick = useCallback(() => {
        handleClose()
        onSettingsClick()
    },[])
    const handleMenu = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => setAnchorEl(event.currentTarget), [])
    return <AppBar>
        <Toolbar>
            <Typography className='topAppBarTitle' onClick={onTitleClick} variant='h6'>
                Pet Finder
            </Typography>
            <div className='accountCircle'>
                <IconButton
                    href=""
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                </Menu>
            </div>
        </Toolbar>
    </AppBar>
}

export default TopAppBar