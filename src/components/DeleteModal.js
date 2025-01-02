import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from "../utils/StaticImages";
import MultiColorDiv from "./MultiColorDiv";
import CustomButton from './CustomButton';
import { ReactIcons } from '../utils/ReactIcons';
const DeleteModal = ({ deleteModal, setDeleteModal, deleteMessage, deleteFunc, loading }) => {
    console.log("deleteLoading", loading);

    const deleteClick = () => {
        deleteFunc()
    }
    return (
        <div className="">
            <AntdComponents.Modal centered open={deleteModal} onCancel={() => setDeleteModal(false)} footer={false} width={500} closeIcon={<ReactIcons.CloseIcon className={'text-White'}/>}>
                <div className="text-center">
                    <AntdComponents.Image preview={false} src={STATIC_IMAGES.DELETE} height={90} width={'auto'} />
                    <div className="mt-4">
                        <AntdComponents.Typography className="text-White titleMedium">{deleteMessage}</AntdComponents.Typography>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="">
                                <MultiColorDiv component={<AntdComponents.Button className='bg-Black border-none text-White common-button h-[2.9rem] w-28'
                                    onClick={() => deleteClick()} loading={loading}
                                >Delete</AntdComponents.Button>} />
                            </div>
                            <CustomButton title={'Cancel'} className={'bg-Black border-2 border-White hover:border-White h-[3.2rem] w-28'} onClick={() => setDeleteModal(false)} />
                        </div>
                    </div>
                </div>

            </AntdComponents.Modal>
        </div>
    )
}
export default DeleteModal