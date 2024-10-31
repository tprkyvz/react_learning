import Yazi from "./Yazi";
import DataContext from "./DataContext";
import { useContext } from "react";
function Liste({yazilar,onRemovePost}) {
  const data=useContext(DataContext);
  return (
    <>
    <p>{data.ad+", "+data.soyad}</p>
      <ul>
        {yazilar.map(function (yazi) {
          return (
            
            <Yazi key={yazi.id} yazi={yazi} onRemovePost={onRemovePost}/>
          );
        })}
      </ul>
    </>
  );
}
export default Liste;
