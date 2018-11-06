import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../../model";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  avatar: {
    backgroundColor: red[500],
  },
});

interface Props extends WithStyles<typeof styles> {
  name : string;
  address : string;
  rating : number;
}

const HotelCardHeaderInner = (props: Props) => {
  const { classes } = props;

  return (
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {props.rating}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={props.name}
          subheader={props.address}
        />
  )
}

export const HotelCardHeader = withStyles(styles)(HotelCardHeaderInner);
