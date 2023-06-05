import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";

// Distance Learning React utils
import Sidenav from "utils/Sidenav";
import Configurator from "utils/Configurator";

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
import PricingPage from "layouts/pages/admin-page";
import Widgets from "layouts/pages/widgets";
import Invoice from "layouts/pages/account/invoice";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import Wizard from "layouts/applications/wizard";
import { useTranslation } from "react-i18next";
import PersistLogin from "components/PersistLogin";
import { SocketContext } from "context/socket";
import io from "socket.io-client";
import Unauthorized from "components/Unauthorized";
import AdminCourses from "layouts/pages/admin-page/Courses";
import AdminUsers from "layouts/pages/admin-page/Users";
import EditCourse from "layouts/pages/admin-page/Courses/components/EditCourse";
import EditUser from "layouts/pages/admin-page/Users/components/EditUser";
import { ErrorProvider } from "context/ErrorProvider";
import ImportMembers from "layouts/pages/admin-page/ImportMembers";
import useAuth from "hooks/useAuth";
import ImportStudents from "layouts/pages/admin-page/ImportStudents";
import ImportTeachers from "layouts/pages/admin-page/ImportTeachers";
import ImportCourses from "layouts/pages/admin-page/ImportCourses";
import VideoCallPage from "layouts/pages/VideoCallPage";
import routespl from "./routespl";
import routesen from "./routesen";
import routesru from "./routesru";
import routesua from "./routesua";

export default function App() {
  const { i18n } = useTranslation();

  const { auth } = useAuth();
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
    allRoutes.flatMap((route, index) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.key === "logout") {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
        return [
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}
            key={`dynamic-route-${index}`}
          >
            <Route exact path={route.route} element={route.component} key={route.key} />
          </Route>,
        ];
      }

      return null;
    });

  const configsButton = (
    <DLBox
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
    </DLBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <ErrorProvider>
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
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route
                  path="*"
                  element={
                    auth.roles.includes(1001) ? (
                      <Navigate to="/admin" />
                    ) : (
                      <Navigate to="/profile-overview" />
                    )
                  }
                />
                <Route path="/unauthorized" element={<Unauthorized />} key="unauthorized" />
                {getRoutes(routes)}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="/admin" element={<PricingPage />} key="admin-page" />
                  <Route
                    path="/admin/import-members"
                    element={<ImportMembers />}
                    key="import-members"
                  />
                  <Route path="/admin/users" element={<AdminUsers />} key="admin-users" />
                  <Route path="/admin/courses" element={<AdminCourses />} key="admin-courses" />
                  <Route
                    path="/admin/courses/edit-course"
                    element={<EditCourse />}
                    key="admin-edit-course"
                  />
                  <Route
                    path="/admin/users/edit-user"
                    element={<EditUser />}
                    key="admin-edit-user"
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
                  <Route path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
                  <Route path="/video-lesson/:id" element={<VideoCallPage />} key="video-lesson" />
                  <Route path="/pages/account/invoice" element={<Invoice />} key="event-info" />
                  <Route
                    path="/ecommerce/products/new-product"
                    element={<NewProduct />}
                    key="new-product"
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ErrorProvider>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ErrorProvider>
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
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/unauthorized" element={<Unauthorized />} key="unauthorized" />
              <Route
                path="*"
                element={
                  auth.roles?.includes(1001) ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/profile-overview" />
                  )
                }
              />
              {getRoutes(routes)}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin" element={<PricingPage />} key="admin-page" />
                <Route
                  path="/admin/import-members"
                  element={<ImportMembers />}
                  key="import-members"
                />
                <Route
                  path="/admin/import-students"
                  element={<ImportStudents />}
                  key="import-students"
                />
                <Route
                  path="/admin/import-courses"
                  element={<ImportCourses />}
                  key="import-courses"
                />
                <Route
                  path="/admin/import-teachers"
                  element={<ImportTeachers />}
                  key="import-teachers"
                />
                <Route path="/admin/users" element={<AdminUsers />} key="admin-users" />
                <Route path="/admin/courses" element={<AdminCourses />} key="admin-courses" />
                <Route
                  path="/admin/courses/edit-course"
                  element={<EditCourse />}
                  key="admin-edit-course"
                />
                <Route path="/admin/users/edit-user" element={<EditUser />} key="admin-edit-user" />
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
                <Route path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
                <Route path="/video-lesson/:id" element={<VideoCallPage />} key="video-lesson" />
                <Route path="/pages/account/invoice" element={<Invoice />} key="event-info" />
                <Route
                  path="/ecommerce/products/new-product"
                  element={<NewProduct />}
                  key="new-product"
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ErrorProvider>
    </ThemeProvider>
  );
}
