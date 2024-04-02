import StarIcon from '@mui/icons-material/Star';
import Star from './star';
import { calcDiff } from '~/utils/functions';

const Review = () => {
    const reviews = [
        {
            avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474360kNV/anh-lisa-black-pink-nhay-mat-voi-fans_044238920.jpg',
            content: 'San pham sieu tot nha ca nha',
            name: 'Lisa',
            star: 4,
            createdAt: new Date(),
        },
        {
            avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474360kNV/anh-lisa-black-pink-nhay-mat-voi-fans_044238920.jpg',
            content: 'San pham sieu tot nha ca nha',
            name: 'Lisa',
            star: 4,
            createdAt: new Date(),
        },
        {
            avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474360kNV/anh-lisa-black-pink-nhay-mat-voi-fans_044238920.jpg',
            content: 'San pham sieu tot nha ca nha',
            name: 'Lisa',
            star: 4,
            createdAt: new Date(),
        },
        {
            avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474360kNV/anh-lisa-black-pink-nhay-mat-voi-fans_044238920.jpg',
            content: 'San pham sieu tot nha ca nha',
            name: 'Lisa',
            star: 4,
            createdAt: new Date(),
        },
    ];
    return (
        <div className="flex gap-6 w-full rounded-2xl bg-white p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-medium">Đánh giá sản phẩm</h1>
                <div className="flex items-center gap-4">
                    <StarIcon className="text-yellow-400" />
                    <h1 className="my-0 py-0">5.0</h1>
                </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                {reviews?.map((review, idx) => (
                    <div key={'review-' + idx} className="flex flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <img src={review?.avatar} alt="" className="w-[42px] h-[42px] object-cover rounded-full" />
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <span className="text-base font-medium">{review?.name}</span>
                                    <div className="flex items-center gap-2">
                                        <Star star={review?.star} />
                                        <span className="text-xs">{calcDiff(review?.createdAt)}</span>
                                    </div>
                                </div>
                                <p className="text-base">{review?.content}</p>
                            </div>
                        </div>{' '}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
