import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardList } from '../../../../components';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    list: {
        marginTop: theme.spacing(2),
    },
    button: {
        borderRadius: theme.shape.borderRadius,
    },
}));

const CardListPage: React.FC = () => {
    const classes = useStyles({});

    return (
        <>
            <header className={classes.header}>
                <Typography variant='overline'>Cards</Typography>

                <Link to='/dashboard/cards/add'>
                    <Button variant='outlined' color='primary' className={classes.button}>
                        Add Card
                    </Button>
                </Link>
            </header>
            <section className={classes.list}>
                <CardList />
            </section>
        </>
    );
};

export { CardListPage };
