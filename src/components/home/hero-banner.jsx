import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            stopOnHover={false}
            showThumbs={false}
            showStatus={false}
            width={'100%'}
            axis="horizontal"
            className="!w-full [&>_slide]:!min-w-full"
        >
            <img
                className="object-cover w-full aspect-video max-h-[600px]"
                alt=""
                src="https://images.template.net/227447/fashion-sale-banner-template-edit-online.jpg"
            />

            <img
                className="object-cover w-full aspect-video max-h-[600px]"
                alt=""
                src="https://i.ytimg.com/vi/LqXiTVaDt7E/maxresdefault.jpg"
            />

            <img
                className="object-cover w-full aspect-video max-h-[600px]"
                alt=""
                src="https://marketplace.canva.com/EAFoustdoMc/1/0/1600w/canva-beige-aesthetic-fashion-style-banner-landscape-k4EiS0uPqD0.jpg"
            />
        </Carousel>
    );
};

export default Slider;
