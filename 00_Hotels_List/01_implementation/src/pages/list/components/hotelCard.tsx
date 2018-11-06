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
import Avatar from "@material-ui/core/Avatar/Avatar";
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {props.hotel.hotelRating}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={props.hotel.name}
          subheader={props.hotel.address1}
        />
        <CardContent>
          <div style=
            {{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <CardMedia
              className={classes.media}
              image={props.hotel.thumbNailUrl}
              title={props.hotel.name}
            />
            <Typography variant="subtitle1" gutterBottom>
              {props.hotel.shortDescription}
            </Typography>
          </div>
        </CardContent>
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
