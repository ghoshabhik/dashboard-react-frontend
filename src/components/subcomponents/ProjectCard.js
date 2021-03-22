import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

export default function ProjectCard({project}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="h2">
          {project.fields.Name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Current Status: {project.fields.Status}
        </Typography>
        <Typography variant="body2" component="p">
        Planned Start Date: {project.fields.StartDate}
        </Typography>
        <Typography variant="body2" component="p">
        Planned End Date: {project.fields.EndDate}
        </Typography>
        <Typography variant="body2" component="p">
        Planned Days: {project.fields.PlannedNoOfDays}
        </Typography>
        <a href={`${project.fields.GitHubUrl}`} target="_blank">Go to Github</a>
      </CardContent>
    </Card>
  );
}