import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    height: "250px",
    marginTop: "30px"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "50%"
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

export default function BookCard({ book }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {book.fields.BookName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {book.fields.Author}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ISBN : {book.fields.ISBN}
          </Typography>
        </CardContent>
        <div style={{ margin: " 0px 10px" }}>
        <p>Status: {book.fields.Status} </p>
          <Typography variant="subtitle1" color="textSecondary">
            <p>Planned Start Date: {book.fields.PlannedStartDate} </p>
            <p>Planned End Date: {book.fields.PlannedEndDate}</p>
          </Typography>

        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={`${book.fields.Thumbnail}`}
        title={`${book.fields.BookName}`}
      />
    </Card>
  );
}