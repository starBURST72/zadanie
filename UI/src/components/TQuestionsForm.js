import React, { useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/tQuestion";
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
    question: '',
    variant1: '',
    variant2: '',
    variant3: '',
    answer: ''

}

const TQuestionsForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('question' in fieldValues)
            temp.question = fieldValues.question ? "" : "Это поле необходимо."
        if ('variant1' in fieldValues)
            temp.variant1 = fieldValues.variant1 ? "" : "Это поле необходимо."
        if ('variant2' in fieldValues)
            temp.variant2 = fieldValues.variant2 ? "" : "Это поле необходимо."
        if ('variant3' in fieldValues)
            temp.variant3 = fieldValues.variant3 ? "" : "Это поле необходимо."
        if ('answer' in fieldValues)
            temp.answer = fieldValues.answer ? "" : "Это поле необходимо."

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

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Успешно!", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createTQuestion(values, onSuccess)
            else
                props.updateTQuestion(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.tQuestionsList.find(x => x.qId === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId, props.tQuestionsList, setErrors, setValues])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>

                    <TextField
                        name="question"
                        variant="outlined"
                        label="вопрос"
                        value={values.question}
                        onChange={handleInputChange}
                        {...(errors.question && { error: true, helperText: errors.question })}
                    />


                    <TextField
                        name="variant1"
                        variant="outlined"
                        label="Вариант 1"
                        value={values.variant1}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="variant2"
                        variant="outlined"
                        label="Вариант 2"
                        value={values.variant2}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="variant3"
                        variant="outlined"
                        label="Вариант 3"
                        value={values.variant3}
                        onChange={handleInputChange}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.answer && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Ответ</InputLabel>
                        <Select
                            name="answer"
                            value={values.answer}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Выберите ответ</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>

                        </Select>
                        {errors.answer && <FormHelperText>{errors.answer}</FormHelperText>}
                    </FormControl>
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
    tQuestionsList: state.tQuestions.list
})

const mapActionToProps = {
    createTQuestion: actions.create,
    updateTQuestion: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TQuestionsForm));