# Hotels list componentization

In this sample we are going to take as start point a component that shows a list of 
hotels available, the initial implementation is weak and hard to maintain, following
this readme guide we will moving towards a more maintanable componentized version.

# Steps

- Let's start by copying the conent from 00_start.

- Let's install the project package dependencies.

```bash
npm install
```

- Let's run a dummy rest-api server:

```
npm run mock-server
```

- Let's run the sample and check current ui aspect.

```bash
npm start
```

-  Let's check the _hotelListPage_ component that has been already built:

_./src/pages/list/hotelListPage.tsx_

```javascript
import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../model";
import { getHotelList } from "../../api/hotel";
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
        {
          this.state.hotelList.map(
            (hotel) =>
              <Card className={classes.card} key={hotel.id}>
                <CardHeader 
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                    {hotel.hotelRating}
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }                  
                  title={hotel.name} 
                  subheader={hotel.address1}
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
                      image={hotel.thumbNailUrl}
                      title={hotel.name}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      {hotel.shortDescription}
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
          )
        }
      </div>
    )
  }
}

export const HotelListPage = withStyles(styles)(withRouter<Props>((HotelListPageInner)));
``` 

- Let's analyze weak points of this implementation:

  - We got data access logic and presentational logic mixed up. Mitigation proposal: create a 
  container component that will hold component and let the card implementation to a presentational
  component.

  - We are travesing through a list of hotels and drawing each hotels on the same component.

  - The presentational part is hard to maintain, it doesn't follow the same level of abstraction level
  to edit the body or header we have to traverse through all the detailed code, what would happen if
  we add a collapible extension?...

  - The hotel info content itself is something candidate to be reused in other components, not only in the card
  e.g. a hover or...

- Ideally how should look like this page (pseudocode):

_pseudocode_
_./src/pages/hotelListPage.container.tsx_

```jsx
import * as React from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { HotelEntity } from "../../model";
import { getHotelList } from "../../api/hotel";

interface State {
  hotelList: HotelEntity[];
}


interface Props extends RouteComponentProps {
}

class HotelListPageContainer extends React.Component<Props, State> {

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
      <HotelListPage list={this.state.hotelList}/>
    )
  }
}

export const HotelListPageContainer = withRouter<Props>(HotelListPageInner);
```
_pseudocode_
_./src/pages/hotelListPage.component.tsx_

```jsx
import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../model";


interface Props {
  hotelList: HotelEntity[];
}

export const HotelListPageInner = (props : Props) =>
      <div style={
        {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
        {
          this.state.hotelList.map(
            (hotel) => 
              <HotelCard hotel={hotel}/>
          )
        }
      </div>
    )
  }
}

export const HotelListPage = withStyles(styles)(HotelListPageInner);
```

-  Now we only need to chop down Card header, content and actions.

_pseudocode_
_./src/pages/components/hotelCard.component.tsx_

```jsx
export const HotelCard = (props : Props) =>
      <Card className={classes.card} key={hotel.id}>
        <HotelCardHeader 
          name={hotel.name}
          address={hotel.address1}
          rating={props.hotel.hotelRating}
        />              
        
        <CardContent>
          <HotelInfo hotel={props.hotel}/>
        </CardContent>
        
        <HotelCardActions/>                
      </Card>
```


> We could further refactor this promoting to common the hotel info component, and moving to a pods solution structure (we will see it later on).

> As a bonus by doing this we can move our container to be redux based quite easily (we only need to replace the container).



- Let's start the refactor step by step.

- First of all let's divide the current component in two:
  - Container (smart).
  - Presentational (dumb).

_./src/pages/list/hotelListPage.container.tsx_

```jsx
import * as React from "react"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { HotelEntity } from "../../model";
import { getHotelList } from "../../api/hotel";
import {HotelListPage} from './hoteListPage.component';

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
```

- Let's remove hotelListPage.tsx (remove _./src/pages/list/hotelListPage.tsx_).

- Let's update the _index.ts_ file to poin to the pageContainer file.

_./src/pages/list/index.ts_

```diff
- export * from './hoteListPage';
+ export * from './hotelListPage.container.tsx';
```

- Now let's create the page presentational component (dumb), we will start by just adding a 
simple loop and showing the hotel name (we make this to ensure we have successfully completed
the previous steps).

_./src/pages/hotelListPage.component.tsx_

```jsx
import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { HotelEntity } from "../../model";


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
              <h2 key={hotel.id}>{hotel.name}</h2>
          )
        }
      </div>

export const HotelListPage = withStyles(styles)(HotelListPageInner);
```

- Le'ts update the router switch map to indicate the new page entry point.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
- import { HotelListPage } from './pages/list';
+ import { HotelListPageContainer } from './pages/list';
import { PageB } from './pages/b';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
```

```diff
  <Switch>
-    <Route exact={true} path="/" component={HotelListPage} />
+    <Route exact={true} path="/" component={HotelListPageContainer} />
    <Route path="/pageB" component={PageB} />
  </Switch>
```

- Let's run the project and check that we are moving in the right direction.

```bash
npm start
```

- Now let's keep on componentizing this page:


_./src/pages/hotelListPage.component.tsx_

```diff
import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { HotelEntity } from "../../model";
+ import { HotelCard } from './components/hotelCard'

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
-               <h2 key={hotel.id}>{hotel.name}</h2>
+               <HotelCard hotel={hotel} key={hotel.id}/>
          )
        }
      </div>

export const HotelListPage = withStyles(styles)(HotelListPageInner);
```

- Let's breakdown HotelCard step by step, first we will just dump in the file
the content as it was in the original page.

_./src/pages/list/components/hotelCard.tsx_

```tsx
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
```

- We could just stop here, but if we take a look to _HotelCard_ it can be a bit hard to understand or 
maintain, let's breakdown this card:

- First we will create a _HotelHeader_ component.

_./src/pages/list/components/hotelCardHeader.tsx_

```jsx
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
```

- Let's update our _hotelCard.tsx_

_./src/pages/list/hotelCard.tsx_

```diff
import * as React from "react"
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
- import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography/Typography";
import { HotelEntity } from "../../../model";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
- import Avatar from "@material-ui/core/Avatar/Avatar";
- import red from '@material-ui/core/colors/red';
- import MoreVertIcon from '@material-ui/icons/MoreVert';
+ import {HotelCardHeader} from './hotelCardHeader';

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
-  avatar: {
-    backgroundColor: red[500],
-  },
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
+        <HotelCardHeader
+          name={props.hotel.name}
+          address={props.hotel.address1}
+          rating={props.hotel.hotelRating}
+        />      
-        <CardHeader
-          avatar={
-            <Avatar aria-label="Recipe" className={classes.avatar}>
-              {props.hotel.hotelRating}
-            </Avatar>
-          }
-          action={
-            <IconButton>
-              <MoreVertIcon />
-            </IconButton>
-          }
-          title={props.hotel.name}
-          subheader={props.hotel.address1}
-        />
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
```
