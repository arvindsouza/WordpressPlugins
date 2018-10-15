import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; //redux form handles form events, works like connect
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

    renderField(field) {   //link input to <Field />
        
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;

        return (

            <div className={className}>
                <label>{field.label}</label>
                <input type='text' className='form-control'
                    {...field.input} /* link input to field */ />
                    <div className='text-help'>
                {touched ? error: ''} 
                </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <Field
                        label='Title'
                        name='title'
                        component={this.renderField}
                    />

                    <Field
                        label='Categories'
                        name='categories'
                        component={this.renderField}
                    />

                    <Field
                        name='content'
                        label='Post Content'
                        component={this.renderField}
                    />

                    <button className='btn btn-primary' type='submit'>Submit</button>
                    <Link to='/' className='btn btn-danger'>Cancel</Link>  
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title";
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }

    //if error empty, form ok else invalid
    return errors;
}

export default reduxForm({
    validate,  // validate: validate
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
    );