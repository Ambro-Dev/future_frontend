/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/
// react-quill components
import ReactQuill from "react-quill";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the DLEditor
import DLEditorRoot from "components/DLEditor/DLEditorRoot";

// Distance Learning React context
import { useMaterialUIController } from "context";

function DLEditor(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <DLEditorRoot ownerState={{ darkMode }}>
      <ReactQuill theme="snow" {...props} />
    </DLEditorRoot>
  );
}

export default DLEditor;
