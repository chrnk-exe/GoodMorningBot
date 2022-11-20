import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavigationBar from './NavigationBar';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png';
import TextField from '@mui/material/TextField';
import SearchBar from './SearchBar';
// import { Link } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		width: drawerWidth,
		maxWidth: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		overflowX: 'hidden',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(0),
			},
		}),
	},
}));

export default function PrimarySearchAppBar({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState<boolean>(true);
	const drawerToggler = () => setOpen(prev => !prev);

	const navigate = useNavigate();

	const logOutHandler = () => {
		window.localStorage.clear();
		window.location.reload();
	};

	return (
		<Box display={'flex'} sx={{ flexGrow: 1 }}>
			<AppBar position="absolute" open={open}>
				<Toolbar>
					<Box
						sx={{ width: '100%' }}
						display="flex"
						justifyContent="space-between">
						<Box display="flex" alignItems='center' justifyContent='flex-start'>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								// aria-label="open drawer"
								onClick={drawerToggler}
								sx={{ mr: 2 }}>
								{open ? (
									<ChevronLeftIcon />
								) : (
									<ChevronRightIcon />
								)}
							</IconButton>
							<Typography
								variant="h5"
								noWrap
								component="div">
								zxchrnk admin panel
							</Typography>
						</Box>

						<Box display='flex' justifyContent='space-between' gap={1} alignItems='center'>
							<SearchBar />
							<Button
								color="secondary"
								variant="contained"
								size="large"
								sx={{ color: '#FFFFF1' }}
								onClick={logOutHandler}>
								<Typography
									variant="body1"
									noWrap
									component="div"
								// sx={{ display: { xs: 'none', sm: 'block' } }}
								>
								Log out
								</Typography>
							</Button>
						</Box>
						
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				open={open}
				anchor={'left'}
				sx={{
					height: '100vh',
				}}
				onClose={drawerToggler}>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						// borderBottom: '1px solid lightgrey',
						px: [1],
					}}>
					<IconButton disableRipple onClick={drawerToggler}>
						<img src={logo} height={40} alt="" />
					</IconButton>
				</Toolbar>
				<NavigationBar />
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: theme =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					// height: 'calc(100vh - 8px)',
					overflow: 'auto',
					marginTop: 8,
				}}>
				{children}
			</Box>
		</Box>
	);
}
