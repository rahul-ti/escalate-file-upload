import React, { useState } from "react";
import ReactDOM from "react-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugin
registerPlugin(FilePondPluginFileValidateSize);

function App() {
  const [files, setFiles] = useState([]);
  //change submit button from disabled to enabled
  const [disabled, setDisabled] = useState(false);

  return (
    //div with width 400px flex padding 20px
    <div
      className="App"
      style={{
        width: "400px",
        display: "flex",
        gap: "0px 20px",
        flexDirection: "column",
      }}
    >
      <form style={{
        width: "400px",
        display: "flex",
        gap: "0px 20px",
        flexDirection: "column",
      }}  >
        {/* dropdown input with label */}
        <label>
          Escalation Team:
          <select required defaultValue={{}}>
            <option value="1">JIRA</option>
            <option value="2">FD Child</option>
          </select>
        </label>
        {/* single line input with label */}
        <br />
        <label>
          Subject:
          <input type="text" name="name" required onInput={()=>{}} />
        </label>
        {/* multi line input with label */}
        <br />
        <label>
          Description:
          <textarea name="description" required />
        </label>
        <FilePond
          files={files}
          server="https://httpbin.org/post"
          allowReorder={true}
          allowMultiple={true}
          onupdatefiles={setFiles}
          allowFileSizeValidation
          allowRevert	= {true}
          onprocessfilestart={() => setDisabled(true)}
          onprocessfile={() => setDisabled(false)}
          onprocessfileabort={() => setDisabled(false)}
          maxFileSize="20MB"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />

        <button disabled={disabled} style={{ width: "400px" }}>
          Escalate
        </button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
