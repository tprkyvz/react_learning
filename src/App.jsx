import "./App.css";
import Liste from "./Liste";
import InputWithLabel from "./InputWithLabel";
import React from "react";
import axios from "axios";
import DataProvider from "./DataProvider";
function App() {
  const API_ENDPOINT="https://my-json-server.typicode.com/asimsinan/mockapi/dersler"
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "Web"
  );
  const yazilarReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          isLoading:true,
          isError:false
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading:false,
          isError:false,
          data:action.payload
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          isLoading:false,
          isError:true
        };
      case "REMOVE_POST":
        return {
          ...state,
          data:state.data.filter((post)=>action.payload.id!==post.id)
        };
      default:
        throw new Error();
    }
  };
const [yazilar,dispatchYazilar]=React.useReducer(yazilarReducer,{
  data:[],
  isLoading:false,
  isError:false
});

  function handleSearch(event) {
    setAramaMetni(event.target.value);
    localStorage.setItem("aranan", event.target.value);
  }
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]);
  const handleFetchPost=React.useCallback(()=>{
    dispatchYazilar({type:"FETCH_INIT"});
    axios(API_ENDPOINT).then((result) => {
        dispatchYazilar({
          type:"FETCH_SUCCESS",
          payload:result.data.data
        });
      })
      .catch(() => dispatchYazilar({type:"FETCH_FAILURE"}));

  });
  React.useEffect(() => {
    handleFetchPost();
     }, []);

  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      yazar: "Toprak",
      yorumSayisi: 3,
      puan: 5,
      id: 0,
    },
    {
      baslik: "Web Öğreniyorum",
      yazar: "Yavuz",
      yorumSayisi: 1,
      puan: 3,
      id: 1,
    },
  ];
  function handleRemovePost(tiklananYazi) {
    dispatchYazilar({
      type:"REMOVE_POST",
      payload:tiklananYazi
    });
  }
  function getAsyncPosts() {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: { yazilar: yaziListesi } }), 2000)
    );
  }
  const arananYazilar = yazilar.data.filter(function (yazi) {
    return yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
  });
  const karsilama = {
    selamlama: "Merhaba",
    baslik: "Ali",
  };

  function selamla(karsilama, baslik) {
    return karsilama + " ," + baslik;
  }
  return (
    <div>
      <h1>{karsilama.selamlama + "," + karsilama.baslik}</h1>
      <p>{selamla("Selam", "Ayşe")}</p>
      <InputWithLabel
        type="text"
        id="arama"
        value={aramaMetni}
        onInputChange={handleSearch}
        label="Arama"
      />
      <hr />
      {yazilar.isError ? (
        <p>Bir hata oluştu...</p>
      ) : yazilar.isLoading ? (
        <p>Yükleniyoor...</p>
      ) : (
        <DataProvider>
        <Liste yazilar={arananYazilar} onRemovePost={handleRemovePost} />
        </DataProvider>
        
      )}
    </div>
  );
}
export default App;
