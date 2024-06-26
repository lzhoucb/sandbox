import { useEffect } from "react";

function App() {
  useEffect(()=>{
    const target = document.getElementById("test");
    console.log(target.innerHTML);
  }, []);

  return (
    <div className="App" id="test">
      This is some <strong>strong and then <i>italicized</i> text.</strong>
    </div>
  );
}

export default App;
