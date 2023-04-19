import { Paper, Table, TableBody, TableContainer, TableRow, TableHead, TableCell, Typography } from "@mui/material"
import React, { FC } from "react"
import { Cat, Dog } from "../../../api/pets"

interface iPetResults {
    cats: Cat[]
    dogs: Dog[]
}

const PetResults: FC<iPetResults> = ({cats, dogs}) => {
    return <Paper>
        <Typography>Cats</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Temperment
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cats.map(cat => (<TableRow>
                        <TableCell>
                            {cat.name}
                        </TableCell>
                        <TableCell>
                            {cat.temperament}
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography>Dogs</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Temperment
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dogs.map(dog => (<TableRow>
                        <TableCell>
                            {dog.name}
                        </TableCell>
                        <TableCell>
                            {dog.temperament}
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}

export default PetResults