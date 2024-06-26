import { generateArray } from '~/utils/functions';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
const Star = ({ star }) => {
    return (
        <div className="flex items-center gap-1">
            {generateArray(star).map((e) => (
                <StarIcon className="text-yellow-400" fontSize="16px" key={'star-' + e} />
            ))}
            {generateArray(5 - star).map((e) => (
                <StarBorderOutlinedIcon className="text-yellow-400" fontSize="16px" key={'star-' + (e + 5)} />
            ))}
        </div>
    );
};

export default Star;
