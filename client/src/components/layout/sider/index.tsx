/* The Sider component has been refactored to enhance readability and maintainability. The changes include         organizing the   *  *  * imports, separating the component logic into smaller functions, and improving the structure of the code.

* # Key changes:

* 1. Imported components and hooks have been organized in separate blocks for better readability.
* 2. The component logic has been split into smaller functions to improve code organization and reusability.
* 3. The useEffect hook has been properly indented and placed inside the component.
* 4. The renderTreeView function now has a more descriptive name and improved readability.
* 5. The dashboard and logout menu items are conditionally rendered based on user authentication status and availability of the dashboard * resource.
* 6. The renderSider function handles rendering the default structure or invoking a custom render function if provided.
* 7. The JSX structure has been formatted and aligned properly to enhance readability.

These changes aim to improve the codebase by enhancing readability, separating concerns, and promoting reusability.
*/
/* eslint-disable no-shadow */

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Sider as DefaultSider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Button,
  IconButton,
  MuiList,
} from '@pankod/refine-mui';
import {
  ListOutlined,
  Logout,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  Dashboard,
} from '@mui/icons-material';
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useMenu,
  useRefineContext,
} from '@pankod/refine-core';
import { useLocation } from '@pankod/refine-react-router-v6';

import { Title as DefaultTitle } from '../title';

/**
 * Sidebar Component
 * Renders the sidebar navigation menu with collapsible menu items.
 * The sidebar can be expanded or collapsed using the ChevronLeft and ChevronRight icons.
 * The menu items are provided through the ITreeMenu type and CanAccess component.
 * The component uses various hooks from the @pankod/refine-core and @pankod/refine-mui libraries.
 */
export const Sider: typeof DefaultSider = ({ render }) => {
  // Define the Sider component which is a customized version of DefaultSider

  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const { pathname } = useLocation();

  console.log('pathname', pathname); // Log the current pathname

  const drawerWidth = () => {
    if (collapsed) return 64;
    return 200;
  };

  const t = useTranslate();
  const { Link } = useRouterContext();
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: mutateLogout } = useLogout();
  const Title = useTitle();

  const [open, setOpen] = useState<{ [k: string]: any }>({}); // Initialize the open state as an empty object
  // ...

  React.useEffect(() => {
    // useEffect to handle opening and closing of menu items

    setOpen((previousOpen) => {
      const previousOpenKeys: string[] = Object.keys(previousOpen);
      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = Title ?? DefaultTitle; // Determine the component to render as the title

  const handleClick = (key: string) => {
    // Handle the click event on a menu item
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) =>
    tree.map((item: ITreeMenu) => {
      // Iterate over the tree menu items and render each item

      const { icon, label, route, name, children, parentName } = item;
      const isOpen = open[route || ''] || false;

      const isSelected = route === selectedKey;
      const isNested = !(parentName === undefined);

      if (children.length > 0) {
        // Render collapsible menu item if it has children

        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={route}>
              <Tooltip
                title={label ?? name}
                placement="right"
                disableHoverListener={!collapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    // Handle the click event on the menu item

                    if (collapsed) {
                      setCollapsed(false);
                      if (!isOpen) {
                        handleClick(route || '');
                      }
                    } else {
                      handleClick(route || '');
                    }
                  }}
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: 'center',
                    '&.Mui-selected': {
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: 'center',
                      minWidth: 36,
                      color: 'primary.contrastText',
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: '16px',
                      fontWeight: isSelected ? 'bold' : 'normal',
                    }}
                  />
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              {!collapsed && (
                <Collapse in={open[route || '']} timeout="auto" unmountOnExit>
                  <MuiList component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </MuiList>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      // Render non-collapsible menu item
      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={Link}
              to={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                '&.Mui-selected': {
                  '&:hover': {
                    backgroundColor: isSelected ? '#1e36e8' : 'transparent',
                  },
                  backgroundColor: isSelected ? '#475be8' : 'transparent',
                },
                justifyContent: 'center',
                margin: '10px auto',
                borderRadius: '12px',
                minHeight: '56px',
                width: '90%',
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: 36,
                  color: isSelected ? '#fff' : '#808191',
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: '16px',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  color: isSelected ? '#fff' : '#808191',
                  marginLeft: '10px',
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });

  const dashboard = hasDashboard ? (
    // Render the dashboard menu item if the user has access to the dashboard resource
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate('dashboard.title', 'Dashboard')}
        placement="right"
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          component={Link}
          to="/"
          selected={selectedKey === '/'}
          onClick={() => {
            setOpened(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            '&.Mui-selected': {
              '&:hover': {
                backgroundColor: pathname === '/' ? '#1e36e8' : 'transparent',
              },
              backgroundColor: pathname === '/' ? '#475be8' : 'transparent',
            },
            justifyContent: 'center',
            margin: '10px auto',
            borderRadius: '12px',
            minHeight: '56px',
            width: '90%',
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: 36,
              color: pathname === '/' ? '#fff' : '#808191',
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate('dashboard.title', 'Dashboard')}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: '16px',
              fontWeight: pathname === '/' ? 'bold' : 'normal',
              color: pathname === '/' ? '#fff' : '#808191',
              marginLeft: '10px',
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  // The 'dashboard' variable holds the rendered dashboard menu item if available, otherwise it is set to 'null'.
  // The dashboard menu item is rendered as a clickable ListItemButton that navigates to the '/' route.
  // The styling of the menu item depends on whether it is selected or hovered over.
  // The text and icon colors change based on the selected state and the current pathname.
  // This menu item is conditionally rendered based on the availability of the dashboard resource for the user.

  const logout = isExistAuthentication && (
    // Render the logout menu item if the user is authenticated
    <Tooltip
      title={t('buttons.logout', 'Logout')}
      placement="right"
      disableHoverListener={!collapsed}
      arrow
    >
      <ListItemButton
        key="logout"
        onClick={() => mutateLogout()}
        sx={{
          justifyContent: 'center',
          margin: '10px auto',
          borderRadius: '12px',
          minHeight: '56px',
          width: '90%',
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
            minWidth: 36,
            color: '#808191',
          }}
        >
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary={t('buttons.logout', 'Logout')}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: '16px',
          }}
        />
      </ListItemButton>
    </Tooltip>
  );

  // The 'logout' variable holds the rendered logout menu item if the user is authenticated, otherwise it is set to 'null'.
  // The logout menu item is rendered as a clickable ListItemButton that triggers the 'mutateLogout' function on click.
  // The styling of the menu item includes centering, margin, borderRadius, minHeight, and width properties.
  // The text and icon colors are set to '#808191'.
  // This menu item is conditionally rendered based on the user's authentication status.

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      // If a custom render function is provided, invoke it with the specified props
      return render({
        dashboard,
        logout,
        items,
        collapsed,
      });
    }

    // If no custom render function is provided, render the default structure
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  // The 'items' variable holds the rendered tree view menu items based on the 'menuItems' and 'selectedKey' values.
  // The 'renderSider' function conditionally renders the custom structure if a 'render' function is provided, otherwise it renders the default structure.
  // The default structure includes the 'dashboard' menu item, followed by the 'items' tree view menu items, and finally the 'logout' menu item.
  // This allows flexibility in rendering the sider based on custom requirements.

  // The following code renders the Sider component.

  const drawer = (
    <MuiList disablePadding sx={{ mt: 1, color: '#808191' }}>
      {renderSider()}
    </MuiList>
  );

  return (
    <>
      {/* Hidden box to adjust the width of the Sider on different screen sizes */}
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: 'none',
            md: 'block',
          },
          transition: 'width 0.3s ease',
        }}
      />

      {/* Sider component */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: 'flex',
        }}
      >
        {/* Temporary Drawer for smaller screens */}
        <Drawer
          variant="temporary"
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 256,
              bgcolor: '#FCFCFC',
            },
          }}
        >
          {/* Render the Sider title */}
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RenderToTitle collapsed={false} />
          </Box>

          {/* Render the drawer content */}
          {drawer}
        </Drawer>

        {/* Permanent Drawer for larger screens */}
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 0 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              bgcolor: '#FCFCFC',
              overflow: 'hidden',
              transition: 'width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            },
          }}
          open
        >
          {/* Render the Sider title */}
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RenderToTitle collapsed={collapsed} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {/* Render the drawer content */}
            {drawer}
          </Box>

          {/* Button to collapse/expand the Sider */}
          <Button
            sx={{
              background: '#475BE8',
              color: 'primary.contrastText',
              textAlign: 'center',
              borderRadius: 0,
              borderTop: '1px solid #ffffff1a',
              '&:hover': {
                background: '#1e36e8',
              },
            }}
            fullWidth
            size="large"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Drawer>

        {/* Toggle button for smaller screens */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: '64px',
            left: '0px',
            borderRadius: '0 6px 6px 0',
            bgcolor: '#475be8',
            zIndex: 1199,
            width: '36px',
          }}
        >
          <IconButton
            sx={{ color: '#fff', width: '36px' }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
