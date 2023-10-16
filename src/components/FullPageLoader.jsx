function Loader({bg}) {
    

    return (
        <>  
        <div style={{ backgroundColor: bg ? bg : ''}} className="full-page-loader">
            <div className="lds-dual-ring"></div>
        </div> 

        </>
    )
}

export default Loader
