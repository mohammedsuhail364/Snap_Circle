import Headers from "../components/Headers";
import Slideshow from "../components/Slideshow";
import Offers from "../components/offers";
import axiosInstance from "../api/axiosInstance";

const Home = () => {
  async function getAllPhotographerService() {
    try {
      const { data } = await axiosInstance.post("/auth/get-photographers");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getPhotographer() {
    const response = await getAllPhotographerService();
    if (response.success) {
      sessionStorage.setItem(
        "photographers",
        JSON.stringify(response.photographers)
      );
    }
  }
  getPhotographer();
  return (
    <div>
      <Headers />
      <Offers />
      <Slideshow />
    </div>
  );
};

export default Home;
