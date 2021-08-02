import React, { Component } from 'react';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltOutlined from '@material-ui/icons/ListAltOutlined';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorageIcon from '@material-ui/icons/Storage';

import { withStyles } from "@material-ui/core/styles";

import Status from './Status';
import Camps from './Camps';
import Fonts from './Fonts';
import Log from './Log';

const drawerWidth = 220;
const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarTitle: {
    justifyContent: 'flex-start',
    padding: '0 10px',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    color:"white",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop:theme.spacing(8),
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  containerStretched:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: `calc(100vh - ${theme.spacing(8)}px)`,
  }

});



class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.store = this.props.store;
    this.state = {
      open:false,
      section:"status",
    }

    this.drawer_openHandler=this.drawer_openHandler.bind(this);
    this.drawer_closeHandler=this.drawer_closeHandler.bind(this);
  }


  componentDidMount() {
    this.unsubscribe=this.store.subscribe(()=>{this.onStoreChange()});
    this.mounted=true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted=false;
  }

  onStoreChange() {
    if (this.mounted) {
      let state=this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
    }
  }

  drawer_openHandler() {
    this.setState({
      ...this.state,
      open:true,
    });
  };

  drawer_closeHandler() {
    this.setState({
      ...this.state,
      open:false,
    });
  };

  setSection(sectionName) {
    this.setState({
      ...this.state,
      section:sectionName,
    });
  }


  render() {
    const { classes } = this.props;

    const open=this.state.open;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.drawer_openHandler}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Дашборд Adverter
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.drawer_closeHandler}>
              <Typography component="h2" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                Меню
              </Typography>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <List>
            <ListItem button onClick={()=>{this.setSection("status")}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Состояние" />
            </ListItem>
            <ListItem button onClick={()=>{this.setSection("camps")}}>
              <ListItemIcon>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Кампании" />
            </ListItem>
            <ListItem button onClick={()=>{this.setSection("fonts")}}>
              <ListItemIcon>
                <FontDownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Шрифты" />
            </ListItem>
            <ListItem button onClick={()=>{this.setSection("log")}}>
              <ListItemIcon>
                <ListAltOutlined />
              </ListItemIcon>
              <ListItemText primary="Лог" />
            </ListItem>
            <ListItem button onClick={()=>{this.setSection("builders")}}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Серверы сборки" />
            </ListItem>
          </List>

        </Drawer>
        <main className={classes.content}>
            { (
                ()=>{
                  switch (this.state.section) {
                    case "status": {
                      return (
                        <Container maxWidth="lg" className={classes.container}>
                          <Status
                            process={this.state.process}
                            performance={this.state.performance}
                            builders={this.state.builders}
                            tasks={this.state.tasks}
                          />
                        </Container>
                      );
                    }
                    case "camps": {
                      return (
                        <Container maxWidth="lg" className={classes.containerStretched}>
                          <Camps
                            reports={this.state.reports}
                          />
                        </Container>
                      );
                    }
                    case "fonts": {
                      return (
                        <Container maxWidth="lg" className={classes.container}>
                          <Fonts
                            fonts={this.state.fonts}
                          />
                        </Container>
                      );
                    }
                    case "log": {
                      return (
                        <Container maxWidth="lg" className={classes.containerStretched}>
                          <Log
                            log={this.state.log}
                          />
                        </Container>
                      );
                    }
                    default:
                      return [];
                  }
                }
              )()
            }
        </main>
      </div>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(Dashboard);
