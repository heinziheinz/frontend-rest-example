import FormImpressum from 'components/footer/forms-for-data-storage/form-impressum';
import HOCFooterStoreFetchImpressum from 'components/footer/HOC-footer-store-fetch-impressum';
const FormImpressumInsertHOCasChild = () => {
    return (
        <FormImpressum>
            <HOCFooterStoreFetchImpressum />
            {/* <div>Hallo</div> */}
        </FormImpressum>
    );
}
export default FormImpressumInsertHOCasChild;