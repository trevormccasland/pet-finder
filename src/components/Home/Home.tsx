import React, { FC, useCallback, useMemo, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import TopAppBar from './TopAppBar'
import './Home.css'
import { Settings } from './SettingsDialog/SettingsDialog'
import SettingsDialog from './SettingsDialog'

interface iHome {

}

const Home: FC<iHome> = () => {
    const [settings, setSettings] = useState<Settings>({
        dogs: false,
        cats: false
    })
    const [openSettingsDialong, setOpenSettingsDialog] = useState(false)
    const onSettingsClick = useCallback(() => setOpenSettingsDialog(true), [])
    const noSettings = !settings.dogs && !settings.cats
    if (noSettings) {
        return <Box className='homeContainer'>
            <TopAppBar onSettingsClick={onSettingsClick} />
            <Paper>
                <Typography sx={{marginTop: '24px', paddingTop: '8px', marginLeft: '16px'}} variant='h4'>
                    No Settings detected
                </Typography>
                <Typography sx={{marginTop: '24px', marginLeft: '16px', paddingBottom: '16px'}} variant='body1'>
                    Get started by clicking on the account circle and select some settings!
                </Typography>
            </Paper>
            <SettingsDialog open={openSettingsDialong} setOpen={setOpenSettingsDialog} settings={settings} setSettings={setSettings} />
        </Box>
    }
    return <Box className='homeContainer'>
        <TopAppBar onSettingsClick={onSettingsClick} />
        <Typography variant='body1'>Showing {settings.dogs ? 'dogs' : ''} {settings.dogs && settings.cats ? 'and' : ''} {settings.cats ? 'cats': '' }</Typography>
        <SettingsDialog open={openSettingsDialong} setOpen={setOpenSettingsDialog} settings={settings} setSettings={setSettings} />
    </Box>
}

export default Home