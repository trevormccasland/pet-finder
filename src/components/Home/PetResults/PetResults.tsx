import { Paper, Table, TableBody, TableContainer, TableRow, TableHead, TableCell, Typography } from "@mui/material"
import React, { FC } from "react"
import { Cat, Dog } from "../../../api/pets"
import { PieChart } from "react-minimal-pie-chart"
import './PetResults.css'

interface iPetResults {
    cats: Cat[]
    dogs: Dog[]
}

const PetResults: FC<iPetResults> = ({cats, dogs}) => {
    return <Paper>
        <Typography>Dog (yellow) and Cat (red) %</Typography>
        <div className="pieChartContainer">
            <PieChart radius={1} viewBoxSize={[2,2]} center={[1, 1]}  data={[
                {label: 'Dog', value: (dogs.length)/(cats.length + dogs.length), color: '#FCF33B'},
                {label: 'Cat', value: (cats.length)/(cats.length + dogs.length), color: '#FC3B3B'}
            ]}/>
        </div>
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