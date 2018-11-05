import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../model";
import { getHotelList } from "../../api/hotel";

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    width: '500px',
    marginTop: '10px',    
  },
});

interface State {
  hotelList: HotelEntity[];
}


interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

class HotelListPageInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      hotelList: []
    }
  }

  componentDidMount() {
    getHotelList().then(
      (hotelList) => this.setState({ hotelList })
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={
          {
            display:'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
        {
          this.state.hotelList.map(
            (hotel) =>            
              <Card className={classes.card} key={hotel.id}>
                <CardHeader title={hotel.name} />
                <CardContent>
                  <div style=
                    {{ display: 'flex', 
                       flexDirection: 'column', 
                       justifyContent: 'center' }}>
                    <img src={hotel.thumbNailUrl} style={{width:'auto', maxHeight: '200px', margin:'auto'}}></img>
                    <Typography variant="subtitle1" gutterBottom>
                      {hotel.shortDescription}
                  </Typography>
                  </div>
                </CardContent>
              </Card>
          )
        }
      </div>
    )
  }
}

export const HotelListPage = withStyles(styles)(withRouter<Props>((HotelListPageInner)));
