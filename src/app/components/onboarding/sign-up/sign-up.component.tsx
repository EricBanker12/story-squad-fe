import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button, Checkbox, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAPI } from '../../../hooks';
import { useForm } from '../../../hooks';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '35vh',
    },
    checkboxes: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: 'black',
        textDecoration: 'underline',
        paddingTop: '8px',
    },
}));

interface SignUpState {
    email: string;
    password: string;
    comparePassword: string;
    termsOfService: boolean;
    privacyPolicy: boolean;
}

const SignUp: React.FC = () => {
    const classes = useStyles({});

    // TODO: Setup Loading and Error States
    // eslint-disable-next-line
    const { response, loading, error, request } = useAPI('/auth/register', 'POST');
    const history = useHistory();
    const { state, handleInputChange, handleBoolChange, handleSubmitBuilder } = useForm<
        SignUpState
    >({
        email: '',
        password: '',
        comparePassword: '',
        termsOfService: false,
        privacyPolicy: false,
    });

    const handleSubmit = handleSubmitBuilder(request);

    React.useEffect(() => {
        if (response?.token) {
            localStorage.setItem('jwt', response.token);
            history.push('/dashboard');
        }
    }, [history, response]);

    const { email, password, comparePassword, termsOfService, privacyPolicy } = state;
    return (
        <>
            <Typography variant='h3' gutterBottom>
                Sign Up
            </Typography>
            <Typography variant='subtitle2'>Start your child reading stories today!</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={email}
                    onChange={handleInputChange('email')}
                />
                <TextField
                    fullWidth
                    type='password'
                    label='Password'
                    value={password}
                    onChange={handleInputChange('password')}
                />
                <TextField
                    fullWidth
                    type='password'
                    label='Confirm Password'
                    value={comparePassword}
                    onChange={handleInputChange('comparePassword')}
                />
                <div className={classes.checkboxes}>
                    <label className={classes.label}>
                        <Checkbox
                            value={termsOfService}
                            onChange={handleBoolChange('termsOfService')}
                        />
                        <Typography>
                            I Accept the{' '}
                            <Link className={classes.link} to='/terms-of-service'>
                                Terms Of Service
                            </Link>
                        </Typography>
                    </label>
                    <label className={classes.label}>
                        <Checkbox
                            value={privacyPolicy}
                            onChange={handleBoolChange('privacyPolicy')}
                        />
                        <Typography>
                            I Accept the{' '}
                            <Link className={classes.link} to='/privacy-policy'>
                                Privacy Policy
                            </Link>
                        </Typography>
                    </label>
                </div>
                <Button type='submit' variant='contained' size='large'>
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export { SignUp };