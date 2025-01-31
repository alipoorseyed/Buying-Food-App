import { useEffect, useState } from "react";
import axios from "axios";
import ResturantComponent from "./ResturantComponent";
import { useRoleContext } from "../hooks/RoleContext";

const UserMainPage = () => {
    const [restaurants, setRestaurants] = useState([]); // ✅ Store data in state
    const { role } = useRoleContext()

    useEffect(() => {
        console.log(role);
        
        getResturant();
    }, []);

    const getResturant = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/AllRestaurants`);
            setRestaurants(response.data); // ✅ Update state
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            alert("خراب کردی که");
        }
    };

    return (
        <div className="flex justify-start items-start gap-6">
            {restaurants.map((element , index) => (
                <ResturantComponent
                    key={index}
                    address={element.RestaurantAddress}
                    deliveryFee={element.RestaurantDeliveryFee}
                    name={element.RestaurantName}
                    imagesrc={element.RestaurantProfilePicture}
                    ResturantId={element.RestaurantId}
                />
            ))}
        </div>
    );
};

export default UserMainPage;
