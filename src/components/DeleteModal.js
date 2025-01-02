import * as AntdComponents from 'antd'
import CustomButton from './CustomButton';
import { ReactIcons } from '../utils/ReactIcons';
const DeleteModal = ({ deleteModal, setDeleteModal, deleteMessage, deleteFunc, loading }) => {
    console.log("deleteLoading", loading);

    const deleteClick = () => {
        deleteFunc()
    }
    return (
        <div className="">
            <AntdComponents.Modal centered open={deleteModal} onCancel={() => setDeleteModal(false)} footer={false} width={500} closeIcon={<ReactIcons.CloseIcon className={'text-White'} />}>
                <div className="text-center">
                    <div className="flex items-center justify-center">
                    <ReactIcons.DeleteIcon style={{fontSize:100}}/>
                    </div>
                    <div className="mt-4">
                        <AntdComponents.Typography className="text-White titleMedium">{deleteMessage}</AntdComponents.Typography>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <CustomButton title={'Delete'} className={'bg-Red h-[3.2rem] w-28'} onClick={() => deleteClick()} loading={loading} />
                            <CustomButton title={'Cancel'} className={'bg-Blue h-[3.2rem] w-28'} onClick={() => setDeleteModal(false)} />
                        </div>
                    </div>
                </div>

            </AntdComponents.Modal>
        </div>
    )
}
export default DeleteModal