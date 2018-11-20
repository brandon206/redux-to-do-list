import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import NavButton from './nav_button';
import { connect } from 'react-redux';
import {addToDoItem} from '../actions/index';

class AddItem extends Component {
    renderInput (props) {
        console.log("render input:", props);
        return (
            <div className={`input-field col ${props.size}`}>
                <input {...props.input} type="text" autoComplete = "off"/>
                <label>{props.label}</label>
                <p className = "red-text">{(props.meta.touched || props.meta.dirty) && props.meta.error}</p>
            </div>
        );
    }

    handleAddItem = async (values) => {
        await this.props.addToDoItem(values);

        this.props.history.push('/');
    }

    render () {
        console.log('Add Item Props: ', this.props);

        const { handleSubmit, reset } = this.props;

        return(
            <div>
                <h1 className="center">Add Item</h1>
                <NavButton to="/" text = "Back to List" color = "green"/>
                <form onSubmit = {handleSubmit(this.handleAddItem)}>
                    <div className="row">
                        <Field size = "s12" name = "title" label = "Title" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "details" label = "Details" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="col s6 center">
                            <button type = "button" onClick = {reset} className = "btn red lighten-2">Cancel</button>
                        </div>
                        <div className="col s6 center">
                            <button className = "btn blue lighten-2">Add Item</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function validate (formValues){
    const error = {};

    if(!formValues.title) {
        error.title = 'please enter a title for your to do item';
    }
    // if(formValues.title && formValues.title.length > 10){
    //     error.title = "title is too long";
    // }

    if(!formValues.details) {
        error.details = 'please enter details for your to do item';
    }

    return error;
}

AddItem = reduxForm({
    form: 'add-item',
    validate: validate
})(AddItem);

export default connect(null, {
    addToDoItem: addToDoItem
}) (AddItem);