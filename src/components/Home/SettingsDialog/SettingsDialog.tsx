import React, { FC, useCallback, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

export interface Settings {
    cats: boolean
    dogs: boolean
}

interface iSettingsDialog {
    open: boolean
    settings: Settings
    onClose: () => void
    onSave: (catsChecked: boolean, dogsChecked: boolean) => void
}

const SettingsDialog: FC<iSettingsDialog> = ({ open, settings, onClose, onSave }) => {
    const [catsChecked, setCatsChecked] = useState(settings.cats)
    const [dogsChecked, setDogsChecked] = useState(settings.dogs)
    const handleCatsChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setCatsChecked(event.target.checked), [setCatsChecked])
    const handleDogsChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setDogsChecked(event.target.checked), [setDogsChecked])


    return <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
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
            <Button onClick={() => onSave(catsChecked, dogsChecked)}>Save</Button>
        </DialogActions>

    </Dialog>
}

export default SettingsDialog