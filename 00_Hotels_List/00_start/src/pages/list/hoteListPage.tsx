import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LoginEntity, createEmptyLogin } from '../../model/login';
import { isValidLogin } from '../../api/login';
import { NotificationComponent } from '../../common'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography/Typography";

// https://material-ui.com/guides/typescript/
const styles = theme => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
});



interface State {
  loginInfo: LoginEntity;
  showLoginFailedMsg: boolean;
}


interface Props extends RouteComponentProps, WithStyles<typeof styles> {
}

class HotelListPageInner extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      loginInfo: createEmptyLogin(),
      showLoginFailedMsg: false,
    }
  }

  onLogin = () => {
    if (isValidLogin(this.state.loginInfo)) {
      this.props.history.push('/pageB');
    } else {
      this.setState({ showLoginFailedMsg: true });
    }
  }

  onUpdateLoginField = (name: string, value) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [name]: value,
      }
    })
  }

  onTexFieldChange = (fieldId) => (e) => {
    this.onUpdateLoginField(fieldId, e.target.value);
  }


  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader title="Hotel name" />
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="subheading" gutterBottom>
                Hotel Card
              </Typography>
            </div>
          </CardContent>
        </Card>
        <NotificationComponent
          message="Invalid login or password, please type again"
          show={this.state.showLoginFailedMsg}
          onClose={() => this.setState({ showLoginFailedMsg: false })}
        />
      </>
    )

  }
}

export const HotelListPage = withStyles(styles)(withRouter<Props>((HotelListPageInner)));
