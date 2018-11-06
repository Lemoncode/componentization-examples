import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { HotelEntity } from "../../../model";
import {HotelCardHeader} from './hotelCardHeader';
import {HotelCardContent} from './hotelCardContent';
import {HotelCardActions} from './hotelCardActions';

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    width: '500px',
    marginTop: '10px',
  },
});

interface Props extends WithStyles<typeof styles> {
  hotel: HotelEntity;
}

export const HotelCardInner = (props: Props) => {
  const { classes } = props;

  return (
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
        <HotelCardActions/>
      </Card>
  )
}

export const HotelCard = withStyles(styles)(HotelCardInner);
