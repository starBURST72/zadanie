import React, { useEffect } from "react";
import { Grid, TextField, withStyles, Button} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/tAnswer";
const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
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

const TAnswersForm = ({ classes, ...props }) => {

    //toast msg.
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
        setValues,
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
            if (props.currentId === 0)
                props.createTAnswer(values, onSuccess)
            else
                props.updateTAnswer(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.tAnswersList.find(x => x.answersId === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId, props.tAnswersList, setErrors, setValues])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <TextField
                        name="regId"
                        variant="outlined"
                        label="regId"
                        value={values.regId}
                        onChange={handleInputChange}
                        {...(errors.regId && { error: true, helperText: errors.regId })}
                    />

                    <TextField
                        name="answer1"
                        variant="outlined"
                        label="Ответ 1"
                        value={values.answer1}
                        onChange={handleInputChange}
                        {...(errors.answer1 && { error: true, helperText: errors.answer1 })}
                    />


                    <TextField
                        name="answer2"
                        variant="outlined"
                        label="Ответ 2"
                        value={values.answer2}
                        onChange={handleInputChange}
                        {...(errors.answer2 && { error: true, helperText: errors.answer2 })}
                    />
                    <TextField
                        name="answer3"
                        variant="outlined"
                        label="Ответ 3"
                        value={values.answer3}
                        onChange={handleInputChange}
                        {...(errors.answer3 && { error: true, helperText: errors.answer3 })}
                    />
                    <TextField
                        name="answer4"
                        variant="outlined"
                        label="Ответ 4"
                        value={values.answer4}
                        onChange={handleInputChange}
                        {...(errors.answer4 && { error: true, helperText: errors.answer4 })}
                    />
                    <TextField
                        name="answer5"
                        variant="outlined"
                        label="Ответ 5"
                        value={values.answer5}
                        onChange={handleInputChange}
                        {...(errors.answer5 && { error: true, helperText: errors.answer5 })}
                    />
                   
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
        </form>
    );
}


const mapStateToProps = state => ({
    tAnswersList: state.tAnswer.list
})

const mapActionToProps = {
    createTAnswer: actions.create,
    updateTAnswer: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TAnswersForm));