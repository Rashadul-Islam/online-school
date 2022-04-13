import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import QuizIcon from '@mui/icons-material/Quiz';
import HistoryIcon from '@mui/icons-material/History';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import SchoolIcon from '@mui/icons-material/School';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const dispatch = useDispatch();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = () => {
        dispatch(logout());
    };
    const role = useSelector((state) => state.userLogin.userInfo.role);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/home">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Home" />
                    </ListItem>
                    {
                        role === "tutor" &&
                        <>
                            <ListItem button component={Link} to="/allCourse">
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="All Course" />
                            </ListItem>
                            <ListItem button component={Link} to="/addCourse">
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Add Course" />
                            </ListItem>
                            <ListItem button component={Link} to="/allMCQ">
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="All MCQ" />
                            </ListItem>
                        </>
                    }
                    {
                        role === "student" &&
                        <>
                            <ListItem button component={Link} to="/allCourse">
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="All Course" />
                            </ListItem>
                            <ListItem button component={Link} to="/enrolledCourses">
                                <ListItemIcon>
                                    <SubscriptionsIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Enrolled Courses" />
                            </ListItem>
                            <ListItem button component={Link} to="/exam">
                                <ListItemIcon>
                                    <QuizIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Exam" />
                            </ListItem>
                            <ListItem button component={Link} to="/results">
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="Results" />
                            </ListItem>
                        </>
                    }

                    {
                        role === "admin" &&
                        <>
                            <ListItem button component={Link} to="/allteachers">
                                <ListItemIcon>
                                    <CastForEducationIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="All Teacher" />
                            </ListItem>
                            <ListItem button component={Link} to="/allStudents">
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText className='item_hover' primary="All Student" />
                            </ListItem>
                        </>
                    }

                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="View Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/editProfile">
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Edit Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/changePassword">
                        <ListItemIcon>
                            <LockResetIcon />
                        </ListItemIcon>
                        <ListItemText className='item_hover' primary="Change Password" />
                    </ListItem>
                    <ListItem button onClick={logoutHandler}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;