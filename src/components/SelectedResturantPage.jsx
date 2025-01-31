import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ResturantItem from "./ResturantItem";

const SelectedResturantPage = () => {
  const { ResturantId } = useParams();
  const [items, setItems] = useState([]);
  const [resturant , setRestaurants] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getResturantItem();
  }, []);

  const getResturantItem = async () => {
    try {
      const response = await axios.post("http://localhost:3000/GetItemsOFResturant", {
        ResturantId: ResturantId,
      });
      const response2 = await axios.post("http://localhost:3000/GetRestaurantById" , {
        RestaurantId: ResturantId,
      });
      console.log(response2.data);
      console.log(response.data);
      setRestaurants(response2.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      alert("خراب کردی که");
    }
  };

  const handleBuy = () => {
    let counter = 0;
    selectedItems.map((element) => {
        counter += parseInt(element.quantity);
    })
    if(counter >= parseInt(resturant.RestaurantLimitBuy)){
        navigate("/BuyingFinalPage", { state: { BuyingItem: selectedItems, Resturant: resturant } });
    }else{
        alert("حداقل خرید از این رستوران " + resturant.RestaurantLimitBuy + " غذا است");
    }
  }

  const updateSelectedItems = (itemId, quantity , name) => {
    setSelectedItems(prevState => {
      const updatedItems = [...prevState];
      const index = updatedItems.findIndex(item => item.id === itemId);
      if (index === -1) {
          updatedItems.push({ id: itemId, quantity , name });
      } else {
          updatedItems[index].quantity = quantity;
      }
      return updatedItems.filter(item => item.quantity > 0);
    });
  };
  

  return (
    <>
    <div className="flex justify-center items-start gap-6">
      {items.map((element, index) => (
        <ResturantItem
          key={index}
          id={element.ItemId}
          name={element.ItemName}
          price={element.ItemPrice}
          updateSelectedItems={updateSelectedItems}
        />
      ))}
    </div>
    <div className="mt-8 flex justify-center items-center">
        <button onClick={handleBuy} className="p-6 bg-pink-200 rounded-3xl hover:bg-pink-300 transition hover:scale-105">تکمیل خرید</button>
    </div>
    </>
  );
};

export default SelectedResturantPage;
