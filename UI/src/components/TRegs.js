import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/tReg";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import TRegsForm from "./TRegsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const TRegs = ({ classes,fetchAllTRegs,tRegList, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        fetchAllTRegs()
    }, [fetchAllTRegs])

    const { addToast } = useToasts()

    const onDelete = regId => {
        if (window.confirm('Вы точно хотите удалить эту запись?'))
            props.deleteTReg(regId, () => addToast("Успешно удалено!", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={3}>
                    <TRegsForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={9}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell>Отчество</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tRegList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.regId}</TableCell>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.surname}</TableCell>
                                            <TableCell>{record.middlename}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.regId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.regId)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    tRegList: state.tReg.list
})

const mapActionToProps = {
    fetchAllTRegs: actions.fetchAll,
    deleteTReg: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TRegs));