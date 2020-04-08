import { makeStyles } from '@material-ui/core/styles';



const materialStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));



export default function checkButton() {
    const classes = useStyles();
    return <Button className={classes.root}>Hook</Button>;
}