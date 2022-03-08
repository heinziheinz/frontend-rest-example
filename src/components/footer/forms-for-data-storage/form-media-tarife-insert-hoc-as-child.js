import FormMediaTarife from 'components/footer/forms-for-data-storage/form-media-tarife';
import HOCFooterStoreFetchMediaTarife from 'components/footer/HOC-footer-store-fetch-werbetarife';
const FormMediaTarifeInsertHOCasChild = () => {
    return (
        <FormMediaTarife>
            <HOCFooterStoreFetchMediaTarife />
            {/* <div>Hallo</div> */}
        </FormMediaTarife>
    );
}
export default FormMediaTarifeInsertHOCasChild;