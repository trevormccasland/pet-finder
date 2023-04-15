import React, { FC, useCallback, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

export interface Settings {
    cats: boolean
    dogs: boolean
}

interface iSettingsDialog {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    settings: Settings,
    setSettings: React.Dispatch<React.SetStateAction<Settings>>
}

const SettingsDialog: FC<iSettingsDialog> = ({ open, setOpen, settings, setSettings }) => {
    const [catsChecked, setCatsChecked] = useState(settings.cats)
    const [dogsChecked, setDogsChecked] = useState(settings.dogs)
    const handleCatsChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setCatsChecked(event.target.checked), [setCatsChecked])
    const handleDogsChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setDogsChecked(event.target.checked), [setDogsChecked])

    const handleClose = useCallback(() => setOpen(false), [setOpen])
    const handleSaveClick = useCallback(() => {
        setSettings({
            cats: catsChecked,
            dogs: dogsChecked
        })
        setOpen(false)
    }, [catsChecked, dogsChecked, setOpen, setSettings])


    return <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <Divider />
        <DialogContent>
            <Typography variant='overline'>Animal Preferences</Typography>
            <List>
                <ListItem key='catsCheckBox'>
                    <ListItemIcon>
                        <Checkbox checked={catsChecked} onChange={handleCatsChecked}/>
                    </ListItemIcon>
                    <ListItemText primary='Cats' />
                </ListItem>
                <ListItem key='dogsCheckBox'>
                    <ListItemIcon>
                        <Checkbox checked={dogsChecked} onChange={handleDogsChecked}/>
                    </ListItemIcon>
                    <ListItemText primary='Dogs' />
                </ListItem>
            </List>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>

    </Dialog>
}

export default SettingsDialog