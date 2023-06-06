// Distance Learning React layouts
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/profile/settings";
import GradesPage from "layouts/pages/grades-page/GradesPage";
import CoursesPage from "layouts/pages/CoursesPage";
import ChatPage from "layouts/pages/ChatPage";
import LogoutPage from "layouts/authentication/sign-out";
import Calendar from "layouts/pages/Calendar";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  { type: "title", title: "Profil", key: "profile-pages" },
  {
    type: "collapse",
    name: "Mój profil",
    key: "profile-overview",
    route: "/profile-overview",
    icon: <Icon fontSize="large">account_circle</Icon>,
    component: <ProfileOverview />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ustawienia",
    key: "settings",
    route: "/settings",
    icon: <Icon fontSize="medium">settings</Icon>,
    component: <Settings />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Wyloguj",
    key: "logout",
    route: "/sign-out",
    icon: <Icon fontSize="medium">logout</Icon>,
    component: <LogoutPage />,
    noCollapse: true,
  },

  { type: "divider", key: "divider-0" },
  { type: "title", title: "Strony", key: "title-pages" },
  {
    type: "collapse",
    name: "Kursy",
    key: "courses",
    route: "/courses",
    icon: <Icon fontSize="medium">class</Icon>,
    component: <CoursesPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Wiadomości",
    key: "chat",
    route: "/chat",
    icon: <Icon fontSize="medium">chat</Icon>,
    component: <ChatPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Oceny",
    key: "GradesPage",
    route: "/grades-page",
    icon: <Icon fontSize="medium">grade</Icon>,
    component: <GradesPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kalendarz",
    key: "calendar",
    route: "/calendar",
    icon: <Icon fontSize="medium">calendar_today</Icon>,
    component: <Calendar />,
    noCollapse: true,
  },
];

export default routes;
