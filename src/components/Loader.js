import { Vortex } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="flex items-center justify-center" style={{ height: '60vh' }}>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['var(--darkPurple)', 'var(--blue)', 'var(--pink)', 'var(--darkPurple)', 'var(--blue)', 'var(--pink)']}
            />
        </div>
    )
}
export default Loader