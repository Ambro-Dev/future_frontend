// Distance Learning React layouts
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Kanban from "layouts/applications/kanban";
import Chat from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import LogoutPage from "layouts/authentication/sign-out";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  { type: "title", title: "Профиль", key: "profile-pages" },
  {
    type: "collapse",
    name: "Мой профиль",
    key: "profile-overview",
    route: "/profile-overview",
    icon: <Icon fontSize="large">account_circle</Icon>,
    component: <ProfileOverview />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Настройки",
    key: "settings",
    route: "/settings",
    icon: <Icon fontSize="medium">settings</Icon>,
    component: <Settings />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Выход из системы",
    key: "logout",
    route: "/sign-out",
    icon: <Icon fontSize="medium">logout</Icon>,
    component: <LogoutPage />,
    noCollapse: true,
  },

  { type: "divider", key: "divider-0" },
  { type: "title", title: "Страницы", key: "title-pages" },
  {
    type: "collapse",
    name: "Курсы",
    key: "courses",
    route: "/courses",
    icon: <Icon fontSize="medium">class</Icon>,
    component: <Kanban />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Чат",
    key: "chat",
    route: "/chat",
    icon: <Icon fontSize="medium">chat</Icon>,
    component: <Chat />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Градусы",
    key: "billing",
    route: "/billing",
    icon: <Icon fontSize="medium">grade</Icon>,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Календарь",
    key: "calendar",
    route: "/calendar",
    icon: <Icon fontSize="medium">calendar_today</Icon>,
    component: <Calendar />,
    noCollapse: true,
  },
];

export default routes;
