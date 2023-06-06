// Distance Learning React layouts
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Calendar from "layouts/pages/Calendar";
import LogoutPage from "layouts/authentication/sign-out";

// @mui icons
import Icon from "@mui/material/Icon";
import Settings from "layouts/pages/profile/settings";
import GradesPage from "layouts/pages/grades-page/GradesPage";
import CoursesPage from "layouts/pages/CoursesPage";
import ChatPage from "layouts/pages/ChatPage";

const routes = [
  { type: "title", title: "Profile", key: "profile-pages" },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile-overview",
    route: "/profile-overview",
    icon: <Icon fontSize="large">account_circle</Icon>,
    component: <ProfileOverview />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    route: "/settings",
    icon: <Icon fontSize="medium">settings</Icon>,
    component: <Settings />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    route: "/sign-out",
    icon: <Icon fontSize="medium">logout</Icon>,
    component: <LogoutPage />,
    noCollapse: true,
  },

  { type: "divider", key: "divider-0" },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <Icon fontSize="medium">class</Icon>,
    component: <CoursesPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chat",
    key: "chat",
    route: "/chat",
    icon: <Icon fontSize="medium">chat</Icon>,
    component: <ChatPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Grades",
    key: "GradesPage",
    route: "/grades-page",
    icon: <Icon fontSize="medium">grade</Icon>,
    component: <GradesPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Calendar",
    key: "calendar",
    route: "/calendar",
    icon: <Icon fontSize="medium">calendar_today</Icon>,
    component: <Calendar />,
    noCollapse: true,
  },
];

export default routes;
