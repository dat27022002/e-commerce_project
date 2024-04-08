import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button, IconButton, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useAuth } from '~/hooks/useAuth';
import { useState } from 'react';

const ToolBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <section className="flex items-center gap-6 md:gap-10">
            <SearchOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <FavoriteBorderOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            <ShoppingCartOutlinedIcon className="h-[24px] hover:cursor-pointer hover:scale-[1.1]" />
            {(() => {
                if (user) {
                    return (
                        <>
                            <IconButton onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                                <MoreVertIcon />
                            </IconButton>
                            <Button
                                variant="text"
                                className="!text-slate-600 !border-slate-600 !normal-case flex items-center gap-2"
                                onClick={() => logout(() => navigate(routes.HOME))}
                            >
                                Logout <LogoutOutlinedIcon />
                            </Button>
                            <Popper
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                placement="bottom-start"
                                sx={{
                                    zIndex: 11,
                                }}
                            >
                                <Paper sx={{ width: 'auto', maxWidth: '100%' }}>
                                    <MenuList>
                                        <MenuItem
                                            sx={{ display: 'flex', gap: '8px' }}
                                            onClick={() => navigate(routes.PROFILE)}
                                        >
                                            <AccountCircleIcon />
                                            <Typography>Profile</Typography>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Popper>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Button
                                variant="text"
                                className="!text-slate-600 !border-slate-600 !normal-case flex items-center gap-2"
                                onClick={() => navigate(routes.LOGIN)}
                            >
                                Sign in <LoginOutlinedIcon />
                            </Button>
                        </>
                    );
                }
            })()}
        </section>
    );
};

export default ToolBar;
