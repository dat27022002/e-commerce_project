import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const LoadingModal = () => {
    return (
        <div className="fixed top-0 left-0 z-[100] w-screen h-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
            <HourglassBottomIcon className="animate-spin w-[100px] text-white" />
        </div>
    );
};

export default LoadingModal;
