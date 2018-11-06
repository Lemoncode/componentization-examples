import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Typography from "@material-ui/core/Typography/Typography";


// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

interface Props extends WithStyles<typeof styles> {
  pictureURL : string;
  name : string;
  description : string;
}

const HotelCardContentInner = (props: Props) => {
  const { classes } = props;

  return (
    <CardContent>
    <div style=
      {{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
      <CardMedia
        className={classes.media}
        image={props.pictureURL}
        title={props.name}
      />
      <Typography variant="subtitle1" gutterBottom>
        {props.description}
      </Typography>
    </div>
    </CardContent>
)
}

export const HotelCardContent = withStyles(styles)(HotelCardContentInner);
