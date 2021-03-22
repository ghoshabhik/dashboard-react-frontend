import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "50px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function JobCard({job}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="h2">
          Job: {job.fields.JobName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Current Status: {job.fields.Status}
        </Typography>
        <Typography variant="body2" component="p">
        Last Date of Application: {job.fields.LastDateOfApplication}
        </Typography>
        <a href={`${job.fields.JobSiteURL}`} target="_blank">Go to application URL</a>
      </CardContent>
    </Card>
  );
}