import React, { useEffect } from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/tReg";
import { useToasts } from "react-toast-notifications";

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
    name: '',
    surname: '',
    middlename: ''
}

const TRegsForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Это поле необходимо."
        if ('surname' in fieldValues)
            temp.surname = fieldValues.surname ? "" : "Это поле необходимо."
        if ('middlename' in fieldValues)
            temp.bloodGroup = fieldValues.middlename ? "" : "Это поле необходимо."
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
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createTReg(values, onSuccess)
            else
                props.updateTReg(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.tRegsList.find(x => x.regId === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId, props.tRegsList, setErrors, setValues])

    return (
        <form autoComplete="off" noValidate className={classes.in} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="surname"
                        variant="outlined"
                        label="surname"
                        value={values.surname}
                        onChange={handleInputChange}
                        {...(errors.surname && { error: true, helperText: errors.surname })}
                    />
                    <TextField
                        name="middlename"
                        variant="outlined"
                        label="middlename"
                        value={values.middlename}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    tRegsList: state.tReg.list
})

const mapActionToProps = {
    createTReg: actions.create,
    updateTReg: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TRegsForm));