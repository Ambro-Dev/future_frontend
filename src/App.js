import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Distance Learning React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Distance Learning React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Distance Learning React routes

// Distance Learning React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Login from "layouts/authentication/sign-in";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import RequireAuth from "components/RequireAuth";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import Timeline from "layouts/pages/projects/timeline";
import Invoice from "layouts/pages/account/invoice";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import Wizard from "layouts/applications/wizard";
import { useTranslation } from "react-i18next";
import PersistLogin from "components/PersistLogin";
import { SocketContext } from "context/socket";
import io from "socket.io-client";
import Unauthorized from "components/Unauthorized";
import AdminCourses from "layouts/pages/pricing-page/Courses";
import AdminUsers from "layouts/pages/pricing-page/Users";
import ImportUsers from "layouts/pages/pricing-page/ImportUsers";
import EditCourse from "layouts/pages/pricing-page/Courses/components/EditCourse";
import routespl from "./routespl";
import routesen from "./routesen";
import routesru from "./routesru";
import routesua from "./routesua";

export default function App() {
  const { i18n } = useTranslation();
  const [routes, setRoutes] = useState(routespl);
  const [controller, dispatch] = useMaterialUIController();
  const { setSocket } = useContext(SocketContext);
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  useEffect(() => {
    const handleLanguageChange = () => {
      if (i18n.language === "en") {
        setRoutes(routesen);
      }
      if (i18n.language === "pl") {
        setRoutes(routespl);
      }
      if (i18n.language === "ru") {
        setRoutes(routesru);
      }
      if (i18n.language === "ua") {
        setRoutes(routesua);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // eslint-disable-next-line no-unused-vars
  const ROLES = {
    Teacher: 5150,
    Student: 1984,
    User: 2001,
    Admin: 1001,
  };

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.key === "logout") {
          return (
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route exact path={route.route} element={route.component} key={route.key} />
            </Route>
          );
        }
        return (
          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}>
            <Route exact path={route.route} element={route.component} key={route.key} />
          </Route>
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Distance Learning"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          <Route path="/authentication/sign-in" element={<Login />} key="sign-in" />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PersistLogin />}>
            {getRoutes(routes)}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<PricingPage />} key="admin-page" />
              <Route
                path="/admin/users/import"
                element={<ImportUsers />}
                key="admin-users-import"
              />
              <Route path="/admin/users" element={<AdminUsers />} key="admin-users" />
              <Route path="/admin/courses" element={<AdminCourses />} key="admin-courses" />
              <Route
                path="/admin/courses/edit-course"
                element={<EditCourse />}
                key="admin-edit-course"
              />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
              <Route
                path="/ecommerce/products/edit-product"
                element={<EditProduct />}
                key="edit-product"
              />
              <Route path="/applications/wizard" element={<Wizard />} key="wizard" />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}>
              <Route path="*" element={<Navigate to="/profile-overview" />} />
              <Route path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
              <Route path="/video-lesson/:id" element={<Timeline />} key="video-lesson" />
              <Route path="/pages/account/invoice" element={<Invoice />} key="event-info" />
              <Route
                path="/ecommerce/products/new-product"
                element={<NewProduct />}
                key="new-product"
              />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Distance Learning"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/authentication/sign-in" element={<Login />} key="sign-in" />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
          {getRoutes(routes)}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<PricingPage />} key="admin-page" />
            <Route path="/admin/users/import" element={<ImportUsers />} key="admin-users-import" />
            <Route path="/admin/users" element={<AdminUsers />} key="admin-users" />
            <Route path="/admin/courses" element={<AdminCourses />} key="admin-courses" />
            <Route
              path="/admin/courses/edit-course"
              element={<EditCourse />}
              key="admin-edit-course"
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
            <Route
              path="/ecommerce/products/edit-product"
              element={<EditProduct />}
              key="edit-product"
            />
            <Route path="/applications/wizard" element={<Wizard />} key="wizard" />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}>
            <Route path="*" element={<Navigate to="/profile-overview" />} />
            <Route path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
            <Route path="/video-lesson/:id" element={<Timeline />} key="video-lesson" />
            <Route path="/pages/account/invoice" element={<Invoice />} key="event-info" />
            <Route
              path="/ecommerce/products/new-product"
              element={<NewProduct />}
              key="new-product"
            />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
