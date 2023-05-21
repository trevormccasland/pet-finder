import React, { FC } from "react"
import { Cat, Dog } from "../../../api/pets"
import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material"
import { Check, Clear } from "@mui/icons-material"
export type Pet = Dog | Cat

export interface Pets {
    cats?: Cat[],
    dogs?: Dog[]
}

export enum PetType {
    Cat = 'cat',
    Dog = 'dog',
    All = 'all'
}

interface iPetCard {
    pet?: Pet | null
    petType: PetType
    onCheckClicked: (pet: Pet, petType: PetType) => void
    onClearClicked: (pet: Pet) => void
}

const PetCard: FC<iPetCard> = ({ pet, petType, onCheckClicked, onClearClicked }) => {
    if (!pet) {
        return null
    }
    return <Grid container justifyContent={'center'}>
        <Card>
            <CardContent>
                <Grid container justifyContent={'center'} style={{marginBottom: '24px'}}>
                    <Typography variant='h5'>{pet.name}</Typography>
                </Grid>
                {pet.image ? <Box component={"img"} src={pet.image.url} sx={{height: '70vh', aspectRatio: 'auto'}} /> : <Typography>No Image</Typography>}
            </CardContent>
            <CardActions>
                <Grid container justifyContent={'space-evenly'}>
                    <IconButton  onClick={() => onClearClicked(pet)}>
                        <Clear color='error' />
                    </IconButton>
                    <IconButton onClick={() => onCheckClicked(pet, petType)}>
                        <Check color='success' />
                    </IconButton>
                </Grid>
            </CardActions>
        </Card>
    </Grid>
}

export default PetCard