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
    const data = [
        {key: '0', title: 'Dog', value: (dogs.length)/(cats.length + dogs.length), color: '#FCF33B'},
        {key: '1', title: 'Cat', value: (cats.length)/(cats.length + dogs.length), color: '#FC3B3B'}
    ]
    return <Paper className="petResultsContainer">
        <div className="pieChartContainer">
            <Typography sx={{textAlign: 'center', marginBottom: '8px'}} variant='h4'>{dogs.length} Dog{dogs.length > 1 ? 's' : '' } (yellow) and {cats.length} Cat{cats.length > 1 ? 's' : ''} (red)</Typography>
            <PieChart 
                animate
                radius={1} 
                viewBoxSize={[2,2]} 
                center={[1, 1]}  
                data={data}/>
        </div>
        {cats.length > 0 && (
            <div className="tableContainer">
                <Typography sx={{marginLeft: '16px', marginTop: '8px'}} variant='h4'>Cats</Typography>
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
            </div>
        )}
        {dogs.length > 0 && (
            <div className="tableContainer">
                <Typography sx={{marginLeft: '16px', marginTop: '8px'}} variant='h4'>Dogs</Typography>
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
            </div>
        )}
    </Paper>
}

export default PetResults