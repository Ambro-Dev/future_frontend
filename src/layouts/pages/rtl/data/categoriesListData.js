/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import DLTypography from "components/DLTypography";

const categoriesListData = [
  {
    color: "dark",
    icon: "launch",
    name: "الأجهزة",
    description: (
      <>
        250 في المخزن,{" "}
        <DLTypography variant="caption" color="text" fontWeight="medium">
          346+ تم البيع
        </DLTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "book_online",
    name: "تذاكر",
    description: (
      <>
        123 مغلق,{" "}
        <DLTypography variant="caption" color="text" fontWeight="medium">
          15 افتح
        </DLTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "priority_high",
    name: "سجلات الخطأ",
    description: (
      <>
        1 is نشيط,{" "}
        <DLTypography variant="caption" color="text" fontWeight="medium">
          40 مغلق
        </DLTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "insert_emoticon",
    name: "المستخدمين السعداء",
    description: (
      <DLTypography variant="caption" color="text" fontWeight="medium">
        + 430
      </DLTypography>
    ),
    route: "/",
  },
];

export default categoriesListData;
