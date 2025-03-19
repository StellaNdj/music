const TopSection = ({more, setMore, description, name, titleRef, publisher, imageUrl, limitChar}) => {
    return (
        <>
            <div
                className="w-full h-60 flex items-center bg-cover bg-center relative"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 p-6 text-white">
                    <h2 ref={titleRef} className="font-bold text-2xl">{name}</h2>
                    <p>{publisher}</p>
                </div>
            </div>
            <div className="mx-2 p-2">
                {more ? <p className="text-sm">{description}</p> : <p className="text-sm">{limitChar(description, 150)}</p> }
                <button 
                    className="text-gray-700 text-sm hover:underline ml-1"
                    onClick={() => setMore(!more)}>
                    {more ? 'Less' : 'More'}
                </button>
                
            </div>
        </>
    )
}

export default TopSection;