import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { HotelEntity } from "../../model";
import { HotelCard } from './components';

interface Props {
  hotelList: HotelEntity[];
}

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
});

export const HotelListPageInner = (props : Props) =>
      <div style={
        {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
        {
          props.hotelList.map(
            (hotel) => 
              <HotelCard hotel={hotel} key={hotel.id}/>         
          )
        }
      </div>

export const HotelListPage = withStyles(styles)(HotelListPageInner);
