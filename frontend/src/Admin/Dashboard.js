// Dashboard.js
import React, { useState } from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import JobAdd from './Jobadd';
import Blogs from './Blogs';
import Service from './Service';
import Industries from './Industries';
import Internship from './Internship';
import AdminContact from './AdminContact';
import SubmittedResumes from './SubmittedResumes';
import Register from './Register';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AdminCounter from './AdminCounter';
import ClientManagement from './ClientManagement';
import AdminTeamUpload from './AdminTeamUpload';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const theme = createTheme();

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Internship');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleLogoutDialogClose();
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Internship':
        return <Typography paragraph><Internship /></Typography>;
      case 'Job':
        return <Typography paragraph><JobAdd /></Typography>;
      case 'Submited Resume':
        return <Typography paragraph><SubmittedResumes /></Typography>;
      case 'Industries':
        return <Typography paragraph><Industries /></Typography>;
      case 'Blogs':
        return <Typography paragraph><Blogs /></Typography>;
      case 'Services':
        return <Typography paragraph><Service /></Typography>;
      case 'Contact':
        return <Typography paragraph><AdminContact /></Typography>;
      case 'Register':
        return <Typography paragraph><Register /></Typography>;
        case 'Counter' :
          return <Typography paragraph><AdminCounter/></Typography>;
          case 'Client':
            return <Typography paragraph><ClientManagement/></Typography>;
            case 'Team' :
              return <Typography paragraph><AdminTeamUpload/></Typography>
      default:
        return <Typography paragraph>Welcome to your Dashboard!</Typography>;
    }
  };

  const getIcon = (text) => {
    switch (text) {
      case 'Internship':
        return <WorkIcon />;
      case 'Job':
        return <WorkIcon />;
      case 'Submited Resume':
        return <DescriptionIcon />;
      case 'Industries':
        return <BusinessIcon />;
      case 'Blogs':
        return <ArticleIcon />;
      case 'Services':
        return <SettingsIcon />;
      case 'Contact':
        return <ContactMailIcon />;
      case 'Register':
        return <HowToRegIcon />
      default:
        return <InboxIcon />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleLogoutDialogOpen}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Internship', 'Job', 'Submited Resume', 'Industries', 'Client'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleMenuItemClick(text)}>
                  <ListItemIcon>
                    {getIcon(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Blogs', 'Services', 'Contact', 'Register','Counter','Team'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleMenuItemClick(text)}>
                  <ListItemIcon>
                    {getIcon(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {renderContent()}
        </Main>
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Dashboard;
