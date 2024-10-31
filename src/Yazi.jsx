function Yazi({ yazi, onRemovePost }) {
  function handleRemovePost() {
    onRemovePost(yazi);
  }
  return (
    <li style={{ marginBottom: "5px" }}>
      <span>{yazi.baslik + ", " + yazi.yazar + ", " + yazi.puan}&nbsp;</span>
      <span>
        <button onClick={handleRemovePost}>Sil</button>
      </span>
    </li>
  );
}
export default Yazi;
