import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/tQuestion";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import TQuestionsForm from "./TQuestionsForm";
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



const TQuestions = ({ classes,fetchAllTQuestions,tQuestionsList, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        fetchAllTQuestions()
    }, [fetchAllTQuestions])

    const { addToast } = useToasts()

    const onDelete = qId => {
        if (window.confirm('Вы точно хотите удалить эту запись?'))
            props.deleteTQuestion(qId, () => addToast("Успешно!", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={12}>
            <Grid container>
                <Grid item xs={3}>
                    <TQuestionsForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={9}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>qId</TableCell>
                                    <TableCell>Вопрос</TableCell>
                                    <TableCell>Вариант 1</TableCell>
                                    <TableCell>Вариант 2</TableCell>
                                    <TableCell>Вариант 3</TableCell>
                                    <TableCell>Ответ</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tQuestionsList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.qId}</TableCell>
                                            <TableCell>{record.question}</TableCell>
                                            <TableCell>{record.variant1}</TableCell>
                                            <TableCell>{record.variant2}</TableCell>
                                            <TableCell>{record.variant3}</TableCell>
                                            <TableCell>{record.answer}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.qId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.qId)} /></Button>
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
    tQuestionsList: state.tQuestions.list
})

const mapActionToProps = {
    fetchAllTQuestions: actions.fetchAll,
    deleteTQuestion: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TQuestions));