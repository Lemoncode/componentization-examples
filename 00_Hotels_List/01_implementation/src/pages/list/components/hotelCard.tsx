import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../../model";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import red from '@material-ui/core/colors/red';
import {HotelCardHeader} from './hotelCardHeader';
import {HotelCardContent} from './hotelCardContent';

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    width: '500px',
    marginTop: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

interface Props extends WithStyles<typeof styles> {
  hotel: HotelEntity;
}

export const HotelCardInner = (props: Props) => {
  const { classes } = props;

  return (
    <div style={
      {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
      <Card className={classes.card} key={props.hotel.id}>
        <HotelCardHeader
          name={props.hotel.name}
          address={props.hotel.address1}
          rating={props.hotel.hotelRating}
        />
        <HotelCardContent
          pictureURL={props.hotel.thumbNailUrl}
          name={props.hotel.name}
          description={props.hotel.shortDescription}
        />

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export const HotelCard = withStyles(styles)(HotelCardInner);
