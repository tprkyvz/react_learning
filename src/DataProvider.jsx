import DataContext from "./DataContext";
function DataProvider({children}){
    const sharedData={ad:"Sinan",soyad:"Yüksel"};
    return(
        <DataContext.Provider value={sharedData}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;