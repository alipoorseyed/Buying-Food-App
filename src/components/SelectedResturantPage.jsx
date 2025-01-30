import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ResturantItem from "./ResturantItem";

const SelectedResturantPage = () => {
  const { ResturantId } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    getResturantItem();
  }, []);

  const getResturantItem = async () => {
    try {
      const response = await axios.post("http://localhost:3000/GetItemsOFResturant", {
        ResturantId: ResturantId,
      });
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      alert("خراب کردی که");
    }
  };

  const updateSelectedItems = (itemId, quantity) => {
    setSelectedItems(prevState => {
      const updatedItems = [...prevState];
      const index = updatedItems.findIndex(item => item.id === itemId);
      if (index === -1) {
          updatedItems.push({ id: itemId, quantity });
      } else {
          updatedItems[index].quantity = quantity;
      }
      return updatedItems.filter(item => item.quantity > 0);
    });
  };
  

  return (
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
      <div>
        <h3>Selected Items:</h3>
        <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SelectedResturantPage;
