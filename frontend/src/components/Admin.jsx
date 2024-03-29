import Header from "./Header";
import VenueList from "./VenueList";
import { useLocation, useNavigate } from "react-router-dom";
import VenueReducer from "../services/VenueReducer";
import React from "react";
import VenueDataService from "../services/VenueDataService";
function Admin() {
  var navigate = useNavigate();
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });
  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });
    try {
      VenueDataService.listAllVenues().then(
        (result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        }
      );
    } catch {
      dispatchVenues({ type: "FETCH_FAILURE" });
    }
  }, [venues.isDeleted]);
  function handleClick(evt, id) {
    evt.preventDefault();
    if (evt.target.name === "Mekan Ekle") {
     
      return navigate('/admin/addupdate/venue/new', {
        state: { action: "new" },
      });
    } else if (evt.target.name === "Güncelle") {
      return navigate(`/admin/addupdate/venue/${id}`, {
        state: { action: "update" },
      });
    }

    if(evt.target.name==="Sil"){
      
      VenueDataService.removeVenue(id).then(() => {
        dispatchVenues({ type: "REMOVE_VENUE" });
        navigate(`/admin`);
        window.location.reload();
        
        
      });
   
    
    }
    
    
   //Mekan ekle, sil,güncelle düğmelerine basıldığında
   //olacak olaylar buraya yazılacak
  }
  
  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;