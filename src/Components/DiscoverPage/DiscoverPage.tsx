import React from "react";
import Searchbar from "./Searchbar";

const DiscoverPage: React.FC = () => {

 const getGreeting=()=> {
    const today = new Date();
    const hours = today.getHours();
    let greeting = "Good morning";
    if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon";
    } else if (hours >= 18 || hours < 4) {
      greeting = "Good evening";
    }
    return greeting;
  }
  return (
    <div className="w-full h-full ">    
        <h1 className="text-3xl f-lora italic ">{getGreeting()}, User!</h1>
        <p className="mb-4 text-(--text-gray-light) f-poppins mt-2">Explore latest books and authors</p>
        <Searchbar />
    </div>
  );
}
export default DiscoverPage;