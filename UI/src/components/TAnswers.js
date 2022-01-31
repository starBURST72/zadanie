import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/tAnswer";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import TAnswersForm from "./TAnswersForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({ csvData, fileName }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button color="Green" variant="text" onClick={(e) => exportToCSV(csvData, fileName)}>Export</Button>
    )
}

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



const TAnswers = ({ classes, fetchAllTAnswers, tAnswersList, tAnswersLoading, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    
    useEffect(() => {
        fetchAllTAnswers()
        

    }, [fetchAllTAnswers])

    const { addToast } = useToasts()

    const onDelete = answersId => {
        if (window.confirm('Вы точно хотите удалить запись?'))
            props.deleteTAnswer(answersId, () => addToast("Успешно!", { appearance: 'info' }))
    }

   

    return (
        tAnswersLoading
            ? (<div>Loading...</div>)
            : (
                <Paper className={classes.paper} elevation={12}>
                    <Grid container>
                        <Grid item xs={3}>
                            <TAnswersForm {...({ currentId, setCurrentId })} />
                        </Grid>
                        <Grid item xs={9}>
                            <TableContainer>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell>answersId</TableCell>
                                            <TableCell>regId</TableCell>
                                            <TableCell>Ответ 1</TableCell>
                                            <TableCell>Ответ 2</TableCell>
                                            <TableCell>Ответ 3</TableCell>
                                            <TableCell>Ответ 4</TableCell>
                                            <TableCell>Ответ 5</TableCell>
                                            <TableCell>Результат</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            tAnswersList.map((record, index) => {
                                                return (<TableRow key={index} hover>
                                                    <TableCell>{record.answersId}</TableCell>
                                                    <TableCell>{record.regId}</TableCell>
                                                    <TableCell>{record.answer1}</TableCell>
                                                    <TableCell>{record.answer2}</TableCell>
                                                    <TableCell>{record.answer3}</TableCell>
                                                    <TableCell>{record.answer4}</TableCell>
                                                    <TableCell>{record.answer5}</TableCell>
                                                    <TableCell>{record.score}</TableCell>
                                                    <TableCell>
                                                        <ButtonGroup variant="text">
                                                            <Button><EditIcon color="primary"
                                                                onClick={() => { setCurrentId(record.answersId) }} /></Button>
                                                            <Button><DeleteIcon color="secondary"
                                                                onClick={() => onDelete(record.answersId)} /></Button>
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
                    <div className="col-md-4 center">
                        <ExportCSV csvData={tAnswersList} fileName={"Ответы"} />
                    </div>
                    
                </Paper>

            )
    );
}
const mapStateToProps = state => ({
    tAnswersList: state.tAnswer.list,
    tAnswersLoading: state.tAnswer.loading
})

const mapActionToProps = {
    fetchAllTAnswers: actions.fetchAll,
    deleteTAnswer: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TAnswers));