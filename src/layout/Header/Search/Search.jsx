import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ showBoxSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputRef = useRef();
    const boxSearchRef = useRef();

    const styleTagSearchResult = { width: boxSearchRef.current?.clientWidth };

    // useEffect(() => {
    //     if (!debouncedValue.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         //const result = await searchServices.filetWordContain(debouncedValue);
    //         //setSearchResult(result);
    //         setLoading(false);
    //     };

    //     fetchApi();
    // }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            handleSearch();
        }
    };

    const search = (value) => {
        navigate(`/lookup/${value}`);
    };

    const handleSearch = () => {
        navigate(`/products/search/${searchValue}`);
    };

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div className={cx('max-xl:flex-1')}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('max-h-52  overflow-y-auto pb-2')}>
                            {searchResult.map((word, index) => (
                                <div
                                    key={index}
                                    className={cx('cursor-pointer px-4 py-[6px] hover:underline', 'result-item')}
                                    onClick={() => search(word.name)}
                                >
                                    {word.name}
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div
                    className={cx(
                        'relative ml-4 flex w-[300px] border-[1.5px] border-solid border-transparent pl-4',
                        'max-md:invisible max-md:!absolute max-md:!left-0 max-md:!ml-0 max-md:!w-full',
                        'search',
                        {
                            '!visible': showBoxSearch,
                        },
                    )}
                    ref={boxSearchRef}
                >
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder={'search clothes'}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleKeyDown}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button
                        className={cx(
                            'search-btn',
                            'flex h-full items-center justify-center text-[1.125rem] text-gray-900/[.34]',
                            'hover:cursor-pointer hover:bg-gray-900/[.03]',
                            'active:cursor-pointer active:bg-gray-900/[.06]',
                        )}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleSearch}
                        disabled={searchValue === ''}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

Search.propTypes = {
    showBoxSearch: PropTypes.bool.isRequired,
};

export default Search;
