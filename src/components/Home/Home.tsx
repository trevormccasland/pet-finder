import React, { FC, useCallback, useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import TopAppBar from './TopAppBar'
import './Home.css'
import { Settings } from './SettingsDialog/SettingsDialog'
import SettingsDialog from './SettingsDialog'
import { Cat, Dog, getPets } from '../../api/pets'
import PetCard from './PetCard'
import { PetType, Pets, Pet } from './PetCard/PetCard'
import './Home.css'
import PetResults from './PetResults/PetResults'


const getRandomPet = (pets: Pet[]): Pet => {
    const index = Math.floor(Math.random() * pets.length)
    return pets[index]
}


const Home: FC = () => {
    const [viewSelected, setViewSelected] = useState<boolean>(false)
    const [settings, setSettings] = useState<Settings>({
        dogs: false,
        cats: false
    })
    const [openSettingsDialong, setOpenSettingsDialog] = useState(false)
    const [pets, setPets] = useState<Pets>({
        cats: [],
        dogs: []
    })

    const [selected, setSelected] = useState<Pets>({
        cats: [],
        dogs: []
    })
    const handleViewSelectedClicked = useCallback(() => setViewSelected(true), [setViewSelected])
    const onSettingsClick = useCallback(() => setOpenSettingsDialog(true), [setOpenSettingsDialog])
    const onCheckClicked = useCallback((pet: Pet, petType: PetType) => {
        const cats = pets?.cats ?? []
        const dogs = pets?.dogs ?? []
        if (petType === PetType.Cat) {
            setPets((prev) => ({
                cats: cats.filter(p => p.id !== pet.id),
                dogs: prev.dogs
            }))
            setSelected((prev) => ({
                cats: [...(prev?.cats ?? []), pet as Cat],
                dogs: prev.dogs
            }))
        }
        if (petType === PetType.Dog) {
            setPets((prev) => ({
                cats: prev.cats,
                dogs: dogs.filter(p => p.id !== pet.id)
            }))
            setSelected((prev) => ({
                cats: prev.cats,
                dogs: [...(prev?.dogs ?? []), pet as Dog]
            }))
        }
        if (petType === PetType.All) {
            setPets((prev) => ({
                cats: (prev?.cats ?? []).filter(p => p.id !== pet.id),
                dogs: (prev?.dogs ?? []).filter(p => p.id !== pet.id)
            }))
            setSelected((prev) => {
                const isCat = cats.some(cat => cat.id === pet.id)
                if (isCat) {
                    return {
                        cats: [...(prev?.cats ?? []), pet as Cat],
                        dogs: prev.dogs
                    }
                }
                return {
                    cats: prev.cats,
                    dogs: [...(prev?.dogs ?? []), pet as Dog]
                }
            })
        }
    }, [pets, selected])
    const onClearClicked = useCallback((pet: Pet) => {
        setPets((prev) => ({
            cats: (prev?.cats ?? []).filter(p => p.id !== pet.id),
            dogs: (prev?.dogs ?? []).filter(p => p.id !== pet.id)
        }))
    }, [])
    const callGetPets = useCallback(async () => {
        if (settings.cats || settings.dogs) {
            const { data } = await getPets(settings.cats, settings.dogs)
            setPets(data)
        }
    }, [getPets, setPets, settings])
    useEffect(() => {
        callGetPets()
    }, [callGetPets])

    const noSettings = !settings.dogs && !settings.cats
    if (noSettings) {
        return <Box className='homeContainer'>
            <TopAppBar onSettingsClick={onSettingsClick} />
            <Paper>
                <Typography sx={{marginTop: '24px', paddingTop: '8px', marginLeft: '16px'}} variant='h6'>
                    No Settings detected
                </Typography>
                <Typography sx={{marginTop: '24px', marginLeft: '16px', paddingBottom: '16px'}} variant='body1'>
                    Get started by clicking on the account circle and select some settings!
                </Typography>
            </Paper>
            <SettingsDialog open={openSettingsDialong} setOpen={setOpenSettingsDialog} settings={settings} setSettings={setSettings} />
        </Box>
    }
    let petCard
    if (settings.dogs && !settings.cats) {
        petCard = <PetCard pet={pets?.dogs ? getRandomPet(pets.dogs) : undefined} onCheckClicked={onCheckClicked} onClearClicked={onClearClicked} petType={PetType.Dog} />
    }

    if (!settings.dogs && settings.cats) {
        petCard = <PetCard pet={pets?.cats ? getRandomPet(pets.cats) : undefined} onCheckClicked={onCheckClicked} onClearClicked={onClearClicked} petType={PetType.Cat}/>
    }
    if (!petCard) {
        petCard = <PetCard pet={pets?.dogs || pets?.cats ? getRandomPet([...(pets?.cats ?? []), ...(pets?.dogs ?? [])]) : undefined} onCheckClicked={onCheckClicked} onClearClicked={onClearClicked} petType={PetType.All} />
    }
    const totalPetCount = (selected.cats?.length ?? 0) + (selected.dogs?.length ?? 0)
    return <Box className='homeContainer'>
        <TopAppBar onSettingsClick={onSettingsClick} />
        {viewSelected  ? (
            <PetResults cats={selected.cats ?? []} dogs={selected.dogs ?? []} />
        ) : (
            <>
                <div className={totalPetCount > 0 ? 'viewSelectedBanner' : 'hideSelectedBanner'} onClick={handleViewSelectedClicked}>
                    <Typography className='viewSelectedBannerContent'>View {totalPetCount} Selected</Typography>
                </div>
                {petCard}
            </>
            )
        }
        <SettingsDialog open={openSettingsDialong} setOpen={setOpenSettingsDialog} settings={settings} setSettings={setSettings} />
    </Box>
}

export default Home