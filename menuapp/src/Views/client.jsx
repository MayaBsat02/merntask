import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import backgroundimg from "../assets/intro-bg.jpg";
import "swiper/swiper-bundle.min.css";
import style from "../style/main.modules.css";
import Category from "../components/category";
import { Link } from "react-router-dom";

const Index = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3000/menu/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div>
      <section
        className="intro"
        style={{
          backgroundImage: `url(${backgroundimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "70vh",
          width: "100%",
          display: "flex",
          marginTop: "0px",
        }}
      >
        <Link to="/admin">Admin</Link>
        

        <h1
          style={{
            fontFamily: "Poppins",
            fontStyle:'italic',
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            color: "white",
            fontSize: "50px",
          }}
        >
          Welcome to Zoya Resto
        </h1>
      </section>
      <section>
        <div className="container">
          <h1 style={{fontFamily: "Poppins",fontStyle:'italic',textAlign:'center'}}>Our Specials</h1>
          <Swiper className={style.swiper}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            // pagination={{ clickable: true,hide: true }}
            scrollbar={{hide: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {categories.categories && categories.categories.map((category, index) => 
                <SwiperSlide style={style.swiperSlide}>
                  <a href={`#${category._id}`} style={{textDecoration:'none'}} >
                <img src={category.icon} alt="" style={{width:'200px',height:'150px',borderRadius:'10px'}}/>
                </a>
                <h3 style={{textAlign:'center'}}>{category.title}</h3>

            </SwiperSlide>)}
          </Swiper>
        </div>
      </section>
      <section style={{width:'70%',margin:"auto",marginTop:'2%'}}>
        <Category/>
      </section>
    </div>
  );
};

export default Index;
