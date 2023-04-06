import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      profile: {
        profileInfo: "profile information",
        fullname: "fullName",
        email: "email",
        studentnumber: "studentNumber",
        conversations: "Conversations",
        noconversations: "No conversations",
        courses: "Courses",
        allcourses: "All my Courses",
        gotocourse: "go to course",
        message: "message",
      },
      sidenav: {
        myprofile: "My Profile",
        settings: "Settings",
        logout: "Logout",
        courses: "Courses",
        chat: "Chat",
        grades: "Grades",
        calendar: "Calendar",
      },
      settings: {
        changepi: "change profile image",
        changepass: "Change password",
        passreq1: "One special characters",
        passreq2: "Min 6 characters",
        passreq3: "One number (2 are recommended)",
        passreq4: "Change it often",
        currpass: "Current Password",
        newpass: "New Password",
        confpass: "Confirm New Password",
        passreq: "Password requirements",
        pleasefollow: "Please follow this guide for a strong password",
        update: "update password",
      },
      login: {
        signin: "SIGN IN",
        email: "Email",
        password: "Password",
        remember: "Remember me",
      },
      courses: {
        courses: "Courses",
        save: "Save",
        cancel: "Cancel",
        add: "Add course",
        members: "members",
        nocourses: "You have no courses",
      },
      courseinfo: {
        descinfo: "Description / Info",
        callang: "en",
        caltitle: "calendar",
        files: "Files",
        nofiles: "No files yet",
        addfile: "Add File",
        upcevents: "Upcoming Events",
        addevent: "Add Event",
        date: "us-US",
        noevents: "No events yet",
        hour: "hour12",
      },
    },
  },
  pl: {
    translation: {
      profile: {
        profileInfo: "Informacje użytkownika",
        fullname: "imięNazwisko",
        email: "email",
        studentnumber: "numerStudenta",
        conversations: "Rozmowy",
        noconversations: "Nie masz jeszcze żadnych rozmów",
        courses: "Kursy",
        allcourses: "Wszystkie moje kursy",
        gotocourse: "idź do kursu",
        message: "wiadomość",
      },
      sidenav: {
        myprofile: "My Profile",
        settings: "Ustawienia",
        logout: "Wyloguj",
        courses: "Kursy",
        chat: "Wiadomości",
        grades: "Oceny",
        calendar: "Kalendarz",
      },
      settings: {
        changepi: "Zmień avatar użytkownika",
        changepass: "Zmień hasło",
        passreq1: "Jeden znak specjalny",
        passreq2: "Mininmum 6 znaków",
        passreq3: "Jeden numer (2 zalecane)",
        passreq4: "Często zmieniaj hasło",
        currpass: "Obecne hasło",
        newpass: "Nowe hasło",
        confpass: "Zatwierdź nowe hasło",
        passreq: "Wymagania dotyczące hasła",
        pleasefollow: "Dla silnego hasła postępuj zgodnie z instukcjami",
        update: "zmień hasło",
      },
      login: {
        signin: "ZALOGUJ SIĘ",
        email: "Email",
        password: "Hasło",
        remember: "Zapamiętaj mnie",
      },
      courses: {
        courses: "Kursy",
        save: "Zapisz",
        cancel: "Anuluj",
        add: "Dodaj kurs",
        members: "członków",
        nocourses: "Nie masz żadncyh kursów",
      },
      courseinfo: {
        descinfo: "Opis / Informacje",
        callang: "pl",
        caltitle: "kalendarz",
        files: "Pliki",
        nofiles: "Nie ma jescze żadnych plików",
        addfile: "Dodaj plik",
        upcevents: "Nadchodzące wydarzenia",
        addevent: "Zaplanuj wydarzenie",
        date: "pl-PL",
        noevents: "Brak wydarzeń, nic nie zaplanowano",
        hour: "hour24",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pl", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
