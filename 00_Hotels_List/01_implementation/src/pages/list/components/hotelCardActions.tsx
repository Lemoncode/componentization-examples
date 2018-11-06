import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  actions: {
    display: 'flex',
  },
});

interface Props extends WithStyles<typeof styles> {
}

const HotelCardActionsInner = (props: Props) => {
  const { classes } = props;

  return (
    <CardActions className={classes.actions} disableActionSpacing>
    <IconButton aria-label="Add to favorites">
      <FavoriteIcon />
    </IconButton>
    <IconButton aria-label="Share">
      <ShareIcon />
    </IconButton>
  </CardActions>
)
}

export const HotelCardActions = withStyles(styles)(HotelCardActionsInner);
