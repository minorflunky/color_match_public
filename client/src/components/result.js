import { 
    Carousel,
    Card,
    Space
} from "antd";

import Product from "./Product";

//const { Meta } = Card



const container = {
    margin: 0,
    height: 'auto',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    alignContent: 'center'
    
  };


const Result = () => {
    const onChange = (currentSlide) => {
      console.log(currentSlide);
    };
    return (
      <Carousel afterChange={onChange} style={container}>

        <Product name={'hello'} brand={'ho'} image={'hey'} />

        <Product name={'hello'} brand={'ho'} image={'hey'} />

        <Product name={'hello'} brand={'ho'} image={'hey'} />
      </Carousel>
    );
  };

  export default Result