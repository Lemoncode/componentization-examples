import * as React from "react"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { HotelEntity } from "../../model";
import { getHotelList } from "../../api/hotel";
import {HotelListPage} from './hotelListPage.component';

interface State {
  hotelList: HotelEntity[];
}

interface Props extends RouteComponentProps {
}

class HotelListPageContainerInner extends React.Component<Props, State> {

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
    return (
      <HotelListPage hotelList={this.state.hotelList}/>
    )
  }
}

export const HotelListPageContainer = withRouter<Props>(HotelListPageContainerInner);
