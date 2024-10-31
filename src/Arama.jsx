import React from "react";
function Arama(props) {
  function handleChange(event){
    props.onSearch(event);
    setAramaMetni(event.target.value);
  }
  return (
    <div>
      <label htmlFor="arama"> Arama:</label>
      <input id="arama" type="text" onChange={handleChange} value={props.aramaMetni}/>
      <p><strong>{props.aramaMetni}</strong> aranıyor...</p>
    </div>
  );
}
export default Arama;
