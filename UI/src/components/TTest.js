import React, {  useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/tQuestion";
import * as actionsr from "../actions/tReg";
import * as actionsa from "../actions/tAnswer";
import { Box, Grid, Paper, TextField, withStyles,  Button, StepLabel, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import useForm from "./useForm";
const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        },

    },
    paper: {
        margin: theme.spacing(2),
        "& .MuiButton-root": {
            margin: "5px"
        },
        padding: theme.spacing(2)
    }
})
const initialFieldValues = {
    regId: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: ''

}


const TTest = ({ classes, tQuestionsLoading, tRegLoading, fetchAllTQuestions, fetchAllTRegs, tRegList, tQuestionsList, ...props }) => {
    console.log(tQuestionsLoading, tRegLoading, fetchAllTQuestions, fetchAllTRegs, tRegList, tQuestionsList);

    useEffect(() => {
        fetchAllTQuestions()
        fetchAllTRegs()
    }, [fetchAllTQuestions, fetchAllTRegs])


    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('regId' in fieldValues)
            temp.regId = fieldValues.regId ? "" : "Это поле необходимо."
        if ('answer1' in fieldValues)
            temp.answer1 = fieldValues.answer1 ? "" : "Это поле необходимо."
        if ('answer2' in fieldValues)
            temp.answer2 = fieldValues.answer2 ? "" : "Это поле необходимо."
        if ('answer3' in fieldValues)
            temp.answer3 = fieldValues.answer3 ? "" : "Это поле необходимо."
        if ('answer4' in fieldValues)
            temp.answer4 = fieldValues.answer4 ? "" : "Это поле необходимо."
        if ('answer5' in fieldValues)
            temp.answer5 = fieldValues.answer5 ? "" : "Это поле необходимо."

        setErrors({
            ...temp
        })


        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Успешно!", { appearance: 'success' })
            }

            props.createTAnswer(values, onSuccess)
            fetchAllTRegs()
            console.log(values)
        }
    }
    return tRegLoading && tQuestionsLoading
        ? (<div>Загрузка</div>)

        : (
            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                <Paper className={classes.paper} elevation={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead className={classes.root}>
                                        <TableRow>
                                            <TableCell>RegId</TableCell>
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

                                                </TableRow>)
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                name="regId"
                                variant="outlined"
                                label="regId"
                                value={values.regId}
                                onChange={handleInputChange}
                                {...(errors.regId && { error: true, helperText: errors.regId })}
                            />

                            {
                                tQuestionsList.map((record, index) => {
                                    return (
                                        <Box key={index}
                                            component={Grid}
                                            className={classes.gridItem}
                                            item
                                            xs={12}
                                            display={{ xs: "12", lg: "block" }}
                                        >


                                            <StepLabel>{record.question}</StepLabel>
                                            <StepLabel>{record.variant1}|{record.variant2}|{record.variant3}</StepLabel>

                                            <TextField
                                                name={`answer${index + 1}`}
                                                variant="outlined"
                                                label={`answer${index + 1}`}
                                                key={index}
                                                value={values[`.answer${index + 1}`]}
                                                onChange={handleInputChange}
                                                {...(errors[`.answer${index + 1}`] && { error: true, helperText: errors[`.answer${index + 1}`] })}
                                            />





                                        </Box>
                                    )
                                })
                            }
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes.smMargin}
                                >
                                    Подтвердить
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.smMargin}
                                    onClick={resetForm}
                                >
                                    Сбросить
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        );
}
const mapStateToProps = state => ({
    tAnswersList: state.tAnswer.list,
    tQuestionsList: state.tQuestions.list,
    tQuestionsLoading: state.tQuestions.Qloading,
    tRegList: state.tReg.list,
    tRegLoading: state.tReg.loading
})

const mapActionToProps = {
    fetchAllTRegs: actionsr.fetchAll,
    fetchAllTQuestions: actions.fetchAll,
    createTAnswer: actionsa.create
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TTest));